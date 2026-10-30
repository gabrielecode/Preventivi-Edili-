# Preventivo Casa & Fai da Te (Multilingual Construction & DIY Estimator)

Un'applicazione web professionale Full-Stack (React SPA + Vercel Serverless Functions) per la stima dei costi di interventi edili e di ristrutturazione, con confronto in tempo reale tra **Fai da Te (DIY)** e **Professionista**, analisi basata su Intelligenza Artificiale (Google Gemini & OpenRouter Vision), calcoli di fattibilità, liste della spesa con sfrido, utensili (acquisto vs noleggio), permessi normativi per paese (Italia, Germania, Francia, Regno Unito) e generazione di computi in PDF.

## 🚀 Caratteristiche Principali

- **Confronto Fai da Te vs Professionista**: Calcolo dettagliato dei costi dei materiali, sfridi, attrezzatura (noleggio vs acquisto), ore stimate e risparmio rispetto al professionista.
- **Calcoli Server-Side**: Tutti i calcoli economici (prezzi, IVA territoriale, sfrido, totali) avvengono in modo sicuro sul backend serverless.
- **Intelligenza Artificiale Generativa**: Integrazione con Google Gemini (`@google/genai`) con policy di fallback a cascata (`gemini-3.5-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite`) per assicurare massima affidabilità anche in caso di sovraccarico.
- **Analisi Foto con IA (Vision)**: Caricamento fino a 3 foto della stanza per rilevare criticità (muffa, crepe, umidità) e stimare automaticamente le dimensioni.
- **Multilingua e Internazionale**: Supporto completo per Italia, Germania, Francia e Regno Unito con aliquote IVA dedicate e traduzioni in IT, DE, FR, EN.
- **Esportazione PDF & Richiesta Preventivi**: Generazione di computi metrici estimativi in PDF con `jspdf` e sistema di invio richieste ai professionisti partner.
- **Rate Limiting e Storage Redis**: Protezione da abusi tramite Upstash Ratelimit e persistenza dei lead su Upstash Redis con fallback locale in sviluppo.

## 🛠️ Stack Tecnologico

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, jsPDF.
- **Backend**: Vercel Serverless Functions (`/api/*`), Node.js, TypeScript.
- **AI**: `@google/genai` (SDK ufficiale Gemini), OpenRouter API (per analisi foto avanzata).
- **Storage & Rate Limit**: Upstash Redis & Ratelimit.

## ⚙️ Configurazione e Avvio Locale

1. Clonare o aprire il repository.
2. Installare le dipendenze:
   ```bash
   npm install
   ```
3. Configurare le variabili d'ambiente in `.env` (basandosi su `.env.example`).
4. Avviare l'applicazione in modalità sviluppo (Express + Vite middlewares):
   ```bash
   npm run dev
   ```
5. Per compilare per la produzione:
   ```bash
   npm run build
   ```

---

## 🌐 Guida al Deploy su Vercel

Segui questi passaggi per pubblicare l'applicazione su Vercel:

1. **Importa il repository in Vercel**:
   - Accedi a [Vercel](https://vercel.com) e clicca su **Add New > Project**.
   - Importa il tuo repository GitHub contenente il progetto.
2. **Configura le impostazioni di build**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Imposta le Variabili d'Ambiente** (in **Settings > Environment Variables**):
   - `GEMINI_API_KEY`: La tua chiave API di Google Gemini.
   - `OPENROUTER_API_KEY`: La tua chiave API di OpenRouter.
   - `OPENROUTER_MODEL_VISION_PRIMARY`: `google/gemini-2.0-flash-001`
   - `OPENROUTER_MODEL_VISION_SECONDARY`: `openai/gpt-4o-mini`
   - `OPENROUTER_MODEL_VISION_TERTIARY`: `google/gemini-flash-1.5`
   - `APP_URL`: L'URL pubblico della tua app su Vercel (es. `https://tuo-progetto.vercel.app`).
   - `UPSTASH_REDIS_REST_URL`: URL REST del database Upstash Redis.
   - `UPSTASH_REDIS_REST_TOKEN`: Token REST del database Upstash Redis.
   - `ADMIN_TOKEN`: Token segreto Bearer per l'esportazione protetta dei lead (`GET /api/leads/export`).
4. **Effettua il primo deploy**:
   - Clicca su **Deploy** e attendi il completamento della compilazione.
5. **Collega un Dominio Personalizzato**:
   - Vai su **Settings > Domains**, inserisci il tuo dominio e segui le istruzioni per configurare i record DNS.
