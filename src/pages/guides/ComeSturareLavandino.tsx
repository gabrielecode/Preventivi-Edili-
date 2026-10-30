import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Wrench, ShieldCheck, CheckCircle2, Hammer } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaLavandino: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-lavandino"
        title="Come sturare il lavandino: Guida tecnica completa e sicura"
        description="Il lavandino è intasato? Scopri la guida tecnica professionale per sturarlo in sicurezza, i metodi meccanici, la manutenzione del sifone e quando chiamare un idraulico."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come sturare il lavandino: Guida tecnica completa e sicura
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Un lavandino intasato non è solo un fastidio domestico, ma un problema che, se trascurato, può compromettere l'efficienza del tuo impianto di scarico e causare danni strutturali come infiltrazioni o odori sgradevoli. In questa guida tecnica, analizzeremo passo dopo passo le metodologie corrette per ripristinare il corretto deflusso dell'acqua, privilegiando approcci meccanici non invasivi rispetto all'uso sconsiderato di prodotti chimici corrosivi.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Diagnosi: identificare dove si trova l'ostruzione.</li>
              <li>Sicurezza: dispositivi di protezione individuale (DPI) essenziali.</li>
              <li>Procedure meccaniche: ventosa, molla sturapipa, smontaggio sifone.</li>
              <li>Prevenzione: come evitare future ostruzioni.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Analisi preliminare e sicurezza</h2>
          <p>
            Prima di intervenire, è fondamentale comprendere la natura del problema. Un'ostruzione parziale si manifesta con un deflusso rallentato, mentre un'ostruzione totale blocca completamente il passaggio dell'acqua.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Regole di sicurezza
            </h3>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1">
              <li><strong>Proteggi le mani:</strong> Indossa sempre guanti in gomma nitrile o lattice spessorato.</li>
              <li><strong>Occhi protetti:</strong> Usa occhiali di sicurezza se prevedi che possa esserci uno schizzo di acqua reflua.</li>
              <li><strong>Attenzione agli acidi:</strong> Se hai già versato prodotti chimici nel lavandino, <span className="font-bold">non intervenire meccanicamente</span> senza aver prima abbondantemente sciacquato. Il rischio di ustioni chimiche è reale.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Strumenti necessari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Hammer className="w-4 h-4" /> Equipaggiamento di base</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li>Ventosa professionale</li>
                <li>Secchio capiente</li>
                <li>Stracci vecchi</li>
                <li>Torcia elettrica</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Wrench className="w-4 h-4" /> Strumenti avanzati</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li>Molla sturapipa (5-10 metri)</li>
                <li>Chiave a pappagallo o pinza a becchi</li>
                <li>Secchiello per lo smontaggio</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Metodi meccanici di disostruzione</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3.1. L'uso della ventosa</h3>
          <p>
            La ventosa agisce creando una variazione di pressione (vuoto e pressione positiva) che può muovere l'ostruzione.
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700">
            <li>Rimuovi il filtro (se presente).</li>
            <li><strong>Importante:</strong> Sigilla il foro del "troppo pieno" (l'apertura secondaria nel lavabo) con uno straccio umido. Se non lo fai, la pressione si disperderà e la ventosa sarà inutile.</li>
            <li>Riempi il lavandino con 5-10 cm d'acqua.</li>
            <li>Posiziona la ventosa sul foro di scarico e azionala ritmicamente per almeno 10-15 volte.</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3.2. Smontaggio e pulizia del sifone</h3>
          <p>
            Se la ventosa fallisce, il problema è probabilmente nel sifone, il componente a forma di U progettato per trattenere l'acqua (chiusura idraulica) ed evitare il ritorno di cattivi odori.
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700">
            <li>Posiziona il secchio esattamente sotto il sifone.</li>
            <li>Allenta le ghiere di fissaggio del sifone. Se sono bloccate, usa la chiave a pappagallo, ma avvolgi il tubo con uno straccio per non graffiare la superficie (specialmente se è cromata).</li>
            <li>Smonta il sifone con cura. Rimuovi manualmente i residui solidi (capelli, depositi di sapone).</li>
            <li><strong>Verifica le guarnizioni:</strong> Controlla che le guarnizioni in gomma non siano secche, crepate o deformate. In tal caso, sostituiscile. Sono fondamentali per la tenuta stagna.</li>
            <li>Rimonta il tutto e verifica che non ci siano perdite aprendo lentamente il rubinetto.</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Prodotti naturali e chimici: istruzioni e avvertenze</h2>
          <p>
            Per ostruzioni lievi, puoi usare una soluzione di bicarbonato di sodio e aceto bianco. Versa mezza tazza di bicarbonato nello scarico, seguita da mezza tazza di aceto. Copri con un panno e lascia agire per 15-20 minuti, poi sciacqua con acqua bollente.
          </p>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Avvertenza sui chimici
            </h3>
            <p className="text-red-800 text-sm">
              Sconsigliamo l'uso frequente di disgorganti chimici aggressivi (soda caustica, acido solforico). Possono corrodere le guarnizioni in gomma e danneggiare permanentemente i tubi in plastica (PVC), oltre a essere pericolosi per la tua salute. Usali solo come ultima spiaggia e mai se l'ostruzione è totale, poiché il prodotto potrebbe ristagnare e corrodere le pareti del tubo.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Quando chiamare un professionista</h2>
          <p>
            Non forzare mai l'impianto se non sei sicuro della causa. Chiama un idraulico professionista se:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>L'acqua risale da altri scarichi (doccia, bidet) quando scarichi il lavandino: indica un'ostruzione nella colonna di scarico principale.</li>
            <li>Le tubature sono in metallo antico, corrose e potrebbero rompersi con la minima pressione meccanica.</li>
            <li>Hai provato a smontare il sifone ma il blocco risiede nel tubo a muro, oltre la tua portata.</li>
            <li>Noti macchie di umidità o muffa in prossimità dello scarico, segno di una perdita latente.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Consigli di prevenzione</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Filtri a rete:</strong> Installa un semplice filtro in acciaio o plastica sul foro dello scarico per trattenere capelli e residui organici.</li>
            <li><strong>No grassi:</strong> Non versare mai olio da cucina o grassi nel lavandino. Si solidificano raffreddandosi, creando tappi estremamente resistenti.</li>
            <li><strong>Manutenzione:</strong> Una volta al mese, versa una pentola di acqua bollente nello scarico per sciogliere eventuali residui di sapone o grassi superficiali.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché si sente cattivo odore anche se l'acqua scarica?</h3>
              <p className="text-sm text-slate-600">Il sifone potrebbe non essere ben sigillato o l'acqua al suo interno potrebbe essere evaporata. Verifica che il sifone sia pieno d'acqua.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">È meglio lo sturalavandini meccanico o chimico?</h3>
              <p className="text-sm text-slate-600">Sempre meccanico. È più sicuro per le tubature e più ecologico.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Problemi idraulici persistenti?
            </h3>
            <p className="text-blue-800 mb-6">
              Se il lavandino continua a intasarsi nonostante la pulizia periodica, l'impianto potrebbe richiedere un aggiornamento. EdilFree ti aiuta a stimare i costi per una ristrutturazione idraulica professionale.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi una stima professionale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: Questa guida ha scopo informativo. Per interventi complessi o dubbi sull'integrità dell'impianto, consulta sempre un tecnico idraulico abilitato. La sicurezza viene prima di ogni operazione di bricolage.
          </p>
        </article>
      </main>
    </div>
  );
};
