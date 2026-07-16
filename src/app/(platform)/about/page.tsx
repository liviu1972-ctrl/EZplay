import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Puzzle, 
  Map, 
  Target, 
  Globe, 
  ShieldCheck, 
  Users, 
  Lightbulb,
  Workflow,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Despre EZPLAY — Where Future Founders Start",
  description: "Află de ce EZPLAY construiește programe de educație antreprenorială prin experiență, ce principii ghidează proiectul și încotro se îndreaptă.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Despre EZPLAY
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Construim locul unde viitorii fondatori încep prin experiență.
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            <p>
              EZPLAY creează jocuri, simulări și experiențe prin care antreprenorii de azi și de mâine învață cum funcționează o companie, luând decizii și observând consecințele lor.
            </p>
            <p>
              Primul program este construit pentru tineri. Viziunea este mai largă: un ecosistem în care oamenii pot descoperi, aplica, contribui și crește împreună.
            </p>
          </div>
          <div className="font-bold text-brand-orange uppercase tracking-wider text-sm mb-10 border-l-4 border-brand-orange pl-4">
            WHERE FUTURE FOUNDERS START
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/experiences" />}>
              Vezi ce construim acum
            </Button>
          </div>
        </div>
      </section>

      {/* S1 & S2 — De ce există & Povestea */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <div className="bg-surface p-8 md:p-12 border border-line rounded-[var(--radius-panel)] shadow-sm">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Ideile despre business devin mai clare atunci când poți vedea ce produc deciziile.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>O companie este un sistem. Produsul, Piața, Operațiunile, Finanțele și Strategia se influențează continuu. Predate separat, pot rămâne definiții. Trăite într-o situație în care trebuie să alegi, devin întrebări reale.</p>
                <p>EZPLAY construiește medii sigure în care participanții pot încerca, greși, analiza și relua. Teoria apare atunci când are o problemă de explicat și un rol în următoarea decizie.</p>
              </div>
            </div>

            <div className="bg-surface p-8 md:p-12 border border-line rounded-[var(--radius-panel)] shadow-sm">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                Un joc a deschis o întrebare mai mare.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed mb-8">
                <p>EZPLAY a început prin construirea și testarea unui joc despre funcționarea unei companii. În sesiunile cu copii, părinți și antreprenori, mecanica a făcut vizibile mai mult decât rezultate: feluri diferite de a decide, atașamentul față de resurse vechi, curajul de a reconstrui și legătura dintre capacitate, clienți și vânzări.</p>
                <p>Dar jocul singur nu era întregul răspuns. O experiență bună avea nevoie de întrebări, facilitare, explicații potrivite momentului și o nouă ocazie de aplicare. Din această nevoie a crescut direcția actuală: un program educațional susținut de jocuri și simulări, nu un joc înconjurat de câteva lecții.</p>
              </div>
              <div className="flex items-start gap-2 p-4 bg-brand-charcoal/5 border border-line rounded-lg text-xs text-ink-muted">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-brand-charcoal" />
                <p>Înainte de publicare, această secțiune poate fi completată cu o cronologie verificată, imagini și exemple documentate.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S3 — Ce este EZPLAY astăzi */}
      <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16 max-w-[800px]">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              Un proiect de educație antreprenorială aflat în construcție.
            </h2>
            <p className="text-lg text-ink-muted">EZPLAY reunește patru componente care trebuie să funcționeze împreună.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Workflow, title: "Programul educațional", text: "Transformă experiența într-un parcurs intenționat, prin teme, facilitare, Founder Debrief, Learning Input și Business Challenges." },
              { icon: Puzzle, title: "Jocurile și simulările", text: "Creează situații în care deciziile și consecințele pot fi observate fără costul unei greșeli reale." },
              { icon: Globe, title: "Platforma ezplay.org", text: "Va conecta descoperirea programului, accesul la experiențe, resursele, progresul și contribuția la comunitate." },
              { icon: Users, title: "Comunitatea", text: "Participanții, părinții, educatorii, facilitatorii, antreprenorii și partenerii pot testa, organiza, îmbunătăți și extinde accesul la experiențe." }
            ].map((comp, idx) => (
              <div key={idx} className="bg-canvas border border-line p-8 rounded-2xl shadow-sm hover:border-brand-orange transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
                  <comp.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-4">{comp.title}</h3>
                <p className="text-ink-muted leading-relaxed">{comp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — Misiunea */}
      <section className="w-full bg-brand-charcoal py-20 md:py-32 text-white">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <Target className="w-16 h-16 text-brand-orange mb-8" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
            Să facem funcționarea unei companii mai ușor de descoperit și mai greu de redus la formule simpliste.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-[800px]">
            <p>Vrem ca oamenii să poată privi o companie ca pe un sistem de decizii interdependente. Să înțeleagă că Finanțele nu sunt doar treaba contabilului, că Piața nu compensează o capacitate inexistentă, că un eșec poate oferi feedback și că o strategy se verifică prin consecințe.</p>
            <p>Nu urmărim să convingem fiecare participant să devină antreprenor. Urmărim să îi oferim o experiență mai lucidă a felului în care se creează, se livrează și se susține valoarea.</p>
          </div>
        </div>
      </section>

      {/* S5 — Principiile */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Cum alegem ce merită construit.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Decizia înaintea explicației", text: "Începem cu o situație care face întrebarea relevantă. Explicația vine pentru a deschide opțiuni, nu pentru a înlocui experiența." },
              { title: "Simplu nu înseamnă fals", text: "Reducem complexitatea pentru a crea un punct de intrare. Arătăm limitele modelului și adăugăm profunzime pe măsură ce participantul este pregătit." },
              { title: "Greșeala produce informație", text: "Un rezultat slab nu definește participantul. El poate deveni material pentru reflecție, adaptare și o nouă încercare." },
              { title: "Compania este un sistem", text: "Nu izolăm Produsul de Piață, Operațiunile de Finanțe sau decizia de consecințele ei." },
              { title: "Claritate despre ce știm", text: "Separăm experiența acumulată, cercetarea externă, ipotezele noastre și lucrurile care nu au fost încă validate." },
              { title: "Comunitatea câștigă încredere prin contribuție", text: "Participarea reală, feedbackul responsabil și capacitatea de a susține experiențe contează mai mult decât popularitatea sau activitatea superficială." }
            ].map((prin, idx) => (
              <div key={idx} className="bg-canvas border border-line p-8 rounded-2xl flex flex-col items-start shadow-sm">
                <div className="flex items-center gap-2 text-brand-teal font-bold font-heading mb-4 bg-brand-teal/10 px-3 py-1 rounded-full text-sm">
                  Principiul 0{idx + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-4">{prin.title}</h3>
                <p className="text-ink-muted leading-relaxed">{prin.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S6 — Ce nu este EZPLAY */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Granițele ne ajută să rămânem clari.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              "Nu este doar un joc de masă",
              "Nu este doar un joc digital",
              "Nu este un curs video despre cum să te îmbogățești",
              "Nu este o platformă generică de lecții gamificate",
              "Nu este un incubator și nu promite lansarea unei afaceri",
              "Nu este împotriva școlii și nu tratează teoria ca inutilă",
              "Nu oferă rețete universale pentru succes",
              "Nu confundă activitatea din platformă cu învățarea demonstrată"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-5 bg-surface border border-line rounded-xl">
                <div className="w-2 h-2 rounded-full bg-brand-charcoal shrink-0" />
                <span className="text-ink-muted font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7, S8, S9 — Cine construiește, Origine, Cum protejăm */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="bg-canvas border border-line p-8 rounded-2xl flex flex-col h-full shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-ink mb-6">
                Un proiect inițiat de un antreprenor și construit pentru a putea crește prin comunitate.
              </h3>
              <div className="space-y-4 text-ink-muted text-sm leading-relaxed mb-6 flex-1">
                <p className="bg-surface-strong p-4 rounded-xl border border-line italic">
                  [DE COMPLETAT: 80–120 de cuvinte despre fondator — experiența antreprenorială relevantă, întrebarea care a dus la primul joc și rolul actual în EZPLAY.]
                </p>
                <div className="font-bold text-ink mt-4 pt-4 border-t border-line">O echipă care se poate lărgi</div>
                <p>EZPLAY este construit cu ajutorul oamenilor care testează, oferă feedback, facilitează, documentează și creează acces pentru participanți. Pe măsură ce rolurile devin stabile și contribuțiile pot fi prezentate cu acordul celor implicați, această secțiune va face vizibilă echipa reală din jurul proiectului.</p>
              </div>
              <Button variant="outline" className="border-line-strong text-ink hover:bg-surface w-full mt-auto" render={<Link href="#" />}>
                Povestea completă (în curând)
              </Button>
            </div>

            <div className="bg-canvas border border-line p-8 rounded-2xl flex flex-col h-full shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-ink mb-6">
                Construit în România.<br /> Gândit pentru contexte care pot fi diferite.
              </h3>
              <div className="space-y-4 text-ink-muted text-sm leading-relaxed flex-1">
                <p>EZPLAY își începe dezvoltarea în România și primul program se adresează comunităților de aici. Platforma este gândită bilingv, în română și engleză, pentru ca metodele, instrumentele și contribuțiile să poată circula în timp dincolo de un singur context.</p>
                <p>Extinderea nu înseamnă traducerea mecanică a acelorași exemple. Fiecare nou public va cere adaptare, testare și parteneri care înțeleg realitatea locală.</p>
              </div>
            </div>

            <div className="bg-canvas border border-line p-8 rounded-2xl flex flex-col h-full shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="font-heading text-xl font-bold text-ink mb-6 relative z-10">
                Acces acolo unde ajută. Protecție acolo unde păstrează calitatea. Încredere acolo unde comunitatea contribuie.
              </h3>
              <div className="space-y-4 text-ink-muted text-sm leading-relaxed mb-6 flex-1 relative z-10">
                <p>Direcția EZPLAY este „Open Core, Protected Program, Trusted Community”. Unele reguli și instrumente de bază pot deveni accesibile public. Programul complet, materialele de facilitare și procesele care susțin calitatea au nevoie de protecție și responsabilitate. Contribuția comunității are nevoie de reguli clare, recunoaștere și încredere câștigată.</p>
                <p className="italic text-xs">Modelul juridic și licențele concrete sunt încă în dezvoltare.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S10 — CTA Final */}
      <section className="w-full bg-brand-charcoal py-20 md:py-32 text-white">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-12">
            EZPLAY se construiește prin experiențe reale și întrebări serioase.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-10 border-0" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-10 border-white/30 text-white hover:bg-white/10" render={<Link href="/research" />}>
              Contribuie la dezvoltare
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
