import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  Map, 
  Wrench, 
  LineChart, 
  AlertCircle,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "EZPLAY pentru școli, cluburi și organizații",
  description: "Adu educația antreprenorială prin experiență în școala, clubul sau comunitatea ta. Descoperă formatele EZPLAY și începe o conversație cu echipa.",
}

export default function ForOrganizationsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
            Pentru școli, cluburi, ONG-uri și comunități
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            Transformă educația antreprenorială într-o experiență pe care participanții o pot trăi.
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            <p>
              EZPLAY creează contexte în care tinerii nu primesc doar informații despre business. Ei iau decizii, observă consecințele, discută ce s-a întâmplat și folosesc ce au descoperit într-o provocare nouă.
            </p>
            <p>
              Putem construi împreună o primă experiență sau un parcurs mai amplu, potrivit comunității tale și nivelului de dezvoltare al programului.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 flex-wrap">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8" render={<Link href="#contact" />}>
              Discută cu noi despre o experiență
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/how-we-learn" />}>
              Vezi cum învățăm
            </Button>
            <div className="w-full sm:w-auto mt-4 sm:mt-0 flex items-center justify-center sm:justify-start">
              <Link href="/program/curriculum" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange/80 transition-colors group">
                Vezi structura programului
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="text-sm text-ink-muted flex items-start gap-2 max-w-[600px] bg-canvas p-4 rounded-xl border border-line">
            <AlertCircle className="w-5 h-5 shrink-0 text-brand-orange mt-0.5" />
            <p>Nu ai nevoie de o propunere completă înainte să ne scrii. Este suficient să ne spui cu cine lucrezi și ce ai vrea să devină posibil pentru acei participanți.</p>
          </div>
        </div>
      </section>

      {/* S1 — Pentru cine este această colaborare */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              EZPLAY poate începe acolo unde există tineri și un adult care vrea să le creeze acces la o experiență relevantă.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Școli publice și private", text: "Pentru activități extracurriculare, săptămâni tematice, cluburi de antreprenoriat sau programe care leagă noțiunile economice de decizii concrete." },
              { icon: Users, title: "Cluburi și hub-uri educaționale", text: "Pentru comunități care vor experiențe recurente, provocări în echipă și un parcurs care poate crește în timp." },
              { icon: Wrench, title: "Fără teorie izolată", text: "Teoria apare după o experiență de joc sau o provocare de business, pentru a explica un rezultat sau a oferi instrumente pentru următoarea decizie." },
              { icon: Building2, title: "Companii și parteneri", text: "Pentru organizații care vor să susțină accesul tinerilor la experiențe educaționale, să contribuie cu expertiză sau să sprijine dezvoltarea programului." }
            ].map((card, idx) => (
              <div key={idx} className="bg-surface border border-line p-8 rounded-[var(--radius-panel)] shadow-sm hover:border-brand-orange transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-4">{card.title}</h3>
                <p className="text-ink-muted leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S2 — Ce aduce EZPLAY */}
      <section className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 flex flex-col items-start sticky top-24">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                Mai mult decât un joc pus pe masă.
              </h2>
              <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
                <p>
                  Jocurile și simulările creează situația. Învățarea apare din felul în care experiența este pregătită, facilitată, analizată și conectată cu o provocare nouă.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { title: "O experiență construită în jurul deciziilor", text: "Participanții lucrează cu alegeri, resurse limitate, priorități și consecințe. Nu li se cere să memoreze o definiție înainte de a înțelege de ce contează." },
                { title: "Un limbaj comun pentru companie", text: "Strategie, Produs, Piață, Operațiuni și Finanțe sunt privite ca părți ale aceluiași sistem, nu ca teme izolate." },
                { title: "Founder Debrief", text: "După experiență, facilitatorul îi ajută pe participanți să descrie ce au observat, să compare decizii și să transforme rezultatele în întrebări utile." },
                { title: "Conținut potrivit momentului", text: "Explicația vine atunci când participantul are deja o problemă de înțeles. Astfel, noțiunea nu rămâne o informație fără context." },
                { title: "Continuitate", text: "O experiență introductivă poate rămâne un eveniment valoros sau poate deveni începutul unui parcurs format din Founder Rounds interconectate." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 bg-canvas p-8 rounded-2xl border border-line shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center shrink-0 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink mb-3">{item.title}</h3>
                    <p className="text-ink-muted leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* S3 — Cum putem începe */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-[800px] mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-6">
              Alege punctul de pornire, nu pachetul perfect.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-surface border border-line p-8 lg:p-10 rounded-2xl flex flex-col items-start h-full">
              <h3 className="font-heading text-2xl font-bold text-ink mb-4">Găzduiește o experiență introductivă</h3>
              <p className="text-ink-muted leading-relaxed mb-8 flex-1">
                Un prim contact construit în jurul unui joc și al unui Founder Debrief. Participanții iau decizii, observă ce produce sistemul și discută despre legăturile dintre componentele unei companii.
              </p>
              <Button variant="outline" className="border-line-strong text-ink hover:bg-canvas" render={<Link href="/experiences/introduction" />}>
                Descoperă experiența introductivă
              </Button>
            </div>
            
            <div className="bg-brand-charcoal text-white p-8 lg:p-10 rounded-2xl flex flex-col items-start h-full">
              <h3 className="font-heading text-2xl font-bold mb-4">Construiește un parcurs pentru comunitatea ta</h3>
              <p className="text-white/80 leading-relaxed mb-8 flex-1">
                Dacă vrei continuitate, putem discuta un traseu format din mai multe Founder Rounds, adaptat vârstei, contextului și obiectivelor educaționale potrivite.
              </p>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" render={<Link href="#contact" />}>
                Vorbește cu noi despre program
              </Button>
            </div>
            
            <div className="bg-surface border border-line p-8 lg:p-10 rounded-2xl flex flex-col items-start h-full">
              <h3 className="font-heading text-2xl font-bold text-ink mb-4">Susține accesul altor tineri</h3>
              <p className="text-ink-muted leading-relaxed mb-8 flex-1">
                Un partener poate finanța experiențe, poate oferi spațiu, poate conecta comunități sau poate sprijini dezvoltarea responsabilă a programului.
              </p>
              <Button variant="outline" className="border-line-strong text-ink hover:bg-canvas" render={<Link href="#contact" />}>
                Devino partener
              </Button>
            </div>
            
            <div className="bg-surface border border-line p-8 lg:p-10 rounded-2xl flex flex-col items-start h-full">
              <h3 className="font-heading text-2xl font-bold text-ink mb-4">Contribuie la dezvoltare</h3>
              <p className="text-ink-muted leading-relaxed mb-8 flex-1">
                Educatorii, facilitatorii, antreprenorii și cercetătorii pot ajuta prin feedback, expertiză, acces la contexte reale sau participare la testarea unor ipoteze de design.
              </p>
              <Button variant="outline" className="border-line-strong text-ink hover:bg-canvas" render={<Link href="/research" />}>
                Vezi cum poți contribui
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* S4 — Cum arată o colaborare */}
      <section className="w-full bg-surface py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
              Clarificăm contextul înainte să alegem formatul.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { title: "Ne spui despre comunitatea ta", text: "Cine sunt participanții, ce vârstă au, câți sunt, unde se întâlnesc și ce urmărește organizația." },
              { title: "Alegem un început realist", text: "Stabilim dacă este potrivită o experiență introductivă, un parcurs mai lung sau o etapă de explorare împreună." },
              { title: "Pregătim experiența", text: "Clarificăm rolurile, spațiul, programul, materialele, facilitarea și condițiile necesare pentru participarea în siguranță a tinerilor." },
              { title: "Observăm și învățăm", text: "Colectăm feedback relevant, fără să transformăm participanții într-o sursă de cifre decorative. Ce observăm ne ajută să îmbunătățim experiența." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col bg-canvas p-6 rounded-2xl border border-line shadow-sm relative">
                <div className="text-4xl font-bold text-brand-orange/20 absolute top-4 right-6 pointer-events-none">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-ink mb-4 pr-10 mt-4 relative z-10">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed flex-1 relative z-10">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5 & S6 — Rolurile noastre & Condiții */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
                O experiență bună are nevoie de responsabilități clare.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-brand-orange uppercase text-sm mb-4">EZPLAY poate asigura:</h3>
                  <ul className="space-y-3 text-ink-muted">
                    <li>• designul experienței și alegerea formatului;</li>
                    <li>• instrumentele și materialele necesare;</li>
                    <li>• cadrul de facilitare și Founder Debrief;</li>
                    <li>• pregătirea sau sprijinirea facilitatorilor;</li>
                    <li>• întrebările de feedback și analiza.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-ink uppercase text-sm mb-4">Organizația asigură:</h3>
                  <ul className="space-y-3 text-ink-muted">
                    <li>• legătura cu participanții și familiile;</li>
                    <li>• spațiul și intervalul agreat;</li>
                    <li>• informațiile corecte despre grup;</li>
                    <li>• acordurile proprii pentru lucrul cu minori;</li>
                    <li>• un punct de contact pentru decizii.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-surface p-8 rounded-2xl border border-line flex flex-col justify-center">
              <h2 className="font-heading text-2xl font-bold text-ink tracking-tight mb-6">
                Participarea contează mai mult decât mărimea publicului.
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>EZPLAY nu este o prezentare despre antreprenoriat ținută în fața unei săli pasive. Participanții au nevoie de timp să decidă, să observe, să discute și să încerce din nou.</p>
                <p>Formatul concret depinde de vârstă, numărul de participanți, spațiu, durata disponibilă, experiența facilitatorilor și obiectivul întâlnirii. Vom spune deschis ce poate funcționa într-un anumit context și ce ar compromite experiența.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S8 — Formular */}
      <section id="contact" className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[800px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Spune-ne ce vrei să faci posibil.
            </h2>
            <p className="text-lg text-ink-muted">
              Răspunsurile ne ajută să înțelegem contextul. Nu reprezintă o comandă și nu te obligă să alegi un format.
            </p>
          </div>
          
          <div className="bg-canvas p-8 rounded-2xl border border-line shadow-sm flex flex-col items-center justify-center min-h-[300px]">
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

      {/* CTA Final */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Poate începe cu o singură masă și o întrebare bună.
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-[700px]">
            Dacă vrei ca tinerii din comunitatea ta să descopere antreprenoriatul prin decizii și experiență, hai să vedem care este primul pas potrivit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-8 border-0" render={<Link href="#contact" />}>
              Începe conversația
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-white/30 text-white hover:bg-white/10" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
