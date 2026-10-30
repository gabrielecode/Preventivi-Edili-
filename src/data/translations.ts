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
    privacyModalText: "I dati inseriti in questo modulo vengono utilizzati esclusivamente per consentire l'inoltro della richiesta di preventivo ai professionisti e alle imprese edili partner operanti nella tua zona. Il trattamento avviene nel rispetto del Regolamento UE 2016/679 (GDPR). Nessun invio di email automatiche viene effettuato dal sistema: la richiesta viene conservata in un archivio sicuro per la gestione commerciale e sarai contattato direttamente dai professionisti interessati al tuo progetto."
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
    privacyModalText: "Die in dieses Formular eingegebenen Daten werden ausschließlich verwendet, um die Angebotsanfrage an Partnerunternehmen und Bau-Fachleute in Ihrer Region weiterzuleiten. Die Verarbeitung erfolgt gemäß EU-Verordnung 2016/679 (DSGVO). Es werden keine automatischen E-Mails vom System versendet: Die Anfrage wird in einem sicheren Archiv gespeichert und Sie werden direkt von den interessierten Fachleuten kontaktiert."
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
    privacyModalText: "Les données saisies dans ce formulaire sont utilisées exclusivement pour transmettre la demande de devis aux entreprises et professionnels partenaires de votre région. Le traitement est conforme au RGPD (Règlement UE 2016/679). Aucun e-mail automatique n'est envoyé par le système : la demande est conservée dans un espace sécurisé et vous serez contacté directement par les professionnels intéressés."
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
    privacyModalText: "The data entered in this form is used exclusively to forward the quote request to partner contractors and building professionals operating in your area. Processing complies with EU Regulation 2016/679 (GDPR). No automatic emails are sent by the system: the request is stored in a secure archive for commercial management and you will be contacted directly by professionals interested in your project."
  }
};
