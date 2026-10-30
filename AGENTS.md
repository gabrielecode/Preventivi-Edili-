# Istruzioni di Sviluppo - Preventivatore Edile Multilingua

Questo file contiene l'architettura principale, le regole di business e le policy di robustezza dell'applicazione, studiate per guidare lo sviluppo futuro ed evitare regressioni.

## 🏗️ Architettura dell'Applicazione (Serverless Vercel)

L'applicazione è strutturata con un'architettura **Full-Stack (React client-side + Vercel Serverless Functions in `/api`)** con logica condivisa in `/server-lib`:
*   **Frontend (React + Tailwind CSS)**: Presente interamente in `/src`. Consente la selezione del settore di intervento, il paese di riferimento (con aliquote IVA territoriali), e la configurazione dei prezzi e delle preferenze Fai da Te vs Professionista.
*   **Backend Serverless (`/api/*`)**: Funzioni serverless Node.js dislocate in `/api` che importano la logica condivisa da `/server-lib`:
    *   `/api/estimate`: Calcolo economico dei preventivi e generazione di analisi di fattibilità e voci aggiuntive tramite OpenRouter con modelli testuali a cascata (fallback). **Regola fondamentale: I totali e i calcoli economici sono calcolati SEMPRE sul server**.
    *   `/api/analyze-photos`: Analisi visiva delle foto delle stanze tramite modelli multimodali con fallback OpenRouter.
    *   `/api/leads` & `/api/leads/export`: Registrazione e gestione delle richieste di preventivo con persistenza su **Upstash Redis** (con fallback locale in sviluppo).
    *   `/api/price-lists` e `/api/countries`: Endpoint per listini prezzi settoriali e cataloghi paesi/IVA.
*   **Sviluppo Locale (`server.ts`)**: Mantiene un server Express di sviluppo (`npm run dev`) che utilizza esattamente gli stessi moduli condivisi in `/server-lib`.

---

## 🛡️ Gestione degli Errori e Policy di Fallback (Importante!)

Per arginare i picchi improvvisi di traffico e gli errori di sovraccarico temporaneo del modello (es. errore **503 UNAVAILABLE** o **High Demand**), il backend implementa un meccanismo robusto di **modelli a cascata (fallback)** su OpenRouter:

1.  **Helper `generateWithFallback`**: Tutte le chiamate di generazione testo e vision passano per `generateWithFallback` con modelli primari, secondari e terziari e timeout di 45s.
2.  **Modelli Testuali (Stime / Preventivi)**: Configurabili via `OPENROUTER_MODEL_TEXT_PRIMARY`, `OPENROUTER_MODEL_TEXT_SECONDARY`, `OPENROUTER_MODEL_TEXT_TERTIARY` (default: `deepseek/deepseek-chat`, `openai/gpt-4o-mini`, `google/gemini-2.0-flash-001`), con supporto strutturato JSON e multilingua (IT, DE, FR, EN).
3.  **Modelli Vision (Analisi Foto)**: Configurabili via `OPENROUTER_MODEL_VISION_PRIMARY`, `OPENROUTER_MODEL_VISION_SECONDARY`, `OPENROUTER_MODEL_VISION_TERTIARY` (default: `google/gemini-2.0-flash-001`, `openai/gpt-4o-mini`, `google/gemini-flash-1.5`).
4.  **Ritardi di backoff**: Pausa di `500ms` tra un tentativo e l'altro e fallback automatico da `json_schema` a `json_object` in caso di non supporto da parte del modello.

---

## ⏱️ Rate Limiting e Persistenza Serverless

*   **Rate Limiting**: Gestito tramite `@upstash/ratelimit` + `@upstash/redis` (10 richieste all'ora per IP), con fallback in-memoria per lo sviluppo locale.
*   **Storage Lead**: Salvati su Upstash Redis con TTL di 90 giorni (chiave `lead:{id}` e indice `leads:index`), con fallback su file in locale.
*   **Regola Serverless**: **Nessuna scrittura su filesystem in produzione, nessun stato in memoria condiviso tra richieste**.

---

## 🗄️ Standard di Configurazione

*   **Chiavi Segrete**: Salvate unicamente nelle variabili d'ambiente (`OPENROUTER_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_TOKEN`).
*   **Stile e Design**: Tailwind CSS e icone `lucide-react`.
