import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  HeartHandshake, 
  Lightbulb, 
  Activity, 
  Map, 
  Users, 
  ShieldCheck, 
  Search, 
  X, 
  AlertCircle 
} from "lucide-react"

export const metadata: Metadata = {
  title: "EZPLAY pentru părinți — Educație antreprenorială prin experiență",
  description: "Află ce urmărește Programul EZPLAY pentru tineri, cum se desfășoară experiențele și ce poate descoperi copilul tău.",
}

export default function ForParentsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Pentru părinți
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Cunoașterea este importantă.<br className="hidden md:inline" /> La fel și experiența de a o folosi.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            Lumea în care vor lucra copiii noștri se schimbă rapid. EZPLAY îi ajută să exerseze ceva ce nu poate fi redus la memorarea unui răspuns: cum să decidă, să observe consecințele, să învețe din greșeli și să continue.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/experiences/introduction" />}>
              Vezi prima experiență
            </Button>
          </div>
        </div>
      </section>

      {/* S1 & S2 — De ce / Ce face diferit */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="bg-surface p-8 md:p-12 border border-line rounded-[var(--radius-panel)]">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Antreprenoriatul este mai mult decât deschiderea unei firme.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>Înseamnă să observi o problemă, să folosești resurse limitate, să alegi între alternative, să îți asumi un rezultat și să adaptezi ceea ce nu funcționează.</p>
                <p>Aceste capacități pot fi utile unui viitor fondator, unui intraprenor, unui lider de echipă sau unui tânăr care vrea să înțeleagă mai bine lumea companiilor și a banilor.</p>
                <p className="font-medium text-ink mt-4 pt-4 border-t border-line">
                  EZPLAY nu le cere participanților să își deschidă o afacere și nu promite că fiecare copil trebuie să devină antreprenor.
                </p>
              </div>
            </div>

            <div className="bg-surface p-8 md:p-12 border border-line rounded-[var(--radius-panel)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6 relative z-10">
                Copilul nu primește doar o explicație. Primește o situație în care explicația devine necesară.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed relative z-10 mb-8">
                <p>Participanții conduc companii simulate, iau decizii și observă rezultate. Apoi discută ce s-a întâmplat, primesc informația relevantă și o aplică într-o problemă nouă.</p>
                <p>Programul completează educația academică. Nu respinge teoria și nu minimalizează munca profesorilor. Creează un context diferit, în care cunoașterea este pusă la lucru.</p>
              </div>
              <div className="p-4 bg-brand-orange/10 border-l-4 border-brand-orange text-ink font-medium relative z-10">
                În EZPLAY, întrebarea apare înainte ca răspunsul să fie memorat.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S3 — Ce poate dezvolta */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
              Ce poate dezvolta participantul
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Activity, title: "Greșeala ca feedback", text: "Copilul poate vedea că o strategie nereușită nu este o etichetă și nici capătul experienței. Este informație pentru următoarea încercare." },
              { icon: Lightbulb, title: "Curajul de a decide", text: "Participanții exersează alegerea în situații în care nu au toate datele și nu există o singură soluție evidentă." },
              { icon: Map, title: "Înțelegerea financiară", text: "Profit, Cash, Cash Flow, costuri și investiții devin rezultate vizibile ale unor decizii, nu doar termeni de memorat." },
              { icon: Search, title: "Gândirea sistemică", text: "Copilul observă că produsul, piața, operațiunile, finanțele și strategia se influențează reciproc." },
              { icon: Users, title: "Colaborarea", text: "Unele probleme cer echipei să împartă informația, să asculte perspective diferite și să își asume un răspuns comun." }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center mb-6">
                  <p.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{p.title}</h3>
                <p className="text-white/80 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 & S5 — Vârste și Prima experiență */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Vârsta ne ajută să adaptăm experiența. Nu definește singură nivelul participantului.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>Nucleul primului program este gândit pentru clasele a V-a–a X-a. Pot fi dezvoltate versiuni adaptate pentru clasele a II-a–a IV-a și experiențe mai avansate pentru clasele a XI-a–a XII-a.</p>
                <p>Nivelul de matematică necesar la început este redus: operații de bază, iar procentele și conceptele noi sunt introduse atunci când experiența le face relevante.</p>
                <p>Înainte de înscriere, contextul grupului și nevoile participanților trebuie înțelese. Nu presupunem că toți copiii de aceeași vârstă pornesc din același loc.</p>
              </div>
            </div>
            
            <div className="bg-canvas border border-line p-8 rounded-2xl shadow-sm">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Primul pas este Joc + Founder Debrief.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8">
                <p>Participantul învață regulile, conduce o companie simulată și ia primele decizii. La final, grupul discută strategiile, rezultatele și lucrurile care merită înțelese mai bine.</p>
                <p>Această experiență pregătește participantul pentru Founder Rounds complete. Nu este un curs complet și nu acordă automat un nivel sau o certificare.</p>
              </div>
              <Button className="w-full sm:w-auto bg-brand-charcoal text-white hover:bg-brand-charcoal/90" render={<Link href="/experiences/introduction" />}>
                Descoperă experiența introductivă
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* S6 — Ce nu promitem */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
              Preferăm o promisiune realistă unei formule spectaculoase.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              "Nu garantăm succes financiar.",
              "Nu promitem că participantul va deveni antreprenor.",
              "Nu prezentăm jocul ca înlocuitor al experienței reale.",
              "Nu oferim certificare profesională.",
              "Nu transformăm fiecare activitate în competiție.",
              "Nu folosim punctele și clasamentele ca dovadă automată a învățării.",
              "Nu etichetăm copilul drept „slab” într-o zonă pe care nu a explorat-o încă."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 bg-surface border border-line rounded-xl">
                <X className="w-5 h-5 text-brand-charcoal shrink-0 mt-0.5" />
                <span className="text-ink-muted font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7 & S8 — Cercetare și Date */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <div>
              <div className="flex items-center gap-3 mb-6 text-brand-teal">
                <Search className="w-6 h-6" />
                <div className="text-sm font-bold uppercase tracking-wider">Dezvoltare</div>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Programul este construit cu cercetare și corectat prin experiență.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8">
                <p>Folosim surse despre curriculum spiral, competențe, mastery learning, învățare bazată pe probleme, experiență și motivație. Cercetarea informează designul, dar nu dovedește automat că o implementare EZPLAY funcționează.</p>
                <p>De aceea programul este în dezvoltare, iar experiențele, materialele și sistemele de progres trebuie observate, testate și revizuite.</p>
              </div>
              <Button variant="outline" className="border-line-strong text-ink hover:bg-canvas" render={<Link href="/research" />}>
                Explorează cercetarea
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6 text-brand-orange">
                <ShieldCheck className="w-6 h-6" />
                <div className="text-sm font-bold uppercase tracking-wider">Siguranță</div>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Protecția participanților face parte din produs.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-6">
                <p>Conturile pentru minori, consimțământul parental, fotografiile, comunicarea și vizibilitatea progresului vor fi activate numai împreună cu reguli și permisiuni clare.</p>
                <p>Politicile complete sunt în dezvoltare și vor fi publicate înaintea funcțiilor care colectează sau afișează date despre minori.</p>
              </div>
              <div className="flex items-start gap-2 p-4 bg-surface-strong border border-line rounded-lg text-xs text-ink-muted">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Această secțiune nu înlocuiește paginile juridice și nu trebuie formulată ca declarație absolută de conformitate.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S9 — CTA Final / Cum participă */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[800px] mx-auto px-4 md:px-8 text-center">
          <HeartHandshake className="w-12 h-12 text-brand-orange mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            Creează primul context.<br className="hidden md:inline" /> Programul poate continua de acolo.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-[700px] mx-auto">
            Experiențele pot fi organizate prin școli, cluburi, ONG-uri, comunități sau grupuri locale. Dacă ai un grup interesat, spune-ne cine sunt participanții și ce context le poți oferi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/contact" />}>
              Solicită o experiență pentru un grup
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="#interest-form" />}>
              Anunță-mă despre experiențe deschise
            </Button>
          </div>
          
          <div className="bg-surface p-8 rounded-2xl border border-line text-left shadow-sm" id="interest-form">
            <h3 className="font-bold text-ink mb-2">Formular de interes (în curând)</h3>
            <p className="text-ink-muted text-sm mb-6">Momentan nu colectăm date publice prin formulare automate. Ne vom asigura că avem toate fluxurile juridice puse la punct pentru a proteja informațiile participanților.</p>
            <Button variant="outline" className="w-full border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal/5" render={<Link href="/contact" />}>
              Contactează-ne direct
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
