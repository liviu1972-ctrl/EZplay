import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Lightbulb, 
  Eye, 
  FileText, 
  ExternalLink,
  Target,
  RefreshCw,
  Users,
  Brain,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Cercetare și ipoteze de design — EZPLAY",
  description: "Descoperă reperele de cercetare, ipotezele și întrebările care ghidează dezvoltarea programelor EZPLAY de educație antreprenorială prin experiență.",
}

// Structură de date pentru cardurile de cercetare (SRC-EDU)
const RESEARCH_SOURCES = [
  {
    id: "SRC-EDU-001",
    author: "Rebecca Eynon, 2020",
    title: "The myth of the digital native: Why it persists and the harm it inflicts",
    type: "Sinteză critică a cercetării, publicată de OECD.",
    summary: "Tinerii nu formează un grup digital omogen. Competențele și utilizarea tehnologiei diferă în funcție de acces, context, experiență și sprijin.",
    relevance: "Nu proiectăm programul pentru o personalitate imaginară a „Generației Alpha”. Digitalul trebuie să aibă un rol educațional sau operațional clar.",
    limit: "Sursa nu testează EZPLAY, jocurile de masă sau Skill XP.",
    link: "https://www.oecd.org/en/publications/education-in-the-digital-age_1209166a-en/full-report/component-15.html"
  },
  {
    id: "SRC-EDU-002",
    author: "Michael Sailer, Jan Ulrich Hense, Sarah Katharina Mayr și Heinz Mandl, 2017",
    title: "How gamification motivates",
    type: "Experiment randomizat într-un mediu de simulare online.",
    summary: "Mecanici diferite de gamificare au influențat nevoi psihologice diferite; gamificarea nu a produs un efect unic sau garantat.",
    relevance: "Fiecare mecanică trebuie aleasă pentru un rol precis. XP-ul poate face progresul vizibil, dar nu creează automat autonomie.",
    limit: "Experimentul nu a fost realizat cu programul EZPLAY și nu demonstrează efecte educaționale de lungă durată la copii.",
    link: "https://www.sciencedirect.com/science/article/pii/S074756321630855X"
  },
  {
    id: "SRC-EDU-003",
    author: "Elisa D. Mekler, Florian Brühlmann, Alexandre N. Tuch și Klaus Opwis, 2017",
    title: "Towards understanding the effects of individual gamification elements on intrinsic motivation and performance",
    type: "Experiment online.",
    summary: "Punctele, nivelurile și clasamentele au crescut cantitatea activității în sarcina studiată, dar nu și calitatea sau motivația intrinsecă.",
    relevance: "Numărul de activități finalizate nu trebuie confundat cu înțelegerea. Skill XP trebuie legat de aplicare relevantă.",
    limit: "Sarcina studiată a fost etichetarea imaginilor, nu o experiență educațională facilitată sau un joc de business.",
    link: "https://bruehlmann.io/publication/mekler-towards-2017/"
  },
  {
    id: "SRC-EDU-004",
    author: "Elias Kyewski și Nicole C. Krämer, 2018",
    title: "To gamify or not to gamify?",
    type: "Experiment de teren într-un curs online universitar.",
    summary: "Badge-urile private sau publice au avut un impact mai mic decât cel anticipat asupra motivației și performanței.",
    relevance: "Simbolurile de progres trebuie să ofere feedback sau acces util, nu să devină o colecție de recompense vizuale.",
    limit: "Participanții au fost studenți, nu copii într-un program experiențial.",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0360131517302506"
  },
  {
    id: "SRC-EDU-005",
    author: "Melissa M. Grabner-Hagen și Tara Kingsley, 2023",
    title: "From badges to boss challenges",
    type: "Studiu de caz mixt, desfășurat pe doi ani școlari într-o clasă de științe din ciclul primar.",
    summary: "Implementarea a combinat gamificarea cu sprijin cognitiv și motivațional. Autorii subliniază mediul holistic, nu eficiența izolată a badge-urilor.",
    relevance: "Alegerile, provocările, facilitarea și sprijinul merită proiectate împreună, înaintea punctelor luate separat.",
    limit: "Este studiul unei singure implementări, nu o demonstrație că același design va funcționa în EZPLAY.",
    link: "https://www.sciencedirect.com/science/article/pii/S2666557323000095"
  },
  {
    id: "SRC-EDU-006",
    author: "Christian Rutledge, Christopher M. Walsh și colaboratorii, 2018",
    title: "Gamification in Action",
    type: "Articol teoretic și sinteză aplicată în educația medicală.",
    summary: "Autorii analizează mecanicile prin autonomie, competență și relaționare și avertizează asupra recompenselor extrinseci, competiției și dovezilor limitate pe termen lung.",
    relevance: "Fiecare mecanică poate fi evaluată prin nevoia pe care încearcă să o susțină, comportamentul urmărit și riscul introdus.",
    limit: "Contextul este predominant educația medicală cu adulți, nu un program pentru copii.",
    link: "#" // Fallback link if real link isn't provided directly in the text excerpt
  }
]

export default function ResearchPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Cercetare și dezvoltare educațională
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Nu căutăm o teorie care să ne dea dreptate.<br className="hidden md:inline" /> Căutăm idei care ne ajută să construim și să verificăm mai bine.
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            <p>
              Cercetarea ne ajută să formulăm întrebări mai bune, să evităm presupunerile comode și să proiectăm experiențe cu un scop clar. Nu dovedește, prin simpla ei existență, că programul EZPLAY funcționează.
            </p>
            <p className="font-medium text-ink">
              De aceea arătăm atât ce ne informează, cât și ce nu știm încă.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto flex-wrap">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" render={<Link href="#repere" />}>
              Explorează reperele de cercetare
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/how-we-learn" />}>
              Vezi cum învățăm
            </Button>
            <div className="w-full sm:w-auto mt-4 sm:mt-0 flex items-center justify-center sm:justify-start">
              <Link href="/program/curriculum" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange/80 transition-colors group">
                Explorează arhitectura curriculară
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S1 — Trei niveluri de claritate */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Separăm sursele, ipotezele și observațiile.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, label: "Ce spune cercetarea", title: "Dovezi și modele dezvoltate în alte contexte", text: "Folosim cercetare publicată pentru a înțelege mai bine învățarea prin probleme și experiență, curriculumul spiral, progresul pe competențe, facilitarea și efectele diferitelor mecanici de gamificare.", color: "text-brand-teal" },
              { icon: Lightbulb, label: "Ce presupune EZPLAY", title: "Ipoteze care trebuie puse la lucru", text: "De exemplu, presupunem că alegerile reale, reflecția și aplicarea pot fi mai valoroase decât acumularea de puncte. Este o direcție de design, nu o concluzie demonstrată despre programul nostru.", color: "text-brand-orange" },
              { icon: Eye, label: "Ce observăm", title: "Feedback și comportamente din contexte EZPLAY", text: "Observațiile din sesiuni ne pot arăta unde participanții se implică, se blochează sau fac conexiuni. Ele devin mai utile când sunt colectate consecvent și nu sunt prezentate drept dovezi generale.", color: "text-brand-yellow" }
            ].map((card, idx) => (
              <div key={idx} className="bg-surface border border-line p-8 rounded-2xl shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                  <span className={`text-sm font-bold uppercase tracking-wider ${card.color}`}>{card.label}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-4">{card.title}</h3>
                <p className="text-ink-muted leading-relaxed flex-1">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S2 — Ce ne informează acum */}
      <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Șase teme care influențează felul în care construim.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                icon: Users,
                title: "Tinerii nu sunt o singură „generație digitală”",
                text: "Faptul că un participant a crescut cu tehnologia nu înseamnă că are automat aceleași competențe, preferințe sau nevoi de învățare ca alți tineri. Proiectăm pentru vârstă, context, experiență și comportament observat, nu pentru o etichetă generațională.",
                change: "Folosim digitalul numai când are un rol educațional sau operațional clar. Experiența trebuie să rămână relevantă și fără efecte construite doar pentru a capta atenția.",
                limit: "Cercetarea despre relația generală dintre tineri și tehnologie nu validează un anumit format EZPLAY."
              },
              {
                icon: Target,
                title: "Gamificarea nu este un ingredient cu efect garantat",
                text: "Punctele, nivelurile, clasamentele, badge-urile și poveștile pot influența comportamente diferite. Niciun element nu produce automat motivație, autonomie sau învățare de calitate.",
                change: "Fiecare mecanică trebuie să aibă un rol explicabil. Founder Skills și Skill XP trebuie să facă progresul inteligibil și să urmeze dovezi relevante de aplicare, nu să recompenseze mecanic timpul petrecut.",
                limit: "Studiile existente au contexte, vârste și sarcini diferite. Ele ne avertizează și ne orientează, dar nu prezic singure reacția participanților EZPLAY."
              },
              {
                icon: RefreshCw,
                title: "O spirală revine cu mai multă profunzime",
                text: "Într-un curriculum spiral, o idee nu apare o singură dată și nici nu este repetată identic. Participantul o reîntâlnește într-un context mai dificil și o conectează cu ceea ce a descoperit anterior.",
                change: "Strategie, Produs, Piață, Operațiuni și Finanțe se dezvoltă împreună. Un concept financiar poate reveni într-o decizie de preț, o constrângere operațională sau o provocare de creștere.",
                limit: "Modelul spiral este un reper de proiectare. Eficiența traseului EZPLAY depinde de conținutul concret, succesiune, facilitare și participanți."
              },
              {
                icon: Brain,
                title: "Progresul trebuie legat de ceea ce poate face participantul",
                text: "Un nivel sau un profil de competențe devine util când spune ceva despre capacitatea participantului de a observa, explica sau aplica, nu doar despre câte activități a terminat.",
                change: "Investigăm cum poate progresul să devină vizibil fără să reducă învățarea la o colecție de puncte și fără să creeze comparații publice inutile.",
                limit: "EZPLAY nu are încă un sistem validat de praguri, niveluri sau Skill XP. Acestea rămân ipoteze de produs și evaluare."
              },
              {
                icon: ShieldCheck,
                title: "O problemă complexă are nevoie de sprijin intenționat",
                text: "Învățarea bazată pe probleme nu înseamnă că participantul este lăsat singur să ghicească. Facilitatorul, întrebările, regulile, exemplele și indiciile pot face situația abordabilă fără să ofere direct soluția.",
                change: "Founder Debrief și Learning Input nu sunt întreruperi ale experienței. Ele îi ajută pe participanți să își facă vizibil raționamentul și să găsească instrumentele de care au nevoie.",
                limit: "Cantitatea potrivită de sprijin trebuie testată pentru fiecare vârstă, experiență și Founder Round."
              },
              {
                icon: MessageSquare,
                title: "Experiența singură nu garantează învățarea",
                text: "Participarea activă devine educațională atunci când este însoțită de reflecție, înțelegere și o nouă ocazie de aplicare.",
                change: "Un Business Run fără Founder Debrief poate fi captivant, dar lasă prea mult din învățare la întâmplare. Founder Loop leagă experiența de reflecție, input și provocare.",
                limit: "Founder Loop este arhitectura pedagogică EZPLAY. Sursele externe îi informează componentele, dar nu îl validează ca sistem complet."
              }
            ].map((theme, idx) => (
              <div key={idx} className="bg-canvas border border-line p-8 rounded-2xl shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal/5 flex items-center justify-center mb-6">
                  <theme.icon className="w-6 h-6 text-brand-charcoal" />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-4">{theme.title}</h3>
                <p className="text-ink-muted leading-relaxed mb-6">{theme.text}</p>
                <div className="bg-surface p-4 rounded-xl border border-line mb-4">
                  <div className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Ce schimbă în EZPLAY</div>
                  <p className="text-sm text-ink-muted">{theme.change}</p>
                </div>
                <div className="bg-brand-orange/5 p-4 rounded-xl border border-brand-orange/20 mt-auto">
                  <div className="text-sm font-bold text-brand-orange-dark uppercase tracking-wider mb-2">Limită</div>
                  <p className="text-sm text-brand-orange-dark/90">{theme.limit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — Ce investigăm în EZPLAY */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Întrebările la care programul trebuie să răspundă prin practică.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-12">
            {[
              "Participanții pot explica legătura dintre deciziile lor și rezultatele observate?",
              "Founder Debrief schimbă felul în care înțeleg experiența?",
              "Folosesc noțiunile noi într-un Business Challenge diferit de situația inițială?",
              "Libertatea de a alege traseul crește implicarea sau produce confuzie?",
              "Founder Skills descriu progresul ori doar activitatea finalizată?",
              "Ce diferențe apar între copii, adolescenți și adulți?",
              "Când competiția susține implicarea și când produce presiune sau comparație nedorită?",
              "Ce poate funcționa fizic, digital și hibrid fără să pierdem rolul facilitării?"
            ].map((question, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-brand-orange font-bold mt-0.5">•</span>
                <span className="text-white/90 font-medium">{question}</span>
              </div>
            ))}
          </div>
          <div className="text-lg text-white/70 italic border-l-4 border-brand-orange pl-6 py-2">
            Unele întrebări vor primi răspuns prin iterații de design. Altele vor avea nevoie de colectare sistematică de date, parteneri de cercetare și timp. Vom păstra diferența vizibilă.
          </div>
        </div>
      </section>

      {/* S4 — Cum citim o sursă */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Nu întrebăm doar „ce spune?”, ci și „cât de departe putem aplica?”.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Tipul dovezii", text: "Este experiment, meta-analiză, review sistematic, articol conceptual, studiu de caz sau cadru de proiectare?" },
              { title: "Contextul", text: "Cine a participat, ce sarcină a avut, în ce mediu și pentru cât timp?" },
              { title: "Relevanța", text: "Ce decizie de program poate informa și prin ce mecanism presupus?" },
              { title: "Limita", text: "Ce nu putem concluziona despre EZPLAY din acea sursă?" }
            ].map((crit, idx) => (
              <div key={idx} className="bg-canvas border border-line p-6 rounded-2xl">
                <h3 className="font-bold text-ink mb-3">{crit.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{crit.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-surface-strong border border-line rounded-lg text-sm text-ink-muted text-center max-w-[800px] mx-auto">
            Nu folosim citate lungi și nu inventăm indicatori de impact. Fiecare card de sursă publicat conține autorul, anul, titlul, tipul sursei, un rezumat propriu, relevanța pentru EZPLAY, limita și un link către sursa primară ori pagina instituțională.
          </div>
        </div>
      </section>

      {/* S5 — Repere de cercetare */}
      <section id="repere" className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-[700px]">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
                Biblioteca de lucru
              </h2>
              <p className="text-lg text-ink-muted leading-relaxed">
                Aceasta nu este o listă de logo-uri academice. Este o bibliotecă comentată care arată ce întrebare ne-a adus la fiecare sursă și cum îi limităm utilizarea.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {RESEARCH_SOURCES.map((source, idx) => (
              <div key={source.id} className="bg-surface border border-line rounded-[var(--radius-panel)] p-6 md:p-8 flex flex-col lg:flex-row gap-8 shadow-sm">
                
                {/* Info principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-brand-charcoal/5 border border-line rounded-full text-xs font-bold text-brand-charcoal">
                      {source.id}
                    </span>
                    <span className="text-sm font-medium text-ink-muted">{source.author}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-ink mb-4">{source.title}</h3>
                  <div className="text-sm font-medium text-ink-muted uppercase tracking-wider mb-4 border-b border-line pb-4">
                    {source.type}
                  </div>
                  <p className="text-ink-muted leading-relaxed mb-6">
                    {source.summary}
                  </p>
                  
                  <Button variant="outline" className="border-line-strong text-ink hover:bg-canvas" render={<a href={source.link} target="_blank" rel="noopener noreferrer" />}>
                    Citește sursa la origine
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Relevanță și Limită */}
                <div className="w-full lg:w-[400px] flex flex-col gap-4">
                  <div className="bg-canvas border border-line p-6 rounded-xl flex-1">
                    <div className="flex items-center gap-2 text-brand-teal font-bold text-sm uppercase tracking-wider mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Relevanță pentru EZPLAY
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{source.relevance}</p>
                  </div>
                  <div className="bg-brand-orange/5 border border-brand-orange/20 p-6 rounded-xl flex-1">
                    <div className="flex items-center gap-2 text-brand-orange-dark font-bold text-sm uppercase tracking-wider mb-3">
                      <AlertCircle className="w-4 h-4" /> Limită
                    </div>
                    <p className="text-sm text-brand-orange-dark/90 leading-relaxed">{source.limit}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  )
}
