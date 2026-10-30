/**
 * Dati standard predefiniti per la degradazione controllata (Task 11b - Requisito 3)
 * Quando la catena AI è esaurita o il budget temporale scade, /api/estimate
 * fornisce comunque la stima economica esatta derivata dal listino e riempie
 * i campi qualitativi con contenuti tecnici preparati per ogni settore e lingua.
 */

export interface DegradedSectorData {
  feasibility: {
    rating: string;
    analysis: string;
    risks: string[];
    recommendations: string[];
    permitsAndRules: string[];
  };
  mainSteps: string[];
  estimatedTime: string;
  diySummaryNote: string;
}

type LangMap = Record<string, DegradedSectorData>;

const standardSectorData: Record<string, LangMap> = {
  // 1. Imbianchino / Decoratore
  imbianchino: {
    it: {
      feasibility: {
        rating: "Fattibile con attenzione",
        analysis: "Le opere di tinteggiatura interna e stuccatura di base sono accessibili per un appassionato del fai da te con buona manualità. Finiture complesse (stucco veneziano, velature o carta da parati) e altezze superiori a 3 metri richiedono attrezzature professionali o l'intervento di un decoratore.",
        risks: [
          "Cadute da scale o trabattelli durante la lavorazione a soffitto",
          "Inalazione di polveri sottili durante la carteggiatura e composti VOC",
          "Ricomparsa di muffa o macchie se non trattate preventivamente con biocidi idonei",
          "Danneggiamento di infissi, pavimenti e battiscopa per mascheratura inadeguata"
        ],
        recommendations: [
          "Proteggere accuratamente pavimenti, finestre e prese con teli e nastro carta gommato",
          "Indossare mascherina antipolvere FFP2, occhiali protettivi e guanti in lattice o nitrile",
          "Rispettare scrupolosamente i tempi di essiccazione (4-6 ore) tra la prima e la seconda mano",
          "Arieggiare costantemente i locali durante e dopo la stesura dei prodotti"
        ],
        permitsAndRules: [
          "Edilizia libera per tinteggiatura ordinaria interna (nessuna comunicazione comunale richiesta)",
          "Smaltimento residui di vernice e barattoli presso l'isola ecologica comunale (rifiuti speciali non pericolosi)",
          "Verificare il regolamento di condominio per gli orari di lavoro rumorosi consentiti"
        ]
      },
      mainSteps: [
        "Sgombero dell'ambiente e mascheratura protettiva integrale di pavimenti e battiscopa",
        "Raschiatura delle parti sfaldate, stuccatura di crepe/fori e carteggiatura di pareggiamento",
        "Applicazione di fondo isolante fissativo acrilico per uniformare l'assorbimento",
        "Stesura della prima mano di idropittura con rullo e pennellessa per i tagli d'angolo",
        "Asciugatura e applicazione della seconda mano di finitura uniforme",
        "Rimozione del nastro prima dell'essiccazione completa per bordi netti e pulizia attrezzi"
      ],
      estimatedTime: "1-2 giorni per stanza da 15-20 mq (10-16 ore totali)",
      diySummaryNote: "Ottimo risparmio economico rispetto alla manodopera professionale. Dedica il 60% del tempo alla preparazione delle superfici: il risultato finale dipende interamente dalla qualità del fondo."
    },
    en: {
      feasibility: {
        rating: "Feasible with care",
        analysis: "Interior painting and basic wall patching are accessible for DIY enthusiasts with basic tools. Complex decorative finishes (Venetian plaster, wallpapering) or working at heights above 3 meters require certified contractors or scaffolding.",
        risks: [
          "Falls from ladders while working on ceilings and high cornices",
          "Fine dust inhalation during sanding and VOC emissions from solvent-based paints",
          "Mold recurrence if underlying moisture is not treated with fungicides first",
          "Paint splatter damage to floors, trim, and electrical outlets"
        ],
        recommendations: [
          "Cover floors and furniture with heavy drop cloths and apply painter's masking tape",
          "Wear an FFP2/N95 dust mask, eye protection, and nitrile gloves",
          "Allow full dry time (4 to 6 hours) between primer and finish coats",
          "Ensure continuous room ventilation throughout application and curing"
        ],
        permitsAndRules: [
          "Generally classified as permitted maintenance (no building permits needed for interior painting)",
          "Dispose of leftover paint cans and solvents at authorized local waste collection centers",
          "Comply with local noise and apartment building quiet hours"
        ]
      },
      mainSteps: [
        "Clear the room and mask floors, door frames, and sockets with tape and plastic sheets",
        "Scrape flaking paint, patch cracks and nail holes with spackle, then sand smooth",
        "Apply an acrylic wall primer/sealer to balance absorption across plaster patches",
        "Cut in edges and corners with a brush, then roll the first coat in even vertical passes",
        "Allow to dry, inspect under bright light, and apply the second topcoat",
        "Peel tape while paint is slightly damp for clean edges, then wash rollers and brushes"
      ],
      estimatedTime: "1-2 days for an average 15-20 m² room (10-16 working hours)",
      diySummaryNote: "Substantial savings on labor. Allocate roughly 60% of your time to surface preparation and masking: final quality depends almost entirely on the substrate condition."
    },
    fr: {
      feasibility: {
        rating: "Faisable avec précaution",
        analysis: "Les travaux de peinture intérieure et de rebouchage simple sont bien adaptés aux bricoleurs motivés. Les enduits décoratifs complexes ou les hauteurs supérieures à 3 mètres requièrent un peintre qualifié.",
        risks: [
          "Chutes d'escabeau lors des travaux au plafond",
          "Inhalation de poussières fines au ponçage et émanations de solvants",
          "Réapparition de moisissures sans traitement fongicide préalable",
          "Taches de peinture indélébiles sur boiseries et revêtements de sol"
        ],
        recommendations: [
          "Protéger sols et plinthes avec des bâches épaisses et de l'adhésif de masquage",
          "Porter un masque anti-poussière FFP2 et des lunettes étanches",
          "Respecter le temps de séchage de 4 à 6 heures entre chaque couche",
          "Ventiler abondamment la pièce pendant et après l'application"
        ],
        permitsAndRules: [
          "Travaux d'entretien intérieur sans formalité administrative préalable",
          "Dépôt obligatoire des restes de peinture et solvants en déchetterie spécialisée",
          "Respect des horaires de copropriété pour les nuisances sonores"
        ]
      },
      mainSteps: [
        "Dégagement de la pièce et protection des sols et menuiseries",
        "Grattage des parties non adhérentes, rebouchage des trous et ponçage",
        "Application d'une sous-couche d'impression régulatrice de fond",
        "Dégagement des angles au pinceau puis application de la 1ère couche au rouleau",
        "Séchage complet et application de la 2nde couche croisée",
        "Retrait du ruban de masquage avant séchage complet et nettoyage des outils"
      ],
      estimatedTime: "1 à 2 jours pour une pièce de 15-20 m² (10 à 16 heures)",
      diySummaryNote: "Économies substantielles sur la main-d'œuvre. Consacrez la majorité du temps à la préparation et au masquage pour garantir un rendu professionnel."
    },
    de: {
      feasibility: {
        rating: "Machbar mit Sorgfalt",
        analysis: "Maler- und Spachtelarbeiten im Innenbereich eignen sich hervorragend für Heimwerker. Aufwendige Spachteltechniken, Tapezieren von Mustertapeten oder Arbeiten in über 3 m Höhe erfordern hingegen Fachpersonal.",
        risks: [
          "Sturzgefahr von Leitern bei Arbeiten an Decken und Raumkanten",
          "Staubbelastung beim Schleifen und Ausdünstungen von Lösungsmitteln",
          "Wiederauftreten von Schimmel ohne vorherige Tiefenbehandlung",
          "Farbspritzer auf Böden, Fenstern und Elektroinstallationen"
        ],
        recommendations: [
          "Böden und Fußleisten sorgfältig mit Abdeckvlies und Malerkrepp abkleben",
          "FFP2-Staubmaske, Schutzbrille und Einweghandschuhe tragen",
          "Trocknungszeiten (4-6 Stunden) zwischen Grundierung und Anstrich einhalten",
          "Für ständige Querlüftung während und nach dem Streichen sorgen"
        ],
        permitsAndRules: [
          "Genehmigungsfreie Renovierungsmaßnahme im Innenbereich",
          "Farbreste und Verdünner sind Sondermüll und gehören zum Wertstoffhof",
          "Hausordnung bezüglich Ruhezeiten beachten"
        ]
      },
      mainSteps: [
        "Möbel ausräumen, Böden und Fußleisten lückenlos abdecken und abkleben",
        "Lose Altanstriche abkratzen, Risse spachteln und glattschleifen",
        "Auftragen eines Tiefengrunds zur Festigung und Saugfähigkeitsregulierung",
        "Ecken und Kanten mit dem Pinsel beschneiden, Wände mit der Rolle streichen",
        "Trocknen lassen und gleichmäßigen zweiten Deckanstrich auftragen",
        "Klebeband im noch leicht feuchten Zustand abziehen und Werkzeuge reinigen"
      ],
      estimatedTime: "1-2 Tage für einen 15-20 m² Raum (10-16 Arbeitsstunden)",
      diySummaryNote: "Erhebliche Ersparnis gegenüber Handwerkerkosten. Investieren Sie mindestens die Hälfte der Zeit in die Untergrundvorbereitung."
    }
  },

  // 2. Serramentista / Infissi
  serramentista: {
    it: {
      feasibility: {
        rating: "Fattibile con riserva",
        analysis: "La sostituzione di zanzariere, tapparelle semplici o porte interne standard può essere gestita in autonomia da utenti esperti. L'installazione di finestre esterne a taglio termico, porte blindate o vetrate pesanti richiede obbligatoriamente 2 operatori esperti o un serramentista certificato per garantire la tenuta all'aria/acqua e le detrazioni fiscali.",
        risks: [
          "Infiltrazioni d'acqua e ponti termici con formazione di condensa/muffa sul controtelaio",
          "Lesioni personali da movimentazione di ante pesanti o vetri termici fragili",
          "Perdita dell'efficienza energetica e mancata certificazione di posa qualificata (UNI 11673)",
          "Blocco o cattiva chiusura delle ante per posa fuori bolla o torsione del telaio"
        ],
        recommendations: [
          "Operare sempre in due persone durante la movimentazione e il fissaggio dei serramenti",
          "Utilizzare livella laser professionale e cunei registrabili per verificare squadri e piombo",
          "Impiegare nastri termoespandenti e sigillanti MS polimeri specifici per la posa clima",
          "Controllare la portata strutturale dei tasselli di fissaggio nella muratura esistente"
        ],
        permitsAndRules: [
          "Sostituzione conforme sagoma/colore in edilizia libera; se centro storico o vincolato occorre autorizzazione paesaggistica",
          "Per accedere alle detrazioni fiscali (es. Ecobonus/Bonus Casa) è richiesta asseverazione ENEA e trasmittanza certificata",
          "Smaltimento del vecchio infisso e vetri presso centri autorizzati (rifiuti inerti e metalli)"
        ]
      },
      mainSteps: [
        "Rilievo millimetrico del vano luce e del controtelaio (altezza, larghezza, diagonali)",
        "Rimozione controllata del vecchio serramento e pulizia profonda del controtelaio",
        "Applicazione del nastro autoespandente termoacustico sui tre lati del nuovo telaio",
        "Posizionamento del telaio a bolla perfetta tramite cunei di registro e morsetti",
        "Fissaggio meccanico alla muratura con turboviti e iniezione di schiuma elastica specifica",
        "Montaggio ante, regolazione delle cerniere 3D e sigillatura polimerica perimetrale"
      ],
      estimatedTime: "4-6 ore per finestra con 2 operatori; 1 giorno per porta blindata",
      diySummaryNote: "Il fai da te è consigliato solo per tapparelle e porte interne. Per infissi esterni, la posa certificata garantisce isolamento termico, isolamento acustico e agevolazioni fiscali."
    },
    en: {
      feasibility: {
        rating: "Feasible with caution",
        analysis: "Replacing interior pre-hung doors or insect screens is suitable for confident DIYers. Installing exterior insulated windows or heavy security doors requires two people and specialized sealing expertise to prevent water infiltration and thermal bridges.",
        risks: [
          "Water leaks, drafts, and condensation caused by defective perimeter sealing",
          "Heavy glass and sash handling causing back injury or glass breakage",
          "Failure to meet building energy code ratings if installed improperly",
          "Sash binding, rubbing, or latching failure if the frame is out of plumb or twisted"
        ],
        recommendations: [
          "Always work with a helper when moving and setting exterior window frames",
          "Use a precision level and composite shims to ensure true square and plumb installation",
          "Apply pre-compressed expanding foam tapes and low-expansion polyurethane foam",
          "Anchor securely into structural studs using certified framing screws"
        ],
        permitsAndRules: [
          "Replacing like-for-like usually permitted; historic districts may require planning permission",
          "Energy efficiency compliance certificates may be required for tax credits and property sales",
          "Old glass, lead weights, and PVC must be transported to licensed recycling stations"
        ]
      },
      mainSteps: [
        "Take exact width, height, and diagonal measurements of the rough opening",
        "Carefully extract old window sash and frame, removing rotted wood or loose mortar",
        "Install perimeter expanding foam tape or weather barrier membranes on the new frame",
        "Dry-fit and shim the frame until completely plumb, level, and square",
        "Fasten frame into masonry/framing and seal gaps with low-expansion insulation foam",
        "Hang sashes, adjust multi-point locking hardware, and caulk exterior silicone joint"
      ],
      estimatedTime: "4-6 hours per window with 2 people; 1 full day for exterior entry doors",
      diySummaryNote: "Suitable for interior doors and screens. For exterior insulated windows, professional installation is often necessary to retain warranties and energy performance certificates."
    },
    fr: {
      feasibility: {
        rating: "Faisable avec réserves",
        analysis: "Le remplacement de portes intérieures ou de moustiquaires est accessible aux bricoleurs avertis. La pose de fenêtres extérieures à double/triple vitrage ou de portes blindées requiert deux personnes et une parfaite maîtrise de l'étanchéité à l'air et à l'eau.",
        risks: [
          "Infiltrations d'eau et ponts thermiques entraînant condensation et moisissures",
          "Blessures graves liées au poids élevé des vitrages isolants",
          "Perte des aides à la rénovation énergétique (MaPrimeRénov' exige un poseur RGE)",
          "Mauvais fonctionnement des vantaux et crémones si le dormant n'est pas d'équerre"
        ],
        recommendations: [
          "Ne jamais manipuler de menuiseries extérieures lourdes seul",
          "Vérifier impérativement le niveau, l'aplomb et les diagonales avec un niveau laser",
          "Poser des bandes d'étanchéité compriband et un mastic polymère d'étanchéité à l'eau",
          "Utiliser des vis d'ancrage sans cheville adaptées au matériau du gros œuvre"
        ],
        permitsAndRules: [
          "Déclaration préalable de travaux en mairie si modification de l'aspect extérieur de la façade",
          "Certification RGE obligatoire pour bénéficier des aides publiques énergétiques",
          "Évacuation des anciennes menuiseries et vitrages en filière de recyclage agréée"
        ]
      },
      mainSteps: [
        "Mesure précise des cotes tableau et fond de feuillure",
        "Dépose soignée de l'ancienne menuiserie et nettoyage du support de maçonnerie",
        "Pose du joint d'étanchéité pré-comprimé sur le pourtour du dormant neuf",
        "Calage et mise à niveau du dormant à l'aide de cales d'épaisseur",
        "Fixation mécanique par vis traversantes et calfeutrement avec mousse expansive adaptée",
        "Mise en place des ouvrants, réglage fin des ferrures et joints d'étanchéità extérieurs"
      ],
      estimatedTime: "4 à 6 heures par fenêtre à deux personnes ; 1 jour pour une porte blindée",
      diySummaryNote: "Recommandé en bricolage pour les portes intérieures. Pour les fenêtres donnant sur l'extérieur, l'artisan certifié garantit l'étanchéité et donne droit aux aides d'État."
    },
    de: {
      feasibility: {
        rating: "Machbar mit Vorbehalt",
        analysis: "Der Austausch von Innentüren oder Insektenschutzgittern ist für geübte Heimwerker gut machbar. Die Montage von isolierverglasten Fenstern oder Sicherheitstüren erfordert mindestens zwei Personen und Fachwissen zur luft- und schlagregendichten RAL-Montage.",
        risks: [
          "Wasserschäden, Zugluft und Schimmelbildung durch fehlerhafte Bauanschlussfugen",
          "Verletzungen und Glasbruch durch schwere 3-fach-Isolierglasscheiben",
          "Verlust von Förderansprüchen (z. B. KfW/BAFA ohne Fachunternehmererklärung)",
          "Schwergängige oder klemmende Fensterflügel bei Verzug des Rahmens"
        ],
        recommendations: [
          "Schwere Fensterrahmen und Flügel immer zu zweit montieren",
          "Laser-Wasserwaage und Ausgleichskeile zur präzisen Ausrichtung nutzen",
          "RAL-konforme 3-Ebenen-Abdichtung (innen dichter als außen, Multifunktionsband) verwenden",
          "Nur zugelassene Fenstermontageschrauben für das Mauerwerk verwenden"
        ],
        permitsAndRules: [
          "Bei denkmalgeschützten Gebäuden oder optischer Fassadenänderung Bauantrag erforderlich",
          "Für staatliche Förderungen (KfW/BAFA) ist der Einbau durch einen Fachbetrieb vorgeschrieben",
          "Alte Fenster und Glas fachgerecht beim Wertstoffhof entsorgen"
        ]
      },
      mainSteps: [
        "Genaues Aufmaß der Maueröffnung an mehreren Messpunkten und Diagonalen",
        "Flügel aushängen und alten Fensterrahmen vorsichtig demontieren",
        "Multifunktions-Dichtband umlaufend auf den neuen Fensterrahmen aufkleben",
        "Rahmen in die Öffnung setzen, verkeilen und lot- sowie fluchtgerecht ausrichten",
        "Rahmen mit Fensterschrauben im Mauerwerk verschrauben",
        "Flügel einhängen, Scheren- und Ecklager justieren und äußere Abdichtung vollenden"
      ],
      estimatedTime: "4-6 Stunden pro Fenster zu zweit; 1 voller Arbeitstag für Haustüren",
      diySummaryNote: "Für Innentüren unkompliziert. Bei Außenfenstern sichert der Einbau durch den Fachbetrieb die Einhaltung der Gebäudeenergieeffizienz und Förderfähigkeit."
    }
  },

  // 3. Piastrellista / Pavimentatore
  piastrellista: {
    it: {
      feasibility: {
        rating: "Fattibile con attenzione",
        analysis: "La posa di pavimenti laminati o PVC flottanti a click è ideale per il fai da te. La posa di piastrelle in gres porcellanato, grandi formati, mosaici o rivestimenti doccia richiede perizia, tagli precisi con taglierina ad acqua e pendenze perfette per lo scolo.",
        risks: [
          "Gradini tra piastrelle (denti) per mancato uso di cunei livellanti o massetto irregolare",
          "Distacco delle piastrelle nel tempo per uso di collante non idoneo (classe C2TE obbligatoria per gres)",
          "Infiltrazioni d'acqua sotto docce e balconi per impermeabilizzazione liquida assente o mal posata",
          "Rottura piastrelle durante i tagli complessi attorno a scarichi e tubazioni"
        ],
        recommendations: [
          "Verificare che il massetto di sottofondo sia planare, privo di crepe e perfettamente asciutto",
          "Utilizzare tassativamente distanziatori livellanti a cuneo per superfici piane senza dislivelli",
          "Applicare la colla a doppia spalmatura (su fondo e retro piastrella) per formati superiori a 30x30",
          "Impermeabilizzare sempre piatto doccia e zone umide con guaina liquida e bandelle elastiche"
        ],
        permitsAndRules: [
          "Rinnovamento pavimenti interni classificato in edilizia libera (nessun permesso richiesto)",
          "Smaltimento calcinacci e piastrelle di demolizione presso centri autorizzati (codice CER 170107)",
          "Rispettare gli orari di quiete condominiale durante la demolizione e il taglio piastrelle"
        ]
      },
      mainSteps: [
        "Verifica della planarità del sottofondo e stesura eventuale di autolivellante",
        "Tracciatura delle linee guida ortogonali con squadro o livello laser al centro stanza",
        "Stesura del collante cementizio con spatola dentata adeguata al formato della mattonella",
        "Posa delle piastrelle con battitura gommata e inserimento dei cunei autolivellanti",
        "Rimozione dei cunei a colla indurita e pulizia accurata delle fughe",
        "Stuccatura delle fughe con malta cementizia o epossidica e pulizia finale con spugna umida"
      ],
      estimatedTime: "2-3 giorni per un locale da 15-20 mq (compresa maturazione colla e fughe)",
      diySummaryNote: "Per pavimenti flottanti o piccoli locali il risparmio è notevole. Per grandi formati o bagni con doccia a filo, precisione e impermeabilizzazione sono elementi critici."
    },
    en: {
      feasibility: {
        rating: "Feasible with care",
        analysis: "Floating laminate and click vinyl planks are great DIY projects. Porcelain tile, large formats, mosaics, or walk-in showers demand substantial skill, precision wet-saw cutting, and rigorous underlayment waterproofing.",
        risks: [
          "Lippage (uneven tile edges) resulting from unlevel subfloors or skipping leveling clips",
          "Debonding and hollow tiles from using wrong mortar (C2TE modified thin-set required for porcelain)",
          "Water penetration behind bathroom walls or shower floors if waterproofing membranes are breached",
          "Tile chipping and cracking around plumbing fixtures and door jambs"
        ],
        recommendations: [
          "Ensure the subfloor is flat, dry, and structurally sound before setting any tile",
          "Use a mechanical tile leveling spacer system to prevent lippage across joints",
          "Back-butter every tile larger than 30x30 cm (12x12 in) for 95%+ mortar coverage",
          "Apply liquid waterproofing membrane and corner sealing tape in wet areas"
        ],
        permitsAndRules: [
          "Interior re-tiling is generally exempt from building permits",
          "Demolition rubble, old ceramic tiles, and thin-set dust must be brought to recycling stations",
          "Adhere to noise regulations during heavy tile cutting and chipping"
        ]
      },
      mainSteps: [
        "Inspect and level subfloor using self-leveling compound if necessary",
        "Establish perpendicular reference lines with chalk snap lines or cross-line laser",
        "Spread thin-set mortar using a notched trowel suitable for the tile size",
        "Set tiles with a twisting motion and install leveling clips between pieces",
        "Break off clip tops once adhesive has cured (24h) and scrape excess mortar from joints",
        "Grout joints thoroughly, sponge clean before haze sets, and caulk expansion perimeter"
      ],
      estimatedTime: "2-3 days for a 15-20 m² room (including adhesive cure and grouting)",
      diySummaryNote: "Floating floors provide easy high-reward DIY. Porcelain tiling and shower waterproofing require patience and the right specialized leveling tools."
    },
    fr: {
      feasibility: {
        rating: "Faisable avec précaution",
        analysis: "La pose de parquet stratifié ou PVC à clipser est très accessible. La pose de carrelage en grès cérame, grands formats ou douche à l'italienne nécessite une grande rigueur, une découpeuse à eau et une étanchéité irréprochable.",
        risks: [
          "Désaffleurs (redans) entre carreaux en cas de chape non plane ou manque de croisillons nivelants",
          "Décollement futur des carreaux si colle inadaptée (mortier-colle C2S obligatoire pour grand grès)",
          "Sinistres dégâts des eaux sous douches et pièces humides si l'étanchéité sous carrelage (SPEC) est négligée",
          "Casse de carreaux lors des coupes d'angles et perçages de tuyauterie"
        ],
        recommendations: [
          "Vérifier la planéité du sol (règle de 2m) et ragréer si les défauts dépassent 3mm",
          "Employer systématiquement un kit de croisillons autonivelants à coins",
          "Pratiquer le double encollage pour tous carreaux supérieurs à 30x30 cm",
          "Poser une membrane ou un système d'étanchéité liquide (SPEC) avec bandes d'angle en zone douche"
        ],
        permitsAndRules: [
          "Remplacement de carrelage en intérieur dispensé de permis de construire",
          "Gravats de démolition et morceaux de faïence à déposer en déchetterie (filière minérale)",
          "Respecter le règlement de copropriété pour les heures d'usage des meuleuses et scies"
        ]
      },
      mainSteps: [
        "Préparation du support, dépoussiérage et ragréage autolissant si nécessaire",
        "Traçage des axes de départ au cordeau ou au niveau laser au centre de la pièce",
        "Application de la colle avec un peigne cranté adapté au format",
        "Pose des carreaux, frappe au maillet blanc et mise sous tension des croisillons nivelants",
        "Retrait des cales après 24h de séchage et grattage des joints",
        "Application du joint de carrelage à la raclette en caoutchouc puis lissage à l'éponge"
      ],
      estimatedTime: "2 à 3 jours pour 15-20 m² (en comptant la prise de la colle et le jointoiement)",
      diySummaryNote: "Économie remarquable sur la pose. La réussite réside dans la planéité du support et l'utilisation de croisillons autonivelants."
    },
    de: {
      feasibility: {
        rating: "Machbar mit Sorgfalt",
        analysis: "Klick-Laminat oder Vinylböden lassen sich von Heimwerkern hervorragend selbst verlegen. Fliesenlegen mit Feinsteinzeug, Großformaten oder bodengleichen Duschen verlangt Erfahrung, Nassschneider und lückenlose Verbundabdichtung.",
        risks: [
          "Höhenversätze (Überzähne) durch unebenen Estrich oder fehlendes Nivelliersystem",
          "Hohlstellen und Fliesenablösung bei falschem Fliesenkleber (C2-Flexkleber für Feinsteinzeug Pflicht)",
          "Wasserschäden im Bad durch lückenhafte Abdichtung unter den Fliesen",
          "Bruchgefahr bei Ausklinkungen um Heizungsrohre und Bodeneinläufe"
        ],
        recommendations: [
          "Estrich auf Ebenheit prüfen und bei Unebenheiten > 3 mm mit Fließspachtel ausgleichen",
          "Fliesen-Nivelliersystem mit Zuglaschen und Keilen für plane Übergänge verwenden",
          "Bei Formaten ab 30x30 cm das Buttering-Floating-Verfahren (beidseitiger Kleberauftrag) anwenden",
          "In Nassbereichen zwingend eine Verbundabdichtung mit Dichtbändern in den Ecken aufbringen"
        ],
        permitsAndRules: [
          "Renovierung im Innenbereich ist baurechtlich verfahrensfrei",
          "Bauschutt und alte Fliesenreste sind über den Bauschuttcontainer am Recyclinghof zu entsorgen",
          "Lärmschutzzeiten bei Fliesenschneider- und Stemmarbeiten beachten"
        ]
      },
      mainSteps: [
        "Untergrund reinigen, grundieren und ggf. mit Ausgleichsmasse glätten",
        "Fliesenachsen mit Kreuzlinienlaser im Raum anlegen und Probeverlegung durchführen",
        "Flexkleber mit der passenden Zahnkelle aufkämmen",
        "Fliese einschieben, anklopfen und Nivellierlaschen einsetzen",
        "Nach Durchtrocknung Laschen abstoßen und Fugen von Kleberresten säubern",
        "Fugenmörtel diagonal einschlämmen und mit Schwammbrett sauber abwaschen"
      ],
      estimatedTime: "2-3 Tage für einen 15-20 m² Raum (inklusive Aushärtung und Verfugung)",
      diySummaryNote: "Klickböden sind schnell und kostengünstig selbst verlegt. Beim Fliesenlegen im Bad erfordert die Abdichtung höchste Sorgfalt."
    }
  },

  // 4. Idraulico / Termoidraulico
  idraulico: {
    it: {
      feasibility: {
        rating: "Fattibile con riserva",
        analysis: "La sostituzione di rubinetti, saliscendi doccia o sifoni è ampiamente fattibile in autonomia. L'installazione di caldaie a gas, pompe di calore, linee gas e impianti sanitari completi sotto traccia è vietata al fai da te per legge e richiede un termoidraulico abilitato per il rilascio della Dichiarazione di Conformità (DiCo).",
        risks: [
          "Perdite idriche occulte con danni strutturali e infiltrazioni agli alloggi sottostanti",
          "Fughe di gas o intossicazione da monossido di carbonio per allacci caldaia non certificati",
          "Danni da sovrapressione e scoppio tubazioni per mancata installazione di valvole di sicurezza",
          "Annullamento della copertura assicurativa casa in caso di allagamento causato da lavori non certificati"
        ],
        recommendations: [
          "Chiudere sempre la saracinesca generale dell'acqua prima di svitare qualsiasi raccordo",
          "Utilizzare guarnizioni nuove in fibra o EPDM e nastro teflon / canapa con pasta sigillante",
          "Non intervenire mai personalmente su tubazioni e contatori del gas metano o GPL",
          "Affidare caldaie, condizionatori F-Gas e impianti radianti esclusivamente a ditte abilitate"
        ],
        permitsAndRules: [
          "Manutenzione ordinaria (rubinetti, sifoni) in edilizia libera",
          "Nuovi impianti idro-termo-sanitari o sostituzione caldaia richiedono obbligatoriamente DiCo DM 37/08 e libretto d'impianto",
          "Rottamazione vecchie caldaie con certificato di smaltimento RAEE/metalli"
        ]
      },
      mainSteps: [
        "Interruzione dell'alimentazione idrica generale e scarico della pressione residua",
        "Smontaggio del componente idraulico usurato con raccolta dell'acqua residua in bacinella",
        "Pulizia dei filetti maschio e femmina e rimozione di vecchi residui di calcare o canapa",
        "Applicazione del sigillante su filettature (teflon o filo poliammidico) in senso orario",
        "Montaggio del nuovo raccordo o rubinetto e serraggio con chiave fissa senza forzare le guarnizioni",
        "Riapertura graduale dell'acqua e controllo visivo di tenuta a secco sotto pressione per 30 minuti"
      ],
      estimatedTime: "1-2 ore per singola utenza; 2-3 giorni per rifacimento completo eseguito da idraulico",
      diySummaryNote: "Piccole riparazioni e cambi rubinetto permettono di risparmiare molto. Qualsiasi modifica strutturale all'impianto o alla linea gas richiede per sicurezza e legge il professionista abilitato."
    },
    en: {
      feasibility: {
        rating: "Feasible with caution",
        analysis: "Replacing bathroom faucets, shower heads, or exposed traps is a great DIY task. Modifying gas pipes, installing boilers, heat pumps, or running concealed pressurized plumbing is restricted by building regulations and requires certified plumbing contractors for insurance validity.",
        risks: [
          "Hidden pipe leaks causing severe drywall, ceiling, and neighbor water damage",
          "Catastrophic gas leaks or carbon monoxide hazards from improper combustion flue hookups",
          "Scalding or water hammer damage from lack of pressure-reducing or mixing valves",
          "Denial of homeowner insurance claims for water damages caused by unlicensed plumbing modifications"
        ],
        recommendations: [
          "Always shut off the main water isolation valve and open taps to relieve pressure before starting",
          "Use fresh EPDM gaskets and wrap PTFE thread tape tightly clockwise on male threads",
          "Never attempt DIY repairs on gas lines, water heaters, or main sewer stacks",
          "Leave boiler commissioning, refrigerant lines, and certified backflow testing to licensed pros"
        ],
        permitsAndRules: [
          "Direct fixture replacement (taps, shower trim) does not require a building permit",
          "Boiler installations, gas work, and whole-house re-pipes require municipal certification and Gas Safe / certified trade signs",
          "Recycle old brass, copper, and water heaters at authorized scrap facilities"
        ]
      },
      mainSteps: [
        "Shut off water main and drain lines through the lowest household faucet",
        "Place a catch bucket beneath the old fixture and disconnect supply lines",
        "Clean threads thoroughly, scraping away old dried pipe dope or deteriorated tape",
        "Apply 4-6 wraps of PTFE sealant tape clockwise around all male pipe threads",
        "Hand-thread new connection, then tighten gently with a wrench without crushing gaskets",
        "Re-pressurize system slowly and monitor all joints with dry paper towel for at least 30 minutes"
      ],
      estimatedTime: "1-2 hours per fixture; 2-4 days for whole-bathroom plumbing by a pro",
      diySummaryNote: "Replacing taps, sinks, and traps is economical DIY. Never risk gas, main supply lines, or boiler work without licensed certification."
    },
    fr: {
      feasibility: {
        rating: "Faisable avec réserves",
        analysis: "Remplacer un mitigeur, un mécanisme de chasse d'eau ou un siphon est à la portée d'un bon bricoleur. Toute intervention sur le réseau de gaz, le remplacement de chaudière ou la modification lourde de canalisations encastrées impose un professionnel qualifié pour la conformité et l'assurance.",
        risks: [
          "Fuites d'eau sournoises provoquant des dégâts des eaux majeurs aux étages inférieurs",
          "Risque mortel d'asphyxie au monoxyde de carbone ou fuite de gaz sur raccordements chaudière",
          "Détérioration prématurée des raccords par serrage excessif écrasant les joints",
          "Non-couverture par l'assurance habitation en cas de sinistre sur réseau modifié sans certificat"
        ],
        recommendations: [
          "Couper systématiquement l'arrivée générale d'eau avant tout démontage",
          "Changer systématiquement les joints fibre ou caoutchouc par des neufs",
          "Ne jamais intervenir soi-même sur les conduites ou détendeurs de gaz",
          "Confier pompes à chaleur, chaudières et climatiseurs à un artisan certifié RGE / Qualigaz"
        ],
        permitsAndRules: [
          "Remplacement à l'identique de robinetterie sans formalité",
          "Installations gaz soumises au certificat de conformité Qualigaz obligatoire",
          "Évacuation des chauffe-eau et métaux usagés en déchetterie spécialisée"
        ]
      },
      mainSteps: [
        "Fermeture de la vanne générale d'alimentation et purge de la pression résiduelle",
        "Dévissage soigné des flexibles usagés avec un récipient de récupération d'eau",
        "Nettoyage des filetages et contrôle de l'état des portées de joints",
        "Enroulement du ruban PTFE (téflon) dans le sens horaire sur les filetages coniques",
        "Vissage à la main puis blocage modéré à la clé plate sans déformer les joints",
        "Remise en eau progressive et inspection méticuleuse de chaque raccord pendant 30 minutes"
      ],
      estimatedTime: "1 à 2 heures par appareil ; 2 à 4 jours pour un réseau complet par un pro",
      diySummaryNote: "Rentabilité excellente pour changer un robinet ou une bonde. Pour les chaudières ou canalisations sous dalle, l'intervention d'un artisan certifié reste indispensable."
    },
    de: {
      feasibility: {
        rating: "Machbar mit Vorbehalt",
        analysis: "Der Austausch von Waschtischarmaturen, Duschstangen oder Siphons ist eine ideale Heimwerkeraufgabe. Arbeiten an Gasleitungen, Heizkesseln, Wärmepumpen oder verdeckten Trinkwasserleitungen sind Fachbetrieben vorbehalten und erfordern behördliche Fachunternehmererklärungen.",
        risks: [
          "Unbemerkte Wasserleckagen mit schweren Bauschäden und Schimmelbildung im Mauerwerk",
          "Lebensgefahr durch Gaslecks oder Kohlenmonoxidaustritt bei unsachgemäßem Heizungsanschluss",
          "Verkeimung der Trinkwasserinstallation durch Stagnationswasser bei falscher Leitungsverlegung",
          "Verlust des Versicherungsschutzes bei Wasserschäden durch nicht fachgerechte DIY-Installation"
        ],
        recommendations: [
          "Vor jedem Eingriff stets den Haupthahn schließen und Leitungen drucklos machen",
          "Immer neue Dichtungen einsetzen und Gewinde mit Teflonband oder Dichtfaden abdichten",
          "Niemals Arbeiten an Gasgeräten, Thermen oder Sicherheitsventilen selbst ausführen",
          "Heizungsanlagen und Kältemittelleitungen ausschließlich durch SHK-Innungsbetriebe montieren lassen"
        ],
        permitsAndRules: [
          "Austausch von Armaturen ist genehmigungsfrei",
          "Gasinstallationen und Heizungserneuerung nach Trinkwasserverordnung und EnEV/GEG durch Meisterbetrieb meldepflichtig",
          "Altgeräte (Boiler, Armaturen) über Wertstoffhof recyceln"
        ]
      },
      mainSteps: [
        "Hauptabsperrhahn schließen und Wasserhähne zum Entleeren öffnen",
        "Eimer unterstellen und alte Armatur sowie flexible Anschlussschläuche lösen",
        "Eckventile reinigen und Gewinde auf Beschädigungen prüfen",
        "Gewinde mit Teflonband im Uhrzeigersinn umwickeln und Dichtungen einlegen",
        "Neue Armatur montieren und Anschlüsse vorsichtig mit dem Schraubenschlüssel anziehen",
        "Wasser langsam aufdrehen und alle Verbindungsstellen mindestens 30 Minuten auf Dichtheit überwachen"
      ],
      estimatedTime: "1-2 Stunden pro Armatur; 2-4 Tage für eine komplette Badinstallation durch Profis",
      diySummaryNote: "Armaturentausch spart spürbar Handwerkerkosten. Bei Gas-, Trinkwasser- und Heizungsanlagen schützt der Fachbetrieb Ihre Gesundheit und den Versicherungsschutz."
    }
  },

  // 5. Elettricista / Domotica
  elettricista: {
    it: {
      feasibility: {
        rating: "Sconsigliato fai da te",
        analysis: "La sostituzione di una placca estetica, di una lampadina o di un lampadario su punto luce già esistente può essere fatta da un privato prudente dopo aver tolto tensione. La posa di nuove linee, il rifacimento del quadro elettrico, l'installazione di salvavita o wallbox EV richiede per legge (DM 37/08) un elettricista abilitato con rilascio di Dichiarazione di Conformità.",
        risks: [
          "Folgorazione, scossa elettrica e pericolo di morte per contatto diretto o indiretto",
          "Rischio di incendi per surriscaldamento cavi causato da dimensionamento errato dei magnetotermici",
          "Mancato intervento delle protezioni differenziali per assenza o difetto della messa a terra",
          "Mancanza di valore legale dell'impianto con impossibilità di vendere l'immobile o affittarlo"
        ],
        recommendations: [
          "Togliere SEMPRE l'interruttore generale del quadro elettrico e verificare l'assenza di tensione con un cercafase",
          "Non lavorare mai a piedi nudi o con mani umide",
          "Utilizzare unicamente cacciaviti e pinze isolati a 1000V certificati VDE",
          "Affidare quadri, linee di terra e certificazioni esclusivamente a un elettricista qualificato"
        ],
        permitsAndRules: [
          "Sostituzione singola placca o lampada in manutenzione ordinaria libera",
          "Tutti gli interventi su quadri, linee e nuovi punti presa richiedono Dichiarazione di Conformità (DM 37/08 Lettera A)",
          "Smaltimento corpi illuminanti e relè presso isole ecologiche (RAEE)"
        ]
      },
      mainSteps: [
        "Sezionamento dell'impianto staccando il salvavita generale al quadro elettrico",
        "Verifica strumentale della totale assenza di tensione sul punto luce con multimetro o cercafase",
        "Smontaggio del frutto o lampada usurata contrassegnando fase (marrone/nero), neutro (blu) e terra (giallo-verde)",
        "Spelatura corretta del conduttore a 10-12 mm senza intaccare il rame interno",
        "Serraggio saldo nei morsetti a vite o ad innesto rapido dei conduttori rispettando la polarità",
        "Fissaggio meccanico del supporto a muro, riarmo dell'interruttore generale e collaudo accensione"
      ],
      estimatedTime: "30-60 minuti per singolo punto luce/presa; 3-5 giorni per impianto completo da ditta",
      diySummaryNote: "Piccoli montaggi di lampadari sono fattibili a tensione disattivata. Per sicurezza vitale e conformità di legge, le modifiche all'impianto elettrico devono essere certificate da professionisti."
    },
    en: {
      feasibility: {
        rating: "Caution advised / Pro recommended",
        analysis: "Swapping an existing light fixture or faceplate can be done safely by homeowners following strict lockout procedures. Adding new circuits, upgrading consumer units (breaker panels), or wiring EV chargers requires a licensed electrician to meet electrical codes (NEC / BS 7671) and provide safety certificates.",
        risks: [
          "Lethal electrical shock or electrocution from contact with live energized wires",
          "Electrical fire hazards caused by undersized wiring, poor connections, or incorrect breaker ratings",
          "Failure of ground-fault or residual current protection due to absent bonding",
          "Invalidation of building insurance and difficulties during property sale without certified compliance"
        ],
        recommendations: [
          "ALWAYS de-energize the main breaker and test circuits with a certified non-contact voltage tester",
          "Never work in wet conditions or with uninsulated tools; use VDE-rated 1000V screwdrivers",
          "Never bridge, bypass, or alter circuit breakers or GFCI/RCD protection devices",
          "Hire a certified electrician for panel upgrades, sub-panels, and new wiring runs"
        ],
        permitsAndRules: [
          "Minor fixture replacement generally permitted without electrical permits",
          "New circuit additions, consumer units, and EV chargers require electrical permits and inspection certificates",
          "Dispose of old electronics, fluorescent tubes, and breakers at authorized e-waste depots"
        ]
      },
      mainSteps: [
        "Switch off the main breaker supplying the circuit at the distribution board",
        "Confirm zero voltage using an approved two-pole voltage indicator or multimeter",
        "Disconnect old fixture, noting live (black/brown), neutral (white/blue), and ground (green/bare)",
        "Strip wire insulation cleanly to required length (approx 10-12 mm) without nicking copper",
        "Insert conductors firmly into screw or push-in terminals, ensuring no bare wire is exposed",
        "Secure faceplate to junction box, restore power at main panel, and test operation"
      ],
      estimatedTime: "30-60 minutes per fixture/outlet; 3-5 days for whole-house rewire by contractors",
      diySummaryNote: "Simple cosmetic fixture replacements are safe when completely powered down. All distribution panel and structural circuit modifications require certified electricians for life safety."
    },
    fr: {
      feasibility: {
        rating: "Déconseillé en bricolage",
        analysis: "Changer un luminaire ou remplacer une plaque d'interrupteur existante est faisable en coupant l'alimentation. Toute création de nouvelle ligne, modification du tableau électrique, pose de disjoncteur différentiel ou borne de recharge VE doit être confiée à un électricien qualifié pour respecter la norme NF C 15-100 et obtenir l'attestation Consuel.",
        risks: [
          "Électrisation ou électrocution mortelle par contact direct",
          "Incendie d'origine électrique provoqué par un échauffement de câbles sous-dimensionnés",
          "Défaut de déclenchement des protections en cas de mise à la terre absente ou défaillante",
          "Refus d'indemnisation de l'assurance et blocage lors de la vente du logement en l'absence de certificat Consuel"
        ],
        recommendations: [
          "Couper TOUJOURS le disjoncteur général d'abonné avant toute manipulation",
          "Vérifier impérativement l'absence de tension (VAT) avec un multimètre ou vérificateur certifié",
          "Utiliser exclusivement des tournevis isolés 1000V certifiés VDE",
          "Confier les tableaux électriques et les nouvelles lignes à un artisan habilité"
        ],
        permitsAndRules: [
          "Remplacement à l'identique d'un interrupteur ou luminaire dispensé de formalité",
          "Rénovation complète ou création de circuit soumise à attestation de conformité Consuel",
          "Recyclage obligatoire des ampoules, tubes et appareillages en déchetterie (filière DEEE)"
        ]
      },
      mainSteps: [
        "Consignation électrique en coupant le disjoncteur général du tableau",
        "Vérification d'Absence de Tension (VAT) rigoureuse sur les bornes du circuit concerné",
        "Démontage de l'appareil en repérant la phase (rouge/marron), le neutre (bleu) et la terre (vert/jaune)",
        "Dénudage propre des conducteurs sur 10-12 mm sans entamer l'âme en cuivre",
        "Raccordement serré dans les bornes automatiques ou à vis sans laisser de cuivre apparent",
        "Fixation du mécanisme dans la boîte d'encastrement, réarmement du disjoncteur et test"
      ],
      estimatedTime: "30-60 minutes par prise ou point lumineux ; 3-5 jours pour une mise aux normes complète",
      diySummaryNote: "Le remplacement de luminaires est accessible hors tension. Pour votre sécurité vitale et celle de vos proches, les tableaux et circuits doivent être réalisés par un électricien certifié."
    },
    de: {
      feasibility: {
        rating: "Heimwerken nicht empfohlen",
        analysis: "Der Austausch einer Lampenabdeckung oder das Anschließen einer Deckenleuchte an bestehenden Auslässen ist bei freigeschalteter Sicherung möglich. Das Verlegen neuer Leitungen, der Umbau des Sicherungskastens, der Einbau von FI-Schutzschaltern oder Wallboxen ist gemäß NAV § 13 konzessionierten Elektroinstallateuren vorbehalten.",
        risks: [
          "Lebensgefährlicher elektrischer Schlag bei Berührung spannungsführender Teile",
          "Schwelbrände durch Übergangswiderstände an lockeren Klemmen oder überlasteten Leitungen",
          "Versagen von Schutzeinrichtungen bei fehlerhafter oder fehlender Schutzerdung",
          "Verlust des Versicherungsschutzes bei Brandschäden durch nicht abgenommene Elektroarbeiten"
        ],
        recommendations: [
          "Stets die 5 Sicherheitsregeln der Elektrotechnik beachten: 1. Freischalten, 2. Gegen Wiedereinschalten sichern, 3. Spannungsfreiheit feststellen!",
          "Ausschließlich zweipolige Spannungsprüfer (Duspol) verwenden – keine einfachen Phasenprüfer-Schraubendreher",
          "Nur VDE-zertifiziertes isoliertes Werkzeug (1000 V) einsetzen",
          "Verteilerkästen, Erdungsanlagen und Zählerplätze zwingend vom Meisterbetrieb installieren lassen"
        ],
        permitsAndRules: [
          "Austausch von Leuchtmitteln und Schalterwippen ist genehmigungsfrei",
          "Installationsarbeiten an der Hausanlage unterliegen DIN VDE 0100 und erfordern Fachbetriebsnachweis",
          "Alte Elektrogeräte und Leuchtstoffröhren gehören zum Elektronikschrott am Wertstoffhof"
        ]
      },
      mainSteps: [
        "Sicherung im Verteilerkasten ausschalten und gegen Wiedereinschalten sichern",
        "Mit einem zweipoligen Spannungsprüfer allpolig die absolute Spannungsfreiheit prüfen",
        "Altes Gerät vorsichtig ausbauen und Adern zuordnen: Phase (braun/schwarz), Neutralleiter (blau), Schutzleiter (grün-gelb)",
        "Leiterenden sauber auf 10-12 mm abisolieren, ohne die Kupferadern zu beschädigen",
        "Adern fest in WAGO-Klemmen oder Schraubanschlüsse stecken, sodass kein blankes Kupfer hervorsteht",
        "Gerät in die Schalterdose einsetzen, Sicherung einschalten und Funktionsprüfung durchführen"
      ],
      estimatedTime: "30-60 Minuten pro Schalter/Lampe; 3-5 Tage für eine komplette Neuinstallation durch Elektriker",
      diySummaryNote: "Einfacher Lampentausch bei abgeschalteter Sicherung ist möglich. Für alle Eingriffe in den Stromkreis und Verteiler ist ein Fachbetrieb aus Sicherheits- und Haftungsgründen unverzichtbar."
    }
  }
};

/**
 * Ottiene i dati standard per un settore e una lingua specifica.
 * Se il settore o la lingua non sono esatti, effettua un fallback pulito.
 */
export function getStandardSectorEstimate(
  sectorId?: string,
  language?: string,
  countryName?: string
): DegradedSectorData {
  const lang = (language || "it").toLowerCase();
  const validLang = ["it", "en", "fr", "de"].includes(lang) ? lang : "it";
  const sec = (sectorId || "imbianchino").toLowerCase();

  const sectorMap = standardSectorData[sec] || standardSectorData["imbianchino"];
  const baseData = sectorMap[validLang] || sectorMap["it"];

  // Cloniamo i dati per evitare mutazioni
  const cloned: DegradedSectorData = {
    feasibility: {
      rating: baseData.feasibility.rating,
      analysis: baseData.feasibility.analysis,
      risks: [...baseData.feasibility.risks],
      recommendations: [...baseData.feasibility.recommendations],
      permitsAndRules: [...baseData.feasibility.permitsAndRules]
    },
    mainSteps: [...baseData.mainSteps],
    estimatedTime: baseData.estimatedTime,
    diySummaryNote: baseData.diySummaryNote
  };

  // Se specificato il nome paese, personalizziamo leggermente le note sui permessi
  if (countryName && countryName.trim().length > 0) {
    if (validLang === "it") {
      cloned.feasibility.permitsAndRules.push(
        `Verificare eventuali regolamenti comunali o disposizioni locali specifiche vigenti in ${countryName}.`
      );
    } else if (validLang === "en") {
      cloned.feasibility.permitsAndRules.push(
        `Verify local municipality codes and regional guidelines applicable in ${countryName}.`
      );
    } else if (validLang === "fr") {
      cloned.feasibility.permitsAndRules.push(
        `Vérifier les arrêtés municipaux et réglementations locales applicables en ${countryName}.`
      );
    } else if (validLang === "de") {
      cloned.feasibility.permitsAndRules.push(
        `Örtliche Bauvorschriften und behördliche Richtlinien in ${countryName} beachten.`
      );
    }
  }

  return cloned;
}
