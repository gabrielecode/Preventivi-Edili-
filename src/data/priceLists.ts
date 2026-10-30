export interface PriceItem {
  id: string;
  name: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  category: string; // Logical category for sorting and dropdown menu selection
  materialPct?: number; // 0-1 quota del prezzo che è costo materiali
  diyLevel?: 1 | 2 | 3 | 4 | 5; // 1 = facile, 5 = solo professionisti
  diyAllowed?: "yes" | "partial" | "no";
  diyHoursPerUnit?: number;
  wastePct?: number;
  tools?: string[];
  diyNote?: string;
}

export type QualityLevel = "base" | "standard" | "premium";
export type SkillLevel = "beginner" | "handy" | "expert";
export type EstimateMode = "diy" | "pro" | "compare";

export interface ToolItem {
  id: string;
  name: string;
  buyPrice: number;
  rentPricePerDay: number;
}

export const toolsCatalog: ToolItem[] = [
  { id: "tool_rullo_pennelli", name: "Set rulli, pennelli e teli protettivi", buyPrice: 45, rentPricePerDay: 5 },
  { id: "tool_scala_telescopica", name: "Scala telescopica / Trabattello domestico", buyPrice: 120, rentPricePerDay: 15 },
  { id: "tool_miscelatore", name: "Trapano miscelatore per stucchi e colle", buyPrice: 90, rentPricePerDay: 12 },
  { id: "tool_levigatrice", name: "Levigatrice orbitale per pareti", buyPrice: 110, rentPricePerDay: 14 },
  { id: "tool_spatola_veneziana", name: "Spatola inox e frattazzo per decorativi", buyPrice: 35, rentPricePerDay: 6 },
  { id: "tool_livello_laser", name: "Livello laser a croce per squadri", buyPrice: 130, rentPricePerDay: 18 },
  { id: "tool_avvitatore", name: "Avvitatore / Foratore a batteria", buyPrice: 150, rentPricePerDay: 20 }
];

export interface Sector {
  id: string;
  name: string;
  icon: string;
  description: string;
  certifications: string[];
  categories: Array<{ id: string; name: string }>; // Sub-categories for drop-downs
  items: PriceItem[];
}

export const sectorPriceLists: Sector[] = [
  {
    id: "imbianchino",
    name: "Imbianchino / Decoratore",
    icon: "Paintbrush",
    description: "Opere di tinteggiatura interna/esterna, stuccatura, trattamenti antimuffa e decorazioni.",
    certifications: [
      "Marcatura CE dei prodotti vernicianti",
      "Conformità requisiti minimi VOC (Composti Organici Volatili)",
      "Certificazione di idoneità tecnico-professionale (Allegato XVII D.Lgs. 81/08)"
    ],
    categories: [
      { id: "all", name: "Tutte le lavorazioni" },
      { id: "pit", name: "Tinteggiatura e Pittura" },
      { id: "prep", name: "Preparazione e Sanificazione" },
      { id: "dec", name: "Finiture Decorative" },
      { id: "cart", name: "Cartongesso & Coibentazione" }
    ],
    items: [
      {
        id: "imb_dip_idro",
        name: "Tinteggiatura interna con idropittura (2 mani)",
        unit: "mq",
        minPrice: 8,
        maxPrice: 15,
        category: "pit",
        description: "Compresa preparazione delle superfici, stuccatura semplice e stesura di due mani di idropittura bianca o tinte pastello.",
        materialPct: 0.35,
        diyLevel: 2,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.3,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli", "tool_scala_telescopica"],
        diyNote: "Richiede buona protezione dei mobili e precisione nei bordi. Coprire accuratamente pavimento e battiscopa."
      },
      {
        id: "imb_dip_lav",
        name: "Tinteggiatura interna con pittura lavabile idrorepellente",
        unit: "mq",
        minPrice: 12,
        maxPrice: 20,
        category: "pit",
        description: "Ideale per bagni e cucine, pittura ad alta resistenza allo sfregamento ed umidità.",
        materialPct: 0.40,
        diyLevel: 2,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.35,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli", "tool_scala_telescopica"],
        diyNote: "Usare idropittura lavabile specifica per ambienti umidi. Applicare due mani a distanza di 4-6 ore."
      },
      {
        id: "imb_dip_est_sil",
        name: "Tinteggiatura esterna ai silossani ad alta traspirabilità",
        unit: "mq",
        minPrice: 18,
        maxPrice: 30,
        category: "pit",
        description: "Pittura per esterni ad elevata resistenza agli agenti atmosferici e raggi UV, idrorepellente e permeabile al vapore.",
        materialPct: 0.45,
        diyLevel: 3,
        diyAllowed: "partial",
        diyHoursPerUnit: 0.45,
        wastePct: 0.15,
        tools: ["tool_rullo_pennelli", "tool_scala_telescopica"],
        diyNote: "Attenzione ai lavori in quota su facciata esterna. Utilizzare trabattello a norma e DPI adeguati."
      },
      {
        id: "imb_dip_est_acr",
        name: "Pitturazione facciate esterne al quarzo acrilico",
        unit: "mq",
        minPrice: 15,
        maxPrice: 28,
        category: "pit",
        description: "Finitura opaca a base di resine acriliche e farina di quarzo ad alto potere riempitivo e protettivo.",
        materialPct: 0.40,
        diyLevel: 3,
        diyAllowed: "partial",
        diyHoursPerUnit: 0.40,
        wastePct: 0.15,
        tools: ["tool_rullo_pennelli", "tool_scala_telescopica"],
        diyNote: "Lavorazione in altezza sulle facciate. Richiede condizioni meteo favorevoli (senza pioggia o sole battente diretto)."
      },
      {
        id: "imb_ras_ges",
        name: "Rasatura pareti a gesso (civilino)",
        unit: "mq",
        minPrice: 15,
        maxPrice: 25,
        category: "prep",
        description: "Applicazione di stucco o gesso per livellamento e finitura liscia a specchio di pareti ruvide.",
        materialPct: 0.25,
        diyLevel: 4,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.8,
        wastePct: 0.20,
        tools: ["tool_miscelatore", "tool_levigatrice"],
        diyNote: "Richiede molta manualità ed esperienza per evitare imperfezioni e accumuli di stucco. Elevata produzione di polvere."
      },
      {
        id: "imb_tra_ant",
        name: "Trattamento sanificante antimuffa / anticondensa",
        unit: "mq",
        minPrice: 5,
        maxPrice: 10,
        category: "prep",
        description: "Rimozione muffa esistente con lavaggio acido specifico e applicazione di primer termoisolante/antimuffa.",
        materialPct: 0.50,
        diyLevel: 2,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.25,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli"],
        diyNote: "Utilizzare mascherina protettiva FFP2 durante il trattamento con prodotti antimuffa e candeggina/fungicida."
      },
      {
        id: "imb_rim_pap",
        name: "Rimozione meccanica di vecchia carta da parati",
        unit: "mq",
        minPrice: 5,
        maxPrice: 12,
        category: "prep",
        description: "Stacco bagnato o a vapore di parati esistenti, compresi lavaggio e raschiatura dei residui di colla.",
        materialPct: 0.20,
        diyLevel: 1,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.4,
        wastePct: 0.05,
        tools: ["tool_rullo_pennelli"],
        diyNote: "Lavoro faticoso ma semplice. Inumidire bene con acqua tiepida o rimuovi-colla prima di raschiare per non danneggiare l'intonaco."
      },
      {
        id: "imb_pos_pap",
        name: "Posa in opera carta da parati di pregio (esclusa carta)",
        unit: "mq",
        minPrice: 15,
        maxPrice: 30,
        category: "dec",
        description: "Incollaggio professionale di rotoli carta da parati con allineamento millimetrico dei pattern e dei sormonti.",
        materialPct: 0.60,
        diyLevel: 4,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.7,
        wastePct: 0.15,
        tools: ["tool_rullo_pennelli"],
        diyNote: "Richiede precisione millimetrica nella giunzione dei teli e gestione della colla. Molto difficile per principianti."
      },
      {
        id: "imb_dec_ven",
        name: "Finitura decorativa tipo Stucco Veneziano lucido",
        unit: "mq",
        minPrice: 40,
        maxPrice: 75,
        category: "dec",
        description: "Decorazione classica a spatola con effetto specchiato lucido ad alta eleganza per interni signorili.",
        materialPct: 0.45,
        diyLevel: 5,
        diyAllowed: "yes",
        diyHoursPerUnit: 1.2,
        wastePct: 0.15,
        tools: ["tool_spatola_veneziana"],
        diyNote: "Tecnica artistica avanzata con spatolature multiple e lucidatura finale. Richiede grande manualità professionale."
      },
      {
        id: "imb_dec_vel",
        name: "Finitura a velatura opaca o silossanica sfumata",
        unit: "mq",
        minPrice: 15,
        maxPrice: 28,
        category: "dec",
        description: "Tecnica decorativa con effetti di chiaro-scuro semitrasparenti adatta sia per ambienti classici che moderni.",
        materialPct: 0.40,
        diyLevel: 3,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.5,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli", "tool_spatola_veneziana"],
        diyNote: "Velatura decorativa con spugna o pennello. Richiede rapidità di esecuzione per evitare macchie di sovrapposizione."
      },
      {
        id: "imb_dec_ter",
        name: "Decorazione effetto 'Terre Fiorentine' o antico",
        unit: "mq",
        minPrice: 20,
        maxPrice: 38,
        category: "dec",
        description: "Applicazione speciale con pennello e spatola ad effetto rustico anticato tipico della tradizione toscana.",
        materialPct: 0.45,
        diyLevel: 3,
        diyAllowed: "yes",
        diyHoursPerUnit: 0.6,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli", "tool_spatola_veneziana"],
        diyNote: "Effetto decorativo rustico. Seguire attentamente le istruzioni del produttore per la granulometria e la stesura."
      },
      {
        id: "imb_ver_ter",
        name: "Verniciatura termosifoni in ghisa/metallo",
        unit: "cad",
        minPrice: 40,
        maxPrice: 80,
        category: "dec",
        description: "Carteggiatura e applicazione di smalto sintetico ad alta temperatura antiruggine.",
        materialPct: 0.30,
        diyLevel: 2,
        diyAllowed: "yes",
        diyHoursPerUnit: 1.0,
        wastePct: 0.10,
        tools: ["tool_rullo_pennelli"],
        diyNote: "I termosifoni devono essere freddi e ben carteggiati prima della verniciatura con smalto ad alte temperature."
      },
      {
        id: "imb_ver_inf",
        name: "Verniciatura / sverniciatura di persiane e infissi in legno",
        unit: "mq",
        minPrice: 60,
        maxPrice: 120,
        category: "dec",
        description: "Riportatura a legno grezzo tramite sverniciatore termico/chimico, carteggiatura fine e tripla mano di impregnante/smalto protettivo.",
        materialPct: 0.35,
        diyLevel: 3,
        diyAllowed: "yes",
        diyHoursPerUnit: 2.0,
        wastePct: 0.15,
        tools: ["tool_levigatrice", "tool_rullo_pennelli"],
        diyNote: "Sverniciatura e levigatura approfondita del legno. Richiede tempo e pazienza per un risultato duraturo agli agenti atmosferici."
      },
      {
        id: "imb_car_con",
        name: "Realizzazione controparete in cartongesso standard",
        unit: "mq",
        minPrice: 30,
        maxPrice: 45,
        category: "cart",
        description: "Fornitura, orditura metallica e posa di singola lastra in cartongesso 12.5mm con stuccatura giunti pronta per pittura.",
        materialPct: 0.60,
        diyLevel: 3,
        diyAllowed: "partial",
        diyHoursPerUnit: 1.0,
        wastePct: 0.12,
        tools: ["tool_avvitatore", "tool_livello_laser", "tool_miscelatore"],
        diyNote: "Montaggio struttura metallica e lastre. Se vi sono passaggi elettrici interni, il collaudo finale richiede tecnico abilitato."
      },
      {
        id: "imb_car_con_idro",
        name: "Controparete in cartongesso idrofugo (lastra verde bagni)",
        unit: "mq",
        minPrice: 35,
        maxPrice: 50,
        category: "cart",
        description: "Struttura per pareti umide dotata di lastre idrorepellenti antiumidità ideali per lavanderie, cucine e bagni.",
        materialPct: 0.60,
        diyLevel: 3,
        diyAllowed: "partial",
        diyHoursPerUnit: 1.1,
        wastePct: 0.12,
        tools: ["tool_avvitatore", "tool_livello_laser"],
        diyNote: "Usare lastre idrorepellenti (verdi) per bagni e cucine. Sigillare accuratamente i giunti con prodotti specifici antimuffa."
      },
      {
        id: "imb_car_con_isol",
        name: "Fornitura e posa controsoffitto in cartongesso isolato",
        unit: "mq",
        minPrice: 40,
        maxPrice: 65,
        category: "cart",
        description: "Controsoffittatura con lana di roccia o polistirene interno per isolamento termoriflettente e acustico tra piani.",
        materialPct: 0.65,
        diyLevel: 4,
        diyAllowed: "partial",
        diyHoursPerUnit: 1.3,
        wastePct: 0.15,
        tools: ["tool_avvitatore", "tool_livello_laser"],
        diyNote: "Posa di isolante termico/acustico in intercapedine. Attenzione ai requisiti energetici e antincendio se condominiale."
      }
    ]
  },
  {
    id: "serramentista",
    name: "Serramentista / Infissi",
    icon: "DoorOpen",
    description: "Fornitura, installazione e smaltimento di infissi in PVC/Alluminio, zanzariere, avvolgibili e porte blindate.",
    certifications: [
      "Certificazione di posa in opera qualificata UNI 11673-1",
      "Dichiarazione di Trasmittanza Termica dei serramenti (per detrazioni ENEA)",
      "Marcatura CE del serramento e dei sistemi oscuranti"
    ],
    categories: [
      { id: "all", name: "Tutte le lavorazioni" },
      { id: "fin", name: "Infissi e Finestre" },
      { id: "por", name: "Porte e Blindati" },
      { id: "acc", name: "Accessori e Oscuranti" },
      { id: "sic", name: "Barriere e Sicurezza" }
    ],
    items: [
      {
        id: "ser_pvc_std",
        name: "Installazione finestra in PVC standard (1 anta)",
        unit: "cad",
        minPrice: 400,
        maxPrice: 650,
        category: "fin",
        description: "Compreso telaio, vetrocamera basso emissivo, rimozione del vecchio infisso e smaltimento certificato."
      },
      {
        id: "ser_pvc_2an",
        name: "Installazione finestra in PVC ad alto isolamento (2 ante)",
        unit: "cad",
        minPrice: 600,
        maxPrice: 950,
        category: "fin",
        description: "Profilo multicamera PVC con triplo vetro, guarnizione termoacustica e microventilazione integrata."
      },
      {
        id: "ser_alu_tag",
        name: "Installazione finestra in Alluminio a taglio termico",
        unit: "cad",
        minPrice: 600,
        maxPrice: 950,
        category: "fin",
        description: "Profilo in alluminio di ultima generazione con isolamento acustico e termico potenziato antieffrazione."
      },
      {
        id: "ser_leg_all",
        name: "Finestra in Legno-Alluminio ad altissimo livello di design",
        unit: "cad",
        minPrice: 900,
        maxPrice: 1500,
        category: "fin",
        description: "Eccellenza estetica: interno in vero legno massello e guscio esterno protettivo in alluminio spazzolato."
      },
      {
        id: "ser_por_bli",
        name: "Installazione porta blindata d'ingresso Classe 3",
        unit: "cad",
        minPrice: 1200,
        maxPrice: 2200,
        category: "por",
        description: "Porta blindata completa di pannelli esterni, serratura a cilindro europeo a 5 chiavi antishock e controtelaio strutturale."
      },
      {
        id: "ser_por_int",
        name: "Installazione porta interna a battente tamburato",
        unit: "cad",
        minPrice: 200,
        maxPrice: 450,
        category: "por",
        description: "Fornitura e posa di porta interna, maniglia standard inclusa, coprifili registrabili e cerniere registrabili."
      },
      {
        id: "ser_por_scr",
        name: "Installazione porta interna a scomparsa (scrigno)",
        unit: "cad",
        minPrice: 350,
        maxPrice: 600,
        category: "por",
        description: "Posa del pannello porta all'interno del controtelaio a scomparsa predisposto a muro, guide, spazzolini e ferramenta."
      },
      {
        id: "ser_zan_rul",
        name: "Installazione zanzariera a rullo (finestre)",
        unit: "cad",
        minPrice: 80,
        maxPrice: 150,
        category: "acc",
        description: "Posa in opera di zanzariera in alluminio con rete in fibra di vetro e frizione di rallentamento di sicurezza."
      },
      {
        id: "ser_zan_pli",
        name: "Installazione zanzariera plissettata (porta-finestra)",
        unit: "cad",
        minPrice: 150,
        maxPrice: 250,
        category: "acc",
        description: "Ideale per zone ad alto passaggio, binario ultra-basso calpestabile antiglip e rete plissettata antipolline."
      },
      {
        id: "ser_sos_avv",
        name: "Sostituzione avvolgibile (tapparella in PVC/Alluminio leggeri)",
        unit: "cad",
        minPrice: 150,
        maxPrice: 300,
        category: "acc",
        description: "Include rimozione, fornitura e installazione nuova tapparella con cintino e accessori di scorrimento."
      },
      {
        id: "ser_mot_avv",
        name: "Motorizzazione pneumatica tapparella esistente",
        unit: "cad",
        minPrice: 120,
        maxPrice: 220,
        category: "acc",
        description: "Inserimento motore tubolare nel rullo, cablaggio elettrico alla scatola 503 e pulsante di comando salita/discesa."
      },
      {
        id: "ser_coi_cas",
        name: "Coibentazione termica ed acustica del cassonetto",
        unit: "cad",
        minPrice: 80,
        maxPrice: 160,
        category: "acc",
        description: "Soluzione ponti termici: posizionamento pannelli isolanti flessibili termo-acustici all'interno del cassonetto avvolgibile."
      },
      {
        id: "ser_gra_sic",
        name: "Installazione grate esterne di sicurezza in acciaio zincato",
        unit: "mq",
        minPrice: 350,
        maxPrice: 650,
        category: "sic",
        description: "Grate apribili o fisse con certificazione antieffrazione Classe 3, serratura di sicurezza a 3 punti di chiusura."
      },
      {
        id: "ser_per_all",
        name: "Persiana in alluminio a lamelle orientabili",
        unit: "mq",
        minPrice: 450,
        maxPrice: 800,
        category: "sic",
        description: "Persiane in alluminio estruso, ovaline orientabili per calibrare luce ed aria direttamente dall'interno."
      }
    ]
  },
  {
    id: "piastrellista",
    name: "Piastrellista / Pavimentatore",
    icon: "Grid",
    description: "Posa in opera di pavimenti in gres, ceramica, marmo, rivestimenti bagno/cucina, preparazione sottofondi e massetti.",
    certifications: [
      "Conformità posa piastrellature ceramiche UNI 11493-1",
      "Certificazione materiali inerti e adesivi in Classe C2TE / S1",
      "Dichiarazione smaltimento macerie in discarica autorizzata (F.I.R.)"
    ],
    categories: [
      { id: "all", name: "Tutte le lavorazioni" },
      { id: "pav", name: "Posa Pavimenti" },
      { id: "riv", name: "Rivestimenti e Finiture" },
      { id: "prep", name: "Preparazione Sottofondi" },
      { id: "imp", name: "Impermeabilizzazione e Trattamenti" }
    ],
    items: [
      {
        id: "pia_pos_gre",
        name: "Posa pavimento gres porcellanato format standard (fino a 60x60)",
        unit: "mq",
        minPrice: 25,
        maxPrice: 45,
        category: "pav",
        description: "Posa in opera con adesivi ad alta tecnologia, stucco cementizio o epossidico (escluso acquisto mattonelle)."
      },
      {
        id: "pia_pos_gre_gnd",
        name: "Posa gres grandi formati (80x80, 120x120 o lastre)",
        unit: "mq",
        minPrice: 40,
        maxPrice: 70,
        category: "pav",
        description: "Movimentazione e posa di formati moderni con sistema a doppia spalmatura adesiva e distanziatori livellanti a cuneo."
      },
      {
        id: "pia_pos_par",
        name: "Posa pavimento in legno prefinito (parquet)",
        unit: "mq",
        minPrice: 30,
        maxPrice: 50,
        category: "pav",
        description: "Incollaggio o posa flottante di listoni/plance prefiniti in essenza legno, pulizia dei residui superficiali di resina."
      },
      {
        id: "pia_pos_lam",
        name: "Posa pavimentazione flottante in PVC o laminato",
        unit: "mq",
        minPrice: 18,
        maxPrice: 30,
        category: "pav",
        description: "Stesura di tappetino fonoassorbente di sottofondo e posa a click ad incastro di listoncini PVC SPC ad alta resistenza."
      },
      {
        id: "pia_pos_riv",
        name: "Posa rivestimento bagno o parete cucina",
        unit: "mq",
        minPrice: 30,
        maxPrice: 50,
        category: "riv",
        description: "Posa in verticale di piastrelle o ceramiche, compresi tagli di precisione e fori per passaggi impianti idrici."
      },
      {
        id: "pia_pos_mos",
        name: "Posa rivestimento in mosaico artistico su rete",
        unit: "mq",
        minPrice: 50,
        maxPrice: 90,
        category: "riv",
        description: "Incollaggio fine e livellatura di fogli di mosaico ceramico o vitreo, stuccatura con malta epossidica antiacidità."
      },
      {
        id: "pia_pos_bat",
        name: "Posa battiscopa compreso incollaggio e stuccatura",
        unit: "ml",
        minPrice: 6,
        maxPrice: 12,
        category: "riv",
        description: "Rifilatura angoli a jolly a 45 gradi e sigillatura superiore d'unione con silicone o acrilico verniciabile."
      },
      {
        id: "pia_pos_bat_leg",
        name: "Montaggio battiscopa in legno o alluminio a clip",
        unit: "ml",
        minPrice: 5,
        maxPrice: 10,
        category: "riv",
        description: "Ancoraggio a parete tramite tasselli o collante polimerico di alta aderenza, tagli di giunzione."
      },
      {
        id: "pia_rim_pav",
        name: "Rimozione vecchio pavimento e massetto con smaltimento",
        unit: "mq",
        minPrice: 20,
        maxPrice: 35,
        category: "prep",
        description: "Demolizione accurata con martello pneumatico, carico manuale, trasporto e oneri di discarica certificati."
      },
      {
        id: "pia_rea_mas",
        name: "Realizzazione massetto cementizio tradizionale / autolivellante",
        unit: "mq",
        minPrice: 18,
        maxPrice: 30,
        category: "prep",
        description: "Stesura di sottofondo perfettamente planare, spessore medio 5cm, rinforzato con rete antiritiro o fibre."
      },
      {
        id: "pia_liv_aut",
        name: "Applicazione di rasante autolivellante a basso spessore",
        unit: "mq",
        minPrice: 10,
        maxPrice: 18,
        category: "prep",
        description: "Correzione dislivelli (da 1 a 10mm) su massetti esistenti pronti per parquet o PVC tramite malte autolivellanti rapide."
      },
      {
        id: "pia_imp_doc",
        name: "Impermeabilizzazione box doccia con elastomero e bandelle",
        unit: "lotto",
        minPrice: 120,
        maxPrice: 250,
        category: "imp",
        description: "Doppia mano di guaina liquida elastica su piatto e pareti doccia con posizionamento nastri sigillanti elastici coprigiunto."
      },
      {
        id: "pia_imp_bal",
        name: "Impermeabilizzazione elastica balconi o terrazzi (Mapelastic)",
        unit: "mq",
        minPrice: 25,
        maxPrice: 45,
        category: "imp",
        description: "Stesura di malta cementizia bicomponente elastica protettiva rinforzata con rete in fibra di vetro anticarbonatazione."
      },
      {
        id: "pia_luc_mar",
        name: "Levigatura e piombatura pavimenti in marmo/granito",
        unit: "mq",
        minPrice: 30,
        maxPrice: 55,
        category: "imp",
        description: "Arrotatura meccanica a diamante per eliminare gradini e graffi, stuccatura resino-cementizia e lucidatura a specchio."
      }
    ]
  },
  {
    id: "idraulico",
    name: "Idraulico / Termoidraulico",
    icon: "Droplets",
    description: "Rifacimento impianti idro-sanitari, installazione caldaie, condizionatori, riscaldamento e rubinetteria.",
    certifications: [
      "Dichiarazione di Conformità dell'Impianto alla regola dell'arte (DiCo ex DM 37/08 Lettera C)",
      "Certificato di collaudo e prova di tenuta impianto gas/acqua",
      "Comunicazione al catasto termico regionale (e.g. CURIT) e libretto d'impianto"
    ],
    categories: [
      { id: "all", name: "Tutte le lavorazioni" },
      { id: "imp", name: "Impianti e Distribuzione" },
      { id: "term", name: "Riscaldamento & Caldaie" },
      { id: "clim", name: "Climatizzazione" },
      { id: "san", name: "Sanitari e Arredo Bagno" }
    ],
    items: [
      {
        id: "idr_rif_bag",
        name: "Rifacimento completo impianto idrico bagno (fino a 4 punti)",
        unit: "lotto",
        minPrice: 3000,
        maxPrice: 5500,
        category: "imp",
        description: "Smantellamento, montaggio tubazioni in multistrato isolato per calda/fredda e scarichi insonorizzati, escluso sanitari."
      },
      {
        id: "idr_pon_idr",
        name: "Creazione di un singolo punto idrico aggiuntivo",
        unit: "cad",
        minPrice: 180,
        maxPrice: 350,
        category: "imp",
        description: "Cablaggio tubolari per singola utenza (lavatrice, lavello, wc o bidet) collegato ai collettori strutturali di distribuzione."
      },
      {
        id: "idr_sos_cal",
        name: "Sostituzione caldaia a condensazione certificata classe A",
        unit: "cad",
        minPrice: 1500,
        maxPrice: 2800,
        category: "term",
        description: "Compreso montaggio, raccordi, intubamento canna fumaria, lavaggio chimico dell'impianto, collaudo ed analisi fumi."
      },
      {
        id: "idr_ins_pomp",
        name: "Posa in opera pompa di calore monoblocco Aria-Acqua",
        unit: "cad",
        minPrice: 3500,
        maxPrice: 6500,
        category: "term",
        description: "Unità per riscaldamento, raffrescamento ed ACS con allaccio idraulico al collettore, impianto elettrico e collaudo f-gas."
      },
      {
        id: "idr_ris_pav",
        name: "Realizzazione impianto riscaldamento a pavimento radiante",
        unit: "mq",
        minPrice: 45,
        maxPrice: 75,
        category: "term",
        description: "Posa pannello bugnato isolante termico ad alta densità, stesura tubi in polietilene PE-Xa e collettore di regolazione."
      },
      {
        id: "idr_def_ter",
        name: "Lavaggio chimico e defangazione circuito riscaldamento",
        unit: "lotto",
        minPrice: 250,
        maxPrice: 450,
        category: "term",
        description: "Lavaggio forzato ad impulsi di fanghi e alghe in radiatori e calbi, inserimento inibitore di corrosione e filtro defangatore."
      },
      {
        id: "idr_ins_con",
        name: "Installazione condizionatore monosplit (9000 o 12000 BTU)",
        unit: "cad",
        minPrice: 350,
        maxPrice: 600,
        category: "clim",
        description: "Posa unità interna ed esterna, collegamento tubazioni rame isolate fino a 3mt, cablaggio, vuoto, refrigerante e test tenuta."
      },
      {
        id: "idr_ins_con_mul",
        name: "Installazione condizionatore multisplit (2 unità interne)",
        unit: "cad",
        minPrice: 650,
        maxPrice: 1100,
        category: "clim",
        description: "Cablaggio e tracciatura tubi per doppia split interna collegata ad un'unica macchina esterna più potente, scarico condense."
      },
      {
        id: "idr_sos_mis",
        name: "Sostituzione miscelatore / rubinetteria lavabo o bidet",
        unit: "cad",
        minPrice: 60,
        maxPrice: 120,
        category: "san",
        description: "Rimozione del vecchio, pulizia sede, installazione nuovo gruppo compreso flessibili di collegamento e teflon."
      },
      {
        id: "idr_mon_wc",
        name: "Montaggio vaso wc e bidet comprensivo di allacci",
        unit: "coppia",
        minPrice: 150,
        maxPrice: 280,
        category: "san",
        description: "Fissaggio sanitario a pavimento o sospeso, collegamento guarnizioni, canotti di scarico e sigillatura siliconica antimuffa."
      },
      {
        id: "idr_ins_box",
        name: "Installazione piatto doccia e cabina box doccia completa",
        unit: "lotto",
        minPrice: 180,
        maxPrice: 350,
        category: "san",
        description: "Alloggio e livellatura piatto, installazione profili murali cabina in cristallo temperato, sigillatura ed ispezione perdite."
      },
      {
        id: "idr_sos_sca",
        name: "Sostituzione scaldabagno elettrico ad accumulo (boiler 80L)",
        unit: "cad",
        minPrice: 250,
        maxPrice: 450,
        category: "san",
        description: "Posa staffe a muro ad alta tenuta, collaudo idraulico con valvola di sicurezza pressione antiritorno."
      },
      {
        id: "idr_ins_add",
        name: "Installazione addolcitore d'acqua domestico a ciclo salino",
        unit: "cad",
        minPrice: 800,
        maxPrice: 1500,
        category: "san",
        description: "Alloggiamento a monte rete idrica, pre-filtro a sedimenti, valvola volumetrica bypass di sicurezza e taratura durezza acqua."
      }
    ]
  },
  {
    id: "elettricista",
    name: "Elettricista",
    icon: "Zap",
    description: "Rifacimento impianti elettrici civili ed industriali, automazione, quadri di protezione e citofonia.",
    certifications: [
      "Dichiarazione di Conformità dell'Impianto alla regola dell'arte (DiCo ex DM 37/08 Lettera A, B)",
      "Verifica strumentale di resistenza di terra ed efficienza interruttori differenziali",
      "Conformità del quadro elettrico alla norma CEI EN 61439"
    ],
    categories: [
      { id: "all", name: "Tutte le lavorazioni" },
      { id: "cab", name: "Impianti e Cablaggi" },
      { id: "qua", name: "Quadri e Protezioni" },
      { id: "sic", name: "Sicurezza & Sorveglianza" },
      { id: "ill", name: "Illuminazione & LED" },
      { id: "dom", name: "Smart Home e Ricarica" }
    ],
    items: [
      {
        id: "ele_rif_imp",
        name: "Rifacimento impianto elettrico sfilabile (prezzo a punto luce)",
        unit: "punto",
        minPrice: 50,
        maxPrice: 85,
        category: "cab",
        description: "Fornitura e posa in canali/corrugati di conduttori antifiamma, scatole portafrutti, supporti e placche base."
      },
      {
        id: "ele_tag_tru",
        name: "Esecuzione tracce e posa corrugati a parete (escluso ripristino)",
        unit: "ml",
        minPrice: 15,
        maxPrice: 28,
        category: "cab",
        description: "Tracciatura scassi con scanalatore aspirato, rimozione macerie, posa tubi flessibili autoestinguenti e fissaggio rapido."
      },
      {
        id: "ele_ins_qua",
        name: "Installazione o rifacimento quadro elettrico generale (salvavita)",
        unit: "cad",
        minPrice: 350,
        maxPrice: 600,
        category: "qua",
        description: "Montaggio centralino da incasso/parete, interruttore generale magnetotermico differenziale selettivo e linee separate."
      },
      {
        id: "ele_sos_sal",
        name: "Sostituzione interruttore differenziale (salvavita) esausto",
        unit: "cad",
        minPrice: 80,
        maxPrice: 150,
        category: "qua",
        description: "Rimozione modulo vecchio, aggancio su barra DIN di nuovo interruttore differenziale magnetotermico ad alta sensibilità 30mA."
      },
      {
        id: "ele_ins_cit",
        name: "Installazione videocitofono monofamiliare 2 fili",
        unit: "cad",
        minPrice: 250,
        maxPrice: 500,
        category: "sic",
        description: "Posa pulsantiera esterna con telecamera, alimentatore bus a quadro e monitor interno HD, configurazione."
      },
      {
        id: "ele_ins_all",
        name: "Installazione impianto di allarme antintrusione wireless (kit base)",
        unit: "cad",
        minPrice: 800,
        maxPrice: 1500,
        category: "sic",
        description: "Fornitura e posa di centrale con sirena ad alta pressione acustica, 2 sensori volumetrici, 2 contatti magnetici per infissi."
      },
      {
        id: "ele_ins_vid",
        name: "Impianto videosorveglianza IP (fino a 4 telecamere POE)",
        unit: "lotto",
        minPrice: 900,
        maxPrice: 1800,
        category: "sic",
        description: "Cablaggio cavo di rete CAT6, posizionamento telecamere esterne IR, configurazione registratore NVR con hard disk integrato."
      },
      {
        id: "ele_mon_pla",
        name: "Installazione corpi illuminanti (lampadari, applique, faretti)",
        unit: "cad",
        minPrice: 25,
        maxPrice: 45,
        category: "ill",
        description: "Fissaggio meccanico a soffitto/parete di faretti o lampadari, allacciamento morsetti rapidi certificati e test accensione."
      },
      {
        id: "ele_pos_led",
        name: "Posa striscia LED in profilo di alluminio con alimentatore",
        unit: "ml",
        minPrice: 18,
        maxPrice: 35,
        category: "ill",
        description: "Taglio e fissaggio profilo stagno dissipatore, posizionamento striscia led ad alta densità ed allaccio alimentatore stabilizzato 24V."
      },
      {
        id: "ele_ins_wall",
        name: "Installazione e cablaggio stazione ricarica auto (Wallbox EV)",
        unit: "cad",
        minPrice: 400,
        maxPrice: 800,
        category: "dom",
        description: "Creazione linea dedicata protetta da quadro con magnetotermico-differenziale Tipo B, posa wallbox e programmazione carica."
      },
      {
        id: "ele_dom_bas",
        name: "Automazione e smartificazione singola tapparella o luce",
        unit: "punto",
        minPrice: 60,
        maxPrice: 120,
        category: "dom",
        description: "Posa relè smart incassabile multifunzione, integrazione protocollo Zigbee/Wi-Fi connesso ad assistente vocale."
      },
      {
        id: "ele_imp_ter",
        name: "Realizzazione o adeguamento impianto di messa a terra",
        unit: "lotto",
        minPrice: 150,
        maxPrice: 300,
        category: "cab",
        description: "Posa picchetto zincato disperdente nel terreno, morsetto ispezionabile e cablaggio cavo G/V da 16mmq fino al collettore."
      }
    ]
  }
];
