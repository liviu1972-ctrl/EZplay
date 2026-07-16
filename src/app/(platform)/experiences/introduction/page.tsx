import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Eye, MessageSquare, Check, X, AlertCircle, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Experiența introductivă EZPLAY — Joc și Founder Debrief",
  description: "Primul pas în EZPLAY: participanții învață instrumentul, conduc companii simulate și analizează deciziile luate.",
}

export default function IntroExperiencePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Primul pas în Programul EZPLAY
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Joacă. Observă. Discută.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            Experiența introductivă îi ajută pe participanți să cunoască instrumentul de simulare, să ia primele decizii și să transforme rezultatele într-o conversație despre strategie, resurse, clienți, costuri și adaptare.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" render={<Link href="#contact" />}>
              Adu experiența în comunitatea ta
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/program" />}>
              Vezi ce urmează după introducere
            </Button>
          </div>
        </div>
      </section>

      {/* S1 — De ce există */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8 max-w-[800px]">
            Nu poți reflecta asupra unei experiențe pe care nu ai trăit-o încă.
          </h2>
          <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
            <p>Founder Rounds folosesc jocuri și simulări pentru a crea probleme educaționale. Înainte ca participantul să poată urmări o temă precum Profit, Cash sau decizie strategică, trebuie să înțeleagă instrumentul și să poată juca fără ca fiecare regulă să îi consume atenția.</p>
            <p>Experiența introductivă creează această bază. Ea nu grăbește participantul către teorie și nu îi cere să demonstreze progres înainte să cunoască mediul.</p>
          </div>
        </div>
      </section>

      {/* S2 — Ce se întâmplă */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Play, title: "1. Cunoști compania simulată", text: "Descoperi resursele, deckul, cartea de Antreprenor, Piața și indicatorii de bază. Facilitatorul explică suficient cât să poți începe." },
              { icon: Eye, title: "2. Iei primele decizii", text: "Alegi ce folosești, ce cumperi, ce păstrezi și ce elimini. Vezi cum Producția, Clienții, Cheltuielile, Vânzările, Profitul și Cash-ul se schimbă." },
              { icon: Target, title: "3. Construiești o strategie", text: "După câteva ture, începi să observi tipare. Poți investi, simplifica, echilibra sau încerca o direcție diferită." },
              { icon: MessageSquare, title: "4. Participi la Founder Debrief", text: "Grupul discută ce a făcut, ce rezultat a obținut, ce a surprins participanții și ce legături pot fi observate cu lumea companiilor." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col bg-surface border border-line p-8 rounded-2xl shadow-sm hover:border-brand-teal transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-4">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed flex-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — Întrebările de debrief */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col items-start">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
                Nu întrebăm doar cine a câștigat. Întrebăm cum a decis.
              </h2>
              <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow text-ink font-medium max-w-[500px]">
                <strong>Notă:</strong> Întrebările exacte sunt adaptate experienței grupului. Debrief-ul nu este un chestionar rigid și nu este folosit pentru a eticheta participanții.
              </div>
            </div>
            <div className="bg-surface p-8 rounded-2xl border border-line shadow-sm">
              <h3 className="font-bold text-ink mb-6 uppercase tracking-wider text-sm border-b border-line pb-4">Întrebări publice orientative:</h3>
              <ul className="space-y-4">
                {[
                  "Ce strategie ai folosit?",
                  "Ce decizie ți-a schimbat cel mai mult compania?",
                  "Ce ai păstrat mai mult decât ar fi fost util?",
                  "La ce ai renunțat și de ce?",
                  "Unde ai avut capacitate pe care nu ai putut să o folosești?",
                  "Ce ai face diferit dacă ai începe din nou?",
                  "Ce asemănări vezi între joc și o companie reală?"
                ].map((q, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-ink-muted font-medium">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* S4 — Ce descoperă participantul */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Primele reguli deschid întrebări mult mai mari.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Echilibrul", text: "Nu este suficient să poți produce dacă nu poți câștiga clienți. Nu este suficient să ai cerere dacă nu poți livra.", color: "border-brand-teal" },
              { title: "Resursele", text: "O resursă cumpărată nu rămâne automat potrivită pentru totdeauna. Uneori compania crește când acumulează. Alteori crește când simplifică.", color: "border-brand-orange" },
              { title: "Profitul și Cash-ul", text: "O companie poate avea un rezultat bun și totuși să își creeze probleme dacă nu înțelege fluxul banilor.", color: "border-brand-green" },
              { title: "Falimentul și restartul", text: "Sfârșitul unei încercări poate fi începutul unei strategii mai bune. Experiența permite repetarea fără costul unei greșeli reale.", color: "border-brand-charcoal" },
              { title: "Stilul de decizie", text: "Jocul poate face vizibil dacă participantul riscă, amână, acumulează, simplifică sau reacționează la schimbare.", color: "border-brand-yellow" }
            ].map((el, idx) => (
              <div key={idx} className={`bg-canvas p-8 rounded-2xl border-t-4 ${el.color} shadow-sm`}>
                <h3 className="font-heading font-bold text-xl text-ink mb-4">{el.title}</h3>
                <p className="text-ink-muted leading-relaxed">{el.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5 — Format */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Construită pentru grup, suficient de personală pentru fiecare participant.
              </h2>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8">
                <h3 className="font-bold mb-4 uppercase tracking-wider text-sm text-brand-orange">Configurație</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-brand-orange" /> Aproximativ 4 participanți la o masă</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-brand-orange" /> Un facilitator pentru una sau maximum două mese</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-brand-orange" /> Joc și decizii individuale</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-brand-orange" /> Reflecție și discuție în grup</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-brand-orange" /> Adaptare în funcție de vârstă și experiență</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="font-bold text-brand-teal uppercase text-sm mb-2">Durată</div>
                <div className="text-white/60">[DE CONFIRMAT]</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="font-bold text-brand-teal uppercase text-sm mb-2">Locație</div>
                <div className="text-white/80 leading-relaxed">Experiența este gândită inițial pentru livrare fizică în școli, cluburi, comunități și alte spații potrivite. Disponibilitatea geografică și formatele hibride se confirmă pentru fiecare solicitare.</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="font-bold text-brand-teal uppercase text-sm mb-2">Cost</div>
                <div className="text-white/60">[DE CONFIRMAT]</div>
              </div>
              <div className="flex items-start gap-3 mt-4 text-sm text-white/50">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Formularul poate colecta contextul fără să promită o ofertă standard până când informațiile nu sunt stabilite complet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S6 — Pentru cine este potrivită */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
              Experiența este recomandată grupurilor care nu cunosc încă EZPLAY și vor să descopere modul de lucru.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-brand-teal/5 border border-brand-teal/20 p-8 rounded-2xl">
              <h3 className="font-bold text-brand-teal-dark text-lg mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" /> Potrivită pentru
              </h3>
              <ul className="space-y-4">
                {["Elevi și tineri curioși despre business", "Clase și cluburi educaționale", "Comunități de tineri", "Evenimente de introducere", "Grupuri care vor să continue ulterior în program"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-teal mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-charcoal/5 border border-brand-charcoal/10 p-8 rounded-2xl">
              <h3 className="font-bold text-ink text-lg mb-6 flex items-center gap-2">
                <X className="w-6 h-6 text-brand-charcoal" /> Nu este
              </h3>
              <ul className="space-y-4">
                {["Un curs complet de antreprenoriat", "Un Founder Round complet", "O certificare", "O evaluare a potențialului antreprenorial", "O promisiune că participantul trebuie să își deschidă o afacere"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink-muted">
                    <span className="w-2 h-2 rounded-full bg-brand-charcoal mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* S7 — Ce urmează */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
            Introducerea nu este finalul.<br className="hidden md:inline" /> Este limba comună a experiențelor următoare.
          </h2>
          <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-12 max-w-[800px] mx-auto">
            <p>După ce cunoaște instrumentul și a trecut prin primul Founder Debrief, participantul poate continua către Founder Rounds tematice. Acestea folosesc întregul Founder Loop și urmăresc aplicarea unor idei și capacități mai clare.</p>
            <div className="p-6 bg-canvas border border-line rounded-xl">
              <span className="font-bold text-brand-orange uppercase text-sm block mb-2">Prima direcție</span>
              Primul Founder Round complet aflat în dezvoltare urmărește relația dintre Profit, Cash și Cash Flow.
            </div>
          </div>
          <Button size="lg" className="rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-10" render={<Link href="/program" />}>
            Descoperă programul
          </Button>
        </div>
      </section>

      {/* S8 — Formular */}
      <section id="contact" className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[800px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Spune-ne pentru cine vrei să construim experiența.
            </h2>
            <p className="text-lg text-ink-muted">
              Nu presupunem că același format funcționează pentru orice grup. Informațiile ne ajută să înțelegem contextul și să continuăm conversația potrivită.
            </p>
          </div>
          
          <div className="bg-surface p-8 rounded-2xl border border-line shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-brand-orange mb-4">
              <MessageSquare className="w-12 h-12" />
            </div>
            <h3 className="font-bold text-xl text-ink mb-2">Formular de contact în curând</h3>
            <p className="text-ink-muted text-center max-w-[400px]">
              Platforma se află în dezvoltare. Pentru a discuta despre o experiență, te rugăm să ne contactezi direct.
            </p>
            <Button className="mt-8 bg-brand-charcoal text-white hover:bg-brand-charcoal/90" render={<Link href="/contact" />}>
              Către pagina de contact
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
