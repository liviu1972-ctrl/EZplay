import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Puzzle, 
  Layers, 
  TabletSmartphone, 
  Component, 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Instrumente și simulări pentru educație antreprenorială — EZPLAY",
  description: "Descoperă jocurile și simulările pe care EZPLAY le folosește pentru a transforma deciziile de business în experiențe care pot fi observate și discutate.",
}

export default function ToolsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
            Instrumentele programului
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Instrumente construite pentru decizii,<br className="hidden md:inline" /> nu pentru raft.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            Jocurile și simulările EZPLAY creează situații în care participanții pot decide, testa și observa. Valoarea lor educațională nu stă doar în reguli, cărți sau interfață, ci în conversația și aplicarea pe care le fac posibile.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/how-we-learn" />}>
              Vezi cum folosim experiența
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/program" />}>
              Descoperă primul program
            </Button>
          </div>
        </div>
      </section>

      {/* S1 — Jocul este începutul conversației */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
            Un rezultat de joc devine valoros când participantul poate înțelege cum a apărut.
          </h2>
          <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
            <p>Într-o experiență EZPLAY, mecanica face vizibile relații care altfel rămân abstracte: nu poți vinde mai mult decât poți produce, un produs fără piață nu generează automat rezultate, iar o decizie bună într-o zonă poate crea o constrângere în alta.</p>
            <p>După joc, Founder Debrief îi ajută pe participanți să reconstruiască deciziile, să observe legăturile și să formulate întrebări. De aceea instrumentul nu înlocuiește programul și facilitatorul.</p>
          </div>
        </div>
      </section>

      {/* S2 — Deckbuilder */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="flex flex-col">
              <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-6 w-fit">
                Jocul de bază EZPLAY
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Construiește compania. Descoperă sistemul.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8">
                <p>Deckbuilder-ul este jocul de bază prin care participanții construiesc și dezvoltă o companie folosind cărți, resurse și decizii interdependente. El oferă un model accesibil al relației dintre capacitate, clienți și vânzări.</p>
              </div>
              
              <div className="p-6 bg-canvas border border-line rounded-xl mb-8">
                <div className="font-mono text-xl font-bold text-brand-teal mb-4 pb-4 border-b border-line">
                  Vânzări = min(Producție, Clienți)
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  O companie poate vinde doar atât cât poate produce și cât poate absorbi piața. Dacă una dintre cele două părți rămâne în urmă, rezultatul întregului sistem este limitat.
                </p>
              </div>

              <div className="bg-brand-charcoal/5 p-4 rounded-xl border border-line flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-charcoal shrink-0 mt-0.5" />
                <div className="text-sm text-ink-muted">
                  <span className="font-bold text-ink block mb-1">Ce nu este Deckbuilder-ul</span>
                  Nu este o reprezentare completă a unei companii și nu este un test al capacității cuiva de a deveni antreprenor. Este un model intenționat simplificat, folosit pentru a face anumite relații observabile și discutabile.
                </div>
              </div>
            </div>

            <div className="bg-canvas border border-line p-8 rounded-[var(--radius-panel)] shadow-sm">
              <h3 className="font-bold text-ink mb-6 uppercase tracking-wider text-sm">Ce face participantul:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Alege ce cărți adaugă companiei;",
                  "Echilibrează dezvoltarea mai multor zone;",
                  "Observă cum o decizie schimbă opțiunile următoare;",
                  "Compară strategii și rezultate;",
                  "Discută ce ar păstra și ce ar schimba într-o nouă încercare."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-ink-muted font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-line text-center">
                <Button className="w-full sm:w-auto bg-brand-charcoal text-white hover:bg-brand-charcoal/90" render={<Link href="/ezplay" />}>
                  Deschide Deckbuilder-ul
                </Button>
                <p className="text-xs text-ink-muted mt-4 max-w-[300px] mx-auto">
                  Versiunea digitală este disponibilă momentan pentru testare internă.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S3 — Fizic și digital */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16 max-w-[800px]">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Aceeași întrebare educațională poate cere instrumente diferite.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Layers, title: "În jurul aceleiași mese", text: "Cărțile fizice fac deciziile vizibile și creează un ritm comun. Participanții pot urmări compania, pot discuta opțiunile și pot observa direct alegerile celorlalți.", tag: "Format fizic" },
              { icon: TabletSmartphone, title: "Un sistem care poate calcula", text: "Mediul digital poate automatiza reguli, poate permite repetarea și poate conecta experiența cu profilul participantului. Nu trebuie să transforme însă învățarea într-o succesiune de click-uri.", tag: "Format digital" },
              { icon: Component, title: "Tehnologie acolo unde ajută", text: "Un format hibrid poate păstra interacțiunea și facilitarea din spațiul fizic, folosind platforma pentru pregătire, resurse, feedback sau continuitate.", tag: "Format hibrid" }
            ].map((fmt, idx) => (
              <div key={idx} className="bg-surface border border-line p-8 rounded-2xl shadow-sm flex flex-col">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-6">{fmt.tag}</div>
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
                  <fmt.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-4">{fmt.title}</h3>
                <p className="text-ink-muted leading-relaxed flex-1">{fmt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — Biblioteca de cărți */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-[600px]">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
                Privește componentele.<br /> Înțelege rolurile lor.
              </h2>
              <p className="text-lg text-ink-muted leading-relaxed">
                Biblioteca digitală poate face cărțile EZPLAY ușor de explorat și filtrat. Fiecare carte trebuie prezentată prin rolul ei în sistem, nu doar prin imagine și raritate.
              </p>
            </div>
            <div className="flex items-center gap-4 text-brand-charcoal opacity-50">
              <Filter className="w-6 h-6" />
              <span className="font-bold uppercase tracking-wider text-sm">Biblioteca în dezvoltare</span>
            </div>
          </div>

          <div className="bg-canvas border border-line rounded-[var(--radius-panel)] p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
            <Search className="w-10 h-10 text-ink-muted mb-4 opacity-50" />
            <h3 className="font-bold text-ink text-lg mb-2">Biblioteca de cărți va fi disponibilă public curând</h3>
            <p className="text-ink-muted max-w-[400px]">
              Vei putea filtra componentele pe baza perspectivelor (Strategie, Produs, Piață, Operațiuni, Finanțe) și înțelege efectele fiecărei decizii.
            </p>
          </div>
        </div>
      </section>

      {/* S5 — Tableau Builder */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 mb-8">
            În dezvoltare
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
            Un model mai avansat pentru companii mai complexe.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-[800px] mb-12">
            <p>Tableau Builder este direcția de joc avansat din ecosistemul EZPLAY. El urmărește să permită construirea unei companii printr-un tablou vizibil, în care deciziile și relațiile pot evolua cu mai multă profunzime.</p>
            <p>Tableau Builder nu este prezentat ca produs disponibil și nu înlocuiește Deckbuilder-ul. Detaliile publice vor crește odată cu maturitatea designului și testarea lui.</p>
          </div>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" render={<Link href="#interest" />}>
            Urmărește dezvoltarea EZPLAY
          </Button>
        </div>
      </section>

      {/* S6 — Cum alegem un instrument */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Începem cu ce trebuie să descopere participantul.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Decizia", text: "Ce alegere trebuie să poată face participantul și de ce trebuie să conteze?" },
              { title: "Consecința", text: "Ce relație sau efect trebuie să devină observabil?" },
              { title: "Reflecția", text: "Ce întrebări poate deschide experiența în Founder Debrief?" },
              { title: "Transferul", text: "Cum poate participantul folosi ce a descoperit într-un Business Challenge?" }
            ].map((crit, idx) => (
              <div key={idx} className="bg-surface border border-line p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-brand-teal transition-colors">
                <div className="text-6xl font-black text-canvas absolute -bottom-4 -right-4 group-hover:text-brand-teal/5 transition-colors">0{idx + 1}</div>
                <h3 className="font-heading text-xl font-bold text-ink mb-4 relative z-10">{crit.title}</h3>
                <p className="text-ink-muted leading-relaxed relative z-10">{crit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7 — CTA final */}
      <section id="interest" className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            Nu trebuie să începi cu toate instrumentele.<br className="hidden md:inline" /> Trebuie să începi cu experiența potrivită.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            Descoperă cum jocurile, reflecția și provocările se leagă într-un program de educație antreprenorială.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-10" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-10 border-line-strong text-ink hover:bg-surface" render={<Link href="/contact" />}>
              Organizează o experiență introductivă
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
