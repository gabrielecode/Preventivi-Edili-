# Istruzioni di Sviluppo - Preventivatore Edile Multilingua

Questo file contiene l'architettura principale, le regole di business e le policy di robustezza dell'applicazione, studiate per guidare lo sviluppo futuro ed evitare regressioni.

## 🏗️ Architettura dell'Applicazione (Serverless Vercel)

L'applicazione è strutturata con un'architettura **Full-Stack (React client-side + Vercel Serverless Functions in `/api`)** con logica condivisa in `/server-lib`:
*   **Frontend (React + Tailwind CSS)**: Presente interamente in `/src`. Consente la selezione del settore di intervento, il paese di riferimento (con aliquote IVA territoriali), e la configurazione dei prezzi e delle preferenze Fai da Te vs Professionista.
*   **Backend Serverless (`/api/*`)**: Funzioni serverless Node.js dislocate in `/api` che importano la logica condivisa da `/server-lib`:
    *   `/api/estimate`: Calcolo economico dei preventivi e generazione di analisi di fattibilità e voci aggiuntive tramite OpenRouter con catena di fallback unificata. **Regola fondamentale: I totali e i calcoli economici sono calcolati SEMPRE sul server**.
    *   `/api/analyze-photos`: Analisi visiva delle foto delle stanze tramite la catena multimodale OpenRouter.
    *   `/api/leads` & `/api/leads/export`: Registrazione e gestione delle richieste di preventivo con persistenza su **Upstash Redis** (con fallback locale in sviluppo).
    *   `/api/price-lists` e `/api/countries`: Endpoint per listini prezzi settoriali e cataloghi paesi/IVA.
*   **Sviluppo Locale (`server.ts`)**: Mantiene un server Express di sviluppo (`npm run dev`) che utilizza esattamente gli stessi moduli condivisi in `/server-lib`.

---

## 🛡️ Catena di Fallback OpenRouter e Policy di Resilienza (Task 11a)

Tutte le chiamate AI dell'applicazione (`/api/estimate` e `/api/analyze-photos`) passano unicamente da un solo helper centralizzato: `runChain(task, messages, schema)` in `server-lib/ai.ts`. Non esistono dipendenze dirette da SDK esterni o Gemini diretto: l'unica interfaccia AI è OpenRouter (`POST https://openrouter.ai/api/v1/chat/completions` con Bearer token e header `HTTP-Referer` e `X-Title`).

1.  **Configurazione Catena da Variabili d'Ambiente**:
    *   `AI_CHAIN_TEXT`: Elenco ordinato di ID modello OpenRouter separati da virgola per task testuali (default: `google/gemini-2.5-flash`, `meta-llama/llama-3.3-70b-instruct`, seguiti da modelli gratuiti `:free` come `google/gemma-4-31b-it:free`, `nvidia/nemotron-3-ultra-550b-a55b:free`, `google/gemma-4-26b-a4b-it:free`). Nessuna immagine viene mai inviata ai modelli della catena TEXT.
    *   `AI_CHAIN_VISION`: Elenco ordinato di ID modello OpenRouter separati da virgola che supportano input di immagini (default: `google/gemini-2.5-flash`, `google/gemma-4-31b-it:free`).
2.  **Budget Temporale e Timeout**:
    *   `FALLBACK_TIMEOUT_MS`: 60000ms (60s) per singolo tentativo, gestito tramite `AbortController`.
    *   `TOTAL_BUDGET_MS`: 250000ms (250s) per l'intera catena. Prima di ogni tentativo viene calcolato il tempo residuo: se è inferiore a 20s, la catena si interrompe e passa immediatamente alla modalità degradata. Il timeout di un singolo tentativo è pari a `min(60s, tempo residuo - 5s)`.
3.  **Condizioni di Passaggio al Modello Successivo**:
    *   Timeout (`AbortError`), errori di rete, codici HTTP 429, 402, 408 e 5xx, risposta vuota, JSON non valido o non conforme allo schema dopo un solo tentativo di riparazione.
    *   Pausa di backoff di `500ms` tra i tentativi.
    *   Gli errori 400 causati da input utente non valido non vengono inoltrati alla catena ma restituiti direttamente al client.
4.  **Output Strutturato e Retry Intelligente**:
    *   Viene prima tentato `response_format: { type: "json_schema" }`.
    *   Se il modello non supporta `json_schema` (HTTP 400/422), viene rilanciato lo STESSO modello una sola volta con `response_format: { type: "json_object" }` e lo schema inserito nel prompt di sistema.
    *   Tutti i dati vengono validati lato server e i totali economici ricalcolati deterministamente (Task 3).
5.  **Degradazione Graziosa**:
    *   Se la catena VISION si esaurisce o scade il budget, l'analisi delle foto viene restituita come non disponibile (con testo tradotto nella lingua della richiesta) senza far fallire il preventivo né bloccare l'interfaccia utente.
    *   Se la catena TEXT si esaurisce, i calcoli matematici di listino vengono comunque forniti con note qualitative semplificate.
6.  **Privacy e Logging**:
    *   Per ogni richiesta vengono loggati modello, tentativi, durata e motivo del fallback, senza mai loggare prompt utente né immagini.
    *   Le risposte API includono il metadato `meta: { modelUsed, fallbackCount, degraded, durationMs }` ad uso di debug.

---

## ⚡ Autonomia, Circuit Breaker e Modalità Senza AI (Task 11b)

1.  **Circuit Breaker per Modello**:
    *   Ogni fallimento consecutivo viene tracciato (`consecutiveFailures`). Se un modello fallisce 2 volte consecutive, viene posto in pausa per `MODEL_COOLDOWN_MS` (default `300000ms`, ovvero 5 minuti).
    *   Durante il periodo di cooldown, il modello viene saltato nelle richieste successive e riprovato solo allo scadere del timer.
    *   **Regola di emergenza**: Se TUTTI i modelli disponibili sono in pausa, le pause vengono temporaneamente ignorate e la catena viene comunque provata in ordine sequenziale.
    *   Lo stato del Circuit Breaker è salvato su **Upstash Redis** (chiave `circuit_breaker:{model}`) per la massima affidabilità in ambiente serverless Vercel, con fallback in memoria locale per lo sviluppo.
2.  **Verifica Giornaliera del Catalogo OpenRouter (24 ore)**:
    *   Un helper dedicato (`getOpenRouterCatalog` in `server-lib/modelHealth.ts`) confronta gli ID configurati nelle variabili d'ambiente con l'elenco ufficiale dei modelli (`GET https://openrouter.ai/api/v1/models`), mantenendo il catalogo in cache per 24 ore su Redis/memoria.
    *   Se un modello non è più presente a catalogo, viene marcato come `"non_disponibile"` e saltato con log esplicito.
    *   **Regola ferrea**: Nessun modello viene mai sostituito automaticamente con modelli non esplicitamente scelti e configurati nelle variabili d'ambiente.
3.  **Degradazione Controllata Senza AI (`degraded: true`)**:
    *   Se la catena dei modelli si esaurisce o scade il budget temporale, `/api/estimate` risponde SEMPRE con **HTTP 200** e `degraded: true`.
    *   I totali economici, gli intervalli di costo (fai da te e professionista), la lista della spesa con sfrido e gli attrezzi a noleggio/acquisto vengono calcolati deterministicamente dal listino prezzi.
    *   I campi descrittivi qualitativi (`feasibility`, `risks`, `recommendations`, `permitsAndRules`, `mainSteps`, `estimatedTime`, `diySummaryNote`) vengono popolati con contenuti tecnici standard predefiniti e tradotti per ognuno dei 5 settori e per le 4 lingue supportate (`it`, `en`, `fr`, `de`).
4.  **Policy di Risparmio Token e Protezione Banda**:
    *   `max_tokens` rigorosamente limitato in base al task (`1200` per task text, `800` per task vision).
    *   Prompt di sistema sintetici e privi di istruzioni ridondanti.
    *   Per le foto di cantiere: se una chiamata fallisce per timeout dopo aver già inviato lo stesso payload di immagini per 2 volte consecutive, la catena interrompe immediatamente ulteriori tentativi di invio foto e passa alla modalità degradata graziosa.
5.  **Monitoraggio e Health Check (`GET /api/health/ai`)**:
    *   Endpoint protetto tramite header `Authorization: Bearer <ADMIN_TOKEN>`.
    *   Mostra lo stato di ciascun modello della catena (`ok`, `in_pausa` con secondi rimanenti, `non_disponibile`), il conteggio dei fallimenti consecutivi, l'ultimo errore riscontrato e il timestamp, senza esporre alcuna chiave API o informazione sensibile.

---

## ⏱️ Rate Limiting e Persistenza Serverless

*   **Rate Limiting**: Gestito tramite `@upstash/ratelimit` + `@upstash/redis` (10 richieste all'ora per IP), con fallback in-memoria per lo sviluppo locale.
*   **Storage Lead**: Salvati su Upstash Redis con TTL di 90 giorni (chiave `lead:{id}` e indice `leads:index`), con fallback su file in locale.
*   **Regola Serverless**: **Nessuna scrittura su filesystem in produzione, nessun stato in memoria condiviso tra richieste**.

---

## 📱 Progressive Web App (PWA) e Offline (Task P2)

1.  **Installabilità e Prompts**:
    *   L'applicazione intercetta `beforeinstallprompt` e mostra pulsanti di installazione in Header e un Banner in Home (richiudibile per 14 giorni via `localStorage`).
    *   Su iOS/Safari viene mostrata una guida modale ("Condividi → Aggiungi alla schermata Home").
    *   I componenti `PWAInstallButton` e `PWABanner` si nascondono automaticamente se l'app è già installata (`display-mode: standalone`).
2.  **Modalità Standalone**:
    *   In modalità standalone, la Home Page mostra il titolo "Nuova stima" e un sottotitolo semplificato per favorire la ricorrenza d'uso.
3.  **Service Worker e Caching**:
    *   `registerType: 'prompt'`: Notifica l'utente quando è disponibile una nuova versione.
    *   **Regola ferrea**: Le rotte `/api/*` non vengono mai caricate dalla cache (`NetworkOnly`) per garantire dati sempre aggiornati.
    *   Pagina di fallback offline: `public/offline.html`.
4.  **Rigenerazione Icone e Asset PWA**:
    *   Le icone sono gestite tramite `pwa-assets.config.ts`.
    *   Per rigenerare le icone partendo da `public/icon.svg`, eseguire: `npx pwa-assets-generator`.
    *   Assicurarsi che `maskable-icon-512x512.png` abbia un margine di sicurezza del 10-15%.

---

## 🗄️ Standard di Configurazione

*   **Chiavi Segrete**: Salvate unicamente nelle variabili d'ambiente (`OPENROUTER_API_KEY`, `AI_CHAIN_TEXT`, `AI_CHAIN_VISION`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_TOKEN`).
*   **Stile e Design**: Tailwind CSS e icone `lucide-react`.
