import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { sectorPriceLists } from "./src/data/priceLists";
import { countriesList } from "./src/data/countries";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to get initial price lists
app.get("/api/price-lists", (req, res) => {
  res.json(sectorPriceLists);
});

// API route to get countries list
app.get("/api/countries", (req, res) => {
  res.json(countriesList);
});

// API route to send a PDF via email
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, body, fileName, pdfBase64 } = req.body;

    if (!to || !subject || !body || !pdfBase64) {
      return res.status(400).json({
        error: "Parametri mancanti. Compilare tutti i campi (Destinatario, Oggetto, Messaggio, PDF)."
      });
    }

    let transporter;
    let fromEmail = process.env.SMTP_FROM || '"Preventivatore Edile AI" <noreply@preventivatoreedile.com>';
    let testUrl = null;

    // Check if custom SMTP details are provided
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create a temporary Ethereal test SMTP account (extremely useful for previewing emails in development)
      try {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        fromEmail = `"Preventivatore d'Esempio" <${testAccount.user}>`;
      } catch (err) {
        console.warn("Impossibile creare l'account SMTP di prova, invio simulato:", err);
      }
    }

    const mailOptions = {
      from: fromEmail,
      to: to,
      subject: subject,
      text: body,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fafafa;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 40px;">📋</span>
            <h2 style="color: #0f172a; margin-top: 10px; font-weight: 800; font-family: system-ui, -apple-system, sans-serif; letter-spacing: -0.025em;">Preventivo Edile Professionale</h2>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);">
            <p style="color: #334155; line-height: 1.6; font-size: 14px; white-space: pre-wrap; margin: 0;">${body}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <div style="text-align: center; color: #64748b; font-size: 11px; line-height: 1.4;">
            <p>Questo messaggio è stato inviato in modo sicuro tramite la piattaforma <strong>Preventivatore Edile AI</strong>.</p>
            <p>Troverà il documento PDF dettagliato in allegato a questa email.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: fileName || "preventivo_cantiere.pdf",
          content: pdfBase64,
          encoding: "base64",
        }
      ]
    };

    if (transporter) {
      const info = await transporter.sendMail(mailOptions);
      
      // If we used a test account, get the Ethereal message URL
      if (!process.env.SMTP_HOST) {
        testUrl = nodemailer.getTestMessageUrl(info);
      }

      console.log("Email inviata con successo:", info.messageId);
      return res.json({
        success: true,
        message: "Email inviata con successo!",
        messageId: info.messageId,
        testUrl: testUrl
      });
    } else {
      // Pure fallback mock response if SMTP creation failed completely
      console.log("Mock invio email a:", to);
      return res.json({
        success: true,
        message: "[Simulazione] Mail pronta per l'invio (SMTP non configurato).",
        mocked: true
      });
    }

  } catch (error: any) {
    console.error("Errore durante l'invio dell'email:", error);
    res.status(500).json({
      error: "Errore nell'invio dell'email: " + (error.message || error)
    });
  }
});

// Helper to perform Gemini API call with backup models on service overloads (503/UNAVAILABLE)
async function generateContentWithFallback(ai: any, contents: any, config: any): Promise<any> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    console.log(`Tentativo di generazione con il modello ${currentModel} (Tentativo ${i + 1}/${modelsToTry.length})...`);
    try {
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: contents,
        config: config
      });
      console.log(`Fatto! Generazione completata usando: ${currentModel}`);
      return response;
    } catch (error: any) {
      lastError = error;
      const errorMsg = error.message || String(error);
      console.warn(`Errore riscontrato con il modello ${currentModel}:`, errorMsg);
      
      // Keep going to fallback unless it's a fatal key error or similar
      if (i < modelsToTry.length - 1) {
        console.log(`Eseguo fallback al prossimo modello tra 500ms...`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  throw lastError;
}

// API route to generate quote via Gemini
app.post("/api/generate-quote", async (req, res) => {
  try {
    const {
      workerSector,
      customerName,
      projectName,
      workDescription,
      dimensions,
      selectedItems,
      additionalNotes,
      siteDifficulty,
      materialsProvidedByCustomer,
      countryCode,
      laborConfig,
      language
    } = req.body;

    const selectedLang = language || "it";
    let langNameFull = "italiana";
    if (selectedLang === "de") langNameFull = "tedesca (German)";
    else if (selectedLang === "fr") langNameFull = "francese (French)";
    else if (selectedLang === "en") langNameFull = "inglese (English)";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Il codice API di Gemini (GEMINI_API_KEY) non è configurato. Configuralo nei Secrets di AI Studio."
      });
    }

    // Lazy initialization of GoogleGenAI custom header as required
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Find the country information
    const targetCountry = countriesList.find(c => c.id === countryCode) || countriesList[0];

    // Find the sector details for context
    const sectorInfo = sectorPriceLists.find(s => s.id === workerSector) || { name: workerSector, certifications: [] };

    // Format dimensions
    const dimsStr = dimensions ? JSON.stringify(dimensions) : "Non specificato";

    // Format selected items for the AI
    let selectedItemsList = "Nessun elemento selezionato.";
    if (selectedItems && selectedItems.length > 0) {
      selectedItemsList = selectedItems.map((it: any) => 
        `- ${it.name}: Prezzo Unitario calcolato dallo specialista: ${it.customPrice} ${targetCountry.currencySymbol}/${it.unit}. Quantità/Volume previsto: ${it.quantity} ${it.unit}. Totale parziale stimato della voce: ${it.customPrice * it.quantity} ${targetCountry.currencySymbol}.`
      ).join("\n");
    }

    // Format labor configuration for explicit computation
    let laborConfigStr = "";
    if (laborConfig) {
      laborConfigStr = `
- **CONFIGURAZIONE MANO D'OPERA E COSTI ASSOCIATI (DA INSERIRE OBBLIGATORIAMENTE)**:
  - Tariffa oraria mano d'opera: ${laborConfig.hourlyRate} ${targetCountry.currencySymbol}/ora
  - Ore di lavoro totali stimate: ${laborConfig.estimatedHours} ore
  - Spese di viaggio, trasferta e logistica: ${laborConfig.travelCosts} ${targetCountry.currencySymbol}
  - Oneri sicurezza e allestimento cantiere: ${laborConfig.setupOverheadCosts} ${targetCountry.currencySymbol}
`;
    }
    const promptText = `
Genera un preventivo edile completo, veritiero e altamente professionale interamente scritto in lingua ${langNameFull}, per un lavoratore edile operante nel settore "${sectorInfo.name}" in ${targetCountry.name}.

Il cantiere presenta le seguenti specifiche:
- **Nazione Target**: ${targetCountry.name} (${targetCountry.flag})
- **Valuta Locale**: ${targetCountry.currency} (${targetCountry.currencySymbol})
- **Contesto Normativo del Paese**: ${targetCountry.regulatoryContext}
- **Nome Committente / Cliente**: ${customerName || "Gentile Cliente"}
- **Titolo del Lavoro / Progetto**: ${projectName || "Intervento di manutenzione"}
- **Descrizione dei lavori da effettuare**: ${workDescription}
- **Dimensioni del cantiere**: ${dimsStr}
- **Elementi selezionati dal listino prezzi di settore**: 
${selectedItemsList}
- **Nota aggiuntiva dello specialista**: ${additionalNotes || "Nessuna"}
- **Difficoltà cantiere**: ${siteDifficulty || "Media"} (Bassa / Media / Alta)
- **Materiali forniti direttamente dal cliente**: ${materialsProvidedByCustomer ? "Sì" : "No, forniti dal professionista di settore"}
${laborConfigStr}

### REQUISITI DELLA RISPOSTA (JSON):
Fornisci il calcolo dettagliato in formato JSON seguendo specificatamente lo schema richiesto. TUTTE LE DESCRIZIONI E I CAMPI TESTUALI DEVONO ESSERE SCRITTI IN LINGUA ${langNameFull} DIZIONARIO ESTESO:
1. **feasibility**: Esamina e documenta attentamente la fattibilità tecnica nel contesto di ${targetCountry.name}. Scrivi in lingua ${langNameFull} ("rating", "analysis" dettagliata, "risks" come lista di criticità del cantiere, "recommendations" operative per superarle seguendo le best practices professionali).
2. **costsBreakdown**: Fornisci una lista di voci di spesa dettagliata scritta in lingua ${langNameFull}.
   - Includi i prezzi calcolati/selezionati in precedenza segnando source = 'listino'. Puoi tradurre o tenere simili le diciture delle lavorazioni in lingua ${langNameFull}.
   - **OBBLIGATORIO - COMPUTO MANO D'OPERA E TRASFERTE**: Se sopra è presente la "CONFIGURAZIONE MANO D'OPERA", devi assolutamente inserire all'interno di costsBreakdown le seguenti tre voci distinte con source = 'listino' tradotte coerentemente in lingua ${langNameFull}:
     a. Lavorazione manodopera specializzata: quantità = ${laborConfig?.estimatedHours || 0}, unità = "ore" (o unità equivalente tradotta), prezzo unitario = ${laborConfig?.hourlyRate || 0}, totale = ${Number(laborConfig?.estimatedHours || 0) * Number(laborConfig?.hourlyRate || 0)}.
     b. Spese trasferta / logistica: quantità = 1, unità = "lotto" (o equivalente tradotta), prezzo unitario = ${laborConfig?.travelCosts || 0}, totale = ${laborConfig?.travelCosts || 0}.
     c. Allestimento cantiere / oneri sicurezza: quantità = 1, unità = "lotto" (o equivalente tradotta), prezzo unitario = ${laborConfig?.setupOverheadCosts || 0}, totale = ${laborConfig?.setupOverheadCosts || 0}.
   - Se ci sono lavorazioni aggiuntive necessarie desunte dalla descrizione del cliente (es. se menziona muffa ed è un imbianchino, aggiungi la sanificazione muffa; se menziona montaggio e smontaggio vecchi infissi, aggiungi la posa; ecc.), stima tali voci extra in modo coerente con il mercato locale del Paese selezionato (${targetCountry.name}) e assegna source = 'stimato'. Per ogni elemento, indica quantità corretta, unità, prezzo unitario e calcola il totale parziale (quantità * prezzo unitario) descrivendo le voci in lingua ${langNameFull}. Tutti i prezzi e i totali sono espressi in ${targetCountry.currencySymbol}.
3. **estimatedTime**: Tempo massimo stimato per svolgere l'intero lavoro scritto in lingua ${langNameFull}.
4. **certifications**: Elenca le certificazioni, le asseverazioni e i requisiti normativi necessari per la conformità di questa tipologia di lavoro in ${targetCountry.name}, facendo esplicito riferimento alle norme locali (es. SIA in Svizzera, DIN in Germania, RE2020/NF/Décennale in Francia, CTE in Spagna, DM 37/08 in Italia) tradotte o commentate in lingua ${langNameFull}.
5. **customLetter**: Una lettera formale, professionale, estremamente cortese, scritta in prima persona da parte dell'artigiano/ditta per il cliente, interamente scritta in lingua ${langNameFull}. Deve spiegare chiaramente lo svolgimento del cantiere, l'attenzione al dettaglio, i materiali proposti e le condizioni generali, invitando il cliente a un contatto per formalizzare l'opera. Scatta i riferimenti alla valuta locale (${targetCountry.currencySymbol}) e menziona la dedizione dello specialista edile nel rispetto delle tempistiche. Fai anche riferimento alle ore di manodopera stimate e all'attenzione alla sicurezza.
6. **totalAmount**: Costo totale complessivo del preventivo risultante dalla somma aritmetica di tutte le voci di costo compilate in costsBreakdown (valuta: ${targetCountry.currencySymbol}). Deve corrispondere esattamente alla somma di tutti i totali parziali.

Inoltre, considera eventuali rischi associati a ${siteDifficulty === "high" ? "un'alta difficoltà di cantiere" : "difficoltà cantiere " + siteDifficulty}.
`;

    const response = await generateContentWithFallback(ai, promptText, {
      systemInstruction: `Sei l'assistente AI di Preventivatore Edile Multilingua ed Europeo, un software gestionale professionale e ad alto livello per artigiani e ditte edili in Europa.
Aiuti i lavoratori edili (imbianchini, serramentisti, piastrellisti, elettricisti, idraulici) ad automatizzare la formulazione dei loro preventivi partendo dalle misurazioni di cantiere, dai listini standard di settore adattati per nazione, e nel pieno rispetto delle normative locali vigenti (come le norme svizzere SIA, DIN in Germania, NF/RGE in Francia o CTE in Spagna).
TUTTI I TESTI DELLA RISPOSTA (analisi, rischi, raccomandazioni, descrizioni voci di costo in costsBreakdown, estimatedTime, certificazioni, e la lettera customLetter) DEVONO ESSERE SCRITTI INTEGRALMENTE CON TERMINOLOGIA TECNICA APPROPRIATA NELLA LINGUA RICHIESTA DAL CLIENTE: ${langNameFull}.
I tuoi calcoli aritmetici delle voci di costo devono essere perfetti (totale = quantità * prezzo unitario) e il totalAmount deve corrispondere esattamente alla somma di tutti i totali parziali.
Rispondi SEMPRE e tassativamente compilando l'intero schema JSON richiesto, senza testo aggiuntivo fuori dal blocco di ritorno.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          feasibility: {
            type: Type.OBJECT,
            properties: {
              rating: { 
                type: Type.STRING, 
                description: "Esito fattibilità, es. 'Fattibile', 'Fattibile con riserve', 'Non raccomandato'" 
              },
              analysis: { 
                type: Type.STRING, 
                description: "Valutazione testuale della fattibilità del lavoro." 
              },
              risks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Potenziali rischi legati al cantiere."
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Raccomandazioni sul lavoro e passaggi per la sicurezza o la corretta posa."
              }
            },
            required: ["rating", "analysis", "risks", "recommendations"]
          },
          costsBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING, description: "Nome o descrizione dettagliata della lavorazione" },
                quantity: { type: Type.NUMBER, description: "Quantità numerica calcolata" },
                unit: { type: Type.STRING, description: "Unità di misura, es. mq, cad, ml, lotto" },
                unitPrice: { type: Type.NUMBER, description: "Prezzo unitario in valuta locale" },
                total: { type: Type.NUMBER, description: "Costo complessivo della lavorazione (quantità * unitPrice)" },
                source: { type: Type.STRING, description: "Origine del prezzo: 'listino' o 'stimato'" }
              },
              required: ["item", "quantity", "unit", "unitPrice", "total", "source"]
            }
          },
          estimatedTime: { 
            type: Type.STRING, 
            description: "Durata complessiva dell'intervento" 
          },
          certifications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Nome della certificazione, es. Norme SIA 118, o Dichiarazione di Conformità" },
                description: { type: Type.STRING, description: "Spiegazione sull'obbligo o utilità nel Paese" },
                lawReference: { type: Type.STRING, description: "Legge o norma di riferimento specifica dello Stato selezionato" },
                mandatory: { type: Type.BOOLEAN, description: "Vero se legalmente obbligatoria in questo Paese per emettere questo lavoro" }
              },
              required: ["title", "description", "lawReference", "mandatory"]
            }
          },
          customLetter: { 
            type: Type.STRING, 
            description: "Lettera di accompagnamento altamente professionale e dettagliata per convincere il cliente." 
          },
          totalAmount: { 
            type: Type.NUMBER, 
            description: "Somma di tutti i prezzi nel preventivo in valuta locale" 
          }
        },
        required: ["feasibility", "costsBreakdown", "estimatedTime", "certifications", "customLetter", "totalAmount"]
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("L'API di Gemini ha restituito una risposta vuota.");
    }

    const parsedQuoteData = JSON.parse(resultText.trim());
    res.json(parsedQuoteData);

  } catch (error: any) {
    console.error("Errore nella generazione del preventivo:", error);
    res.status(500).json({
      error: "Errore durante la generazione con intelligenza artificiale: " + (error.message || error)
    });
  }
});

// Serve assets in production and let Vite handle dev mode
// Vite middleware for development
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
