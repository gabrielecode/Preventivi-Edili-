export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  stepIndicator: string;
  backBtn: string;
  nextBtn: string;
  generateBtn: string;
  generatingBtn: string;
  newEstimateBtn: string;
  downloadPdfBtn: string;
  copySummaryBtn: string;
  copiedSummarySuccess: string;
  shareBtn: string;

  // Step 1
  step1Title: string;
  step1Desc: string;
  countrySelectLabel: string;
  languageSelectLabel: string;
  langIt: string;
  langDe: string;
  langFr: string;
  langEn: string;

  // Step 2
  step2Title: string;
  step2Desc: string;
  sectorSelectLabel: string;
  availableWorksLabel: string;
  selectedCountLabel: string;
  noItemsFound: string;
  quantityLabel: string;

  // Step 3
  step3Title: string;
  step3Desc: string;
  measureTipTitle: string;
  measureTipDesc: string;
  areaMqLabel: string;
  areaMqPlaceholder: string;
  lengthMlLabel: string;
  lengthMlPlaceholder: string;
  quantityCadLabel: string;
  quantityCadPlaceholder: string;
  workDescriptionLabel: string;
  workDescriptionPlaceholder: string;

  // Step 4
  step4Title: string;
  step4Desc: string;
  modeSelectLabel: string;
  modeCompareLabel: string;
  modeCompareDesc: string;
  modeProLabel: string;
  modeProDesc: string;
  modeDiyLabel: string;
  modeDiyDesc: string;
  qualitySelectLabel: string;
  qualityBaseLabel: string;
  qualityBaseDesc: string;
  qualityStandardLabel: string;
  qualityStandardDesc: string;
  qualityPremiumLabel: string;
  qualityPremiumDesc: string;
  skillSelectLabel: string;
  skillBeginnerLabel: string;
  skillBeginnerDesc: string;
  skillHandyLabel: string;
  skillHandyDesc: string;
  skillExpertLabel: string;
  skillExpertDesc: string;
  difficultySelectLabel: string;
  difficultyLowLabel: string;
  difficultyLowDesc: string;
  difficultyMediumLabel: string;
  difficultyMediumDesc: string;
  difficultyHighLabel: string;
  difficultyHighDesc: string;

  // Step 5 (Results)
  resultsTitle: string;
  resultsSubtitle: string;
  diyCardTitle: string;
  diyCardDesc: string;
  diySavingsLabel: string;
  proCardTitle: string;
  proCardKey: string;
  proCardDesc: string;
  proCardFeature: string;
  feasibilityTitle: string;
  shoppingListTitle: string;
  shoppingListDesc: string;
  itemHeader: string;
  netQtyHeader: string;
  wasteQtyHeader: string;
  estCostHeader: string;
  toolsTitle: string;
  toolsDesc: string;
  toolsTotal: string;
  noToolsText: string;
  rentBetter: string;
  buyBetter: string;
  alreadyOwned: string;
  proMandatoryTitle: string;
  proMandatoryDesc: string;
  stepsTitle: string;
  stepsDesc: string;
  diyTimeTotal: string;
  safetyTitle: string;
  safetyDesc: string;
  mainRisks: string;
  safetyRecs: string;
  permitsTitle: string;
  permitsDesc: string;
  disclaimerTitle: string;
  disclaimerText: string;
  photoSectionTitle: string;
  photoSectionDesc: string;
  photoPrivacyNotice: string;
  photoAnalyzeBtn: string;
  photoAnalyzingBtn: string;
  photoMeasureWarning: string;
  photoErrorMax10M: string;
  photoErrorInvalid: string;
  photoErrorMaxCount: string;
  detectedIssuesTitle: string;
  visibleStateTitle: string;
  confidenceLabel: string;
  recommendationsTitle: string;
  photoAnalysisSuccess: string;

  // Lead request modal
  requestProBtn: string;
  leadModalTitle: string;
  leadModalDesc: string;
  leadNameLabel: string;
  leadEmailLabel: string;
  leadPhoneLabel: string;
  leadLocationLabel: string;
  leadNotesLabel: string;
  leadPrivacyLabel: string;
  leadPrivacyLink: string;
  leadSubmitBtn: string;
  leadSubmitting: string;
  leadSuccessTitle: string;
  leadSuccessText: string;
  leadCloseBtn: string;
  privacyModalTitle: string;
  privacyModalText: string;

  // Task 11c: Attese lunghe, annullamento, degraded e avvisi
  cancelBtn: string;
  cancellingBtn: string;
  requestCancelled: string;
  requestTimeout: string;
  loadingTitle: string;
  loadingStepAnalyzing: string;
  loadingStepCalculating: string;
  loadingStepAlternative: string;
  loadingStepFinalizing: string;
  elapsedTimeLabel: string;
  dataPreservedNotice: string;
  degradedAlertMessage: string;
  retryBtn: string;
  photoAnalysisUnavailableTitle: string;
  photoAnalysisUnavailableNotice: string;
  photoAnalyzingWait: string;
  photoAnalyzingAlternative: string;
  continueWithManualMeasures: string;

  // Navigation & Layout
  navCalculateBtn: string;
  navHome: string;
  navPrivacy: string;

  // Hero & Trust Points
  heroTitle: string;
  heroSubtitle: string;
  heroCtaBtn: string;
  heroHowItWorksLink: string;
  trustPoint1Title: string;
  trustPoint1Desc: string;
  trustPoint2Title: string;
  trustPoint2Desc: string;
  trustPoint3Title: string;
  trustPoint3Desc: string;

  // How It Works Section
  howItWorksTitle: string;
  howItWorksStep1Title: string;
  howItWorksStep1Desc: string;
  howItWorksStep2Title: string;
  howItWorksStep2Desc: string;
  howItWorksStep3Title: string;
  howItWorksStep3Desc: string;

  // Privacy Page
  privacyPageTitle: string;
  privacyPageSubtitle: string;
  privacySection1Title: string;
  privacySection1Text: string;
  privacySection2Title: string;
  privacySection2Text: string;
  privacySection3Title: string;
  privacySection3Text: string;
  privacySection4Title: string;
  privacySection4Text: string;
  privacySection5Title: string;
  privacySection5Text: string;
  privacyBackToHome: string;
  privacyStartEstimate: string;

  // 404 Page
  notFoundTitle: string;
  notFoundDesc: string;
  notFoundBtn: string;
}

export const translations: Record<string, TranslationDict> = {
  it: {
    appName: "Preventivo Casa & Fai da Te",
    appSubtitle: "Stima costi, fattibilità e confronto Fai da Te vs Professionista con l'Intelligenza Artificiale",
    stepIndicator: "Passo {currentStep} di 4",
    backBtn: "Indietro",
    nextBtn: "Avanti",
    generateBtn: "Calcola Preventivo con IA",
    generatingBtn: "Elaborazione IA in corso...",
    newEstimateBtn: "Nuova Stima",
    downloadPdfBtn: "Scarica PDF",
    copySummaryBtn: "Copia riepilogo",
    copiedSummarySuccess: "Riepilogo copiato!",
    shareBtn: "Condividi",

    step1Title: "Dove si trova il tuo cantiere e quale lingua preferisci?",
    step1Desc: "Seleziona il paese per calcolare le imposte IVA locali e i prezzi di riferimento corretti.",
    countrySelectLabel: "Paese di riferimento",
    languageSelectLabel: "Lingua dell'applicazione",
    langIt: "Italiano",
    langDe: "Deutsch",
    langFr: "Français",
    langEn: "English",

    step2Title: "Che tipo di lavoro vuoi realizzare?",
    step2Desc: "Scegli il settore d'intervento e seleziona le lavorazioni specifiche desiderate.",
    sectorSelectLabel: "Settore d'intervento",
    availableWorksLabel: "Voci di lavorazione disponibili",
    selectedCountLabel: "selezionate",
    noItemsFound: "Nessuna lavorazione trovata per questa categoria.",
    quantityLabel: "Q.tà",

    step3Title: "Misure e descrizione del lavoro",
    step3Desc: "Inserisci le dimensioni approssimative del cantiere e descrivi cosa desideri realizzare.",
    measureTipTitle: "Suggerimento utile per le misure:",
    measureTipDesc: "Misura larghezza × altezza delle pareti per calcolare i metri quadrati (mq). Per elementi lineari (battiscopa, tubi) misura lo sviluppo in metri lineari (ml). Sfrido: materiale in più che serve per tagli e scarti.",
    areaMqLabel: "Superficie (mq)",
    areaMqPlaceholder: "Es. 45",
    lengthMlLabel: "Sviluppo lineare (ml)",
    lengthMlPlaceholder: "Es. 12",
    quantityCadLabel: "Numero elementi (cad)",
    quantityCadPlaceholder: "Es. 4",
    workDescriptionLabel: "Descrizione libera dei lavori *",
    workDescriptionPlaceholder: "Descrivi dettagliatamente cosa deve essere fatto (es. imbiancare soggiorno con presenza di lieve umidità angolare, stuccatura crepe e rifinitura con due mani di idropittura lavabile)...",

    step4Title: "Come vuoi affrontare il lavoro?",
    step4Desc: "Definisci le modalità di esecuzione, la qualità dei materiali e le tue competenze.",
    modeSelectLabel: "Modalità di stima",
    modeCompareLabel: "Confronta entrambi",
    modeCompareDesc: "Valuta Fai da Te vs Professionista",
    modeProLabel: "Con professionista",
    modeProDesc: "Preventivo affidato a ditta",
    modeDiyLabel: "Solo Fai da Te",
    modeDiyDesc: "Calcolo materiali, attrezzi e ore",
    qualitySelectLabel: "Qualità dei materiali",
    qualityBaseLabel: "Base",
    qualityBaseDesc: "Economica / Standard",
    qualityStandardLabel: "Standard",
    qualityStandardDesc: "Ottimo rapporto qualità",
    qualityPremiumLabel: "Premium",
    qualityPremiumDesc: "Alta gamma e design",
    skillSelectLabel: "Tua esperienza nel fai da te",
    skillBeginnerLabel: "Principiante",
    skillBeginnerDesc: "Primo lavoro manuale",
    skillHandyLabel: "So arrangiarmi",
    skillHandyDesc: "Buona manualità hobbista",
    skillExpertLabel: "Esperto",
    skillExpertDesc: "Competenze avanzate",
    difficultySelectLabel: "Difficoltà del cantiere",
    difficultyLowLabel: "Bassa",
    difficultyLowDesc: "Locale sgombro, piano terra",
    difficultyMediumLabel: "Media",
    difficultyMediumDesc: "Accesso standard",
    difficultyHighLabel: "Alta",
    difficultyHighDesc: "Altezze, spazi ristretti",

    resultsTitle: "Risultato della Stima & Analisi",
    resultsSubtitle: "Analisi personalizzata per {country}",
    diyCardTitle: "Fai da Te",
    diyCardDesc: "Costo stimato materiali e attrezzi (IVA incl.)",
    diySavingsLabel: "Risparmio stimato rispetto al professionista: ~{amount} {currency}",
    proCardTitle: "Con Professionista",
    proCardKey: "Chiavi in mano",
    proCardDesc: "Intervallo di costo ditta (IVA incl.)",
    proCardFeature: "Include manodopera specializzata, garanzia e conformità normativa.",
    feasibilityTitle: "Fattibilità Fai da Te: {rating}",
    shoppingListTitle: "Lista della Spesa & Materiali",
    shoppingListDesc: "Quantità calcolate con percentuale di sfrido inclusa per evitare carenze in cantiere. (Sfrido: materiale in più che serve per tagli e scarti)",
    itemHeader: "Materiale / Voce",
    netQtyHeader: "Q.tà Netta",
    wasteQtyHeader: "Q.tà con Sfrido",
    estCostHeader: "Costo Stimato",
    toolsTitle: "Attrezzatura & Utensili",
    toolsDesc: "Confronto convenienza acquisto vs noleggio. Spunta gli attrezzi che possiedi già.",
    toolsTotal: "Totale attrezzi",
    noToolsText: "Nessun attrezzo speciale richiesto per queste lavorazioni.",
    rentBetter: "Conviene noleggiare",
    buyBetter: "Conviene acquistare",
    alreadyOwned: "Ce l'ho già (0 €)",
    proMandatoryTitle: "Lavori Obbligatoriamente da Affidare a Professionista",
    proMandatoryDesc: "Per legge o per normative tecniche di sicurezza, alcune lavorazioni non possono essere eseguite in fai da te.",
    stepsTitle: "Passi Operativi & Tempistiche",
    stepsDesc: "Cronoprogramma stimato per l'esecuzione.",
    diyTimeTotal: "Tempo stimato Fai da Te:",
    safetyTitle: "Rischi, Sicurezza & DPI",
    safetyDesc: "Dispositivi di protezione individuale e precauzioni.",
    mainRisks: "Rischi principali",
    safetyRecs: "Raccomandazioni di sicurezza",
    permitsTitle: "Permessi, Autorizzazioni e Normative ({country})",
    permitsDesc: "Adempimenti burocratici richiesti dalle normative locali vigenti.",
    disclaimerTitle: "Avvertenza Importante e Limitazione di Responsabilità",
    disclaimerText: "Stima indicativa non vincolante. I prezzi dei materiali e della manodopera possono variare in base alla zona geografica, alla stagionalità e alla complessità specifica del cantiere. Si consiglia vivamente di richiedere sempre almeno 2-3 preventivi scritti a professionisti abilitati prima di avviare qualsiasi intervento edile o impiantistico.",
    photoSectionTitle: "Foto del locale (Opzionale)",
    photoSectionDesc: "Carica fino a 3 foto per far analizzare lo stato, rilevare criticità e stimare automaticamente le misure.",
    photoPrivacyNotice: "Le foto vengono elaborate in memoria solo per l'analisi e non vengono salvate sul server.",
    photoAnalyzeBtn: "Analizza foto con IA",
    photoAnalyzingBtn: "Analisi foto in corso...",
    photoMeasureWarning: "Attenzione: le misure sono stimate dalle foto, verificale sempre con un metro.",
    photoErrorMax10M: "Il file supera la dimensione massima di 10MB all'origine.",
    photoErrorInvalid: "Il file selezionato non è un'immagine valida.",
    photoErrorMaxCount: "Puoi caricare al massimo 3 foto.",
    detectedIssuesTitle: "Criticità e problemi rilevati",
    visibleStateTitle: "Stato visibile",
    confidenceLabel: "Confidenza stima:",
    recommendationsTitle: "Consigli e verifiche",
    photoAnalysisSuccess: "Analisi completata! Misure e osservazioni aggiornate.",
    requestProBtn: "Richiedi preventivi a professionisti",
    leadModalTitle: "Richiesta Preventivo a Professionisti",
    leadModalDesc: "Compila il modulo per ricevere preventivi senza impegno da parte di imprese e professionisti qualificati della tua zona.",
    leadNameLabel: "Nome e Cognome *",
    leadEmailLabel: "Indirizzo Email *",
    leadPhoneLabel: "Telefono (facoltativo)",
    leadLocationLabel: "CAP e Città *",
    leadNotesLabel: "Note o richieste particolari (opzionale)",
    leadPrivacyLabel: "Ho letto e accetto l'informativa sulla privacy e il trattamento dei dati personali ai fini della richiesta di preventivo *",
    leadPrivacyLink: "Leggi l'informativa sulla privacy",
    leadSubmitBtn: "Invia richiesta ai professionisti",
    leadSubmitting: "Invio in corso...",
    leadSuccessTitle: "Richiesta Inviata con Successo!",
    leadSuccessText: "La tua richiesta è stata registrata con successo e inoltrata al sistema. Nessun invio automatico di email è stato effettuato. Cosa succede adesso? I professionisti partner della tua zona verificheranno i dettagli del tuo progetto e ti contatteranno direttamente tramite email o telefono entro 24-48 ore lavorative per effettuare un sopralluogo o fornirti un preventivo dettagliato.",
    leadCloseBtn: "Chiudi",
    privacyModalTitle: "Informativa sulla Privacy",
    privacyModalText: "I dati inseriti in questo modulo vengono utilizzati esclusivamente per consentire l'inoltro della richiesta di preventivo ai professionisti e alle imprese edili partner operanti nella tua zona. Il trattamento avviene nel rispetto del Regolamento UE 2016/679 (GDPR). Nessun invio di email automatiche viene effettuato dal sistema: la richiesta viene conservata in un archivio sicuro per la gestione commerciale e sarai contattato direttamente dai professionisti interessati al tuo progetto.",

    // Task 11c
    cancelBtn: "Annulla",
    cancellingBtn: "Annullamento in corso...",
    requestCancelled: "Richiesta annullata. Tutti i dati del modulo sono stati conservati.",
    requestTimeout: "Tempo massimo di attesa superato (270s). I server sono attualmente molto occupati. Puoi riprovare o modificare la configurazione.",
    loadingTitle: "Elaborazione Preventivo con IA",
    loadingStepAnalyzing: "Sto analizzando il lavoro...",
    loadingStepCalculating: "Calcolo delle lavorazioni e verifica listini territoriali...",
    loadingStepAlternative: "Il motore AI è lento, provo un'alternativa...",
    loadingStepFinalizing: "Sto completando la stima...",
    elapsedTimeLabel: "Tempo trascorso:",
    dataPreservedNotice: "Tutti i dati e le scelte rimangono salvati se decidi di annullare.",
    degradedAlertMessage: "Stima economica completa; i consigli personalizzati dell'AI non sono disponibili in questo momento. Puoi riprovare più tardi.",
    retryBtn: "Riprova",
    photoAnalysisUnavailableTitle: "Analisi foto non disponibile",
    photoAnalysisUnavailableNotice: "Analisi foto non disponibile in questo momento. Puoi proseguire inserendo le misure manualmente nei campi sottostanti.",
    photoAnalyzingWait: "Sto analizzando le foto del locale...",
    photoAnalyzingAlternative: "Il motore visivo è lento, provo un'alternativa...",
    continueWithManualMeasures: "Inserisci le misure a mano per proseguire",

    // Navigation & Layout
    navCalculateBtn: "Calcola il costo",
    navHome: "Home",
    navPrivacy: "Privacy",

    // Hero & Trust Points
    heroTitle: "Stima il costo dei lavori in casa, anche fai da te",
    heroSubtitle: "Confronta all'istante materiali, manodopera e risparmio reale con l'Intelligenza Artificiale.",
    heroCtaBtn: "Calcola il costo",
    heroHowItWorksLink: "Come funziona",
    trustPoint1Title: "Confronto Fai da Te o Professionista",
    trustPoint1Desc: "Valuta subito tempi, attrezzi necessari e risparmio effettivo rispetto alla ditta.",
    trustPoint2Title: "Intervalli con IVA inclusa",
    trustPoint2Desc: "Prezzi trasparenti calibrati sulle aliquote IVA territoriali e listini locali.",
    trustPoint3Title: "Nessuna registrazione",
    trustPoint3Desc: "Calcola subito la stima dettagliata liberamente e senza dover creare un account.",

    // How It Works Section
    howItWorksTitle: "Come funziona in 3 semplici passi",
    howItWorksStep1Title: "1. Scegli le lavorazioni",
    howItWorksStep1Desc: "Seleziona il settore d'intervento, il paese e le lavorazioni specifiche che vuoi realizzare.",
    howItWorksStep2Title: "2. Inserisci misure o foto",
    howItWorksStep2Desc: "Inserisci le dimensioni oppure carica le foto del locale per la stima automatica.",
    howItWorksStep3Title: "3. Ottieni la stima con IA",
    howItWorksStep3Desc: "Ricevi distinta materiali con sfrido, costi chiavi in mano, attrezzi e consigli tecnici.",

    // Privacy Page
    privacyPageTitle: "Informativa sulla Privacy & Protezione Dati",
    privacyPageSubtitle: "Trasparenza, riservatezza e conformità al Regolamento UE 2016/679 (GDPR)",
    privacySection1Title: "1. Finalità del servizio",
    privacySection1Text: "Preventivo Casa & Fai da Te è uno strumento digitale per la stima orientativa dei costi di lavori domestici e ristrutturazioni. Tutti i calcoli economici di base sono effettuati lato server in modo trasparente e neutrale.",
    privacySection2Title: "2. Utilizzo anonimo e senza registrazione",
    privacySection2Text: "L'accesso e l'utilizzo del preventivatore sono completamente gratuiti e non richiedono alcuna registrazione né la creazione di un profilo o fornitura di credenziali personali.",
    privacySection3Title: "3. Trattamento delle immagini del locale",
    privacySection3Text: "Se scegli di caricare immagini delle stanze per agevolare l'analisi e la stima dimensionale, i file vengono elaborati temporaneamente in memoria volatile (RAM) solo per la durata dell'analisi e non vengono mai salvati su disco o server.",
    privacySection4Title: "4. Modulo facoltativo per professionisti",
    privacySection4Text: "La richiesta di contatto con imprese o professionisti abilitati della tua zona è del tutto facoltativa. Qualora decida di inviarla, i recapiti inseriti saranno conservati in sicurezza esclusivamente per consentire il contatto diretto tra te e i professionisti partner.",
    privacySection5Title: "5. Diritti dell'interessato",
    privacySection5Text: "In qualunque momento puoi esercitare i tuoi diritti previsti dagli articoli 15-22 del GDPR (accesso, rettifica, cancellazione, limitazione del trattamento) contattando il supporto del servizio.",
    privacyBackToHome: "Torna alla Home",
    privacyStartEstimate: "Inizia il preventivo",

    // 404 Page
    notFoundTitle: "Pagina non trovata (404)",
    notFoundDesc: "La pagina che stai cercando non esiste o è stata spostata.",
    notFoundBtn: "Torna alla Home"
  },
  de: {
    appName: "Haus- & Heimwerker-Rechner",
    appSubtitle: "Kostenschätzung, Machbarkeit und DIY-Vergleich vs. Profi mit Künstlicher Intelligenz",
    stepIndicator: "Schritt {currentStep} von 4",
    backBtn: "Zurück",
    nextBtn: "Weiter",
    generateBtn: "Angebot mit KI berechnen",
    generatingBtn: "KI-Verarbeitung läuft...",
    newEstimateBtn: "Neue Schätzung",
    downloadPdfBtn: "PDF herunterladen",
    copySummaryBtn: "Zusammenfassung kopieren",
    copiedSummarySuccess: "Zusammenfassung kopiert!",
    shareBtn: "Teilen",

    step1Title: "Wo befindet sich Ihre Baustelle und welche Sprache bevorzugen Sie?",
    step1Desc: "Wählen Sie das Land aus, um lokale Mehrwertsteuern und korrekte Referenzpreise zu berechnen.",
    countrySelectLabel: "Referenzland",
    languageSelectLabel: "Anwendungssprache",
    langIt: "Italienisch",
    langDe: "Deutsch",
    langFr: "Französisch",
    langEn: "Englisch",

    step2Title: "Welche Art von Arbeit möchten Sie ausführen?",
    step2Desc: "Wählen Sie den Gewerbebereich und die gewünschten spezifischen Arbeitsschritte aus.",
    sectorSelectLabel: "Gewerbebereich",
    availableWorksLabel: "Verfügbare Arbeitspositionen",
    selectedCountLabel: "ausgewählt",
    noItemsFound: "Keine Arbeiten für diese Kategorie gefunden.",
    quantityLabel: "Menge",

    step3Title: "Maße und Arbeitsbeschreibung",
    step3Desc: "Geben Sie die ungefähren Maße der Baustelle ein und beschreiben Sie Ihr Vorhaben.",
    measureTipTitle: "Nützlicher Tipp für Messungen:",
    measureTipDesc: "Messen Sie Breite × Höhe der Wände, um Quadratmeter (qm) zu berechnen. Für lineare Elemente (Fußleisten, Rohre) messen Sie in Laufmetern (lfm). Verschnitt: zusätzliches Material für Schnitte und Reste.",
    areaMqLabel: "Fläche (qm)",
    areaMqPlaceholder: "z.B. 45",
    lengthMlLabel: "Laufmeter (lfm)",
    lengthMlPlaceholder: "z.B. 12",
    quantityCadLabel: "Anzahl Elemente (Stk)",
    quantityCadPlaceholder: "z.B. 4",
    workDescriptionLabel: "Freitextbeschreibung der Arbeiten *",
    workDescriptionPlaceholder: "Beschreiben Sie detailliert, was gemacht werden muss (z.B. Wohnzimmer streichen bei leichter Eckenfeuchte, Risse verspachteln und mit zwei Lagen abwaschbarer Wandfarbe streichen)...",

    step4Title: "Wie möchten Sie vorgehen?",
    step4Desc: "Definieren Sie die Ausführungsmethode, Materialqualität und Ihre handwerklichen Fähigkeiten.",
    modeSelectLabel: "Schätzungsmodus",
    modeCompareLabel: "Beide vergleichen",
    modeCompareDesc: "DIY vs. Profi bewerten",
    modeProLabel: "Mit Profi",
    modeProDesc: "Auftrag an Fachfirma vergeben",
    modeDiyLabel: "Nur DIY (Heimwerken)",
    modeDiyDesc: "Material, Werkzeug und Stunden berechnen",
    qualitySelectLabel: "Materialqualität",
    qualityBaseLabel: "Basis",
    qualityBaseDesc: "Günstig / Standard",
    qualityStandardLabel: "Standard",
    qualityStandardDesc: "Gutes Preis-Leistungs-Verhältnis",
    qualityPremiumLabel: "Premium",
    qualityPremiumDesc: "High-End und Design",
    skillSelectLabel: "Ihre Heimwerker-Erfahrung",
    skillBeginnerLabel: "Anfänger",
    skillBeginnerDesc: "Erste handwerkliche Arbeit",
    skillHandyLabel: "Geschickt",
    skillHandyDesc: "Gutes handwerkliches Geschick",
    skillExpertLabel: "Experte",
    skillExpertDesc: "Fortgeschrittene Kenntnisse",
    difficultySelectLabel: "Baustellenschwierigkeit",
    difficultyLowLabel: "Niedrig",
    difficultyLowDesc: "Freier Raum, Erdgeschoss",
    difficultyMediumLabel: "Mittel",
    difficultyMediumDesc: "Standardzugang",
    difficultyHighLabel: "Hoch",
    difficultyHighDesc: "Große Höhe, enge Räume",

    resultsTitle: "Schätzungsergebnis & Analyse",
    resultsSubtitle: "Maßgeschneiderte Analyse für {country}",
    diyCardTitle: "Heimwerken (DIY)",
    diyCardDesc: "Geschätzte Kosten für Material & Werkzeug (inkl. MwSt.)",
    diySavingsLabel: "Geschätzte Ersparnis im Vergleich zum Profi: ~{amount} {currency}",
    proCardTitle: "Mit Fachfirma (Profi)",
    proCardKey: "Schlüsselfertig",
    proCardDesc: "Unternehmenskosten (inkl. MwSt.)",
    proCardFeature: "Inklusive Facharbeit, Gewährleistung und Normkonformität.",
    feasibilityTitle: "DIY-Machbarkeit: {rating}",
    shoppingListTitle: "Einkaufsliste & Materialien",
    shoppingListDesc: "Mengen berechnet inkl. Verschnittprozentsatz zur Vermeidung von Materialengpässen. (Verschnitt: zusätzliches Material für Schnitte und Reste)",
    itemHeader: "Material / Position",
    netQtyHeader: "Nettomenge",
    wasteQtyHeader: "Menge mit Verschnitt",
    estCostHeader: "Geschätzte Kosten",
    toolsTitle: "Werkzeuge & Geräte",
    toolsDesc: "Vergleich Kaufen vs. Mieten. Haken Sie Werkzeuge an, die Sie bereits besitzen.",
    toolsTotal: "Werkzeuge gesamt",
    noToolsText: "Keine Spezialwerkzeuge für diese Arbeiten erforderlich.",
    rentBetter: "Mieten lohnt sich",
    buyBetter: "Kaufen lohnt sich",
    alreadyOwned: "Bereits vorhanden (0 €)",
    proMandatoryTitle: "Zwingend an Profi abzugebende Arbeiten",
    proMandatoryDesc: "Aus rechtlichen oder sicherheitstechnischen Gründen dürfen bestimmte Arbeiten nicht in Eigenregie durchgeführt werden.",
    stepsTitle: "Arbeitsschritte & Zeitplan",
    stepsDesc: "Geschätzter Zeitplan für die Ausführung.",
    diyTimeTotal: "Geschätzte DIY-Zeit:",
    safetyTitle: "Risiken, Sicherheit & PSA",
    safetyDesc: "Persönliche Schutzausrüstung und Vorsichtsmaßnahmen.",
    mainRisks: "Hauptrisiken",
    safetyRecs: "Sicherheitsempfehlungen",
    permitsTitle: "Genehmigungen, Zulassungen und Vorschriften ({country})",
    permitsDesc: "Behördliche Auflagen nach geltendem Ortsrecht.",
    disclaimerTitle: "Wichtiger Hinweis & Haftungsausschluss",
    disclaimerText: "Unverbindliche indikative Schätzung. Material- und Lohnkosten können je nach geografischer Lage, Saisonalität und Projektspezifik auftreten. Es wird dringend empfohlen, vor Beginn von Bau- oder Installationsarbeiten stets 2-3 schriftliche Angebote von zugelassenen Fachleuten einzuholen.",
    photoSectionTitle: "Raumfotos (Optional)",
    photoSectionDesc: "Laden Sie bis zu 3 Fotos hoch, um den Zustand analysieren, Probleme erkennen und Maße schätzen zu lassen.",
    photoPrivacyNotice: "Fotos werden nur im Arbeitsspeicher für die Analyse verarbeitet und nicht auf dem Server gespeichert.",
    photoAnalyzeBtn: "Fotos mit KI analysieren",
    photoAnalyzingBtn: "Fotos werden analysiert...",
    photoMeasureWarning: "Achtung: Maße sind aus Fotos geschätzt, bitte immer mit einem Maßband überprüfen.",
    photoErrorMax10M: "Die Datei überschreitet die maximale Größe von 10 MB.",
    photoErrorInvalid: "Die ausgewählte Datei ist kein gültiges Bild.",
    photoErrorMaxCount: "Sie können maximal 3 Fotos hochladen.",
    detectedIssuesTitle: "Erkannte Probleme",
    visibleStateTitle: "Sichtbarer Zustand",
    confidenceLabel: "Konfidenz der Schätzung:",
    recommendationsTitle: "Empfehlungen & Überprüfungen",
    photoAnalysisSuccess: "Analyse abgeschlossen! Maße und Beobachtungen aktualisiert.",
    requestProBtn: "Angebote von Profis anfordern",
    leadModalTitle: "Angebotsanfrage bei Fachleuten",
    leadModalDesc: "Füllen Sie das Formular aus, um unverbindliche Angebote von qualifizierten lokalen Handwerkern und Firmen zu erhalten.",
    leadNameLabel: "Vor- und Nachname *",
    leadEmailLabel: "E-Mail-Adresse *",
    leadPhoneLabel: "Telefon (optional)",
    leadLocationLabel: "PLZ und Stadt *",
    leadNotesLabel: "Notizen oder besondere Wünsche (optional)",
    leadPrivacyLabel: "Ich habe die Datenschutzerklärung und die Verarbeitung personenbezogener Daten für die Angebotsanfrage gelesen und akzeptiere sie *",
    leadPrivacyLink: "Datenschutzerklärung lesen",
    leadSubmitBtn: "Anfrage an Profis senden",
    leadSubmitting: "Wird gesendet...",
    leadSuccessTitle: "Anfrage erfolgreich gesendet!",
    leadSuccessText: "Ihre Anfrage wurde erfolgreich registriert. Es wurden keine automatischen E-Mails versendet. Partner-Fachleute in Ihrer Nähe prüfen Ihre Projektdetails und kontaktieren Sie innerhalb von 24-48 Werbestunden direkt per E-Mail oder Telefon, um eine Besichtigung oder ein detailliertes Angebot abzustimmen.",
    leadCloseBtn: "Schließen",
    privacyModalTitle: "Datenschutz",
    privacyModalText: "Die in dieses Formular eingegebenen Daten werden ausschließlich verwendet, um die Angebotsanfrage an Partnerunternehmen und Bau-Fachleute in Ihrer Region weiterzuleiten. Die Verarbeitung erfolgt gemäß EU-Verordnung 2016/679 (DSGVO). Es werden keine automatischen E-Mails vom System versendet: Die Anfrage wird in einem sicheren Archiv gespeichert und Sie werden direkt von den interessierten Fachleuten kontaktiert.",

    // Task 11c
    cancelBtn: "Abbrechen",
    cancellingBtn: "Wird abgebrochen...",
    requestCancelled: "Anfrage abgebrochen. Alle Formulardaten wurden beibehalten.",
    requestTimeout: "Maximale Wartezeit überschritten (270s). Die Server sind derzeit stark ausgelastet. Sie können es erneut versuchen oder die Einstellungen anpassen.",
    loadingTitle: "KI-Angebot wird berechnet",
    loadingStepAnalyzing: "Ich analysiere die Arbeiten...",
    loadingStepCalculating: "Berechnung der Positionen und Prüfung der regionalen Preislisten...",
    loadingStepAlternative: "Der KI-Motor reagiert langsam, ich versuche eine Alternative...",
    loadingStepFinalizing: "Ich schließe die Schätzung ab...",
    elapsedTimeLabel: "Verstrichene Zeit:",
    dataPreservedNotice: "Alle Daten und Einstellungen bleiben gespeichert, falls Sie abbrechen.",
    degradedAlertMessage: "Wirtschaftliche Schätzung abgeschlossen; die personalisierten KI-Empfehlungen sind derzeit nicht verfügbar. Sie können es später erneut versuchen.",
    retryBtn: "Erneut versuchen",
    photoAnalysisUnavailableTitle: "Fotoanalyse nicht verfügbar",
    photoAnalysisUnavailableNotice: "Fotoanalyse derzeit nicht verfügbar. Sie können fortfahren, indem Sie die Maße manuell in die folgenden Felder eingeben.",
    photoAnalyzingWait: "Raumfotos werden analysiert...",
    photoAnalyzingAlternative: "Bildverarbeitung verzögert, alternative Route wird versucht...",
    continueWithManualMeasures: "Maße manuell eingeben, um fortzufahren",

    // Navigation & Layout
    navCalculateBtn: "Kosten berechnen",
    navHome: "Startseite",
    navPrivacy: "Datenschutz",

    // Hero & Trust Points
    heroTitle: "Kosten für Hausarbeiten schätzen, auch zum Selbermachen",
    heroSubtitle: "Vergleichen Sie sofort Materialien, Handwerkerkosten und echte Ersparnisse mit KI.",
    heroCtaBtn: "Kosten berechnen",
    heroHowItWorksLink: "Wie es funktioniert",
    trustPoint1Title: "Vergleich Heimwerken vs. Profi",
    trustPoint1Desc: "Bewerten Sie Zeitaufwand, nötige Werkzeuge und reale Ersparnisse im Vergleich zum Fachbetrieb.",
    trustPoint2Title: "Preisspannen inklusive MwSt.",
    trustPoint2Desc: "Transparente Preise abgestimmt auf regionale Steuersätze und örtliche Richtwerte.",
    trustPoint3Title: "Keine Registrierung erforderlich",
    trustPoint3Desc: "Erhalten Sie Ihre detaillierte Kostenschätzung sofort ohne Anmeldung oder Kundenkonto.",

    // How It Works Section
    howItWorksTitle: "So funktioniert es in 3 einfachen Schritten",
    howItWorksStep1Title: "1. Arbeiten auswählen",
    howItWorksStep1Desc: "Wählen Sie das Gewerk, Ihr Land und die spezifischen Leistungen für Ihr Vorhaben aus.",
    howItWorksStep2Title: "2. Maße oder Fotos eingeben",
    howItWorksStep2Desc: "Geben Sie die ungefähren Maße ein oder laden Sie bis zu 3 Raumfotos zur Analyse hoch.",
    howItWorksStep3Title: "3. KI-Schätzung erhalten",
    howItWorksStep3Desc: "Erhalten Sie Einkaufsliste mit Verschnitt, schlüsselfertige Kosten, Werkzeuge und Hinweise.",

    // Privacy Page
    privacyPageTitle: "Datenschutzerklärung & Datenschutz",
    privacyPageSubtitle: "Transparenz, Vertraulichkeit und Konformität mit der EU-Verordnung 2016/679 (DSGVO)",
    privacySection1Title: "1. Zweck des Dienstes",
    privacySection1Text: "Dieser Rechner bietet eine transparente und unverbindliche Kostenschätzung für Heimwerker- und Renovierungsarbeiten basierend auf regionalen Richtwerten.",
    privacySection2Title: "2. Anonyme Nutzung ohne Registrierung",
    privacySection2Text: "Die Nutzung des Rechners ist komplett kostenlos und erfordert keine Registrierung, kein Profil und keine persönlichen Zugangsdaten.",
    privacySection3Title: "3. Verarbeitung von Raumfotos",
    privacySection3Text: "Hochgeladene Fotos zur Maßanalyse werden ausschließlich temporär im Arbeitsspeicher verarbeitet und niemals dauerhaft auf Servern gespeichert.",
    privacySection4Title: "4. Freiwillige Fachbetriebsanfragen",
    privacySection4Text: "Das Formular für Angebote von Partnerbetrieben ist vollkommen freiwillig. Eingegebene Kontaktdaten dienen nur der direkten Kontaktaufnahme durch Fachleute.",
    privacySection5Title: "5. Ihre Rechte als betroffene Person",
    privacySection5Text: "Sie können jederzeit Ihre Rechte nach DSGVO (Auskunft, Berichtigung, Löschung) gegenüber dem Betreiber geltend machen.",
    privacyBackToHome: "Zurück zur Startseite",
    privacyStartEstimate: "Jetzt schätzen",

    // 404 Page
    notFoundTitle: "Seite nicht gefunden (404)",
    notFoundDesc: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
    notFoundBtn: "Zurück zur Startseite"
  },
  fr: {
    appName: "Calculateur Maison & Bricolage",
    appSubtitle: "Estimation des coûts, faisabilité et comparatif DIY vs. Professionnel par Intelligence Artificielle",
    stepIndicator: "Étape {currentStep} sur 4",
    backBtn: "Retour",
    nextBtn: "Suivant",
    generateBtn: "Calculer le devis par IA",
    generatingBtn: "Traitement IA en cours...",
    newEstimateBtn: "Nouvelle estimation",
    downloadPdfBtn: "Télécharger le PDF",
    copySummaryBtn: "Copier le résumé",
    copiedSummarySuccess: "Résumé copié !",
    shareBtn: "Partager",

    step1Title: "Où se situe votre chantier et quelle langue préférez-vous ?",
    step1Desc: "Sélectionnez le pays pour calculer automatiquement la TVA locale et les prix de référence corrects.",
    countrySelectLabel: "Pays de référence",
    languageSelectLabel: "Langue de l'application",
    langIt: "Italien",
    langDe: "Allemand",
    langFr: "Français",
    langEn: "Anglais",

    step2Title: "Quel type de travaux souhaitez-vous réaliser ?",
    step2Desc: "Choisissez le secteur d'intervention et sélectionnez les prestations spécifiques souhaitées.",
    sectorSelectLabel: "Secteur d'activité",
    availableWorksLabel: "Prestations disponibles",
    selectedCountLabel: "sélectionnées",
    noItemsFound: "Aucune prestation trouvée pour cette catégorie.",
    quantityLabel: "Qté",

    step3Title: "Mesures et description des travaux",
    step3Desc: "Indiquez les dimensions approximatives du chantier et décrivez votre projet.",
    measureTipTitle: "Conseil utile pour les mesures :",
    measureTipDesc: "Mesurez la largeur × hauteur des murs pour calculer les mètres carrés (m²). Pour les éléments linéaires (plinthes, tuyaux), mesurez en mètres linéaires (ml). Chute : matériau supplémentaire nécessaire pour les coupes et déchets.",
    areaMqLabel: "Superficie (m²)",
    areaMqPlaceholder: "Ex. 45",
    lengthMlLabel: "Linéaire (ml)",
    lengthMlPlaceholder: "Ex. 12",
    quantityCadLabel: "Nombre d'éléments (u)",
    quantityCadPlaceholder: "Ex. 4",
    workDescriptionLabel: "Description libre des travaux *",
    workDescriptionPlaceholder: "Décrivez en détail ce qui doit être fait (ex: repeindre le salon avec présence d'humidité légère dans les angles, reboucher les fissures et finition avec deux couches de peinture lavable)...",

    step4Title: "Comment souhaitez-vous procéder ?",
    step4Desc: "Définissez le mode d'exécution, la qualité des matériaux et vos compétences.",
    modeSelectLabel: "Mode d'estimation",
    modeCompareLabel: "Comparer les deux",
    modeCompareDesc: "Évaluer DIY vs. Professionnel",
    modeProLabel: "Avec professionnel",
    modeProDesc: "Devis confié à une entreprise",
    modeDiyLabel: "DIY (Fait maison) uniquement",
    modeDiyDesc: "Calcul des matériaux, outils et heures",
    qualitySelectLabel: "Qualité des matériaux",
    qualityBaseLabel: "Économique",
    qualityBaseDesc: "Standard / Basique",
    qualityStandardLabel: "Standard",
    qualityStandardDesc: "Bon rapport qualité-prix",
    qualityPremiumLabel: "Premium",
    qualityPremiumDesc: "Haut de gamme et design",
    skillSelectLabel: "Votre expérience en bricolage",
    skillBeginnerLabel: "Débutant",
    skillBeginnerDesc: "Premier travail manuel",
    skillHandyLabel: "Bricoleur",
    skillHandyDesc: "Bonne aisance manuelle",
    skillExpertLabel: "Expert",
    skillExpertDesc: "Compétences avancées",
    difficultySelectLabel: "Difficulté du chantier",
    difficultyLowLabel: "Faible",
    difficultyLowDesc: "Pièce vide, rez-de-chaussée",
    difficultyMediumLabel: "Moyenne",
    difficultyMediumDesc: "Accès standard",
    difficultyHighLabel: "Élevée",
    difficultyHighDesc: "Hauteur, espaces restreints",

    resultsTitle: "Résultat de l'Estimation & Analyse",
    resultsSubtitle: "Analyse personnalisée pour {country}",
    diyCardTitle: "Fait Maison (DIY)",
    diyCardDesc: "Coût estimé matériaux et outils (TTC)",
    diySavingsLabel: "Économie estimée par rapport au professionnalisme : ~{amount} {currency}",
    proCardTitle: "Avec un Professionnel",
    proCardKey: "Clé en main",
    proCardDesc: "Fourchette de prix entreprise (TTC)",
    proCardFeature: "Inclut la main-d'œuvre qualifiée, la garantie et la conformité réglementaire.",
    feasibilityTitle: "Faisabilité DIY : {rating}",
    shoppingListTitle: "Liste de Courses & Matériaux",
    shoppingListDesc: "Quantités calculées avec pourcentage de chute inclus pour éviter les pénuries sur chantier. (Chute : matériau supplémentaire nécessaire pour les coupes et déchets)",
    itemHeader: "Matériau / Prestation",
    netQtyHeader: "Qté Nette",
    wasteQtyHeader: "Qté avec Chutes",
    estCostHeader: "Coût Estimé",
    toolsTitle: "Outillage & Équipement",
    toolsDesc: "Comparatif achat vs. location. Cochez les outils que vous possédez déjà.",
    toolsTotal: "Total outillage",
    noToolsText: "Aucun outil spécial requis pour ces travaux.",
    rentBetter: "Location plus avantageuse",
    buyBetter: "Achat plus avantageuse",
    alreadyOwned: "Déjà possédé (0 €)",
    proMandatoryTitle: "Travaux Obligatoirement Confiés à un Professionnel",
    proMandatoryDesc: "Pour des raisons légales ou de sécurité technique, certains travaux ne peuvent pas être réalisés en DIY.",
    stepsTitle: "Étapes Opérationnelles & Planning",
    stepsDesc: "Calendrier estimatif d'exécution.",
    diyTimeTotal: "Temps estimé DIY :",
    safetyTitle: "Risques, Sécurité & EPI",
    safetyDesc: "Équipements de protection individuelle et précautions.",
    mainRisks: "Principaux risques",
    safetyRecs: "Recommandations de sécurité",
    permitsTitle: "Permis, Autorisations et Réglementations ({country})",
    permitsDesc: "Démarches administratives requises par les réglementations locales en vigueur.",
    disclaimerTitle: "Avertissement Important et Limitation de Responsabilité",
    disclaimerText: "Estimation indicative non contractuelle. Les prix des matériaux et de la main-d'œuvre peuvent varier selon la zone géographique, la saisonnalité et la complexité spécifique du chantier. Il est fortement conseillé de toujours demander au moins 2 à 3 devis écrits à des professionnels qualifiés avant d'entreprendre des travaux de construction ou d'installation.",
    photoSectionTitle: "Photos de la pièce (Optionnel)",
    photoSectionDesc: "Téléchargez jusqu'à 3 photos pour analyser l'état, détecter les problèmes et estimer automatiquement les dimensions.",
    photoPrivacyNotice: "Les photos sont traitées en mémoire uniquement pour l'analyse et ne sont pas enregistrées sur le serveur.",
    photoAnalyzeBtn: "Analyser les photos avec l'IA",
    photoAnalyzingBtn: "Analyse des photos en cours...",
    photoMeasureWarning: "Attention : les mesures sont estimées à partir des photos, vérifiez-les toujours avec un mètre.",
    photoErrorMax10M: "Le fichier dépasse la taille maximale de 10 Mo.",
    photoErrorInvalid: "Le fichier sélectionné n'est pas une image valide.",
    photoErrorMaxCount: "Vous pouvez télécharger 3 photos maximum.",
    detectedIssuesTitle: "Problèmes et défauts détectés",
    visibleStateTitle: "État visible",
    confidenceLabel: "Confiance de l'estimation :",
    recommendationsTitle: "Conseils et vérifications",
    photoAnalysisSuccess: "Analyse terminée ! Mesures et observations mises à jour.",
    requestProBtn: "Demander des devis de professionnels",
    leadModalTitle: "Demande de devis auprès de professionnels",
    leadModalDesc: "Remplissez le formulaire pour recevoir des devis sans engagement d'entreprises et de professionnels qualifiés de votre région.",
    leadNameLabel: "Nom et Prénom *",
    leadEmailLabel: "Adresse Email *",
    leadPhoneLabel: "Téléphone (optionnel)",
    leadLocationLabel: "Code Postal et Ville *",
    leadNotesLabel: "Notes ou demandes particulières (optionnel)",
    leadPrivacyLabel: "J'ai lu et j'accepte la politique de confidentialité et le traitement des données personnelles pour la demande de devis *",
    leadPrivacyLink: "Lire la politique de confidentialité",
    leadSubmitBtn: "Envoyer la demande aux professionnels",
    leadSubmitting: "Envoi en cours...",
    leadSuccessTitle: "Demande envoyée avec succès !",
    leadSuccessText: "Votre demande a été enregistrée avec succès. Aucun e-mail automatique n'a été envoyé. Des professionnels partenaires de votre région examineront les détails de votre projet et vous contacteront directement par e-mail ou téléphone dans les 24 à 48 heures ouvrées pour convenir d'une visite ou vous envoyer un devis détaillé.",
    leadCloseBtn: "Fermer",
    privacyModalTitle: "Politique de Confidentialité",
    privacyModalText: "Les données saisies dans ce formulaire sont utilisées exclusivement pour transmettre la demande de devis aux entreprises et professionnels partenaires de votre région. Le traitement est conforme au RGPD (Règlement UE 2016/679). Aucun e-mail automatique n'est envoyé par le système : la demande est conservée dans un espace sécurisé et vous serez contacté directement par les professionnels intéressés.",

    // Task 11c
    cancelBtn: "Annuler",
    cancellingBtn: "Annulation en cours...",
    requestCancelled: "Demande annulée. Toutes les données du formulaire ont été conservées.",
    requestTimeout: "Délai d'attente maximal dépassé (270s). Les serveurs sont actuellement très sollicités. Vous pouvez réessayer ou modifier vos paramètres.",
    loadingTitle: "Calcul du devis par IA",
    loadingStepAnalyzing: "J'analyse les travaux...",
    loadingStepCalculating: "Calcul des prestations et vérification des barèmes régionaux...",
    loadingStepAlternative: "Le moteur IA est lent, je tente une alternative...",
    loadingStepFinalizing: "Je finalise l'estimation...",
    elapsedTimeLabel: "Temps écoulé :",
    dataPreservedNotice: "Toutes vos données restent sauvegardées si vous décidez d'annuler.",
    degradedAlertMessage: "Estimation économique complète ; les conseils personnalisés de l'IA ne sont pas disponibles pour le moment. Vous pouvez réessayer plus tard.",
    retryBtn: "Réessayer",
    photoAnalysisUnavailableTitle: "Analyse photo indisponible",
    photoAnalysisUnavailableNotice: "Analyse photo non disponible pour le moment. Vous pouvez continuer en saisissant manuellement les mesures dans les champs ci-dessous.",
    photoAnalyzingWait: "Analyse des photos en cours...",
    photoAnalyzingAlternative: "Le traitement visuel est lent, tentative avec une alternative...",
    continueWithManualMeasures: "Saisissez les mesures à la main pour continuer",

    // Navigation & Layout
    navCalculateBtn: "Calculer le coût",
    navHome: "Accueil",
    navPrivacy: "Confidentialité",

    // Hero & Trust Points
    heroTitle: "Estimez le coût des travaux de maison, même en DIY",
    heroSubtitle: "Comparez instantanément matériaux, main-d'œuvre et économies réelles grâce à l'IA.",
    heroCtaBtn: "Calculer le coût",
    heroHowItWorksLink: "Comment ça marche",
    trustPoint1Title: "Comparatif Bricolage ou Artisan",
    trustPoint1Desc: "Évaluez immédiatement le temps nécessaire, l'outillage et l'économie réelle réalisée.",
    trustPoint2Title: "Fourchettes avec TVA incluse",
    trustPoint2Desc: "Tarifs transparents intégrant les taux de TVA locaux et les barèmes de votre région.",
    trustPoint3Title: "Aucune inscription requise",
    trustPoint3Desc: "Calculez votre devis détaillé immédiatement sans devoir créer de compte ni renseigner d'email.",

    // How It Works Section
    howItWorksTitle: "Comment ça marche en 3 étapes simples",
    howItWorksStep1Title: "1. Choisissez vos travaux",
    howItWorksStep1Desc: "Sélectionnez le corps d'état, votre pays et les prestations précises souhaitées.",
    howItWorksStep2Title: "2. Entrez mesures ou photos",
    howItWorksStep2Desc: "Indiquez les dimensions ou téléchargez des photos de la pièce pour l'analyse automatique.",
    howItWorksStep3Title: "3. Obtenez l'estimation IA",
    howItWorksStep3Desc: "Recevez la liste des matériaux avec chutes, coût clé en main d'entreprise et conseils de sécurité.",

    // Privacy Page
    privacyPageTitle: "Politique de Confidentialité & Protection des Données",
    privacyPageSubtitle: "Transparence, confidentialité et conformité au Règlement UE 2016/679 (RGPD)",
    privacySection1Title: "1. Finalité du service",
    privacySection1Text: "Ce calculateur permet d'estimer gratuitement et à titre indicatif le coût des travaux de rénovation et de bricolage.",
    privacySection2Title: "2. Utilisation anonyme sans inscription",
    privacySection2Text: "L'accès au calculateur ne demande aucune inscription ni création de compte préalable. Vous calculez votre devis librement.",
    privacySection3Title: "3. Traitement des photos du chantier",
    privacySection3Text: "Les photos téléchargées pour l'estimation sont traitées temporairement en mémoire vive (RAM) et ne sont jamais stockées sur disque.",
    privacySection4Title: "4. Demande facultative auprès de professionnels",
    privacySection4Text: "La demande de devis à des artisans partenaires est facultative. Vos coordonnées ne servent qu'à la mise en relation avec des professionnels qualifiés.",
    privacySection5Title: "5. Vos droits (RGPD)",
    privacySection5Text: "Vous disposez d'un droit d'accès, de rectification et d'effacement de vos données conformément aux articles 15-22 du RGPD.",
    privacyBackToHome: "Retour à l'accueil",
    privacyStartEstimate: "Commencer l'estimation",

    // 404 Page
    notFoundTitle: "Page non trouvée (404)",
    notFoundDesc: "La page demandée n'existe pas ou a été déplacée.",
    notFoundBtn: "Retour à l'accueil"
  },
  en: {
    appName: "Home & DIY Estimator",
    appSubtitle: "Cost estimation, feasibility, and DIY vs. Pro comparison powered by Artificial Intelligence",
    stepIndicator: "Step {currentStep} of 4",
    backBtn: "Back",
    nextBtn: "Next",
    generateBtn: "Calculate Estimate with AI",
    generatingBtn: "AI Processing...",
    newEstimateBtn: "New Estimate",
    downloadPdfBtn: "Download PDF",
    copySummaryBtn: "Copy Summary",
    copiedSummarySuccess: "Summary copied!",
    shareBtn: "Share",

    step1Title: "Where is your project located and which language do you prefer?",
    step1Desc: "Select the project country to automatically calculate local VAT rates and correct reference prices.",
    countrySelectLabel: "Reference Country",
    languageSelectLabel: "Application Language",
    langIt: "Italian",
    langDe: "German",
    langFr: "French",
    langEn: "English",

    step2Title: "What type of work do you want to do?",
    step2Desc: "Choose your trade sector and select the specific work items you need.",
    sectorSelectLabel: "Trade Sector",
    availableWorksLabel: "Available Work Items",
    selectedCountLabel: "selected",
    noItemsFound: "No items found for this category.",
    quantityLabel: "Qty",

    step3Title: "Measurements & Work Description",
    step3Desc: "Enter approximate project dimensions and describe what you want to achieve.",
    measureTipTitle: "Useful measurement tip:",
    measureTipDesc: "Measure width × height of walls to calculate square meters (sqm). For linear items (baseboards, pipes), measure in linear meters (lm). Waste/scrap: extra material needed for cuts and waste.",
    areaMqLabel: "Area (sqm)",
    areaMqPlaceholder: "e.g. 45",
    lengthMlLabel: "Linear length (lm)",
    lengthMlPlaceholder: "e.g. 12",
    quantityCadLabel: "Item count (pcs)",
    quantityCadPlaceholder: "e.g. 4",
    workDescriptionLabel: "Detailed work description *",
    workDescriptionPlaceholder: "Describe in detail what needs to be done (e.g., painting living room with slight corner mold, filling cracks, and finishing with two coats of washable paint)...",

    step4Title: "How do you want to approach the work?",
    step4Desc: "Define execution mode, material quality, and your skill level.",
    modeSelectLabel: "Estimation Mode",
    modeCompareLabel: "Compare both",
    modeCompareDesc: "Evaluate DIY vs. Professional",
    modeProLabel: "With professional",
    modeProDesc: "Quote assigned to contractor",
    modeDiyLabel: "DIY only",
    modeDiyDesc: "Calculate materials, tools, and hours",
    qualitySelectLabel: "Material Quality",
    qualityBaseLabel: "Basic",
    qualityBaseDesc: "Economical / Standard",
    qualityStandardLabel: "Standard",
    qualityStandardDesc: "Great value for money",
    qualityPremiumLabel: "Premium",
    qualityPremiumDesc: "High-end & design",
    skillSelectLabel: "Your DIY Experience",
    skillBeginnerLabel: "Beginner",
    skillBeginnerDesc: "First manual project",
    skillHandyLabel: "Handy",
    skillHandyDesc: "Good hobbyist dexterity",
    skillExpertLabel: "Expert",
    skillExpertDesc: "Advanced skills",
    difficultySelectLabel: "Site Difficulty",
    difficultyLowLabel: "Low",
    difficultyLowDesc: "Clear room, ground level",
    difficultyMediumLabel: "Medium",
    difficultyMediumDesc: "Standard access",
    difficultyHighLabel: "High",
    difficultyHighDesc: "Heights, tight spaces",

    resultsTitle: "Estimate Result & Analysis",
    resultsSubtitle: "Customized analysis for {country}",
    diyCardTitle: "Do It Yourself (DIY)",
    diyCardDesc: "Estimated cost for materials & tools (incl. VAT)",
    diySavingsLabel: "Estimated savings compared to professional: ~{amount} {currency}",
    proCardTitle: "With a Professional",
    proCardKey: "Turnkey",
    proCardDesc: "Contractor cost range (incl. VAT)",
    proCardFeature: "Includes skilled labor, warranty, and regulatory compliance.",
    feasibilityTitle: "DIY Feasibility: {rating}",
    shoppingListTitle: "Shopping List & Materials",
    shoppingListDesc: "Quantities calculated with waste percentage included to prevent site shortages. (Waste/scrap: extra material needed for cuts and waste)",
    itemHeader: "Material / Item",
    netQtyHeader: "Net Qty",
    wasteQtyHeader: "Qty with Waste",
    estCostHeader: "Estimated Cost",
    toolsTitle: "Tools & Equipment",
    toolsDesc: "Comparison of buy vs. rent. Check the tools you already own.",
    toolsTotal: "Tools total",
    noToolsText: "No special tools required for these tasks.",
    rentBetter: "Renting is cheaper",
    buyBetter: "Buying is cheaper",
    alreadyOwned: "Already owned (0 €)",
    proMandatoryTitle: "Mandatory Work Items for Professionals",
    proMandatoryDesc: "By law or technical safety regulations, certain tasks cannot be performed as DIY.",
    stepsTitle: "Operational Steps & Schedule",
    stepsDesc: "Estimated execution schedule.",
    diyTimeTotal: "Estimated DIY time:",
    safetyTitle: "Risks, Safety & PPE",
    safetyDesc: "Personal protective equipment and precautions.",
    mainRisks: "Main risks",
    safetyRecs: "Safety recommendations",
    permitsTitle: "Permits, Authorizations and Regulations ({country})",
    permitsDesc: "Bureaucratic requirements under applicable local regulations.",
    disclaimerTitle: "Important Disclaimer & Liability Limitation",
    disclaimerText: "Non-binding indicative estimate. Material and labor costs may vary based on geographic location, seasonality, and specific project complexity. It is strongly advised to always request at least 2-3 written quotes from licensed professionals before starting any construction or installation work.",
    photoSectionTitle: "Room Photos (Optional)",
    photoSectionDesc: "Upload up to 3 photos to analyze conditions, detect issues, and automatically estimate dimensions.",
    photoPrivacyNotice: "Photos are processed in memory solely for analysis and are not stored on the server.",
    photoAnalyzeBtn: "Analyze Photos with AI",
    photoAnalyzingBtn: "Analyzing photos...",
    photoMeasureWarning: "Warning: measurements are estimated from photos, always verify with a tape measure.",
    photoErrorMax10M: "File exceeds maximum size of 10MB.",
    photoErrorInvalid: "Selected file is not a valid image.",
    photoErrorMaxCount: "You can upload a maximum of 3 photos.",
    detectedIssuesTitle: "Detected Issues & Problems",
    visibleStateTitle: "Visible State",
    confidenceLabel: "Estimation Confidence:",
    recommendationsTitle: "Recommendations & Checks",
    photoAnalysisSuccess: "Analysis complete! Measurements and observations updated.",
    requestProBtn: "Request quotes from professionals",
    leadModalTitle: "Request Quote from Professionals",
    leadModalDesc: "Fill out the form to receive no-obligation quotes from qualified local contractors and professionals.",
    leadNameLabel: "Full Name *",
    leadEmailLabel: "Email Address *",
    leadPhoneLabel: "Phone (optional)",
    leadLocationLabel: "Postal Code & City *",
    leadNotesLabel: "Notes or special requests (optional)",
    leadPrivacyLabel: "I have read and accept the privacy policy and personal data processing for the quote request *",
    leadPrivacyLink: "Read privacy policy",
    leadSubmitBtn: "Submit request to professionals",
    leadSubmitting: "Submitting...",
    leadSuccessTitle: "Request Submitted Successfully!",
    leadSuccessText: "Your request has been successfully registered. No automatic emails have been sent. Partner professionals in your area will review your project details and contact you directly via email or phone within 24-48 business hours to arrange an inspection or send a detailed quote.",
    leadCloseBtn: "Close",
    privacyModalTitle: "Privacy Policy",
    privacyModalText: "The data entered in this form is used exclusively to forward the quote request to partner contractors and building professionals operating in your area. Processing complies with EU Regulation 2016/679 (GDPR). No automatic emails are sent by the system: the request is stored in a secure archive for commercial management and you will be contacted directly by professionals interested in your project.",

    // Task 11c
    cancelBtn: "Cancel",
    cancellingBtn: "Cancelling...",
    requestCancelled: "Request cancelled. All your form data has been preserved.",
    requestTimeout: "Maximum timeout reached (270s). Servers are currently experiencing high load. You can try again or adjust your settings.",
    loadingTitle: "Calculating AI Estimate",
    loadingStepAnalyzing: "Analyzing the project details...",
    loadingStepCalculating: "Calculating line items and checking regional price lists...",
    loadingStepAlternative: "The AI engine is slow, trying an alternative...",
    loadingStepFinalizing: "Finalizing the estimate...",
    elapsedTimeLabel: "Elapsed time:",
    dataPreservedNotice: "All your inputs and selections remain saved if you choose to cancel.",
    degradedAlertMessage: "Economic estimate complete; personalized AI recommendations are unavailable at this moment. You can try again later.",
    retryBtn: "Try again",
    photoAnalysisUnavailableTitle: "Photo analysis unavailable",
    photoAnalysisUnavailableNotice: "Photo analysis is currently unavailable. You can continue by entering your measurements manually in the fields below.",
    photoAnalyzingWait: "Analyzing room photos...",
    photoAnalyzingAlternative: "Visual processing is slow, trying an alternative...",
    continueWithManualMeasures: "Enter measurements manually to proceed",

    // Navigation & Layout
    navCalculateBtn: "Calculate cost",
    navHome: "Home",
    navPrivacy: "Privacy",

    // Hero & Trust Points
    heroTitle: "Estimate the cost of home projects, even DIY",
    heroSubtitle: "Instantly compare materials, contractor labor, and real savings with Artificial Intelligence.",
    heroCtaBtn: "Calculate cost",
    heroHowItWorksLink: "How it works",
    trustPoint1Title: "DIY vs. Professional Comparison",
    trustPoint1Desc: "Quickly assess required time, tools, and actual savings compared to hiring a contractor.",
    trustPoint2Title: "Ranges with VAT included",
    trustPoint2Desc: "Transparent pricing calibrated to territorial tax rates and regional price lists.",
    trustPoint3Title: "No registration required",
    trustPoint3Desc: "Calculate your detailed estimate instantly without creating an account or signing in.",

    // How It Works Section
    howItWorksTitle: "How it works in 3 simple steps",
    howItWorksStep1Title: "1. Choose your work",
    howItWorksStep1Desc: "Select the trade sector, country, and specific tasks you want to undertake.",
    howItWorksStep2Title: "2. Enter dimensions or photos",
    howItWorksStep2Desc: "Provide room dimensions or upload photos for automated AI dimension analysis.",
    howItWorksStep3Title: "3. Get your AI estimate",
    howItWorksStep3Desc: "Receive a material shopping list with scrap rates, turnkey pro costs, tools, and safety tips.",

    // Privacy Page
    privacyPageTitle: "Privacy Policy & Data Protection",
    privacyPageSubtitle: "Transparency, confidentiality, and compliance with EU Regulation 2016/679 (GDPR)",
    privacySection1Title: "1. Purpose of the service",
    privacySection1Text: "This tool provides an indicative estimation of home renovation and DIY project costs based on local standards.",
    privacySection2Title: "2. Anonymous use without registration",
    privacySection2Text: "Access to the calculator is completely free and requires no account registration, login credentials, or personal profiles.",
    privacySection3Title: "3. Processing of room photos",
    privacySection3Text: "Photos uploaded for dimension estimation are processed solely in volatile memory (RAM) and are never stored on server disks.",
    privacySection4Title: "4. Optional quote request to contractors",
    privacySection4Text: "Requesting quotes from verified local contractors is entirely optional. Submitted contact information is handled securely for matching purposes only.",
    privacySection5Title: "5. Your GDPR rights",
    privacySection5Text: "You may exercise your rights of access, rectification, or deletion under GDPR Articles 15-22 by contacting service support.",
    privacyBackToHome: "Back to Home",
    privacyStartEstimate: "Start estimate",

    // 404 Page
    notFoundTitle: "Page Not Found (404)",
    notFoundDesc: "The page you are looking for does not exist or has been moved.",
    notFoundBtn: "Back to Home"
  }
};
