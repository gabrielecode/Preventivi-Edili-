# Istruzioni di Sviluppo - Preventivatore Edile Multilingua

Questo file contiene l'architettura principale, le regole di business e le policy di robustezza dell'applicazione, studiate per guidare lo sviluppo futuro ed evitare regressioni.

## 🏗️ Architettura dell'Applicazione

L'applicazione è strutturata con un'architettura **Full-Stack (React client-side + Express backend)** configurata tramite Vite:
*   **Frontend (React + Tailwind CSS)**: Presente interamente in `/src`. Consente la selezione del settore di intervento (imbiancatura, idraulica, ecc.), il paese di riferimento (con aliquote IVA territoriali e normative specifiche), e la configurazione dei prezzi. Consente anche l'esportazione di computi metrici in PDF locali o l'invio diretto tramite email.
*   **Backend (Express in `server.ts`)**: Gestisce le chiamate proxy sicure per nascondere le chiavi API ed esegue i compiti pesanti:
    *   `/api/generate-quote`: Generazione di preventivi strutturati tramite l'API di Gemini.
    *   `/api/send-email`: Servizio di spedizione delle email con l'allegato PDF codificato in Base64 (supporto sandbox incluso).

---

## 🛡️ Gestione degli Errori e Policy di Fallback (Importante!)

Per arginare i picchi improvvisi di traffico e gli errori di sovraccarico temporaneo del modello (es. errore **503 UNAVAILABLE** o **High Demand**), il backend implementa un meccanismo robusto di **modelli a cascata (fallback)**:

1.  **Helper `generateContentWithFallback`**: Le chiamate di generazione non devono interrogare direttamente `gemini-3.5-flash`. Devono sempre passare per la funzione di fallback integrata in `server.ts`.
2.  **Modelli di riserva**: Se il modello primario fallisce, l'applicazione prova automaticamente, in sequenza:
    1.  `gemini-3.5-flash` (Primario)
    2.  `gemini-flash-latest` (Secondario)
    3.  `gemini-3.1-flash-lite` (Terziario)
3.  **Ritardi di backoff**: Viene applicata una pausa di `500ms` tra un tentativo e l'altro per consentire il decongestionamento.

---

## 🗄️ Standard di Configurazione

*   **Chiavi Segrete**: La chiave API di Gemini è salvata unicamente sul server all'interno della variabile `GEMINI_API_KEY`, preservando la sicurezza totale.
*   **Stile e Design**: L'interfaccia utilizza **Tailwind CSS**. Gli elementi grafici cardine derivano da un design pulito, minimalista ma solido, orientato all'utenza professionale. Le icone sono prelevate esclusivamente da `lucide-react`.
