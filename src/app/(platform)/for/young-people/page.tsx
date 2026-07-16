import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lightbulb, TrendingUp, Target, RefreshCw, Send, Sparkles, UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "EZPLAY pentru tineri — Descoperă antreprenoriatul prin experiență",
  description: "Ia decizii, construiește o companie simulată, învață din rezultate și descoperă antreprenoriatul în experiențele EZPLAY.",
}

export default function ForYoungPeoplePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
            Pentru participanți
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Nu trebuie să știi totul ca să începi.<br className="hidden md:inline" /> Trebuie să fii gata să alegi.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            În EZPLAY nu primești de la început toate răspunsurile. Primești o companie simulată, resurse, limite și decizii. Ce construiești mai departe depinde de tine.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="/experiences" />}>
              Descoperă experiențele
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/how-we-learn" />}>
              Vezi cum funcționează programul
            </Button>
          </div>
        </div>
      </section>

      {/* S1 — Ce vei face */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="flex flex-col items-start">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Vei conduce înainte să ți se spună exact cum ar trebui să conduci.
              </h2>
              <div className="space-y-6 text-lg text-ink-muted leading-relaxed">
                <p>Vei decide ce resurse folosești, în ce investești, ce păstrezi și la ce renunți. Vei vedea ce se întâmplă cu producția, clienții, costurile, profitul și Cash-ul companiei tale.</p>
                <p>Uneori strategia va funcționa. Alteori vei descoperi prea târziu ceva ce ai ignorat. În ambele situații, experiența continuă.</p>
              </div>
            </div>
            <div className="bg-surface border border-line p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-ink mb-6 uppercase tracking-wider text-sm">Ce poți întâlni:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-ink-muted">
                {["Resurse limitate", "Concurență pentru oportunități", "Evenimente neașteptate", "Decizii fără informație completă", "Investiții care ajută mai târziu", "Resurse care nu mai sunt utile", "O companie care trebuie simplificată", "Un restart după faliment", "Probleme pe care echipa trebuie să le rezolve"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-brand-orange mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* S2 — Greșeala */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-brand-charcoal/5 flex items-center justify-center mb-8">
            <AlertTriangle className="w-8 h-8 text-brand-charcoal" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8 max-w-[800px]">
            O decizie greșită nu te scoate din program. Îți arată ce merită încercat altfel.
          </h2>
          <div className="space-y-6 text-lg text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            <p>În viața reală, unele greșeli pot costa mult. Într-o simulare, poți vedea consecința, poți înțelege ce ai omis și poți încerca din nou cu o strategie mai bună.</p>
            <p>Nu urmărim să nu greșești niciodată. Urmărim să devii mai bun la observat, înțeles și continuat.</p>
          </div>
          <div className="p-4 bg-brand-charcoal text-white rounded-xl text-lg font-medium inline-block border-l-4 border-brand-yellow px-8 py-6">
            Falimentul poate încheia o partidă. Nu trebuie să încheie învățarea.
          </div>
        </div>
      </section>

      {/* S3 & S4 — Myths / Rules */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-surface p-8 md:p-12 border border-line rounded-2xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Mai puțină reproducere. Mai multă decizie.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>Vei primi explicații, formule și materiale. Dar ele apar într-un context: ai întâlnit deja o problemă și vrei să înțelegi ce s-a întâmplat sau cum poți rezolva următoarea provocare.</p>
                <p>Facilitatorul nu este acolo doar ca să îți spună ce să memorezi. El pregătește situația, observă, pune întrebări și ajută grupul să transforme experiența în înțelegere.</p>
              </div>
            </div>
            <div className="bg-surface p-8 md:p-12 border border-line rounded-2xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Poți descoperi antreprenoriatul fără să îți deschizi mâine o companie.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>Nu ai nevoie de un pitch, un plan de afaceri sau o idee „genială”. Programul nu este un incubator și nu îți cere să lansezi un proiect real.</p>
                <p>Experiențele pot fi utile dacă vei deveni fondator, dacă vei construi proiecte în interiorul unei organizații sau dacă vrei pur și simplu să înțelegi mai bine cum se iau deciziile într-o companie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S5 — Ce vei descoperi (Perspective) */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
              Cinci moduri de a privi aceeași companie.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Strategy", text: "Ce alegi și de ce? Ce urmărești? Ce compromis accepți?", color: "text-brand-orange" },
              { title: "Product", text: "Ce valoare creezi și de ce ar alege-o cineva?", color: "text-brand-teal" },
              { title: "Market", text: "Cum ajungi la clienți și cum construiești accesul la piață?", color: "text-brand-yellow" },
              { title: "Operations", text: "Cu ce oameni, procese și resurse poți crea și livra?", color: "text-brand-green" },
              { title: "Finance", text: "Ce spun cifrele despre deciziile tale și despre ce poate face compania?", color: "text-white" }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className={`font-bold uppercase tracking-wider text-sm mb-3 ${p.color}`}>{p.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S6 — Singur și împreună */}
      <section className="w-full bg-surface py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-brand-teal/20 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full bg-brand-teal flex items-center justify-center text-white relative z-10">
                  <UserPlus className="w-10 h-10" />
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Compania poate fi a ta.<br /> Provocarea poate fi a echipei.
              </h2>
              <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
                <p>În unele momente vei conduce propria companie simulată și vei concura pentru rezultate. În altele vei lucra cu echipa pentru a analiza o problemă și a construi un răspuns comun.</p>
                <p>Nu trebuie să fii persoana care știe totul. Poți contribui observând ceva ce alții au ratat, găsind informația potrivită, explicând un rezultat sau legând ideile echipei într-o decizie mai bună.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S7 — Primul pas */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            Începi prin joc și Founder Debrief.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            Prima experiență te ajută să înțelegi regulile și să îți observi propriul mod de a decide. După joc, grupul discută strategiile, rezultatele și lucrurile care merită înțelese mai bine.
          </p>
          <Button size="lg" className="rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-10" render={<Link href="/experiences/introduction" />}>
            Descoperă experiența introductivă
          </Button>
        </div>
      </section>

      {/* S8 — Cum poți participa (Formular / Interest) */}
      <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[800px] mx-auto px-4 md:px-8">
          <div className="bg-canvas p-8 md:p-12 rounded-2xl border border-line shadow-sm text-center">
            <h2 className="font-heading text-3xl font-bold text-ink tracking-tight mb-6">
              Vrei să existe o experiență EZPLAY în școala sau comunitatea ta?
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-8">
              Arată programul unui părinte, profesor sau coordonator. Ei ne pot spune mai multe despre grup și pot solicita o discuție pentru organizarea unei experiențe.
            </p>
            
            <div className="flex flex-col gap-4 max-w-[400px] mx-auto mb-10">
              <Button size="lg" className="w-full bg-brand-charcoal text-white hover:bg-brand-charcoal/90 h-14" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copiat!'))}>
                Trimite pagina unui adult
              </Button>
              <Button size="lg" variant="outline" className="w-full border-line-strong text-ink hover:bg-surface h-14" render={<Link href="#interest-form" />}>
                Vreau să aflu când apar experiențe deschise
              </Button>
            </div>
            
            <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow text-left" id="interest-form">
              <h3 className="font-bold text-ink mb-2">Înscriere în curând</h3>
              <p className="text-sm text-ink-muted">
                Dacă nu ai vârsta necesară pentru a folosi singur formularele de contact, vorbește cu un părinte, tutore sau profesor. Regulile exacte de vârstă și consimțământ vor fi afișate înainte de activarea înscrierilor individuale.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
