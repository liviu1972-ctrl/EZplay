import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Search, Zap, Layers, BarChart, BookOpen, UserCheck, Play, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Cum învățăm în EZPLAY — Decizii, experiență și aplicare",
  description: "Descoperă cum EZPLAY transformă jocurile, simulările, reflecția și problemele în experiențe de educație antreprenorială.",
}

export default function HowWeLearnPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Cum învățăm în EZPLAY
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Mai întâi decizia.<br className="hidden md:inline" /> Apoi întrebarea capătă sens.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            Cunoașterea este importantă. Dar o idee despre business devine mult mai clară când explică o situație pe care ai trăit-o și te ajută să iei următoarea decizie.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" render={<Link href="/program#founder-rounds" />}>
              Descoperă Founder Round
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/research" />}>
              Explorează cercetarea
            </Button>
          </div>
        </div>
      </section>

      {/* S1 — De la experiență la înțelegere */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col items-start">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
                Nu folosim jocul pentru a face teoria mai colorată. Folosim experiența pentru a crea întrebarea potrivită.
              </h2>
              <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
                <p>
                  Participantul intră într-o situație în care trebuie să aleagă. Poate avea resurse limitate, obiective diferite, presiune de timp sau informații incomplete. Decizia produce un rezultat care poate fi observat și discutat.
                </p>
                <p>
                  Abia atunci explicația nu mai este o definiție izolată. Devine un instrument pentru înțelegerea rezultatului și pentru rezolvarea unei probleme noi.
                </p>
              </div>
            </div>
            <div className="bg-surface border border-line rounded-[var(--radius-panel)] p-8 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-ink mb-6 uppercase tracking-wider border-b border-line pb-4 text-center">
                Flux simplu
              </h3>
              <div className="flex flex-col gap-3">
                {["Experiență", "Reflecție", "Informație relevantă", "Aplicare", "Progres demonstrat"].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-canvas p-4 rounded-xl border border-line-strong">
                    <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-ink">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S2 — Founder Round */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[900px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
            O experiență completă are mai mult decât un moment de joc.
          </h2>
          <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-10 max-w-[75ch] mx-auto text-left md:text-center">
            <p>
              Founder Round este o sesiune educațională tematică. Ea pornește dintr-o situație simulată și continuă până când participanții folosesc ceea ce au observat și învățat într-o provocare nouă.
            </p>
            <p>
              Founder Round nu este numele întregului program. Este una dintre unitățile prin care programul devine experiență concretă.
            </p>
          </div>
          <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow text-ink font-medium max-w-[600px] mx-auto text-left">
            <strong>Notă:</strong> Formatul este în dezvoltare. Primele Founder Rounds vor fi documentate, testate și îmbunătățite înainte să fie prezentate ca experiențe validate.
          </div>
        </div>
      </section>

      {/* S3 — Founder Loop */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              Cinci etape. O singură mișcare de la decizie la aplicare.
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              Founder Loop este arhitectura pedagogică din interiorul unui Founder Round. Public, ea explică modul în care o simulare devine o experiență educațională completă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Intră în situație", phase: "1. Business Run", icon: Play, text: "Participanții conduc companii simulate, folosind o configurație construită pentru tema Round-ului. Ei decid ce cumpără, ce păstrează, ce schimbă, cum își folosesc resursele și ce risc acceptă." },
              { title: "Privește înapoi la decizie", phase: "2. Founder Debrief", icon: Search, text: "Grupul analizează ce s-a întâmplat: ce strategii au apărut, ce rezultate au fost neașteptate, ce presupuneri au influențat alegerile și ce legături există cu lumea companiilor." },
              { title: "Găsește instrumentul de care ai nevoie", phase: "3. Learning Input", icon: BookOpen, text: "Facilitatorul și materialele oferă informația relevantă pentru problema observată. Poate fi o explicație, un model, o formulă, un exemplu, un video, un text sau o combinație." },
              { title: "Aplică într-o problemă nouă", phase: "4. Business Challenge", icon: Zap, text: "Participanții lucrează împreună pentru a analiza o situație, a folosi informația disponibilă și a produce o decizie sau o soluție argumentată." },
              { title: "Fă progresul vizibil", phase: "5. Level Up", icon: ArrowUpRight, text: "Rezultatul devine feedback. Programul poate recunoaște Skill XP, actualiza niveluri și deschide experiențe noi numai atunci când regulile și dovezile au fost definite pentru acel Round." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col bg-surface border border-line p-8 rounded-[var(--radius-card)] hover:border-brand-teal transition-colors">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-4">{step.phase}</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">{step.title}</h3>
                </div>
                <p className="text-ink-muted leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4, S5, S6, S7 - Grid of text sections */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* S4 */}
            <div className="flex flex-col items-start bg-canvas p-8 rounded-[var(--radius-panel)] border border-line">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                A descoperi nu înseamnă să fii lăsat singur cu problema.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>EZPLAY nu confundă învățarea prin experiență cu absența ghidajului. Facilitatorul, întrebările, materialele, exemplele, regulile și indiciile sunt părți intenționate ale experienței.</p>
                <p>Cantitatea de sprijin poate fi diferită de la un participant la altul sau de la un nivel la altul. Scopul nu este ca facilitatorul să ofere soluția, ci să facă problema abordabilă și să orienteze atenția către deciziile importante.</p>
              </div>
            </div>

            {/* S5 */}
            <div className="flex flex-col items-start bg-canvas p-8 rounded-[var(--radius-panel)] border border-line">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Facilitatorul nu livrează doar reguli. Protejează calitatea experienței.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8 flex-1">
                <p>Facilitatorul pregătește configurația, observă deciziile, pune întrebări, susține reflecția, oferă Learning Input și ajută grupul să transforme experiența într-o provocare care poate fi rezolvată.</p>
                <p>El nu trebuie să domine discuția și nici să transforme Founder Round într-o lecție predată frontal. Participantul rămâne centrul experienței.</p>
              </div>
              <Link href="/development" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange/80 transition-colors group">
                Află cum dezvoltăm facilitarea
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* S6 */}
            <div className="flex flex-col items-start bg-canvas p-8 rounded-[var(--radius-panel)] border border-line">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Jocurile sunt laboratoare pentru decizii.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8 flex-1">
                <p>Un joc poate face vizibile resurse, capacități, costuri, clienți, investiții și consecințe. Poate comprima timpul, permite repetarea și reduce costul unei greșeli reale.</p>
                <p>Dar simpla participare la un joc nu garantează învățarea. Valoarea educațională apare din legătura dintre situație, decizie, reflecție, explicație și aplicare.</p>
              </div>
              <Link href="/tools" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange/80 transition-colors group">
                Descoperă instrumentele și simulările
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* S7 */}
            <div className="flex flex-col items-start bg-canvas p-8 rounded-[var(--radius-panel)] border border-line">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Participanții iau decizii proprii și învață să construiască un răspuns împreună.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>Business Run poate face vizibil stilul individual: ce observi, ce riști, ce păstrezi și ce schimbi. Business Challenge poate cere echipei să împartă munca, să folosească informațiile potrivite și să își asume un rezultat comun.</p>
                <p>Nu contează doar cine știe primul răspunsul. Contează dacă echipa poate formula problema, găsi resursele necesare și transforma contribuțiile într-o decizie coerentă.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S8 — Cercetarea */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
            Nu revendicăm o teorie nouă. Construim atent cu principii care merită testate împreună.
          </h2>
          <div className="space-y-6 text-lg text-white/80 leading-relaxed mb-12 max-w-[700px]">
            <p>
              Arhitectura EZPLAY este informată de curriculum spiral, educație bazată pe competențe, mastery learning, învățare bazată pe probleme și cercetarea despre experiență, motivație și gamificare.
            </p>
            <p>
              Nicio sursă externă nu dovedește automat că un Founder Round funcționează. De aceea publicăm atât relevanța cercetării, cât și limitele ei, iar deciziile finale trebuie confruntate cu experiențele participanților.
            </p>
          </div>
          <Button size="lg" className="rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8 border-0" render={<Link href="/research" />}>
            Vezi sursele și întrebările noastre
          </Button>
        </div>
      </section>

      {/* S9 — CTA final */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">
            Vrei să vezi cum arată primul pas?
          </h2>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            Experiența introductivă combină învățarea regulilor, primele decizii și un Founder Debrief. Este punctul de intrare înaintea Founder Rounds complete.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/experiences/introduction" />}>
              Descoperă experiența introductivă
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/program" />}>
              Explorează programul
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
