export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  // Sections
  section1Title: string;
  section1Desc: string;
  section2Title: string;
  section2Desc: string;
  section3Title: string;
  section3Desc: string;
  section4Title: string;
  section4Desc: string;
  section5Title: string;
  section5Desc: string;
  section6Title: string;
  section6Desc: string;

  // Country & VAT
  countrySelectLabel: string;
  vatRateLabel: string;
  currencyLabel: string;
  vatTypeDefault: string;

  // Sector and items
  sectorSelectLabel: string;
  noSectorsText: string;
  specializationLabel: string;
  specializationDesc: string;
  allWorks: string;
  noItemsFound: string;
  certificationsHeading: string;

  // Selected list customizer
  selectedWorksTitle: string;
  selectedWorksCount: string;
  unitPriceLabel: string;
  quantityLabel: string;
  deleteBtnTooltip: string;

  // Customer Details
  customerNameLabel: string;
  customerNamePlaceholder: string;
  projectNameLabel: string;
  projectNamePlaceholder: string;
  workDescriptionLabel: string;
  workDescriptionPlaceholder: string;
  additionalNotesLabel: string;
  additionalNotesPlaceholder: string;

  // Company Details
  companyLogoLabel: string;
  dragLogoText: string;
  orSelectText: string;
  removeLogoBtn: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  companyVatLabel: string;
  companyEmailLabel: string;
  companyPhoneLabel: string;
  companyAddressLabel: string;
  companyAddressPlaceholder: string;
  companyWebsiteLabel: string;

  // Metrics & Labor
  metricsPanelTitle: string;
  metricsPanelSubmit: string;
  dimensionsTitle: string;
  areaLabel: string;
  lengthLabel: string;
  piecesLabel: string;
  laborConfigTitle: string;
  laborConfigDesc: string;
  hourlyRateLabel: string;
  estimatedHoursLabel: string;
  travelCostsLabel: string;
  setupCostsLabel: string;
  difficultyLabel: string;
  difficultyLow: string;
  difficultyMedium: string;
  difficultyHigh: string;
  materialsCustomerLabel: string;
  materialsCustomerDesc: string;
  discountLabel: string;

  // Generation Panel
  generateBtnText: string;
  generatingBtnText: string;
  generateErrorTitle: string;
  retryBtnText: string;

  // Preview / Right Panel tabs
  tabPreview: string;
  tabDataSign: string;
  tabEmail: string;

  // Under reconstruction
  noQuoteGenerated: string;
  noQuoteHint: string;
  loadingQuoteTitle: string;
  loadingQuoteDesc: string;

  // Preview Header & Elements
  quoteProfessionalTitle: string;
  invoiceIdLabel: string;
  issueDateLabel: string;
  issuerLabel: string;
  receiverLabel: string;
  projectPrefix: string;
  sectorPrefix: string;
  countryPrefix: string;
  vatRegimePrefix: string;

  // Presentation letter & general
  presentationLetterTitle: string;
  feasibilityTitle: string;
  ratingLabel: string;
  technicalAnalysisLabel: string;
  potentialRisksLabel: string;
  recommendationsLabel: string;
  costsBreakdownTitle: string;
  itemDescriptionHeader: string;
  itemSourceHeader: string;
  itemQtyHeader: string;
  itemPriceHeader: string;
  itemTotalHeader: string;
  costsSubtotal: string;
  costsTaxRate: string;
  costsDiscount: string;
  costsTotal: string;
  estimatedTimeTitle: string;
  localRegsAndCertsTitle: string;

  // Signatures
  clientSignatureLabel: string;
  contractorSignatureLabel: string;

  // PDF & Actions
  downloadPdfBtn: string;
  copyAllBtn: string;
  copiedSuccess: string;

  // Email Config Section
  emailConfigTitle: string;
  emailConfigDesc: string;
  emailRecipientLabel: string;
  emailSubjectLabel: string;
  emailBodyLabel: string;
  sendEmailBtn: string;
  sendingEmailBtn: string;
  emailSentSuccess: string;
  emailSendError: string;
  itLanguage: string;
  deLanguage: string;
  frLanguage: string;
  enLanguage: string;
}

export const translations: Record<string, TranslationDict> = {
  it: {
    appName: "Preventivatore Edile Multilingua",
    appSubtitle: "Computi metrici estimativi, conformità normativa locale ed elaborazione preventivi tramite Intelligenza Artificiale per artigiani europei.",
    section1Title: "1. Selezione Collocazione Geografica dell'Opera",
    section1Desc: "Definisci il paese in cui si svolgerà il cantiere per calcolare autonomamente le aliquote IVA territoriali e applicare i regolamenti di settore vigenti nel luogo di esecuzione.",
    countrySelectLabel: "Nazione di Riferimento",
    vatRateLabel: "Aliquota IVA Territoriale (%)",
    currencyLabel: "Valuta Locale",
    vatTypeDefault: "In base alla nazione selezionata",

    section2Title: "2. Selezione Settore e Configurazione Listino Prezzi",
    section2Desc: "Scegli il settore d'intervento di riferimento. Verrà precaricato il listino prezzi professionale compilato in conformità con i tariffari medi del paese selezionato.",
    sectorSelectLabel: "Settore del Lavoratore",
    noSectorsText: "Nessun settore configurato",
    specializationLabel: "Seleziona Specializzazione (Menu a tendina)",
    specializationDesc: "Sfoglia il catalogo completo filtrato per ambito d'intervento.",
    allWorks: "Tutte le lavorazioni",
    noItemsFound: "Nessuna lavorazione trovata per questa categoria selezionata.",
    certificationsHeading: "Abilitazioni Normative Medie Settoriali Richieste:",

    selectedWorksTitle: "Lavorazioni Selezionate per il Computo",
    selectedWorksCount: "voci attive",
    unitPriceLabel: "Prezzo Unitario Personalizzato",
    quantityLabel: "Quantità/Volume",
    deleteBtnTooltip: "Rimuovi voce",

    section3Title: "3. Dati Generali del Progetto e del Committente",
    section3Desc: "Inserisci l'intestatario del preventivo e descrivi liberamente i dettagli del cantiere per permettere all'IA di calcolare lavorazioni aggiuntive stimate.",
    customerNameLabel: "Nome del Committente (Cliente) *",
    customerNamePlaceholder: "Es. Condominio Primavera / Mario Rossi",
    projectNameLabel: "Nome del Progetto / Cantiere *",
    projectNamePlaceholder: "Es. Rifacimento Facciata Esterna",
    workDescriptionLabel: "Descrizione Dettagliata dei Lavori (Input Libero) *",
    workDescriptionPlaceholder: "Descrivi cosa deve essere fatto (es. pareti con muffa in soggiorno, montaggio di 4 finestre in PVC con smaltimento delle vecchie tapparelle, ecc.) per permettere all'IA di analizzare la fattibilità.",
    additionalNotesLabel: "Note Aggiuntive dello Specialista (Opzionale)",
    additionalNotesPlaceholder: "Rapporti di sopralluogo, preferenze materiali, note d'accesso al cantiere...",

    section4Title: "4. Dati & Logo della Tua Impresa (Emittente)",
    section4Desc: "Questi dati e il tuo logo aziendale verranno stampati automaticamente in alto nella testata del preventivo a schermo e nel PDF finale.",
    companyLogoLabel: "Logo Aziendale / Marchio",
    dragLogoText: "Trascina logo",
    orSelectText: "o seleziona file",
    removeLogoBtn: "Rimuovi Logo",
    companyNameLabel: "Nome della Tua Ditta *",
    companyNamePlaceholder: "Es. EdilArtigiana S.r.l.",
    companyVatLabel: "Partita IVA / Codice Fiscale",
    companyEmailLabel: "Indirizzo Email Ditta",
    companyPhoneLabel: "Telefono Contatto",
    companyAddressLabel: "Indirizzo Sede Legale / Operativa",
    companyAddressPlaceholder: "Es. Via dell'Artigianato, 12 - 00100 Roma",
    companyWebsiteLabel: "Sito Web Aziendale (Opzionale)",

    section5Title: "5. Dimensioni, Difficoltà e Manodopera",
    section5Desc: "Definisci le specifiche quantitative, la configurazione dei costi di manodopera, allestimento cantiere e logistica per una stima analitica di precisione.",
    metricsPanelTitle: " Scorciatoie di Calcolo Metrico",
    metricsPanelSubmit: "Usa come quantità dell'ultimo articolo selezionato",
    dimensionsTitle: "Dimensioni di Riferimento del Cantiere (Compila se applicabili)",
    areaLabel: "Superficie Totale (mq)",
    lengthLabel: "Lunghezza / Sviluppo (ml)",
    piecesLabel: "Pezzi / Elementi Totali (cad)",
    laborConfigTitle: "Configurazione Manodopera e Costi di Logistica",
    laborConfigDesc: "I costi indicati di seguito saranno computati matematicamente nel totale e considerati dall'IA.",
    hourlyRateLabel: "Tariffa Oraria Lavoratore (€/ora)",
    estimatedHoursLabel: "Ore Totali Previste",
    travelCostsLabel: "Spese di Trasferta e Logistica",
    setupCostsLabel: "Oneri Sicurezza e Allestimento",
    difficultyLabel: "Difficoltà Cantiere",
    difficultyLow: "Bassa difficulty (Cantiere lineare)",
    difficultyMedium: "Media difficulty (Altezze o accessi standard)",
    difficultyHigh: "Alta difficulty (Ambienti angusti o altezze elevate)",
    materialsCustomerLabel: "Materiali di Consumo ed Edili",
    materialsCustomerDesc: "Materiali forniti direttamente dal Cliente (Manodopera esclusa)",
    discountLabel: "Sconto Forfettario Applicato sul Totale",

    section6Title: "6. Analisi e Computazione Preventivo con IA Europea",
    section6Desc: "L'Intelligenza Artificiale di Gemini analizzerà la fattibilità tecnica, elaborerà lavorazioni stimate mancanti nel rispetto dei regolamenti del paese, ed elaborerà una lettera formale completa.",
    generateBtnText: "Analizza e Genera ed Elabora Preventivo con IA",
    generatingBtnText: "Generazione in corso in corso (Cascata Modelli)...",
    generateErrorTitle: "Errore di Generazione",
    retryBtnText: "Riprova Generazione",

    tabPreview: "Visualizzazione Preventivo",
    tabDataSign: "Scheda Dati & Firma",
    tabEmail: "Configurazione Email",

    noQuoteGenerated: "Nessun preventivo elaborato",
    noQuoteHint: "Compila i dati obbligatori sulla sinistra e premi il tasto di generazione per ottenere un intero computo metrico dettagliato calcolato tramite Intelligenza Artificiale.",
    loadingQuoteTitle: "Calcolo Computo in corso...",
    loadingQuoteDesc: "L'IA sta validando le lavorazioni, calcolando gli estimi e strutturando la proposta formale in base alla conformità locale. Attendi qualche istante...",

    quoteProfessionalTitle: "PREVENTIVO PROFESSIONALE",
    invoiceIdLabel: "Identificativo",
    issueDateLabel: "Data Emissione",
    issuerLabel: "EMITTENTE / DIRETTORE TECNICO",
    receiverLabel: "COMMITTENTE & SITO OPERA",
    projectPrefix: "PROGETTO",
    sectorPrefix: "SETTORE",
    countryPrefix: "PAESE",
    vatRegimePrefix: "REGIME IVA",

    presentationLetterTitle: "Lettera di Presentazione / Relazione Tecnica",
    feasibilityTitle: "1. Esito ed Analisi di Fattibilità Tecnica",
    ratingLabel: "Valutazione di cantiere",
    technicalAnalysisLabel: "Analisi Tecnica",
    potentialRisksLabel: "Rischi e Criticità Rilevate",
    recommendationsLabel: "Raccomandazioni Operative & Best Practices",
    costsBreakdownTitle: "2. Computo Metrico Estimativo Dettagliato",
    itemDescriptionHeader: "Descrizione Lavorazione / Voce di Spesa",
    itemSourceHeader: "Origine",
    itemQtyHeader: "Q.tà",
    itemPriceHeader: "Prezzo Unit.",
    itemTotalHeader: "Totale",
    costsSubtotal: "Imponibile Subtotale",
    costsTaxRate: "Imposta IVA",
    costsDiscount: "Sconto Applicato",
    costsTotal: "TOTALE PREVENTIVO",
    estimatedTimeTitle: "3. Tempi di Consegna e Cronoprogramma Stimato",
    localRegsAndCertsTitle: "4. Riferimenti Normativi e Abilitazioni Obbligatorie",

    clientSignatureLabel: "Firma del Committente per approvazione",
    contractorSignatureLabel: "Sottoscrizione per",

    downloadPdfBtn: "Esporta Computo in PDF",
    copyAllBtn: "Copia Testo Preventivo",
    copiedSuccess: "Preventivo copiato negli appunti!",

    emailConfigTitle: "Configurazione ed Invio Mail al Cliente",
    emailConfigDesc: "Invia direttamente il preventivo dettagliato via email in formato PDF allegato codificato in Base64.",
    emailRecipientLabel: "Email del Destinatario (Cliente)",
    emailSubjectLabel: "Oggetto della Mail",
    emailBodyLabel: "Testo della Mail di Accompagnamento",
    sendEmailBtn: "Invia Preventivo via Email",
    sendingEmailBtn: "Invio in corso...",
    emailSentSuccess: "Email inviata con successo! (Sandbox abilitata)",
    emailSendError: "Errore durante l'invio della mail.",
    itLanguage: "Italiano",
    deLanguage: "Tedesco (Deutsch)",
    frLanguage: "Francese (Français)",
    enLanguage: "Inglese (English)"
  },
  de: {
    appName: "Mehrsprachiger Bau-Angebotsrechner",
    appSubtitle: "Mengenberechnungen, Einhaltung lokaler Vorschriften und KI-gestützte Angebotserstellung für europäische Handwerker.",
    section1Title: "1. Geografische Lage des Projekts wählen",
    section1Desc: "Definieren Sie das Land, in dem das Projekt durchgeführt wird, um länderspezifische MwSt.-Sätze automatisch zu berechnen und geltende Bauvorschriften anzuwenden.",
    countrySelectLabel: "Referenzland",
    vatRateLabel: "Lokaler MwSt.-Satz (%)",
    currencyLabel: "Lokale Währung",
    vatTypeDefault: "Basierend auf dem ausgewählten Land",

    section2Title: "2. Handwerksbereich & Preislistenkonfiguration",
    section2Desc: "Wählen Sie Ihren Handwerksbereich. Die professionelle Preisliste für das ausgewählte Land wird automatisch geladen.",
    sectorSelectLabel: "Handwerksbereich des Arbeiters",
    noSectorsText: "Keine Handwerksbereiche konfiguriert",
    specializationLabel: "Spezialisierung wählen (Drop-down-Menü)",
    specializationDesc: "Durchsuchen Sie den vollständigen, nach Arbeitsbereich gefilterten Katalog.",
    allWorks: "Alle Arbeiten",
    noItemsFound: "Keine Arbeiten für diese ausgewählte Kategorie gefunden.",
    certificationsHeading: "Geforderte bauaufsichtliche Zulassungen/Zertifizierungen:",

    selectedWorksTitle: "Ausgewählte Arbeiten für das Angebot",
    selectedWorksCount: "aktive Positionen",
    unitPriceLabel: "Eigener Einheitspreis",
    quantityLabel: "Menge/Volumen",
    deleteBtnTooltip: "Position entfernen",

    section3Title: "3. Allgemeine Projekt- und Kundendaten",
    section3Desc: "Geben Sie den Empfänger des Angebots ein und beschreiben Sie das Projekt frei, damit die KI zusätzliche geschätzte Arbeiten vorschlagen kann.",
    customerNameLabel: "Name des Kunden (Auftraggeber) *",
    customerNamePlaceholder: "z.B. Schmidt GmbH / Herr Max Mustermann",
    projectNameLabel: "Projektname / Baustelle *",
    projectNamePlaceholder: "z.B. Renovierung der Außenfassade",
    workDescriptionLabel: "Detaillierte Arbeitsbeschreibung (Freitext) *",
    workDescriptionPlaceholder: "Beschreiben Sie die auszuführenden Arbeiten (z.B. feuchte Wände im Wohnzimmer, Montage von 4 PVC-Fenstern inklusive Entsorgung der alten Rollläden), damit die KI die technische Machbarkeit prüfen kann.",
    additionalNotesLabel: "Zusätzliche Notizen des Fachmanns (Optional)",
    additionalNotesPlaceholder: "Ortstermine, Materialpräferenzen, Zugangshinweise zur Baustelle...",

    section4Title: "4. Daten & Logo Ihres Unternehmens (Aussteller)",
    section4Desc: "Diese Daten und Ihr Logo werden automatisch oben im Angebot und im finalen PDF-Dokument abgedruckt.",
    companyLogoLabel: "Firmenlogo / Marke",
    dragLogoText: "Logo hierher ziehen",
    orSelectText: "oder Datei auswählen",
    removeLogoBtn: "Logo entfernen",
    companyNameLabel: "Name Ihrer Firma *",
    companyNamePlaceholder: "z.B. HandwerkPro GmbH",
    companyVatLabel: "Umsatzsteuer-ID / Steuernummer",
    companyEmailLabel: "E-Mail-Adresse der Firma",
    companyPhoneLabel: "Kontakt-Telefonnummer",
    companyAddressLabel: "Firmenadresse (Hauptsitz / Büro)",
    companyAddressPlaceholder: "z.B. Hauptstraße 12, 10115 Berlin",
    companyWebsiteLabel: "Firmenwebsite (Optional)",

    section5Title: "5. Dimensionen, Schwierigkeit und Arbeitskraft",
    section5Desc: "Definieren Sie Mengenspezifikationen, Arbeitskosten sowie Einrichtungs- und Logistikgebühren für ein hochpräzises Angebot.",
    metricsPanelTitle: " Schnellrechner für Aufmaß",
    metricsPanelSubmit: "Als Menge für das zuletzt ausgewählte Element verwenden",
    dimensionsTitle: "Referenzmaße der Baustelle (Ausfüllen falls zutreffend)",
    areaLabel: "Gesamtfläche (qm)",
    lengthLabel: "Länge / Umfang (lfm)",
    piecesLabel: "Gesamtstückzahl (Stk)",
    laborConfigTitle: "Konfiguration Arbeitszeit und Logistikkosten",
    laborConfigDesc: "Die folgenden Kosten werden mathematisch berechnet und fließen in das Angebot ein.",
    hourlyRateLabel: "Stundensatz des Handwerkers (€/Std)",
    estimatedHoursLabel: "Voraussichtliche Gesamtstunden",
    travelCostsLabel: "Fahrtkosten & Logistikpauschale",
    setupCostsLabel: "Baustelleneinrichtung & Sicherheit",
    difficultyLabel: "Baustellenschwierigkeit",
    difficultyLow: "Niedrige Schwierigkeit (Einfache Baustelle)",
    difficultyMedium: "Mittlere Schwierigkeit (Standardhöhe / Standardzugang)",
    difficultyHigh: "Hohe Schwierigkeit (Enge Verhältnisse / Große Höhen)",
    materialsCustomerLabel: "Baumaterialien & Verbrauchsmaterial",
    materialsCustomerDesc: "Material wird direkt vom Kunden bereitgestellt (Arbeitszeit exklusive)",
    discountLabel: "Pauschalrabatt auf das Gesamtergebnis",

    section6Title: "6. KI-Analyse und Angebotsberechnung (Europäischer Standard)",
    section6Desc: "Die Gemini-KI prüft die technische Machbarkeit, ermittelt eventuell fehlende Arbeiten gemäß lokalen Richtlinien und verfasst ein formelles Anschreiben.",
    generateBtnText: "Angebot per KI analysieren & erstellen",
    generatingBtnText: "Angebot wird generiert (Kaskadierung)...",
    generateErrorTitle: "Fehler bei der Generierung",
    retryBtnText: "Generierung wiederholen",

    tabPreview: "Angebotsansicht",
    tabDataSign: "Datenblatt & Unterschrift",
    tabEmail: "E-Mail-Konfiguration",

    noQuoteGenerated: "Noch kein Angebot generiert",
    noQuoteHint: "Füllen Sie die erforderlichen Daten auf der linken Seite aus und klicken Sie auf 'Generieren', um das vollständige Angebot per KI zu berechnen.",
    loadingQuoteTitle: "Angebot wird berechnet...",
    loadingQuoteDesc: "Die KI validiert die Arbeiten, berechnet Preise und strukturiert das formelle Dokument nach lokalen Compliance-Regularien. Bitte warten...",

    quoteProfessionalTitle: "PROFESSIONELLES ANGEBOT",
    invoiceIdLabel: "Angebot-ID",
    issueDateLabel: "Erstellungsdatum",
    issuerLabel: "AUSTELLER / TECHNISCHE LEITUNG",
    receiverLabel: "AUFTRAGGEBER & PROJEKTORT",
    projectPrefix: "PROJEKT",
    sectorPrefix: "BEREICH",
    countryPrefix: "LAND",
    vatRegimePrefix: "STEUERSATZ",

    presentationLetterTitle: "Anschreiben / Technische Baubeschreibung",
    feasibilityTitle: "1. Technische Berechnungen und Machbarkeitsprüfung",
    ratingLabel: "Baustellenbewertung",
    technicalAnalysisLabel: "Technische Analyse",
    potentialRisksLabel: "Erkannte Risiken & Herausforderungen",
    recommendationsLabel: "Mitarbeiter-Empfehlungen & Best Practices",
    costsBreakdownTitle: "2. Detaillierte Mengen- und Kostenaufstellung",
    itemDescriptionHeader: "Bezeichnung der Leistung / Arbeitsposition",
    itemSourceHeader: "Quelle",
    itemQtyHeader: "Menge",
    itemPriceHeader: "Einzelpreis",
    itemTotalHeader: "Gesamt",
    costsSubtotal: "Netto-Zwischensumme",
    costsTaxRate: "Mehrwertsteuer",
    costsDiscount: "Angewandter Rabatt",
    costsTotal: "GESAMTSUMME ANGEBOT",
    estimatedTimeTitle: "3. Voraussichtliche Bauzeit & Zeitplan",
    localRegsAndCertsTitle: "4. Gesetzliche Vorschriften und Pflichtzertifikate",

    clientSignatureLabel: "Unterschrift des Auftraggebers zur Freigabe",
    contractorSignatureLabel: "Unterzeichnet für",

    downloadPdfBtn: "Angebot als PDF exportieren",
    copyAllBtn: "Angebotstext kopieren",
    copiedSuccess: "Angebotstext in die Zwischenablage kopiert!",

    emailConfigTitle: "E-Mail-Versand an den Kunden",
    emailConfigDesc: "Senden Sie das detaillierte Angebot direkt als PDF-Anhang (Base64-kodiert) an Ihren Kunden.",
    emailRecipientLabel: "Empfänger E-Mail (Kunde)",
    emailSubjectLabel: "E-Mail-Betreff",
    emailBodyLabel: "E-Mail-Begleittext",
    sendEmailBtn: "Angebot per E-Mail senden",
    sendingEmailBtn: "Wird gesendet...",
    emailSentSuccess: "E-Mail erfolgreich versendet! (Sandbox-Modus)",
    emailSendError: "Fehler beim E-Mail-Versand.",
    itLanguage: "Italienisch",
    deLanguage: "Deutsch",
    frLanguage: "Französisch",
    enLanguage: "Englisch"
  },
  fr: {
    appName: "Estimateur de Devis Multilingue",
    appSubtitle: "Métrés estimatifs, conformité réglementaire locale et génération de devis par Intelligence Artificielle pour les artisans européens.",
    section1Title: "1. Localisation Géographique du Chantier",
    section1Desc: "Définissez le pays du chantier pour calculer automatiquement les taux de TVA locaux et appliquer les réglementations de construction nationales en vigueur.",
    countrySelectLabel: "Pays de Référence",
    vatRateLabel: "Taux de TVA Local (%)",
    currencyLabel: "Devise Locale",
    vatTypeDefault: "Basé sur le pays sélectionné",

    section2Title: "2. Choix du Secteur et Configuration du Tarif",
    section2Desc: "Sélectionnez votre secteur d'activité. Le catalogue professionnel de prix moyens du pays cible sera automatiquement chargé.",
    sectorSelectLabel: "Secteur Professionnel",
    noSectorsText: "Aucun secteur configuré",
    specializationLabel: "Sélectionner la spécialisation (Menu déroulant)",
    specializationDesc: "Parcourez le catalogue complet des prestations de votre profession.",
    allWorks: "Tous les travaux",
    noItemsFound: "Aucune prestation trouvée pour cette catégorie.",
    certificationsHeading: "Homologations et qualifications professionnelles requises :",

    selectedWorksTitle: "Prestations Sélectionnées pour le Devis",
    selectedWorksCount: "lignes actives",
    unitPriceLabel: "Prix Unitaire Personnalisé",
    quantityLabel: "Quantité / Volume",
    deleteBtnTooltip: "Supprimer la prestation",

    section3Title: "3. Informations Générales Projet & Client",
    section3Desc: "Renseignez le nom du client et décrivez librement le chantier afin d'aider l'IA à suggérer d'éventuels travaux complémentaires.",
    customerNameLabel: "Nom du Client (Maitre d'Ouvrage) *",
    customerNamePlaceholder: "Ex. Copropriété Les Fleurs / M. Jean Dupont",
    projectNameLabel: "Nom du Projet / Chantier *",
    projectNamePlaceholder: "Ex. Rénovation de la Façade Extérieure",
    workDescriptionLabel: "Description Détaillée des Travaux (Champ Libre) *",
    workDescriptionPlaceholder: "Décrivez les travaux à effectuer (ex: murs humides dans le salon, pose de 4 fenêtres double vitrage PVC avec dépose des anciens volets roulants, etc.) afin que l'IA puisse étudier la faisabilité technique.",
    additionalNotesLabel: "Notes Complémentaires de l'Artisan (Optionnel)",
    additionalNotesPlaceholder: "Rapports de visite, préférences matériaux, contraintes d'accès au chantier...",

    section4Title: "4. Coordonnées & Logo de Votre Entreprise (Émetteur)",
    section4Desc: "Ces coordonnées et votre logo d'entreprise seront automatiquement imprimés sur l'en-tête du devis et du document PDF final.",
    companyLogoLabel: "Logo de l'entreprise / Marque",
    dragLogoText: "Glisser le logo ici",
    orSelectText: "ou sélectionner un fichier",
    removeLogoBtn: "Retirer le logo",
    companyNameLabel: "Nom de Votre Entreprise *",
    companyNamePlaceholder: "Ex. Art Batiment SAS",
    companyVatLabel: "Numéro de TVA Intracommunautaire",
    companyEmailLabel: "Email de l'Entreprise",
    companyPhoneLabel: "Téléphone de Contact",
    companyAddressLabel: "Adresse du Siège Social / Opérationnel",
    companyAddressPlaceholder: "Ex. 12 rue des Artisans, 75001 Paris",
    companyWebsiteLabel: "Site Web Professionnel (Optionnel)",

    section5Title: "5. Dimensions, Difficulté et Main-d'œuvre",
    section5Desc: "Définissez les spécifications quantitatives, les coûts de main-d'œuvre, d'installation de chantier et de logistique pour une précision optimale.",
    metricsPanelTitle: " Raccourcis de calcul de métré",
    metricsPanelSubmit: "Utiliser comme quantité pour le dernier élément sélectionné",
    dimensionsTitle: "Dimensions de Référence du Chantier (Remplir si applicables)",
    areaLabel: "Superficie Totale (m²)",
    lengthLabel: "Longueur / Périphérie (ml)",
    piecesLabel: "Nombre de pièces / Éléments (u)",
    laborConfigTitle: "Configuration Main-d'œuvre et Coûts Logistiques",
    laborConfigDesc: "Ces coûts ci-dessous seront calculés mathématiquement et intégrés au devis final.",
    hourlyRateLabel: "Taux Horaire de l'Artisan (€/heure)",
    estimatedHoursLabel: "Heures Totales Estimées",
    travelCostsLabel: "Frais de Déplacement & Logistique",
    setupCostsLabel: "Sécurité & Installation de Chantier",
    difficultyLabel: "Difficulté du Chantier",
    difficultyLow: "Difficulté faible (Chantier simple de plain-pied)",
    difficultyMedium: "Difficulté moyenne (Hauteur ou accès standard)",
    difficultyHigh: "Difficulté élevée (Espaces étroits, grande hauteur, etc.)",
    materialsCustomerLabel: "Fourniture des Matériaux de Construction",
    materialsCustomerDesc: "Matériaux fournis directement par le client (Main-d'œuvre seule)",
    discountLabel: "Remise forfaitaire globale appliquée sur le total",

    section6Title: "6. Analyse et Devis par IA Européenne",
    section6Desc: "L'intelligence artificielle Gemini étudiera la faisabilité technique, calculera les coûts complémentaires et rédigera une lettre d'accompagnement officielle de haut niveau.",
    generateBtnText: "Analyser et Générer le Devis par IA",
    generatingBtnText: "Génération en cours (Modèles en cascade)...",
    generateErrorTitle: "Erreur lors de la génération",
    retryBtnText: "Réessayer la génération",

    tabPreview: "Aperçu du Devis",
    tabDataSign: "Fiche technique & Signature",
    tabEmail: "Configuration Mail",

    noQuoteGenerated: "Aucun devis généré pour le moment",
    noQuoteHint: "Remplissez les informations obligatoires à gauche puis cliquez sur 'Générer' pour obtenir l'estimation complète par Intelligence Artificielle.",
    loadingQuoteTitle: "Calcul du devis en cours...",
    loadingQuoteDesc: "L'IA valide les travaux, évalue les prix et structure le devis conformément aux réglementations de construction locales. Veuillez patienter...",

    quoteProfessionalTitle: "DEVIS PROFESSIONNEL",
    invoiceIdLabel: "Référence",
    issueDateLabel: "Date d'émission",
    issuerLabel: "ÉMETTEUR / RESPONSABLE TECHNIQUE",
    receiverLabel: "MAÎTRE D'OUVRAGE & CHANTIER",
    projectPrefix: "PROJET",
    sectorPrefix: "SECTEUR",
    countryPrefix: "PAYS",
    vatRegimePrefix: "RÉGIME TVA",

    presentationLetterTitle: "Lettre d'Accompagnement / Rapport Technique",
    feasibilityTitle: "1. Rapport de Faisabilité Technique",
    ratingLabel: "Avis de faisabilité",
    technicalAnalysisLabel: "Description Technique",
    potentialRisksLabel: "Risques et Points de Vigilance",
    recommendationsLabel: "Recommandations du Professionnel & Bonnes Pratiques",
    costsBreakdownTitle: "2. Métré Descriptif et Estimatif Détaillé",
    itemDescriptionHeader: "Description des Prestations / Postes de Dépense",
    itemSourceHeader: "Origine",
    itemQtyHeader: "Qté",
    itemPriceHeader: "Prix Unitaire",
    itemTotalHeader: "Total HT",
    costsSubtotal: "Sous-total HT",
    costsTaxRate: "Montant TVA",
    costsDiscount: "Remise accordée",
    costsTotal: "TOTAL DU DEVIS (TTC)",
    estimatedTimeTitle: "3. Durée Estimée pour l'Exécution des Travaux",
    localRegsAndCertsTitle: "4. Références Réglementaires & Assurances Obligatoires",

    clientSignatureLabel: "Bon pour accord, signature du Client",
    contractorSignatureLabel: "Signé pour l'entreprise",

    downloadPdfBtn: "Exporter le Devis en PDF",
    copyAllBtn: "Copier le texte du devis",
    copiedSuccess: "Devis copié dans le presse-papiers !",

    emailConfigTitle: "Configuration et Envoi du Mail au Client",
    emailConfigDesc: "Envoyez directement le devis détaillé avec le document PDF joint (encodé en Base64) au client.",
    emailRecipientLabel: "Email du Destinataire (Client)",
    emailSubjectLabel: "Objet du Mail",
    emailBodyLabel: "Texte d'accompagnement de l'email",
    sendEmailBtn: "Envoyer le Devis par Mail",
    sendingEmailBtn: "Envoi en cours...",
    emailSentSuccess: "Email envoyé avec succès ! (Mode sandbox actif)",
    emailSendError: "Une erreur est survenue lors de l'envoi de l'email.",
    itLanguage: "Italien",
    deLanguage: "Allemand",
    frLanguage: "Français",
    enLanguage: "Anglais"
  },
  en: {
    appName: "Multilingual Construction Estimator",
    appSubtitle: "Accurate quantity takeoffs, compliance with local regulations, and AI-powered quote generation for European trade contractors.",
    section1Title: "1. Geographical Location of the Project",
    section1Desc: "Select the country of the construction project to automatically apply territorial tax rates and localized trade building guidelines.",
    countrySelectLabel: "Target Country",
    vatRateLabel: "Territorial VAT Rate (%)",
    currencyLabel: "Local Currency",
    vatTypeDefault: "Based on selected country",

    section2Title: "2. Select Trade Sector & Configure Catalog",
    section2Desc: "Pick your core trade sector. A professional base catalog will be loaded reflecting average material and trade prices for the target country.",
    sectorSelectLabel: "Trade Sector",
    noSectorsText: "No trade sectors configured",
    specializationLabel: "Select Sub-Category / Specialization (Dropdown)",
    specializationDesc: "Browse the complete trade price catalog filtered by focus area.",
    allWorks: "All work items",
    noItemsFound: "No items found for the selected category.",
    certificationsHeading: "Standard National Regulatory Accreditations / Requirements:",

    selectedWorksTitle: "Selected Line Items for Estimation",
    selectedWorksCount: "active items",
    unitPriceLabel: "Override Unit Price",
    quantityLabel: "Quantity / Volume",
    deleteBtnTooltip: "Remove line item",

    section3Title: "3. Project and Customer Profile Information",
    section3Desc: "Input client registration details and write a general summary of the project to allow the AI to extract any additional estimated works.",
    customerNameLabel: "Client / Customer Name *",
    customerNamePlaceholder: "e.g., Spring Residences / John Smith",
    projectNameLabel: "Project Title / Site Address *",
    projectNamePlaceholder: "e.g., External Facade Painting",
    workDescriptionLabel: "Detailed Work Specifications (Free Text Input) *",
    workDescriptionPlaceholder: "Describe the tasks to be completed (e.g., removal of damp mold in living room, installing 4 PVC double-pane windows, and disposing of old rolling shutters) to let the AI estimate feasibility.",
    additionalNotesLabel: "Contractor's Site Notes (Optional)",
    additionalNotesPlaceholder: "Survey details, material preferences, specialized access, safety observations...",

    section4Title: "4. Company & Logo Details (Sender / Contractor)",
    section4Desc: "These contractor details and company brand logo will be dynamically added to the document header and printable exports.",
    companyLogoLabel: "Company Logo / Emblem",
    dragLogoText: "Drag logo here",
    orSelectText: "or choose file",
    removeLogoBtn: "Remove Logo",
    companyNameLabel: "Registered Trading Name *",
    companyNamePlaceholder: "e.g., TradeCraft Builders Ltd",
    companyVatLabel: "VAT ID Number / Tax Code",
    companyEmailLabel: "Company Email Address",
    companyPhoneLabel: "Contact Phone Number",
    companyAddressLabel: "Trading / Registered Address",
    companyAddressPlaceholder: "e.g., 12 Trade Way, London EC1A 1BB",
    companyWebsiteLabel: "Company Website (Optional)",

    section5Title: "5. Takeoff Dimensions, Site Conditions & Labor",
    section5Desc: "Configure basic sizing parameters, labor rates, travel allowances, and installation setup fees for ultimate quote accuracy.",
    metricsPanelTitle: " Quantity Takeoff Shortcuts",
    metricsPanelSubmit: "Use as quantity for the last active item selected",
    dimensionsTitle: "Reference Construction Sizing (Complete if applicable to scope)",
    areaLabel: "Total Ground/Wall Area (sqm)",
    lengthLabel: "Total Linear Length (lm)",
    piecesLabel: "Total Items Count (pcs)",
    laborConfigTitle: "Labor Overhead & Site Mobilization Fees",
    laborConfigDesc: "These pricing configurations are calculated mathematically and fed into the AI models.",
    hourlyRateLabel: "Hourly Trade Rate (Currency/hr)",
    estimatedHoursLabel: "Total Predicted Trade Hours",
    travelCostsLabel: "Travel & Mobilization Allowance",
    setupCostsLabel: "Site Setup & Health & Safety Fees",
    difficultyLabel: "Site Access / Difficulty Rating",
    difficultyLow: "Low difficulty (Standard ground level, linear access)",
    difficultyMedium: "Medium difficulty (Standard heights or typical obstacles)",
    difficultyHigh: "High difficulty (Restricted spaces, high altitudes, scaffolding)",
    materialsCustomerLabel: "Material Supply & Provisioning",
    materialsCustomerDesc: "All structural materials directly supplied by the Client (Labor only)",
    discountLabel: "Lump-Sum Discount to Apply on Total",

    section6Title: "6. European AI Valuation & Generation Engine",
    section6Desc: "The Gemini AI evaluates technical feasibility, proposes estimated ancillary works, verifies building codes, and writes a formal cover letter.",
    generateBtnText: "Analyze and Build Estimate with AI",
    generatingBtnText: "Generating Estimate (Model Fallback)...",
    generateErrorTitle: "Generation Failure",
    retryBtnText: "Retry Generation",

    tabPreview: "Quote Document Preview",
    tabDataSign: "Technical Data & Signatures",
    tabEmail: "Email Dispatch Configuration",

    noQuoteGenerated: "No quote generated yet",
    noQuoteHint: "Fill out the required contractor and project parameters on the left and click 'Analyze' to produce a dynamic, legally compliant digital estimate.",
    loadingQuoteTitle: "Generating takeoff details...",
    loadingQuoteDesc: "The AI is auditing work compatibility, sizing local materials prices, and assembling compliance summaries. Please wait...",

    quoteProfessionalTitle: "PROFESSIONAL CONSTRUCTION QUOTE",
    invoiceIdLabel: "Quote Reference",
    issueDateLabel: "Date of Issue",
    issuerLabel: "SENDER / SENSOR ENGINEER / CONTRACTOR",
    receiverLabel: "CLIENT & SITE LOCALE",
    projectPrefix: "PROJECT",
    sectorPrefix: "SECTOR",
    countryPrefix: "COUNTRY",
    vatRegimePrefix: "VAT REGIME",

    presentationLetterTitle: "Artisan Presentation / Executive Project Summary",
    feasibilityTitle: "1. Technical Site Assessment & Feasibility Report",
    ratingLabel: "Feasibility rating",
    technicalAnalysisLabel: "Technical Assessment",
    potentialRisksLabel: "Identified Construction Risks & Obstacles",
    recommendationsLabel: "Operation Recommendations & Local Workmanship Standards",
    costsBreakdownTitle: "2. Detailed Estimative Cost Schedule",
    itemDescriptionHeader: "Detailed Trade Work / Itemized Cost Schedule",
    itemSourceHeader: "Source",
    itemQtyHeader: "Qty",
    itemPriceHeader: "Unit Price",
    itemTotalHeader: "Line Total",
    costsSubtotal: "Net Taxable Subtotal",
    costsTaxRate: "Applied VAT / Sales Tax",
    costsDiscount: "Applied Discount",
    costsTotal: "TOTAL ESTIMATED QUOTE",
    estimatedTimeTitle: "3. Execution Timeline & Scheduling Schedule",
    localRegsAndCertsTitle: "4. Mandatory Standards & Building Code Requirements",

    clientSignatureLabel: "Client Acceptance / Approval Signature",
    contractorSignatureLabel: "Authorized Signature for",

    downloadPdfBtn: "Export Estimate to PDF",
    copyAllBtn: "Copy Quote Text",
    copiedSuccess: "Quote text copied to clipboard!",

    emailConfigTitle: "Email Dispatch & Client Presentation",
    emailConfigDesc: "Email this complete formatted cost estimate to the customer as a Base64-encoded PDF attachment.",
    emailRecipientLabel: "Recipient Email Address (Client)",
    emailSubjectLabel: "Email Message Subject",
    emailBodyLabel: "Covering Email Body Message Text",
    sendEmailBtn: "Email Quote to Client",
    sendingEmailBtn: "Dispatching...",
    emailSentSuccess: "Email dispatched successfully! (App Sandbox Mode)",
    emailSendError: "An error occurred during email transmission.",
    itLanguage: "Italian",
    deLanguage: "German",
    frLanguage: "French",
    enLanguage: "English"
  }
};
