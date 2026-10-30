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
  diyCardTime: string;
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
  privacyBadgeGDPR: string;
  privacyBadgeLPD: string;
  cookiePolicyTitle: string;
  cookiePolicyText: string;
  lpdSectionTitle: string;
  lpdSectionText: string;
  estimateDisclaimerProTitle: string;
  estimateDisclaimerProText: string;

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
  apiErrorGeneric: string;

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

  // How It Works Section (4 Steps)
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  howItWorksStep1Title: string;
  howItWorksStep1Desc: string;
  howItWorksStep2Title: string;
  howItWorksStep2Desc: string;
  howItWorksStep3Title: string;
  howItWorksStep3Desc: string;
  howItWorksStep4Title: string;
  howItWorksStep4Desc: string;

  // What You Get Section (6 Cards)
  whatYouGetTitle: string;
  whatYouGetSubtitle: string;
  cardDiyCostTitle: string;
  cardDiyCostDesc: string;
  cardProCostTitle: string;
  cardProCostDesc: string;
  cardSavingsTitle: string;
  cardSavingsDesc: string;
  cardShoppingListTitle: string;
  cardShoppingListDesc: string;
  cardToolsTitle: string;
  cardToolsDesc: string;
  cardSafetyPermitsTitle: string;
  cardSafetyPermitsDesc: string;

  // Supported Sectors Section & Honesty Note
  sectorsSectionTitle: string;
  sectorsSectionSubtitle: string;
  sectorPainterTitle: string;
  sectorPainterDesc: string;
  sectorTilerTitle: string;
  sectorTilerDesc: string;
  sectorWindowsTitle: string;
  sectorWindowsDesc: string;
  sectorPlumberTitle: string;
  sectorPlumberDesc: string;
  sectorElectricianTitle: string;
  sectorElectricianDesc: string;
  tradeHonestyTitle: string;
  tradeHonestyDesc: string;

  // Indicative Estimate Sample Section
  sampleSectionTitle: string;
  sampleSectionSubtitle: string;
  sampleBadge: string;
  sampleJobTitle: string;
  sampleLocation: string;
  sampleProTitle: string;
  sampleProValue: string;
  sampleProSubtitle: string;
  sampleDiyTitle: string;
  sampleDiyValue: string;
  sampleDiySubtitle: string;
  sampleSavingsLabel: string;
  sampleSavingsValue: string;
  sampleFeasibilityLabel: string;
  sampleFeasibilityValue: string;
  sampleTimeLabel: string;
  sampleTimeValue: string;
  sampleShoppingHeading: string;
  sampleShoppingItem1: string;
  sampleShoppingItem2: string;
  sampleShoppingItem3: string;
  sampleShoppingItem4: string;
  sampleToolsNote: string;
  sampleSafetyNote: string;

  // Accessible FAQ Section (10 Q&A)
  faqSectionTitle: string;
  faqSectionSubtitle: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  faqQ7: string;
  faqA7: string;
  faqQ8: string;
  faqA8: string;
  faqQ9: string;
  faqA9: string;
  faqQ10: string;
  faqA10: string;

  // Final CTA Section
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaBtn: string;
  finalCtaFeature1: string;
  finalCtaFeature2: string;
  finalCtaFeature3: string;

  // Common Footer
  footerShortDesc: string;
  footerDisclaimer: string;
  developerCredit: string;
  navEstimate: string;
  navFaq: string;
  footerLanguage: string;
  footerRights: string;

  // Privacy Page
  privacyPageTitle: string;
  privacyPageSubtitle: string;
  privacyDraftBadge: string;
  privacyDraftNotice: string;
  privacyControllerTitle: string;
  privacyControllerName: string;
  privacyControllerAddress: string;
  privacyControllerEmail: string;
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
  privacySection6Title: string;
  privacySection6Text: string;
  privacySection7Title: string;
  privacySection7Text: string;
  privacyBackToHome: string;
  privacyStartEstimate: string;

  // SEO per-page metadata
  seoHomeTitle: string;
  seoHomeDesc: string;
  seoEstimateTitle: string;
  seoEstimateDesc: string;
  seoPrivacyTitle: string;
  seoPrivacyDesc: string;

  // 404 Page
  notFoundTitle: string;
  notFoundDesc: string;
  notFoundBtn: string;
  
  // PWA & Install
  installAppBtn: string;
  pwaBannerTitle: string;
  pwaBannerDesc: string;
  pwaBannerInstall: string;
  pwaBannerClose: string;
  iosInstallGuideTitle: string;
  iosInstallGuideStep1: string;
  iosInstallGuideStep2: string;
  iosInstallGuideGotIt: string;
  standaloneHomeCta: string;
  standaloneHomeSubtitle: string;
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
    diyCardTime: "{days}g, {hours}h",
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
    disclaimerText: "Stima indicativa non vincolante. I prezzi mostrati sono medie di mercato e NON rappresentano un calcolo esatto al centesimo né un'offerta commerciale definitiva. I costi reali possono variare sensibilmente. Si consiglia vivamente di richiedere sempre almeno 2-3 preventivi scritti a professionisti abilitati prima di avviare qualsiasi intervento.",
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
    privacyModalText: "I dati inseriti in questo modulo vengono utilizzati esclusivamente per consentire l'inoltro della richiesta di preventivo ai professionisti e alle imprese edili partner operanti nella tua zona. Il trattamento avviene nel rispetto del Regolamento UE 2016/679 (GDPR) e della LPD svizzera. Nessun invio di email automatiche viene effettuato dal sistema: la richiesta viene conservata in un archivio sicuro per la gestione commerciale e sarai contattato direttamente dai professionisti interessati al tuo progetto.",
    privacyBadgeGDPR: "GDPR Compliant (UE 2016/679)",
    privacyBadgeLPD: "Conforme LPD (Svizzera)",
    cookiePolicyTitle: "Informativa sui Cookie",
    cookiePolicyText: "Questa applicazione non utilizza cookie di profilazione o tracciamento di terze parti. Utilizziamo esclusivamente lo storage locale del browser (localStorage) per salvare le tue preferenze sulla lingua e cookie tecnici strettamente necessari al corretto funzionamento della sessione. Nessun dato personale viene tracciato a fini pubblicitari.",
    lpdSectionTitle: "Protezione dei Dati in Svizzera (LPD)",
    lpdSectionText: "In conformità alla Legge federale sulla protezione dei dati (LPD), garantiamo che i dati degli utenti residenti in Svizzera siano trattati con la massima riservatezza. Il Titolare adotta misure tecniche e organizzative adeguate per impedire accessi non autorizzati.",
    estimateDisclaimerProTitle: "Avviso Legale e Natura delle Stime",
    estimateDisclaimerProText: "IMPORTANTE: Le cifre mostrate sono stime matematiche indicative basate su medie nazionali di mercato. NON rappresentano conti esatti al centesimo e NON costituiscono un preventivo vincolante, una fattura o un'offerta commerciale. Il costo reale del tuo progetto può variare sensibilmente a causa di rincari dei materiali, difficoltà logistiche impreviste, stati di degrado non visibili o specifiche tariffe professionali della tua zona. Si raccomanda sempre di richiedere sopralluoghi tecnici e preventivi ufficiali prima di procedere.",

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
    apiErrorGeneric: "Servizio temporaneamente non disponibile, riprova tra poco.",

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

    // How It Works Section (4 Steps)
    howItWorksTitle: "Come funziona in 4 semplici passi",
    howItWorksSubtitle: "Un percorso lineare, rapido e trasparente per calcolare i tuoi lavori in meno di due minuti.",
    howItWorksStep1Title: "1. Localizzazione e IVA",
    howItWorksStep1Desc: "Seleziona il Paese (Italia, Svizzera, Germania, Francia, Spagna) per applicare le corrette aliquote IVA e i prezzari territoriali.",
    howItWorksStep2Title: "2. Settore e Lavorazioni",
    howItWorksStep2Desc: "Scegli tra tinteggiatura, infissi, pavimenti, idraulica o elettricità e indica le lavorazioni specifiche.",
    howItWorksStep3Title: "3. Misure e Foto",
    howItWorksStep3Desc: "Inserisci le quantità (mq, ml, pezzi) e, se desideri, carica fino a 3 foto del locale per l'ispezione visiva dello stato.",
    howItWorksStep4Title: "4. Modalità ed Esperienza",
    howItWorksStep4Desc: "Scegli se valutare Fai da Te, Professionista o entrambi, impostando qualità dei materiali e livello di manualità.",

    // What You Get Section (6 Cards)
    whatYouGetTitle: "Cosa ottieni nel preventivo",
    whatYouGetSubtitle: "Tutti i dettagli tecnici ed economici per decidere con consapevolezza e senza brutte sorprese.",
    cardDiyCostTitle: "Costo Fai da Te",
    cardDiyCostDesc: "Stima analitica dei materiali necessari, ore di lavoro richieste, imprevisti e IVA inclusa, calcolata sui reali prezzi di mercato al dettaglio.",
    cardProCostTitle: "Costo Professionista",
    cardProCostDesc: "Intervallo realistico per l'opera finita 'chiavi in mano', comprensivo di manodopera specializzata, attrezzatura e garanzia legale.",
    cardSavingsTitle: "Risparmio reale stimato",
    cardSavingsDesc: "Calcolo immediato del risparmio economico effettivo tra eseguire l'opera in autonomia rispetto all'ingaggio di un'impresa qualificata.",
    cardShoppingListTitle: "Lista spesa con sfrido",
    cardShoppingListDesc: "Distinta precisa delle quantità con percentuale di sfrido inclusa (10-15% per tagli e scarti), così da non restare mai a corto.",
    cardToolsTitle: "Attrezzi: acquisto o noleggio",
    cardToolsDesc: "Per ogni utensile necessario (rulli, scale, levigatrici, miscelatori), l'app calcola se convenga comprarlo o noleggiarlo a giornata.",
    cardSafetyPermitsTitle: "Sicurezza, permessi e lavori riservati",
    cardSafetyPermitsDesc: "Indicazione chiara dei DPI necessari, dei permessi edilizi locali e delle lavorazioni vietate al fai da te per legge (es. DM 37/08).",

    // Supported Sectors Section & Honesty Note
    sectorsSectionTitle: "Per quali lavori puoi usarlo",
    sectorsSectionSubtitle: "5 settori edili principali con prezzari dettagliati, lavorazioni tipiche e indicazioni di fattibilità.",
    sectorPainterTitle: "Imbianchino / Decoratore",
    sectorPainterDesc: "Tinteggiature lavabili, rasature a gesso, trattamenti antimuffa, carta da parati, finiture a velatura e contropareti in cartongesso.",
    sectorTilerTitle: "Piastrellista / Pavimentatore",
    sectorTilerDesc: "Posa pavimenti in gres porcellanato, parquet prefinito, laminato flottante SPC, rivestimenti bagni/cucine, battiscopa e massetti.",
    sectorWindowsTitle: "Serramentista / Infissi",
    sectorWindowsDesc: "Finestre in PVC e alluminio a taglio termico, porte interne e blindate, zanzariere a rullo, avvolgibili e coibentazione cassonetti.",
    sectorPlumberTitle: "Idraulico / Termoidraulico",
    sectorPlumberDesc: "Rifacimento impianto idrico, sanitari, rubinetteria, condizionatori monosplit/multisplit, caldaie a condensazione e scaldabagni.",
    sectorElectricianTitle: "Elettricista",
    sectorElectricianDesc: "Punti luce, quadro salvavita, videocitofonia, illuminazione LED, impianti d'allarme, domotica smart e stazioni di ricarica Wallbox EV.",
    tradeHonestyTitle: "Nota di trasparenza su Idraulica ed Elettricità",
    tradeHonestyDesc: "Per legge e per la tua sicurezza (D.M. 37/08 in Italia, norme SIA in Svizzera, DIN in Germania, DTU in Francia, CTE in Spagna), gli interventi complessi su impianti elettrici strutturali, allacci gas, caldaie e canne fumarie richiedono obbligatoriamente l'intervento di tecnici abilitati e il rilascio della Dichiarazione di Conformità (DiCo). L'applicazione indica sempre con onestà quali piccole operazioni sono accessibili al fai da te e quali devono essere necessariamente affidate a una ditta qualificata.",

    // Indicative Estimate Sample Section
    sampleSectionTitle: "Esempio reale di preventivo",
    sampleSectionSubtitle: "Ecco come appare il risultato generato: cifre coerenti calcolate direttamente dai listini dell'app.",
    sampleBadge: "Esempio indicativo",
    sampleJobTitle: "Tinteggiatura soggiorno e disimpegno (45 mq)",
    sampleLocation: "Milano, Italia • IVA 10% inclusa",
    sampleProTitle: "Preventivo Ditta (Chiavi in mano)",
    sampleProValue: "840 € – 1.100 €",
    sampleProSubtitle: "Include preparazione superfici, stuccatura crepe, 2 mani di pittura lavabile e pulizia finale.",
    sampleDiyTitle: "Costo Fai da Te (Materiali e Attrezzi)",
    sampleDiyValue: "225 € – 270 €",
    sampleDiySubtitle: "Include idropittura con sfrido 10%, fondo fissativo, teli, nastro e kit rulli/pennelli.",
    sampleSavingsLabel: "Risparmio stimato con il Fai da Te:",
    sampleSavingsValue: "~615 € – 830 € (circa il 73% in meno)",
    sampleFeasibilityLabel: "Fattibilità Fai da Te:",
    sampleFeasibilityValue: "4/5 (Molto alta - adatta ad appassionati con manualità base)",
    sampleTimeLabel: "Tempo stimato di esecuzione:",
    sampleTimeValue: "16 – 18 ore (circa 1 weekend)",
    sampleShoppingHeading: "Estratto distinta materiali (con sfrido 10%):",
    sampleShoppingItem1: "Idropittura traspirante lavabile bianca: 2 latte da 14 L (sfrido 10% incluso)",
    sampleShoppingItem2: "Primer fissativo acrilico isolante: 1 flacone da 5 L",
    sampleShoppingItem3: "Stucco in pasta per crepe e microfessure: 1 barattolo da 1 kg + spatola inox",
    sampleShoppingItem4: "Teli di protezione assorbenti e nastro carta per mascheratura bordi: 3 rotoli",
    sampleToolsNote: "Attrezzatura consigliata: Rullo professionale antigoccia e manico telescopico (acquisto ~45 €). Scala domestica (già posseduta: 0 €).",
    sampleSafetyNote: "Sicurezza: Arieggiare adeguatamente i locali durante la tinteggiatura e indossare occhiali protettivi e guanti in lattice.",

    // Accessible FAQ Section (10 Q&A)
    faqSectionTitle: "Domande Frequenti",
    faqSectionSubtitle: "Risposte brevi e trasparenti, basate solo sulle funzionalità realmente implementate nel codice.",
    faqQ1: "Quanto è affidabile la stima generata dall'applicazione?",
    faqA1: "La stima è un orientamento economico affidabile e realistico, basato sui prezzari medi di mercato e sui costi effettivi dei materiali. Non è un preventivo commerciale vincolante: prima di iniziare i lavori, consigliamo sempre di richiedere 2-3 preventivi scritti a imprese abilitate.",
    faqQ2: "Da dove provengono i prezzi dei materiali e della manodopera?",
    faqA2: "I prezzi provengono dal prezzario interno dell'applicazione, calibrato sulle tariffe medie dei prezzari edili territoriali e sui costi di acquisto al dettaglio dei materiali da costruzione per ogni Paese supportato.",
    faqQ3: "Quali Paesi e normative sono attualmente supportati?",
    faqA3: "L'app supporta attualmente 5 Paesi: Italia, Svizzera, Germania, Francia e Spagna. Per ciascun Paese vengono caricate le corrette aliquote IVA territoriali e i riferimenti normativi locali vigenti.",
    faqQ4: "L'applicazione è davvero gratuita e senza registrazione?",
    faqA4: "Sì, al 100%. Puoi calcolare tutti i preventivi che desideri direttamente dal browser senza dover creare un account, senza password e senza carte di credito.",
    faqQ5: "Posso fare qualsiasi lavoro da solo con il Fai da Te?",
    faqA5: "No. L'applicazione distingue rigorosamente tra lavorazioni accessibili in autonomia (come tinteggiatura o montaggio accessori) e interventi riservati per legge o sicurezza a professionisti abilitati (come allacci gas, impianti elettrici strutturali o canne fumarie).",
    faqQ6: "I prezzi mostrati sono comprensivi di IVA?",
    faqA6: "Sì, tutti i prezzi, le stime chiavi in mano e le distinte dei materiali includono chiaramente l'aliquota IVA territoriale selezionata per il tuo Paese di riferimento.",
    faqQ7: "L'Intelligenza Artificiale può inventare o sbagliare i totali economici?",
    faqA7: "No. I calcoli matematici, lo sfrido e i totali economici sono eseguiti con formule matematiche fisse e deterministiche sul server, mai delegati all'AI. L'AI genera solo note descrittive qualitative e consigli tecnici.",
    faqQ8: "Come vengono trattati i miei dati personali e la privacy?",
    faqA8: "Rispettiamo la tua privacy: non usiamo cookie di profilazione. I dati inseriti servono solo per calcolare la stima. Se decidi facoltativamente di compilare il modulo per ricevere offerte da ditte locali, i recapiti sono protetti con scadenza a 90 giorni.",
    faqQ9: "È obbligatorio caricare le foto del locale?",
    faqA9: "No, il caricamento delle foto è del tutto facoltativo. Se le carichi (fino a 3 foto), l'AI visiva le analizza in memoria solo per valutare lo stato del locale e non vengono salvate permanentemente sul server.",
    faqQ10: "Posso installare l'applicazione sul telefono (Android o iOS)?",
    faqA10: "Sì, l'app è una moderna Web App (PWA). Puoi aprirla da qualsiasi browser mobile e aggiungerla alla schermata Home (con 'Aggiungi a schermata Home' su Safari iOS o Chrome Android) per usarla comodamente a schermo intero come un'app nativa.",

    // Final CTA Section
    finalCtaTitle: "Pronto a calcolare il costo dei tuoi lavori?",
    finalCtaSubtitle: "Configura il tuo progetto in pochi clic e ottieni subito il preventivo dettagliato con confronto Fai da Te vs Professionista.",
    finalCtaBtn: "Calcola il costo adesso",
    finalCtaFeature1: "100% Gratuito",
    finalCtaFeature2: "Nessuna registrazione",
    finalCtaFeature3: "Risultato in meno di 2 minuti",

    // Common Footer
    footerShortDesc: "Stima all'istante materiali, manodopera e risparmio reale confrontando Fai da Te e Professionista con l'Intelligenza Artificiale.",
    footerDisclaimer: "Le stime sono indicative e non vincolanti.",
    developerCredit: "App sviluppata da sititicino.ch – sviluppo app su misura",
    navEstimate: "Stima",
    navFaq: "FAQ",
    footerLanguage: "Lingua",
    footerRights: "Tutti i diritti riservati.",

    // Privacy Page
    privacyPageTitle: "Informativa sulla Privacy & Protezione Dati",
    privacyPageSubtitle: "Trasparenza, riservatezza e conformità al Regolamento UE 2016/679 (GDPR)",
    privacyDraftBadge: "Informativa Definitiva",
    privacyDraftNotice: "Informativa aggiornata con i dati del Titolare del trattamento.",
    privacyControllerTitle: "Titolare del Trattamento dei Dati",
    privacyControllerName: "Titolare: Connect & Create Gabriele Sestito",
    privacyControllerAddress: "Sede legale: Morbio Inferiore, Ticino",
    privacyControllerEmail: "Email contatto privacy: info@sititicino.ch",
    privacySection1Title: "1. Dati del modulo e calcolo senza registrazione",
    privacySection1Text: "L'accesso e l'uso del preventivatore sono liberi, anonimi e non richiedono alcuna registrazione o account. I dati inseriti nel modulo (settore, lavorazioni scelte, misure, descrizione tecnica del lavoro, modalità operativa e paese per l'aliquota IVA) vengono elaborati al solo scopo di calcolare la stima dei costi, le quantità di materiali comprensive di percentuale di sfrido e l'intervallo d'opera per professionisti. I totali economici sono eseguiti con algoritmi matematici deterministici lato server e non vengono salvati in database associati all'identità personale dell'utente.",
    privacySection2Title: "2. Elaborazione tramite OpenRouter e modelli di intelligenza artificiale",
    privacySection2Text: "Per generare le note descrittive qualitative (valutazione di fattibilità, cronoprogramma indicativo, rischi per la sicurezza, DPI raccomandati e adempimenti normativi locali), l'applicazione trasmette la descrizione tecnica e le quantità dimensionali alle API di OpenRouter (https://openrouter.ai). Le chiamate utilizzano una catena di fallback resiliente (modelli come Gemini Flash, Llama e Gemma) attraverso connessioni cifrate HTTPS/TLS. In piena conformità alle condizioni contrattuali di OpenRouter, i dati inviati non vengono utilizzati per l'addestramento continuo dei modelli AI né ceduti a soggetti terzi.",
    privacySection3Title: "3. Trattamento delle foto del locale (esclusiva memoria volatile)",
    privacySection3Text: "Il caricamento delle foto del cantiere o del locale è puramente facoltativo (massimo 3 foto). Se l'utente sceglie di caricare immagini per agevolare l'ispezione o individuare difetti visibili, i file vengono convertiti ed elaborati esclusivamente nella memoria volatile (RAM) del server per il tempo strettamente necessario all'ispezione visiva da parte del modello AI multimodale. Nessun file immagine viene mai memorizzato in modo permanente su disco rigido, database o archivi di rete.",
    privacySection4Title: "4. Modulo facoltativo per professionisti (Lead) e archiviazione a 90 giorni",
    privacySection4Text: "La richiesta di preventivo a imprese e professionisti qualificati della propria zona è completamente facoltativa. Qualora l'utente decida di inviarla, vengono raccolti nome e cognome, indirizzo email, telefono (facoltativo), CAP e città, eventuali note e il riepilogo della stima generata. La base giuridica è il consenso espresso dell'utente (Art. 6, par. 1, lett. a del GDPR), espresso spuntando la casella obbligatoria. I dati dei lead vengono memorizzati in sicurezza su database Upstash Redis con una scadenza automatica (TTL) di 90 giorni, al termine dei quali vengono eliminati definitivamente. Il sistema non effettua invio di newsletter automatiche o comunicazioni promozionali massive.",
    privacySection5Title: "5. Nessun cookie di profilazione o tracciamento pubblicitario",
    privacySection5Text: "L'applicazione non utilizza cookie di profilazione, cookie pubblicitari o strumenti di tracciamento invasivo di terze parti. Viene impiegato unicamente lo storage locale del browser del client (localStorage) per salvare la preferenza della lingua selezionata ('preventivo_app_lang'), così da garantire la continuità di navigazione senza identificare l'utente né tracciarne i comportamenti.",
    privacySection6Title: "6. Infrastruttura di hosting e sicurezza (Vercel)",
    privacySection6Text: "L'applicazione e le relative funzioni serverless sono ospitate sull'infrastruttura di Vercel Inc. (Covina, CA, USA). Tutte le connessioni sono cifrate tramite protocollo SSL/TLS (HTTPS). I log di rete tecnici (come indirizzo IP, timestamp e user agent del browser) vengono gestiti da Vercel conformemente al proprio Data Processing Addendum (DPA) a fini esclusivi di sicurezza informatica, prevenzione di abusi (DDoS) e affidabilità del servizio.",
    privacySection7Title: "7. Diritti dell'interessato (GDPR Artt. 15-22)",
    privacySection7Text: "Ai sensi degli articoli 15-22 del GDPR, l'utente può richiedere in ogni momento l'accesso ai propri dati, la rettifica, la cancellazione (diritto all'oblio), la limitazione del trattamento o la revoca del consenso prestato per una richiesta di preventivo prima della scadenza naturale dei 90 giorni. Per esercitare tali diritti, è possibile contattare l'indirizzo: info@sititicino.ch.",
    privacyBackToHome: "Torna alla Home",
    privacyStartEstimate: "Inizia il preventivo",

    // SEO per-page metadata
    seoHomeTitle: "Preventivo Casa & Fai da Te AI – Calcolo Costi Ristrutturazione",
    seoHomeDesc: "Calcola preventivi di ristrutturazione e lavori in casa in 2 minuti. Confronta Fai da Te e Professionista con IVA e lista materiali calcolati con l'IA.",
    seoEstimateTitle: "Calcola Preventivo – Preventivo Casa & Fai da Te AI",
    seoEstimateDesc: "Configura il tuo cantiere in 4 passaggi: scegli lavorazioni, inserisci misure o carica foto, confronta Fai da Te e Professionista con prezzi territoriali.",
    seoPrivacyTitle: "Informativa sulla Privacy – Preventivo Casa & Fai da Te AI",
    seoPrivacyDesc: "Informativa sulla privacy di Preventivo Casa & Fai da Te AI: dati di calcolo, OpenRouter AI, foto in sola memoria e conformità GDPR.",

    // 404 Page
    notFoundTitle: "Pagina non trovata (404)",
    notFoundDesc: "La pagina che stai cercando non esiste o è stata spostata.",
    notFoundBtn: "Torna alla Home",

    // PWA & Install
    installAppBtn: "Installa App",
    pwaBannerTitle: "Usa l'app a tutto schermo",
    pwaBannerDesc: "Aggiungi il preventivatore alla tua schermata home per un accesso rapido e un'esperienza migliore.",
    pwaBannerInstall: "Installa ora",
    pwaBannerClose: "Chiudi",
    iosInstallGuideTitle: "Installa su iPhone / iPad",
    iosInstallGuideStep1: "Tocca il tasto **Condividi** nella barra di Safari.",
    iosInstallGuideStep2: "Scorri verso il basso e seleziona **Aggiungi alla schermata Home**.",
    iosInstallGuideGotIt: "Ho capito",
    standaloneHomeCta: "Nuova stima",
    standaloneHomeSubtitle: "Pronto per un nuovo progetto? Inizia subito il calcolo.",
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
    diyCardTime: "{days}T, {hours}Std",
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
    apiErrorGeneric: "Dienst vorübergehend nicht verfügbar, bitte versuchen Sie es in Kürze erneut.",

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

    // How It Works Section (4 Steps)
    howItWorksTitle: "So funktioniert es in 4 einfachen Schritten",
    howItWorksSubtitle: "Ein klarer, schneller und transparenter Ablauf, um Ihre Arbeiten in unter zwei Minuten zu berechnen.",
    howItWorksStep1Title: "1. Standort & MwSt.",
    howItWorksStep1Desc: "Wählen Sie Ihr Land (Italien, Schweiz, Deutschland, Frankreich, Spanien), um korrekte Mehrwertsteuersätze und regionale Preislisten anzuwenden.",
    howItWorksStep2Title: "2. Gewerk & Arbeiten",
    howItWorksStep2Desc: "Wählen Sie das Gewerk (Malerarbeiten, Fenster, Bodenbeläge, Sanitär, Elektro) und bestimmen Sie die Arbeiten aus dem Katalog.",
    howItWorksStep3Title: "3. Maße & Fotos",
    howItWorksStep3Desc: "Geben Sie Maße (m², lfm, Stück) ein und laden Sie optional bis zu 3 Raumfotos hoch, um den Zustand visuell zu analysieren.",
    howItWorksStep4Title: "4. Modus & Erfahrung",
    howItWorksStep4Desc: "Entscheiden Sie zwischen Heimwerken, Fachbetrieb oder Direktvergleich, angepasst an Materialqualität und Vorkenntnisse.",

    // What You Get Section (6 Cards)
    whatYouGetTitle: "Was Sie im Kostenvoranschlag erhalten",
    whatYouGetSubtitle: "Alle technischen und finanziellen Details für eine fundierte Entscheidung ohne böse Überraschungen.",
    cardDiyCostTitle: "Kosten für Heimwerker",
    cardDiyCostDesc: "Detaillierte Aufstellung der Materialkosten, Arbeitszeit in Stunden, Puffer für Unvorhergesehenes und MwSt. zu realen Marktpreisen.",
    cardProCostTitle: "Kosten Fachbetrieb",
    cardProCostDesc: "Realistischer Preisrahmen für schlüsselfertige Ausführung inklusive Facharbeitern, Baustellengeräten und gesetzlicher Gewährleistung.",
    cardSavingsTitle: "Echte Ersparnis im Vergleich",
    cardSavingsDesc: "Sofortiger Vergleich: Sehen Sie genau, wie viel Geld Sie bei Eigenleistung im Vergleich zur Beauftragung eines Betriebs sparen.",
    cardShoppingListTitle: "Einkaufsliste mit Verschnitt",
    cardShoppingListDesc: "Exakte Materialmengen inklusive Verschnittzuschlag (10–15% für Zuschnitt und Bruch), damit mitten im Projekt kein Material fehlt.",
    cardToolsTitle: "Werkzeuge: Kaufen oder Mieten",
    cardToolsDesc: "Für jedes benötigte Werkzeug berechnet die App, ob Kauf oder Tagesmiete wirtschaftlicher ist, mit Option 'Bereits vorhanden'.",
    cardSafetyPermitsTitle: "Sicherheit, Genehmigungen & Facharbeiten",
    cardSafetyPermitsDesc: "Wichtige Hinweise zu Schutzausrüstung (PSA), Baurecht vor Ort und Arbeiten, die gesetzlich zwingend Fachbetrieben vorbehalten sind.",

    // Supported Sectors Section & Honesty Note
    sectorsSectionTitle: "Für welche Gewerke geeignet",
    sectorsSectionSubtitle: "5 zentrale Baugewerke mit detaillierten Preislisten, typischen Arbeiten und Machbarkeitshinweisen.",
    sectorPainterTitle: "Maler / Raumausstatter",
    sectorPainterDesc: "Wandfarben, Spachtelarbeiten, Schimmelbehandlung, Tapeten, Glättetechniken und Gipskarton-Vorsatzschalen.",
    sectorTilerTitle: "Fliesenleger / Bodenleger",
    sectorTilerDesc: "Feinsteinzeug, Fertigparkett, Klick-Vinyl SPC, Bad- und Küchenverfliesung, Sockelleisten und Estrich.",
    sectorWindowsTitle: "Fensterbauer / Türen",
    sectorWindowsDesc: "PVC- und Aluminiumfenster, Innentüren, Sicherheitstüren, Insektenschutzgitter, Rollläden und Kasten-Dämmung.",
    sectorPlumberTitle: "Sanitär / Heizung",
    sectorPlumberDesc: "Leitungsneuverlegung, Sanitärobjekte, Armaturen, Split-Klimageräte, Brennwertthermen und Warmwasserbereiter.",
    sectorElectricianTitle: "Elektriker",
    sectorElectricianDesc: "Lichtauslässe, Sicherungskasten (FI), Videosprechanlagen, LED-Beleuchtung, Alarmanlagen, Smart Home und Wallboxen.",
    tradeHonestyTitle: "Transparenzhinweis zu Elektro- und Sanitärarbeiten",
    tradeHonestyDesc: "Aus Sicherheitsgründen und nach geltenden Vorschriften (wie DIN in Deutschland, SIA in der Schweiz, D.M. 37/08 in Italien, DTU in Frankreich) erfordern wesentliche Arbeiten an Strom- und Gasanlagen, Zählerkästen und Heizkesseln zwingend konzessionierte Fachbetriebe mit Abnahmeprotokoll. Die App weist transparent aus, welche leichten Arbeiten heimwerkertauglich sind und wo ein Fachbetrieb gesetzlich vorgeschrieben ist.",

    // Indicative Estimate Sample Section
    sampleSectionTitle: "Beispiel einer echten Kalkulation",
    sampleSectionSubtitle: "So sieht das fertige Ergebnis aus: Konsistente Zahlen direkt aus den hinterlegten Richtpreislisten.",
    sampleBadge: "Unverbindliches Beispiel",
    sampleJobTitle: "Malerarbeiten Wohnzimmer & Flur (45 m²)",
    sampleLocation: "Mailand, Italien • inkl. 10% MwSt.",
    sampleProTitle: "Fachbetrieb (Schlüsselfertig)",
    sampleProValue: "840 € – 1.100 €",
    sampleProSubtitle: "Inklusive Untergrundvorbereitung, Riss-Spachtelung, 2 Anstriche waschfeste Farbe und Endreinigung.",
    sampleDiyTitle: "Heimwerker (Material & Werkzeug)",
    sampleDiyValue: "225 € – 270 €",
    sampleDiySubtitle: "Inklusive Wandfarbe mit 10% Verschnitt, Tiefgrund, Abdeckvlies, Malerkrepp, Rollen und Pinsel.",
    sampleSavingsLabel: "Geschätzte Ersparnis bei Eigenleistung:",
    sampleSavingsValue: "~615 € – 830 € (ca. 73% günstiger)",
    sampleFeasibilityLabel: "Heimwerker-Machbarkeit:",
    sampleFeasibilityValue: "4/5 (Sehr hoch - ideal für Heimwerker mit Grundkenntnissen)",
    sampleTimeLabel: "Geschätzter Zeitaufwand:",
    sampleTimeValue: "16 – 18 Stunden (ca. 1 Wochenende)",
    sampleShoppingHeading: "Auszug aus der Einkaufsliste (inkl. 10% Verschnitt):",
    sampleShoppingItem1: "Atmungsaktive weiße Dispersionsfarbe: 2 Eimer à 14 L (inkl. 10% Verschnitt)",
    sampleShoppingItem2: "Tiefgrund / Acryl-Grundierung: 1 Kanister à 5 L",
    sampleShoppingItem3: "Reparaturspachtel für Putzrisse: 1 Dose à 1 kg + Edelstahl-Spachtel",
    sampleShoppingItem4: "Saugfähiges Malervlies und Feinkrepp zum Abkleben der Ränder: 3 Rollen",
    sampleToolsNote: "Empfohlenes Werkzeug: Profi-Farbroller mit Teleskopstange (Kauf ~45 €). Haushaltsleiter (bereits vorhanden: 0 €).",
    sampleSafetyNote: "Sicherheit: Räume während und nach dem Streichen gut lüften, Schutzbrille und Handschuhe tragen.",

    // Accessible FAQ Section (10 Q&A)
    faqSectionTitle: "Häufig gestellte Fragen",
    faqSectionSubtitle: "Klare, ehrliche Antworten, die sich exakt auf die tatsächlich im Code implementierten Funktionen stützen.",
    faqQ1: "Wie verlässlich ist die berechnete Kostenschätzung?",
    faqA1: "Die Schätzung bietet eine fundierte und realistische Orientierung basierend auf örtlichen Richtpreislisten und Materialkosten. Sie ist kein verbindliches Angebot: Wir empfehlen stets, vor Arbeitsbeginn 2-3 Angebote von Fachbetrieben einzuholen.",
    faqQ2: "Woher stammen die Preise für Material und Handwerker?",
    faqA2: "Aus der internen Datenbank der App, die aus regionalen Baukosten-Richtwerten, Großhandelspreisen für Baustoffe und durchschnittlichen Stundensätzen lokaler Handwerksbetriebe zusammengestellt ist.",
    faqQ3: "Welche Länder und Vorschriften werden unterstützt?",
    faqA3: "Aktuell 5 Länder: Italien, Schweiz, Deutschland, Frankreich und Spanien. Für jedes Land werden die geltenden Mehrwertsteuersätze und spezifischen baurechtlichen Rahmenbedingungen geladen.",
    faqQ4: "Ist die Nutzung wirklich kostenlos und ohne Registrierung?",
    faqA4: "Ja, zu 100%. Sie können beliebig viele Schätzungen direkt im Browser berechnen, ohne ein Kundenkonto anzulegen, ohne Passwörter und ohne Zahlungsdaten.",
    faqQ5: "Kann ich alle Arbeiten gefahrlos selbst ausführen?",
    faqA5: "Nein. Die App unterscheidet strikt zwischen Heimwerker-Arbeiten (wie Streichen oder Klick-Vinyl verlegen) und solchen, die aus Sicherheitsgründen oder gesetzlich Fachbetrieben vorbehalten sind (z. B. Gasanschlüsse, Hauptsicherungskästen).",
    faqQ6: "Sind die ausgewiesenen Preise inklusive Mehrwertsteuer?",
    faqA6: "Ja, alle Gesamtpreise, Materiallisten und schlüsselfertigen Angebote enthalten bereits die für das gewählte Land zutreffende Mehrwertsteuer.",
    faqQ7: "Kann sich die KI bei den Gesamtsummen verrechnen?",
    faqA7: "Nein. Mathematische Berechnungen, Multiplikationen, Verschnitt und Gesamtsummen werden ausnahmslos deterministisch über feste Rechenformeln auf dem Server ausgeführt, nicht von der KI erfunden. Die KI formuliert lediglich qualitative Empfehlungen.",
    faqQ8: "Was geschieht mit meinen Daten und der Privatsphäre?",
    faqA8: "Wir verzichten auf Tracking-Cookies. Die eingegebenen Daten dienen nur der Kalkulation. Falls Sie freiwillig Angebote von Handwerkern anfordern, werden Ihre Daten in einer gesicherten Datenbank mit 90 Tagen Speicherfrist verwahrt.",
    faqQ9: "Muss ich zwingend Fotos des Raumes hochladen?",
    faqA9: "Nein, Fotos sind absolut optional. Wenn Sie Fotos hochladen (bis zu 3), werden sie nur im flüchtigen Speicher analysiert, um Maße und Zustand zu prüfen, und nicht dauerhaft gespeichert.",
    faqQ10: "Kann ich die Anwendung auf dem Smartphone (Android/iOS) installieren?",
    faqA10: "Ja, die App ist eine Progressive Web App. Öffnen Sie sie im mobilen Browser und tippen Sie auf 'Zum Home-Bildschirm' (Safari iOS via Teilen-Symbol, Chrome Android via Drei-Punkte-Menü), um sie wie eine native App zu nutzen.",

    // Final CTA Section
    finalCtaTitle: "Bereit, Ihr Vorhaben zu kalkulieren?",
    finalCtaSubtitle: "Planen Sie Ihr Projekt in wenigen Klicks und erhalten Sie sofort den detaillierten Vergleich Heimwerker vs. Fachbetrieb.",
    finalCtaBtn: "Kosten jetzt berechnen",
    finalCtaFeature1: "100% Kostenlos",
    finalCtaFeature2: "Keine Registrierung",
    finalCtaFeature3: "Ergebnis in unter 2 Minuten",

    // Common Footer
    footerShortDesc: "Kalkulieren Sie Material, Arbeitszeit und Ersparnis im Vergleich Heimwerker vs. Fachbetrieb mit Künstlicher Intelligenz.",
    footerDisclaimer: "Die Schätzungen sind indikativ und unverbindlich.",
    developerCredit: "App entwickelt von sititicino.ch – maßgeschneiderte App-Entwicklung",
    navEstimate: "Kostenschätzung",
    navFaq: "FAQ",
    footerLanguage: "Sprache",
    footerRights: "Alle Rechte vorbehalten.",

    // Privacy Page
    privacyPageTitle: "Datenschutzerklärung & Datenschutz",
    privacyPageSubtitle: "Transparenz, Vertraulichkeit und Konformität mit der EU-Verordnung 2016/679 (DSGVO)",
    privacyDraftBadge: "Entwurf zur Überprüfung",
    privacyDraftNotice: "Hinweis: Technischer Vorab-Entwurf basierend auf den tatsächlichen Funktionalitäten der App. Vor der formellen oder geschäftlichen Veröffentlichung müssen die Platzhalterfelder [DA COMPILARE] mit den offiziellen Firmen- und Kontaktdaten des Verantwortlichen ausgefüllt werden.",
    privacyControllerTitle: "Verantwortliche Stelle für die Datenverarbeitung",
    privacyControllerName: "Verantwortlicher: [DA COMPILARE]",
    privacyControllerAddress: "Anschrift / Rechtssitz: [DA COMPILARE]",
    privacyControllerEmail: "Datenschutz-Kontakt-E-Mail: [DA COMPILARE]",
    privacySection1Title: "1. Formulardaten und Rechner ohne Registrierung",
    privacySection1Text: "Die Nutzung des Rechners ist kostenlos, anonym und erfordert kein Kundenkonto. Die eingegebenen Angaben (Gewerk, Arbeitspositionen, Maße, Freitextbeschreibung, Modus und Referenzland für den Mehrwertsteuersatz) werden ausschließlich zur Berechnung von Materialmengen, Verschnitt und Kostenintervallen verarbeitet. Alle wirtschaftlichen Berechnungen erfolgen deterministisch auf dem Server und werden nicht mit einer Benutzeridentität verknüpft.",
    privacySection2Title: "2. Verarbeitung über OpenRouter und KI-Modelle",
    privacySection2Text: "Für qualitative Analysen, Arbeitsschritte, Sicherheitshinweise und gesetzliche Bestimmungen sendet die App Projektparameter über verschlüsselte HTTPS-Verbindungen an die OpenRouter-Schnittstelle (https://openrouter.ai). Zum Einsatz kommt eine Ausfallkette mit Modellen wie Gemini Flash, Llama und Gemma. Gemäß den Geschäftsbedingungen von OpenRouter werden Daten nicht zum Modelltraining verwendet oder weitergegeben.",
    privacySection3Title: "3. Raumfotos (ausschließlich flüchtiger Arbeitsspeicher)",
    privacySection3Text: "Das Hochladen von Fotos ist vollkommen freiwillig (bis zu 3 Bilder). Fotos werden ausschließlich im flüchtigen Arbeitsspeicher (RAM) des Servers verarbeitet, um den Zustand der Oberflächen zu analysieren und Maße zu schätzen. Es erfolgt keinerlei dauerhafte Speicherung auf Festplatten oder Datenbanken.",
    privacySection4Title: "4. Freiwillige Fachbetriebsanfragen (Leads) & 90 Tage Speicherdauer",
    privacySection4Text: "Die Vermittlung von Angeboten lokaler Handwerksbetriebe ist optional. Bei Absenden werden Name, E-Mail, Telefon (optional), PLZ, Ort und Schätzungsdetails auf Basis Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) in einer geschützten Upstash-Redis-Datenbank mit einer maximalen Frist (TTL) von 90 Tagen gespeichert und danach automatisch gelöscht. Es werden keine automatischen Werbemails oder Newsletter versendet.",
    privacySection5Title: "5. Keine Profiling-Cookies oder Werbe-Tracker",
    privacySection5Text: "Die Anwendung verwendet keinerlei Tracking-, Profiling- oder Werbe-Cookies von Drittanbietern. Lediglich im lokalen Browserspeicher (localStorage) wird die gewählte Sprachpräferenz ('preventivo_app_lang') gesichert, um das Benutzererlebnis ohne Nutzeridentifizierung zu gewährleisten.",
    privacySection6Title: "6. Hosting-Infrastruktur & Sicherheit (Vercel)",
    privacySection6Text: "Die Anwendung wird auf der Serverless- und CDN-Infrastruktur von Vercel Inc. (USA) betrieben. Die Datenübertragung ist per SSL/TLS (HTTPS) verschlüsselt. Technische Verbindungsprotokolle (IP-Adresse, Zeitstempel, Browserkennung) verarbeitet Vercel gemäß Auftragsverarbeitungsvertrag (AVV) ausschließlich zur Absicherung und Angriffsabwehr.",
    privacySection7Title: "7. Rechte der betroffenen Person (DSGVO Art. 15-22)",
    privacySection7Text: "Sie haben nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung (Recht auf Vergessenwerden) sowie Einschränkung der Datenverarbeitung oder den Widerruf Ihrer Einwilligung bezüglich einer Lead-Anfrage vor Ablauf der 90 Tage. Wenden Sie sich hierzu an: [DA COMPILARE].",
    privacyBackToHome: "Zurück zur Startseite",
    privacyStartEstimate: "Jetzt schätzen",

    // SEO per-page metadata
    seoHomeTitle: "Haus- & Heimwerker-Rechner AI – Renovierungskosten kalkulieren",
    seoHomeDesc: "Kalkulieren Sie Renovierungskosten für Ihr Zuhause in 2 Minuten. Vergleichen Sie Heimwerken vs. Fachbetrieb mit MwSt. und Materialliste dank KI.",
    seoEstimateTitle: "Angebot berechnen – Haus- & Heimwerker-Rechner AI",
    seoEstimateDesc: "Konfigurieren Sie Ihr Projekt in 4 Schritten: Gewerk wählen, Maße eingeben oder Fotos hochladen, Heimwerker vs. Profi vergleichen.",
    seoPrivacyTitle: "Datenschutzerklärung – Haus- & Heimwerker-Rechner AI",
    seoPrivacyDesc: "Datenschutzerklärung für Haus- & Heimwerker-Rechner AI: Datenverarbeitung, OpenRouter-KI, Fotos im Arbeitsspeicher und DSGVO-Konformität.",

    // 404 Page
    notFoundTitle: "Seite nicht gefunden (404)",
    notFoundDesc: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
    notFoundBtn: "Zurück zur Startseite",

    // PWA & Install
    installAppBtn: "App installieren",
    pwaBannerTitle: "App im Vollbildmodus nutzen",
    pwaBannerDesc: "Fügen Sie den Rechner zu Ihrem Home-Bildschirm hinzu, um einen schnellen Zugriff und ein besseres Erlebnis zu erhalten.",
    pwaBannerInstall: "Jetzt installieren",
    pwaBannerClose: "Schließen",
    iosInstallGuideTitle: "Auf iPhone / iPad installieren",
    iosInstallGuideStep1: "Tippen Sie in Safari auf die **Teilen**-Schaltfläche.",
    iosInstallGuideStep2: "Wählen Sie **Zum Home-Bildschirm hinzufügen**.",
    iosInstallGuideGotIt: "Verstanden",
    standaloneHomeCta: "Neue Schätzung",
    standaloneHomeSubtitle: "Bereit für ein neues Projekt? Starten Sie jetzt die Berechnung.",
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
    diyCardTime: "{days}j, {hours}h",
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
    apiErrorGeneric: "Service temporairement indisponible, veuillez réessayer dans un moment.",

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

    // How It Works Section (4 Steps)
    howItWorksTitle: "Comment ça marche en 4 étapes simples",
    howItWorksSubtitle: "Un parcours clair, rapide et transparent pour estimer vos travaux en moins de deux minutes.",
    howItWorksStep1Title: "1. Localisation et TVA",
    howItWorksStep1Desc: "Sélectionnez votre pays (Italie, Suisse, Allemagne, France, Espagne) pour appliquer les taux de TVA exacts et les barèmes locaux.",
    howItWorksStep2Title: "2. Corps d'état et Travaux",
    howItWorksStep2Desc: "Choisissez le corps de métier (peinture, menuiserie, carrelage, plomberie, électricité) et sélectionnez les prestations précises.",
    howItWorksStep3Title: "3. Mesures et Photos",
    howItWorksStep3Desc: "Indiquez les quantités (m², ml, unités) et, si souhaité, téléversez jusqu'à 3 photos de la pièce pour évaluer son état.",
    howItWorksStep4Title: "4. Mode et Compétences",
    howItWorksStep4Desc: "Choisissez d'évaluer le Do It Yourself, un Professionnel ou de comparer les deux, selon vos compétences et la qualité choisie.",

    // What You Get Section (6 Cards)
    whatYouGetTitle: "Ce que vous obtenez dans votre devis",
    whatYouGetSubtitle: "Tous les détails techniques et financiers pour décider sereinement sans mauvaise surprise.",
    cardDiyCostTitle: "Coût Do It Yourself",
    cardDiyCostDesc: "Estimation analytique des matériaux nécessaires, temps de travail en heures, imprévus et TVA comprise selon les prix réels du marché.",
    cardProCostTitle: "Coût avec Professionnel",
    cardProCostDesc: "Fourchette réaliste pour une prestation 'clé en main', incluant main-d'œuvre qualifiée, équipement de chantier et garantie légale.",
    cardSavingsTitle: "Économies réelles estimées",
    cardSavingsDesc: "Comparatif direct calculant le montant économisé en réalisant les travaux vous-même par rapport à une entreprise qualifiée.",
    cardShoppingListTitle: "Liste de courses avec surplus",
    cardShoppingListDesc: "Quantités précises de fournitures incluant le surplus de coupe (10 à 15% de chutes) pour éviter toute rupture en plein chantier.",
    cardToolsTitle: "Outillage : Achat ou location",
    cardToolsDesc: "Pour chaque outil nécessaire, l'application évalue la rentabilité d'un achat par rapport à une location à la journée.",
    cardSafetyPermitsTitle: "Sécurité, permis et travaux réservés",
    cardSafetyPermitsDesc: "Signalement des équipements de protection (EPI), des autorisations locales et des travaux légalement interdits en bricolage (ex. DTU).",

    // Supported Sectors Section & Honesty Note
    sectorsSectionTitle: "Pour quels types de travaux",
    sectorsSectionSubtitle: "5 corps d'état du bâtiment avec listes de prix détaillées, descriptifs techniques et faisabilité.",
    sectorPainterTitle: "Peintre / Décorateur",
    sectorPainterDesc: "Peintures lavables, enduits de lissage au plâtre, traitements anti-moisissures, papier peint et doublages en plaques de plâtre.",
    sectorTilerTitle: "Carreleur / Solier",
    sectorTilerDesc: "Pose de grès cérame, parquet contrecollé, lames vinyles clipsables SPC, faïence salle de bain/cuisine, plinthes et chapes.",
    sectorWindowsTitle: "Menuisier / Fermetures",
    sectorWindowsDesc: "Fenêtres PVC et aluminium à rupture de pont thermique, portes blindées, moustiquaires, volets roulants et isolation de coffres.",
    sectorPlumberTitle: "Plombier / Chauffagiste",
    sectorPlumberDesc: "Rénovation réseau d'eau, sanitaires, robinetterie, climatiseurs split, chaudières à condensation et chauffe-eau.",
    sectorElectricianTitle: "Électricien",
    sectorElectricianDesc: "Points lumineux, tableau divisionnaire et disjoncteur différentiel, visiophonie, éclairage LED, domotique et bornes de recharge Wallbox.",
    tradeHonestyTitle: "Note de transparence sur l'Électricité et la Plomberie",
    tradeHonestyDesc: "Pour votre sécurité et conformément aux réglementations (DTU et Consuel en France, D.M. 37/08 en Italie, normes SIA en Suisse, DIN en Allemagne, CTE en Espagne), les interventions lourdes sur les installations électriques, le gaz, les chaudières et les conduits d'évacuation exigent l'intervention d'artisans certifiés avec attestation de conformité. L'outil indique avec franchise les menues réparations accessibles aux bricoleurs et les chantiers obligatoirement réservés aux professionnels.",

    // Indicative Estimate Sample Section
    sampleSectionTitle: "Exemple réel de devis",
    sampleSectionSubtitle: "Aperçu concret du résultat généré : des montants cohérents issus directement des barèmes de l'application.",
    sampleBadge: "Exemple indicatif",
    sampleJobTitle: "Peinture salon et dégagement (45 m²)",
    sampleLocation: "Milan, Italie • TVA 10% incluse",
    sampleProTitle: "Devis Entreprise (Clé en main)",
    sampleProValue: "840 € – 1.100 €",
    sampleProSubtitle: "Comprend préparation des supports, rebouchage des fissures, 2 couches de peinture lavable et nettoyage de fin de chantier.",
    sampleDiyTitle: "Coût Do It Yourself (Fournitures & Outils)",
    sampleDiyValue: "225 € – 270 €",
    sampleDiySubtitle: "Comprend peinture avec 10% de surplus, primaire fixateur, bâches, ruban de masquage et kit rouleaux/pinceaux.",
    sampleSavingsLabel: "Économie estimée en bricolant :",
    sampleSavingsValue: "~615 € – 830 € (environ 73% d'économie)",
    sampleFeasibilityLabel: "Faisabilité Do It Yourself :",
    sampleFeasibilityValue: "4/5 (Très accessible - idéal pour bricoleurs réguliers)",
    sampleTimeLabel: "Temps estimé de réalisation :",
    sampleTimeValue: "16 – 18 heures (environ 1 week-end)",
    sampleShoppingHeading: "Extrait de la liste de courses (avec 10% de surplus) :",
    sampleShoppingItem1: "Peinture intérieure mate lavable blanche : 2 fûts de 14 L (surplus 10% inclus)",
    sampleShoppingItem2: "Sous-couche d'impression isolante acrylique : 1 bidon de 5 L",
    sampleShoppingItem3: "Enduit de rebouchage en pâte pour micro-fissures : 1 pot de 1 kg + couteau à enduire",
    sampleShoppingItem4: "Bâches de protection étanches et ruban de masquage de précision : 3 rouleaux",
    sampleToolsNote: "Outillage recommandé : Kit rouleau anti-goutte avec perche télescopique (achat ~45 €). Escabeau de ménage (déjà possédé : 0 €).",
    sampleSafetyNote: "Sécurité : Aérer largement les pièces pendant l'application, porter des lunettes de protection et des gants adaptés.",

    // Accessible FAQ Section (10 Q&A)
    faqSectionTitle: "Foire Aux Questions",
    faqSectionSubtitle: "Des réponses claires et honnêtes basées uniquement sur les fonctionnalités réellement développées dans le code.",
    faqQ1: "Quelle est la fiabilité du devis généré par l'application ?",
    faqA1: "Le devis constitue un repère économique réaliste et transparent, basé sur les prix moyens du marché et le coût réel des fournitures. Il ne constitue pas une offre contractuelle : nous recommandons de toujours demander 2 à 3 devis écrits à des artisans qualifiés avant d'engager vos travaux.",
    faqQ2: "D'où proviennent les prix des matériaux et de la main-d'œuvre ?",
    faqA2: "Les tarifs proviennent de la base de données interne de l'application, calibrée d'après les bordereaux de prix régionaux du bâtiment, les tarifs de distributeurs de matériaux et les taux horaires moyens des artisans par pays.",
    faqQ3: "Quels pays et quelles réglementations sont pris en charge ?",
    faqA3: "5 pays sont actuellement supportés : l'Italie, la Suisse, l'Allemagne, la France et l'Espagne. Pour chaque pays, les taux de TVA applicables et les exigences normatives locales sont automatiquement chargés.",
    faqQ4: "L'application est-elle réellement gratuite et sans inscription ?",
    faqA4: "Oui, à 100%. Vous pouvez calculer autant de devis que vous le souhaitez directement dans votre navigateur, sans créer de compte, sans mot de passe et sans carte bancaire.",
    faqQ5: "Puis-je réaliser l'ensemble des travaux moi-même ?",
    faqA5: "Non. L'outil distingue strictement les travaux accessibles aux particuliers (peinture, sol clipsable, robinetterie) de ceux obligatoirement réservés par la loi ou pour votre sécurité à des professionnels agréés (gaz, tableau électrique général, conduits de fumée).",
    faqQ6: "Les prix indiqués comprennent-ils la TVA ?",
    faqA6: "Oui, l'ensemble des estimations, détails de matériaux et montants 'clé en main' incluent la TVA selon le taux sélectionné pour le pays concerné (ex. taux intermédiaire travaux ou taux normal).",
    faqQ7: "L'Intelligence Artificielle peut-elle se tromper dans les totaux ?",
    faqA7: "Non. Les calculs arithmétiques, l'application des surfaces, le surplus et les totaux financiers sont exécutés par des algorithmes mathématiques fixes sur le serveur, et non inventés par l'IA. L'IA intervient uniquement pour rédiger des conseils techniques et des observations qualitatives.",
    faqQ8: "Comment mes données personnelles et ma vie privée sont-elles protégées ?",
    faqA8: "Nous n'utilisons aucun cookie de ciblage publicitaire. Les données saisies servent uniquement au calcul du devis. Si vous choisissez de demander des offres d'artisans locaux, vos coordonnées sont sécurisées avec une durée de conservation limitée à 90 jours.",
    faqQ9: "Est-il obligatoire de fournir des photos de la pièce ?",
    faqA9: "Non, l'ajout de photos est totalement facultatif. Si vous en chargez (jusqu'à 3), elles sont traitées temporairement en mémoire vive pour analyser l'état des murs et ne sont jamais stockées sur nos serveurs.",
    faqQ10: "Puis-je installer l'application sur mon smartphone (Android ou iPhone) ?",
    faqA10: "Oui, il s'agit d'une Progressive Web App. Ouvrez-la sur votre navigateur mobile et sélectionnez 'Sur l'écran d'accueil' (via le bouton Partager sur Safari iOS ou le menu à trois points sur Chrome Android) pour l'utiliser en plein écran comme une application native.",

    // Final CTA Section
    finalCtaTitle: "Prêt à estimer le coût de vos travaux ?",
    finalCtaSubtitle: "Configurez votre projet en quelques clics et obtenez immédiatement votre comparatif complet Do It Yourself vs Professionnel.",
    finalCtaBtn: "Calculer le devis maintenant",
    finalCtaFeature1: "100% Gratuit",
    finalCtaFeature2: "Sans inscription",
    finalCtaFeature3: "Résultat en moins de 2 minutes",

    // Common Footer
    footerShortDesc: "Estimez les matériaux, la main-d'œuvre et les économies réelles en comparant Fait Maison (DIY) et Artisan qualifié grâce à l'IA.",
    footerDisclaimer: "Les estimations sont indicatives et non contractuelles.",
    developerCredit: "Application développée par sititicino.ch – développement d'applications sur mesure",
    navEstimate: "Estimation",
    navFaq: "FAQ",
    footerLanguage: "Langue",
    footerRights: "Tous droits réservés.",

    // Privacy Page
    privacyPageTitle: "Politique de Confidentialité & Protection des Données",
    privacyPageSubtitle: "Transparence, confidentialité et conformité au Règlement UE 2016/679 (RGPD)",
    privacyDraftBadge: "Brouillon à vérifier",
    privacyDraftNotice: "Note : brouillon technique préalable basé sur l'architecture opérationnelle de l'application. Avant toute exploitation formelle ou commerciale, les mentions indicatives [DA COMPILARE] doivent être complétées par les coordonnées administratives du Responsable de traitement.",
    privacyControllerTitle: "Responsable du Traitement des Données",
    privacyControllerName: "Responsable : [DA COMPILARE]",
    privacyControllerAddress: "Siège social : [DA COMPILARE]",
    privacyControllerEmail: "Email de contact DPO / Confidentialité : [DA COMPILARE]",
    privacySection1Title: "1. Données du formulaire et simulateur sans inscription",
    privacySection1Text: "L'accès et l'utilisation du simulateur de devis sont libres, gratuits, anonymes et ne requièrent aucune création de compte. Les paramètres saisis (secteur de travaux, prestations sélectionnées, mesures, descriptif libre, options d'exécution et pays pour le taux de TVA) sont analysés dans le seul but de calculer le coût prévisionnel des fournitures avec marge de chute et les fourchettes tarifaires d'artisans qualifiés. Tous les totaux financiers sont déterminés côté serveur de façon stricte et ne sont jamais enregistrés dans une base associée à l'identité d'un utilisateur.",
    privacySection2Title: "2. Traitement via OpenRouter et modèles d'IA",
    privacySection2Text: "Pour produire l'analyse qualitative de faisabilité, les étapes de mise en œuvre, les consignes de sécurité et les obligations réglementaires locales, l'application transmet les spécifications du chantier à l'interface d'OpenRouter (https://openrouter.ai). Le système met en œuvre une chaîne de redondance robuste (modèles Gemini Flash, Llama et Gemma) sous protocole sécurisé HTTPS/TLS. Conformément aux engagements de service d'OpenRouter, les requêtes ne sont en aucun cas réutilisées pour entraîner les modèles d'IA ni commercialisées à des tiers.",
    privacySection3Title: "3. Traitement des photos du chantier (mémoire vive volatile uniquement)",
    privacySection3Text: "Le téléversement de photos de la pièce ou du chantier est facultatif (3 clichés au maximum). Lorsqu'elles sont transmises, les images sont examinées temporairement dans la mémoire vive (RAM) du serveur durant l'inférence visuelle par le modèle multimodal pour diagnostiquer l'état des subjectiles ou évaluer les dimensions. Aucun fichier image n'est conservé de façon durable sur disque dur, serveur de fichiers ou base de données.",
    privacySection4Title: "4. Formulaire facultatif de devis auprès de professionnels (Leads) et rétention 90 jours",
    privacySection4Text: "La mise en relation avec des professionnels ou entreprises locales partenaires est entièrement optionnelle. Si l'utilisateur valide l'envoi, les champs renseignés (nom, prénom, adresse email, téléphone optionnel, code postal et ville, notes et synthèse d'estimation) sont recueillis sur la base de son consentement exprès (Art. 6, par. 1, let. a du RGPD). Ces données sont stockées de manière sécurisée sur une base Upstash Redis avec une durée de conservation limitée (TTL) de 90 jours, à l'issue de laquelle elles sont automatiquement effacées. Le service n'émet aucun message de prospection publicitaire de masse.",
    privacySection5Title: "5. Absence de cookies de profilage et de traceurs publicitaires",
    privacySection5Text: "L'application ne déploie aucun cookie de profilage, cookie publicitaire ou système de suivi invasif de tiers. Seul le stockage local du navigateur client (localStorage) est sollicité pour retenir la langue d'interface ('preventivo_app_lang'), assurant une navigation personnalisée sans collecter d'informations comportementales.",
    privacySection6Title: "6. Hébergement et sécurité de l'infrastructure (Vercel)",
    privacySection6Text: "L'application et les fonctions serverless sont hébergées sur le cloud mondial de Vercel Inc. (Covina, CA, USA). Les flux réseau bénéficient du chiffrement SSL/TLS (HTTPS). Les métadonnées techniques de connexion (adresse IP, horodatage, agent utilisateur) sont gérées par Vercel selon son addenda sur le traitement des données (DPA) à des fins exclusives de sécurité, d'atténuation DDoS et de bon fonctionnement opérationnel.",
    privacySection7Title: "7. Droits de l'utilisateur (RGPD Art. 15-22)",
    privacySection7Text: "En vertu des articles 15 à 22 du RGPD, vous bénéficiez des droits d'accès, de rectification, d'effacement (droit à l'oubli) et de limitation du traitement de vos données, ainsi que de la possibilité de révoquer à tout moment votre accord pour une demande de devis avant le terme des 90 jours. Pour exercer ces prérogatives, contactez : [DA COMPILARE].",
    privacyBackToHome: "Retour à l'accueil",
    privacyStartEstimate: "Commencer l'estimation",

    // SEO per-page metadata
    seoHomeTitle: "Calculateur Maison & Bricolage IA – Devis Travaux & Rénovation",
    seoHomeDesc: "Estimez le coût de vos travaux en 2 minutes. Comparez DIY et artisan qualifié avec TVA locale et liste de matériaux calculées par l'IA.",
    seoEstimateTitle: "Calculer le devis – Calculateur Maison & Bricolage IA",
    seoEstimateDesc: "Configurez votre projet en 4 étapes : sélectionnez les prestations, indiquez les mesures et comparez DIY vs. Professionnel.",
    seoPrivacyTitle: "Politique de Confidentialité – Calculateur Maison & Bricolage IA",
    seoPrivacyDesc: "Politique de confidentialité de Calculateur Maison & Bricolage IA : traitement des données, IA OpenRouter, photos en mémoire et conformité RGPD.",

    // 404 Page
    notFoundTitle: "Page non trouvée (404)",
    notFoundDesc: "La page demandée n'existe pas ou a été déplacée.",
    notFoundBtn: "Retour à l'accueil",

    // PWA & Install
    installAppBtn: "Installer l'appli",
    pwaBannerTitle: "Utiliser l'appli plein écran",
    pwaBannerDesc: "Ajoutez le simulateur à votre écran d'accueil pour un accès rapide et une meilleure expérience.",
    pwaBannerInstall: "Installer maintenant",
    pwaBannerClose: "Fermer",
    iosInstallGuideTitle: "Installer sur iPhone / iPad",
    iosInstallGuideStep1: "Appuyez sur le bouton **Partager** dans la barre Safari.",
    iosInstallGuideStep2: "Faites défiler et sélectionnez **Sur l'écran d'accueil**.",
    iosInstallGuideGotIt: "J'ai compris",
    standaloneHomeCta: "Nouvelle estimation",
    standaloneHomeSubtitle: "Prêt pour un nouveau projet ? Commencez le calcul maintenant.",
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
    diyCardTime: "{days}d, {hours}h",
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
    apiErrorGeneric: "Service temporarily unavailable, please try again shortly.",

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

    // How It Works Section (4 Steps)
    howItWorksTitle: "How it works in 4 simple steps",
    howItWorksSubtitle: "A smooth, fast, and transparent process to calculate your project in under 2 minutes.",
    howItWorksStep1Title: "1. Location & VAT",
    howItWorksStep1Desc: "Select your country (Italy, Switzerland, Germany, France, Spain) to apply accurate VAT rates and regional price lists.",
    howItWorksStep2Title: "2. Trade & Tasks",
    howItWorksStep2Desc: "Choose the trade sector (painting, windows, flooring, plumbing, electrical) and pick specific items from the catalog.",
    howItWorksStep3Title: "3. Dimensions & Photos",
    howItWorksStep3Desc: "Enter quantities (sqm, linear meters, units) and optionally upload up to 3 room photos for condition inspection.",
    howItWorksStep4Title: "4. Mode & Experience",
    howItWorksStep4Desc: "Choose DIY, Professional, or compare both, tailoring material quality tiers and your personal DIY experience.",

    // What You Get Section (6 Cards)
    whatYouGetTitle: "What you get in your estimate",
    whatYouGetSubtitle: "Every technical and financial detail you need to make confident decisions without surprises.",
    cardDiyCostTitle: "DIY Cost Breakdown",
    cardDiyCostDesc: "Analytical breakdown of materials, estimated working hours, contingency buffer, and VAT included based on retail market rates.",
    cardProCostTitle: "Professional Contractor Cost",
    cardProCostDesc: "Realistic price range for turnkey completion, including specialized skilled labor, site equipment, and statutory warranty.",
    cardSavingsTitle: "Estimated Real Savings",
    cardSavingsDesc: "Instant comparison calculating the actual money saved by completing the work yourself versus hiring a qualified contractor.",
    cardShoppingListTitle: "Shopping List with Scrap Margin",
    cardShoppingListDesc: "Precise material quantities including calculated scrap allowance (10-15% for cuts and waste) so you never run out mid-job.",
    cardToolsTitle: "Tools: Purchase vs. Rental",
    cardToolsDesc: "For each required tool (scaffolds, sanders, mixers, rollers), the app calculates whether buying or renting per day is more economical.",
    cardSafetyPermitsTitle: "Safety, Permits & Reserved Works",
    cardSafetyPermitsDesc: "Clear notices on mandatory safety gear (PPE), local building permits, and works legally reserved for certified professionals.",

    // Supported Sectors Section & Honesty Note
    sectorsSectionTitle: "Supported Trade Sectors",
    sectorsSectionSubtitle: "5 core building trades with detailed price schedules, typical tasks, and feasibility ratings.",
    sectorPainterTitle: "Painter & Decorator",
    sectorPainterDesc: "Washable interior paints, skim coating, anti-mold treatments, wallpaper, decorative glazes, and plasterboard drywalls.",
    sectorTilerTitle: "Tiler & Floor Layer",
    sectorTilerDesc: "Porcelain tile installation, engineered wood parquet, click SPC vinyl, bathroom/kitchen wall tiling, baseboards, and screeds.",
    sectorWindowsTitle: "Window & Door Installer",
    sectorWindowsDesc: "PVC and aluminum thermal break windows, armored doors, interior doors, roller insect screens, and shutter box insulation.",
    sectorPlumberTitle: "Plumber & Heating Engineer",
    sectorPlumberDesc: "Water piping replacement, bathroom fixtures, faucets, split air conditioners, condensing boilers, and water heaters.",
    sectorElectricianTitle: "Electrician",
    sectorElectricianDesc: "Light fixtures, distribution boards (RCD), video doorbells, LED strips, burglar alarms, smart home, and EV Wallbox chargers.",
    tradeHonestyTitle: "Transparency Note on Electrical & Plumbing Work",
    tradeHonestyDesc: "For your safety and in compliance with regulations (such as D.M. 37/08 in Italy, SIA standards in Switzerland, DIN in Germany, DTU in France, CTE in Spain), complex works on electrical distribution boards, gas lines, boilers, and structural pipes strictly require licensed contractors and statutory certificates of conformity. The app transparently specifies which minor tasks are safe for DIY and which must be entrusted to a qualified firm.",

    // Indicative Estimate Sample Section
    sampleSectionTitle: "Real Estimate Example",
    sampleSectionSubtitle: "Here is what the generated report looks like: realistic figures derived directly from the application's price lists.",
    sampleBadge: "Indicative Example",
    sampleJobTitle: "Living room and hallway painting (45 sqm)",
    sampleLocation: "Milan, Italy • 10% VAT included",
    sampleProTitle: "Contractor Turnkey Quote",
    sampleProValue: "840 € – 1.100 €",
    sampleProSubtitle: "Includes surface prep, crack patching, 2 coats of washable paint, and final post-job clean-up.",
    sampleDiyTitle: "DIY Cost (Materials & Tools)",
    sampleDiyValue: "225 € – 270 €",
    sampleDiySubtitle: "Includes paint with 10% scrap allowance, sealing primer, drop cloths, masking tape, and roller/brush kit.",
    sampleSavingsLabel: "Estimated DIY savings:",
    sampleSavingsValue: "~615 € – 830 € (approx. 73% lower)",
    sampleFeasibilityLabel: "DIY Feasibility Rating:",
    sampleFeasibilityValue: "4/5 (Very high - suitable for enthusiasts with basic manual skills)",
    sampleTimeLabel: "Estimated execution time:",
    sampleTimeValue: "16 – 18 hours (approx. 1 weekend)",
    sampleShoppingHeading: "Shopping list excerpt (with 10% scrap margin):",
    sampleShoppingItem1: "Washable breathable white emulsion paint: 2 buckets of 14 L (10% scrap included)",
    sampleShoppingItem2: "Acrylic insulating primer: 1 can of 5 L",
    sampleShoppingItem3: "Wall filler paste for cracks and pinholes: 1 tub of 1 kg + stainless spatula",
    sampleShoppingItem4: "Absorbent drop cloths and precision edge masking tape: 3 rolls",
    sampleToolsNote: "Recommended tools: Professional anti-drip roller kit with telescopic pole (~€45 purchase). Step ladder (already owned: €0).",
    sampleSafetyNote: "Safety: Ensure ample ventilation during painting, and wear protective goggles and latex gloves.",

    // Accessible FAQ Section (10 Q&A)
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionSubtitle: "Concise and transparent answers based solely on features actually implemented in the codebase.",
    faqQ1: "How reliable is the estimate generated by the app?",
    faqA1: "The estimate provides a sound and realistic financial benchmark based on local industry price lists and actual retail material costs. It is not a binding commercial contract: we always recommend obtaining 2 to 3 written bids from licensed contractors before starting work.",
    faqQ2: "Where do material and labor prices come from?",
    faqA2: "Prices originate from the app's internal database, calibrated on regional building cost benchmarks, retail distributor catalogs, and average local hourly rates for each supported country.",
    faqQ3: "Which countries and regulations are currently supported?",
    faqA3: "5 countries are currently supported: Italy, Switzerland, Germany, France, and Spain. Applicable territorial VAT rates and local statutory frameworks are loaded for each nation.",
    faqQ4: "Is the application truly free and without registration?",
    faqA4: "Yes, 100%. You can run as many estimates as you need directly in your browser without creating an account, without passwords, and without credit card details.",
    faqQ5: "Can I do everything myself with DIY?",
    faqA5: "No. The application strictly distinguishes between accessible DIY tasks (such as painting, floating floors, or fixture swaps) and interventions reserved by law or safety regulations for licensed professionals (e.g. gas hookups, consumer units, flues).",
    faqQ6: "Are displayed prices inclusive of VAT?",
    faqA6: "Yes, all total costs, itemized shopping lists, and turnkey contractor ranges clearly display figures inclusive of VAT calibrated to the selected country's applicable tax rate.",
    faqQ7: "Can the AI make mistakes on price totals?",
    faqA7: "No. Mathematical computations, quantities, scrap margins, and final totals are calculated deterministically on the server using fixed formulas, never fabricated by the AI. The AI model only supplies qualitative technical advice and safety observations.",
    faqQ8: "How are my data and privacy protected?",
    faqA8: "We respect your privacy: we do not use profiling or ad tracking cookies. Form inputs are used strictly to compute the estimate. If you optionally submit a request for local contractor bids, your contact details are kept in a secure database with a 90-day retention limit.",
    faqQ9: "Is it mandatory to upload photos of the room?",
    faqA9: "No, photo upload is entirely optional. If you choose to upload photos (up to 3), vision AI analyzes them in volatile memory only to check room conditions and cracks, and they are never stored permanently on our servers.",
    faqQ10: "Can I install the application on my phone (Android or iOS)?",
    faqA10: "Yes, the app is a responsive Progressive Web App. Open it in your mobile browser and select 'Add to Home Screen' (via the Share button on Safari iOS or the three-dot menu on Chrome Android) to use it full-screen just like a native app.",

    // Final CTA Section
    finalCtaTitle: "Ready to estimate the cost of your project?",
    finalCtaSubtitle: "Set up your project in a few clicks and immediately get a detailed estimate comparing DIY versus professional hiring.",
    finalCtaBtn: "Calculate cost now",
    finalCtaFeature1: "100% Free",
    finalCtaFeature2: "No registration required",
    finalCtaFeature3: "Results in under 2 minutes",

    // Common Footer
    footerShortDesc: "Instantly estimate renovation costs, compare DIY vs. Professional contractors, and calculate materials, waste, and local VAT with AI.",
    footerDisclaimer: "Estimates are indicative and non-binding.",
    developerCredit: "App developed by sititicino.ch – custom app development",
    navEstimate: "Estimate",
    navFaq: "FAQ",
    footerLanguage: "Language",
    footerRights: "All rights reserved.",

    // Privacy Page
    privacyPageTitle: "Privacy Policy & Data Protection",
    privacyPageSubtitle: "Transparency, confidentiality, and compliance with EU Regulation 2016/679 (GDPR)",
    privacyDraftBadge: "Finalized Privacy Policy",
    privacyDraftNotice: "Privacy policy updated with the Data Controller details.",
    privacyControllerTitle: "Data Controller Details",
    privacyControllerName: "Controller: Connect & Create Gabriele Sestito",
    privacyControllerAddress: "Registered Office: Morbio Inferiore, Ticino",
    privacyControllerEmail: "Privacy Contact Email: info@sititicino.ch",
    privacySection1Title: "1. Form parameters and calculator without registration",
    privacySection1Text: "Access to and use of this cost calculator are entirely free, anonymous, and require no account registration or personal credentials. The technical parameters entered (trade sector, selected tasks, measurements, free-text description, execution preferences, and chosen country for VAT) are processed solely to compute material requirements with scrap allowance and contractor turnkey ranges. All financial totals are generated deterministically on the server and are never persisted in databases linked to user identity.",
    privacySection2Title: "2. Processing via OpenRouter and Artificial Intelligence models",
    privacySection2Text: "To synthesize qualitative feasibility assessments, sequential execution steps, safety hazard warnings, recommended PPE, and local regulatory permits, the application transmits descriptive work items to OpenRouter's secure API (https://openrouter.ai). Requests utilize a resilient fallback chain (Gemini Flash, Llama, and Gemma models) over encrypted HTTPS/TLS connections. Under OpenRouter's enterprise terms of service, submitted prompt data is not used to train AI models or disclosed to third parties.",
    privacySection3Title: "3. Processing of room photos (strictly volatile RAM)",
    privacySection3Text: "Uploading workspace or room photos is strictly optional (maximum 3 images). When uploaded, photos are processed temporarily within the server's volatile memory (RAM) exclusively for the duration of the multimodal vision inspection to identify visible surface issues or estimate dimensions. No image files are ever stored permanently on disk, database, or cloud object storage.",
    privacySection4Title: "4. Optional contractor quote requests (Leads) & 90-day retention",
    privacySection4Text: "Requesting quotes from verified local contractors and building firms is completely optional. If the user submits the form, collected fields (first and last name, email address, optional telephone number, postal code, city, optional notes, and estimate summary) are processed on the basis of explicit consent (GDPR Art. 6(1)(a)). Lead records are securely stored in an Upstash Redis database with an automated time-to-live (TTL) expiry of 90 days, after which they are permanently deleted. The application never sends automated marketing campaigns or mass newsletters.",
    privacySection5Title: "5. Zero profiling cookies or advertising tracking",
    privacySection5Text: "The application does not use profiling cookies, marketing pixels, or invasive third-party analytics trackers. Browser client storage (localStorage) is used solely to remember the user's preferred interface language ('preventivo_app_lang'), ensuring smooth navigation across sessions without user tracking or profiling.",
    privacySection6Title: "6. Hosting infrastructure & security (Vercel)",
    privacySection6Text: "The web application and serverless execution routines are hosted on the global cloud infrastructure of Vercel Inc. (Covina, CA, USA). All network communications are encrypted via SSL/TLS (HTTPS). Technical server connection logs (such as IP addresses, timestamps, and browser user agents) are processed by Vercel under its Data Processing Addendum (DPA) strictly for cybersecurity defense, DDoS mitigation, and operational diagnostics.",
    privacySection7Title: "7. Data subject rights (GDPR Articles 15-22)",
    privacySection7Text: "Under Articles 15 to 22 of the EU GDPR, you are entitled to request access to your personal data, its rectification, erasure (the right to be forgotten), or restriction of processing, as well as the right to withdraw consent for any contractor lead submission prior to the 90-day expiry. To exercise these rights, please contact: info@sititicino.ch.",
    privacyBackToHome: "Back to Home",
    privacyStartEstimate: "Start estimate",

    // SEO per-page metadata
    seoHomeTitle: "Home & DIY Estimator AI – Renovation & Repair Cost Calculator",
    seoHomeDesc: "Estimate home renovation costs in 2 minutes. Compare DIY vs. Professional contractor with local VAT and detailed shopping lists powered by AI.",
    seoEstimateTitle: "Calculate Estimate – Home & DIY Estimator AI",
    seoEstimateDesc: "Configure your renovation project in 4 simple steps: pick tasks, enter dimensions or upload photos, and compare DIY vs. Contractor.",
    seoPrivacyTitle: "Privacy Policy – Home & DIY Estimator AI",
    seoPrivacyDesc: "Privacy Policy for Home & DIY Estimator AI: calculation data processing, OpenRouter AI, memory-only photos, and GDPR compliance.",

    // 404 Page
    notFoundTitle: "Page Not Found (404)",
    notFoundDesc: "The page you are looking for does not exist or has been moved.",
    notFoundBtn: "Back to Home",

    // PWA & Install
    installAppBtn: "Install App",
    pwaBannerTitle: "Use the full-screen app",
    pwaBannerDesc: "Add the estimator to your home screen for quick access and a better experience.",
    pwaBannerInstall: "Install now",
    pwaBannerClose: "Close",
    iosInstallGuideTitle: "Install on iPhone / iPad",
    iosInstallGuideStep1: "Tap the **Share** button in the Safari toolbar.",
    iosInstallGuideStep2: "Scroll down and select **Add to Home Screen**.",
    iosInstallGuideGotIt: "Got it",
    standaloneHomeCta: "New Estimate",
    standaloneHomeSubtitle: "Ready for a new project? Start the calculation now.",
  }
};
