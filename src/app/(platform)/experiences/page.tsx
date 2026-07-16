import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, Target, Trophy, Laptop, HelpCircle, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Experiențe EZPLAY — De la prima partidă la Founder Rounds",
  description: "Descoperă experiența introductivă, Founder Rounds și evenimentele prin care tinerii explorează antreprenoriatul în EZPLAY.",
}

export default function ExperiencesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32 border-b border-line">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
            Experiențe educaționale EZPLAY
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Fiecare experiență începe cu o decizie.<br className="hidden md:inline" /> Nu toate urmăresc același rezultat.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            Unele experiențe te ajută să cunoști instrumentele. Altele aprofundează o temă, cer aplicare sau creează un context de competiție și comunitate. Diferența dintre ele trebuie să fie clară înainte să începi.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/experiences/introduction" />}>
              Descoperă experiența introductivă
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/program" />}>
              Explorează programul
            </Button>
          </div>
        </div>
      </section>

      {/* S1 & S2 — Main Experiences Grid */}
      <section className="w-full bg-canvas py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Intro Experience */}
            <div className="flex flex-col bg-surface border border-line rounded-[var(--radius-panel)] p-8 md:p-12 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-wider text-brand-sky mb-4">Punctul de intrare</div>
              <h2 className="font-heading text-3xl font-bold text-ink mb-6">Joc + Founder Debrief</h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8 flex-1">
                <p>Participanții învață regulile, conduc companii simulate, iau primele decizii și discută ce au observat. Scopul este familiarizarea cu instrumentul și cu modul de reflecție EZPLAY.</p>
                <p>Experiența introductivă nu este un Founder Round complet și nu încearcă să predea toate conceptele programului. Ea construiește baza comună necesară pentru experiențele următoare.</p>
              </div>
              
              <div className="mb-8 p-6 bg-canvas rounded-xl border border-line">
                <h3 className="font-bold text-ink mb-4 text-sm uppercase">Potrivită pentru:</h3>
                <ul className="space-y-3">
                  {["Primul contact cu EZPLAY", "Școli, cluburi și comunități", "Grupuri care vor să înțeleagă formatul", "Pregătirea pentru Founder Rounds", "Evenimente de descoperire"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <PlayCircle className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
                      <span className="text-ink-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button variant="outline" className="w-full justify-center border-brand-sky text-brand-sky hover:bg-brand-sky/10" render={<Link href="/experiences/introduction" />}>
                Vezi experiența introductivă
              </Button>
            </div>

            {/* Founder Rounds */}
            <div className="flex flex-col bg-surface border border-line rounded-[var(--radius-panel)] p-8 md:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-sm font-bold uppercase tracking-wider text-brand-teal mb-4">Unitatea educațională principală</div>
                <h2 className="font-heading text-3xl font-bold text-ink mb-6">O temă. O experiență. O provocare care cere aplicare.</h2>
                <div className="space-y-4 text-ink-muted leading-relaxed mb-8 flex-1">
                  <p>Fiecare Founder Round folosește întregul Founder Loop: Business Run, Founder Debrief, Learning Input, Business Challenge și Level Up.</p>
                  <p>Round-ul este construit în jurul unor obiective și capacități observabile. Configurația, întrebările, materialele și provocarea trebuie să lucreze împreună pentru aceeași temă.</p>
                </div>
                
                <div className="mb-8 p-6 bg-brand-teal/10 rounded-xl border border-brand-teal/20 text-brand-teal-dark">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Primul Founder Round în dezvoltare
                  </h3>
                  <p className="text-sm opacity-90">
                    Prima direcție de lucru este <strong>Profit, Cash și Cash Flow</strong>: o temă în care participanții descoperă că un rezultat profitabil nu înseamnă automat că firma are banii necesari pentru a continua.
                  </p>
                </div>

                <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow text-ink text-sm font-medium mb-8">
                  Founder Rounds complete sunt în dezvoltare și nu sunt încă prezentate ca ofertă publică finalizată.
                </div>
                
                <Button className="w-full justify-center bg-brand-teal hover:bg-brand-teal/90 text-white mt-auto" render={<Link href="/how-we-learn" />}>
                  Descoperă cum este construit un Founder Round
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S3 — Competiții */}
      <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-brand-charcoal" />
            <div className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">Comunitate și strategie</div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-8 max-w-[800px]">
            Competiția poate crește energia. Nu înlocuiește progresul educațional.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
              <p>Competițiile EZPLAY pot folosi configurații, durate și obiective speciale. Participanții își construiesc strategii, urmăresc rezultate și compară moduri diferite de a conduce o companie simulată.</p>
              <p>Ele pot crea engagement și observații valoroase despre stilurile de decizie. Nu sunt folosite ca evaluare universală a participanților și nu trebuie confundate cu Founder Rounds.</p>
            </div>
            <div className="bg-canvas p-6 rounded-xl border border-line">
              <h3 className="font-bold text-ink mb-4">Posibile rezultate urmărite:</h3>
              <ul className="grid grid-cols-2 gap-3 text-ink-muted">
                <li>• Capitalizare</li>
                <li>• Cifră de afaceri</li>
                <li>• Profit</li>
                <li>• Reziliență după faliment</li>
                <li>• Obiective strategice</li>
                <li>• Alte realizări specifice</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-brand-charcoal text-white rounded-xl text-sm font-medium inline-block">
            Notă: Formatul public al competițiilor și calendarul nu sunt încă stabilite.
          </div>
        </div>
      </section>

      {/* S4 — Fizic, digital */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-24 h-24 rounded-2xl bg-brand-orange/10 flex items-center justify-center shrink-0">
              <Laptop className="w-12 h-12 text-brand-orange" />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-6">
                Platforma extinde experiența. Nu înlocuiește automat întâlnirea.
              </h2>
              <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
                <p>Interacțiunea la masă, discuția dintre participanți și facilitarea sunt importante pentru primul program. Platforma poate susține pregătirea, materialele, înscrierea, rezultatele, feedbackul și progresul.</p>
                <p>În timp, unele experiențe pot fi livrate online sau hibrid. Acest lucru va fi ales acolo unde crește accesul și păstrează calitatea, nu doar pentru că tehnologia îl permite.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S5 — Cum alegi experiența potrivită */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              Începe de la participant, nu de la format.
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "Grupul cunoaște deja jocul și modul de lucru EZPLAY?", a: "Dacă nu, experiența introductivă este punctul potrivit de pornire." },
              { q: "Există o temă educațională clară și un Round disponibil pentru ea?", a: "Dacă da, grupul poate continua către un Founder Round după onboarding." },
              { q: "Scopul principal este învățarea tematică sau un eveniment comunitar?", a: "Founder Round și competiția folosesc instrumente comune, dar au scopuri și structuri diferite." }
            ].map((item, idx) => (
              <div key={idx} className="bg-canvas border border-line rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal text-white flex items-center justify-center shrink-0 font-bold font-heading">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-3">{item.q}</h3>
                  <p className="text-ink-muted text-lg">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S6 — Pentru organizații */}
      <section className="w-full bg-brand-charcoal py-20 md:py-32 text-white">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-brand-orange" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                O experiență bună începe cu un context bine înțeles.
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed text-lg mb-8">
                <p>Pentru a propune formatul potrivit, avem nevoie să știm cine sunt participanții, ce experiență au, câți sunt, unde poate avea loc activitatea și ce urmărește organizația.</p>
                <p>Nu trimitem doar un set de materiale și nu presupunem că orice format funcționează pentru orice grup. Calitatea facilitării face parte din experiența EZPLAY.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Button size="lg" className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 h-14 px-8 border-0" render={<Link href="/contact" />}>
                Solicită o discuție
              </Button>
              <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 h-14 px-8" render={<Link href="/for/organizations" />}>
                EZPLAY pentru școli și organizații
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* S7 — CTA final */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
            Primul pas este mai simplu decât întregul program.<br className="hidden md:inline" /> Și exact de aceea contează.
          </h2>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            Experiența introductivă creează limbajul comun din care pot începe Founder Rounds, progresul și participarea în comunitate.
          </p>
          <Button size="lg" className="rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-12" render={<Link href="/experiences/introduction" />}>
            Descoperă experiența introductivă
          </Button>
        </div>
      </section>

    </div>
  )
}
