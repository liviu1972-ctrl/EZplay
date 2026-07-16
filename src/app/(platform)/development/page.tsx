import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Wrench, 
  CheckCircle2, 
  CircleDashed, 
  GraduationCap, 
  Users, 
  Building2, 
  Briefcase, 
  Target, 
  BookOpen, 
  Handshake, 
  AlertCircle,
  MessageSquare,
  Compass
} from "lucide-react"

export const metadata: Metadata = {
  title: "Contribuie la dezvoltarea EZPLAY",
  description: "Ajută la dezvoltarea programelor EZPLAY ca participant, părinte, educator, facilitator, antreprenor, cercetător sau partener.",
}

export default function DevelopmentPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
        <div className="container relative z-10 flex flex-col items-start max-w-[1000px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-charcoal/30 bg-brand-charcoal/5 px-3 py-1 text-sm font-medium text-brand-charcoal mb-8">
            <Wrench className="w-4 h-4" />
            Construim deschis, comunicăm onest
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-8">
            EZPLAY este în dezvoltare.<br className="hidden md:inline" /> Asta este o invitație, nu o scuză.
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-ink-muted leading-relaxed mb-10 max-w-[75ch]">
            <p>
              Există deja un joc fizic și digital funcțional, experiențe desfășurate cu copii și adulți și o direcție educațională clară. Programul complet, materialele pentru facilitatori, sistemul de progres și rolurile platformei trebuie încă proiectate, testate și documentate.
            </p>
            <p className="font-medium text-ink">
              Dacă experiența și perspectiva ta pot face proiectul mai bun, vrem să știm.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-charcoal text-white hover:bg-brand-charcoal/90 text-base h-14 px-8" render={<Link href="#roles" />}>
              Alege cum vrei să contribui
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="#status" />}>
              Vezi ce există acum
            </Button>
          </div>
        </div>
      </section>

      {/* S1 — Ce există și ce se construiește */}
      <section id="status" className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Nu pornim de la zero. Nici nu pretindem că am ajuns la destinație.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Există acum */}
            <div className="bg-surface border border-line p-8 md:p-10 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-line">
                <CheckCircle2 className="w-8 h-8 text-brand-teal" />
                <h3 className="font-heading text-2xl font-bold text-ink">Există acum</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Deckbuilder-ul fizic, în versiune Beta, cu seturi și componente care permit partide complete;",
                  "O versiune digitală funcțională a jocului de bază;",
                  "Infrastructura inițială ezplay.org, cu autentificare, bază de date și stocare;",
                  "Experiențe desfășurate cu copii, părinți și antreprenori;",
                  "Observații, exemple de facilitare și teme educaționale rezultate din practică;",
                  "Poziționarea EZPLAY și arhitectura de lucru a programului."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-brand-teal font-bold mt-0.5">•</span>
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Se construiește */}
            <div className="bg-surface border border-line p-8 md:p-10 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-line">
                <CircleDashed className="w-8 h-8 text-brand-orange" />
                <h3 className="font-heading text-2xl font-bold text-ink">Se construiește</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Experiența introductivă într-un format clar și repetabil;",
                  "Founder Rounds complete și Founder Loop aplicat în conținut real;",
                  "Progresia spiralată pentru cele cinci perspective;",
                  "Pregătirea și instrumentele facilitatorilor;",
                  "Cercetarea, observarea și evaluarea rezultatelor;",
                  "Profilul Founder Skills și regulile pentru Skill XP;",
                  "Rolurile, siguranța și experiențele din platforma digitală;",
                  "Procesele prin care comunitatea poate contribui responsabil."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-xl text-sm text-brand-orange-dark flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>Lista este o fotografie a direcției actuale, nu o promisiune de lansare într-o anumită ordine sau la o anumită dată.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S2 — Cum poți contribui */}
      <section id="roles" className="w-full bg-surface-strong py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
              Contribuții diferite răspund la întrebări diferite.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { role: "Tânăr participant", icon: Users, title: "Trăiește experiența și spune-ne ce ai văzut", text: "Ne ajută să înțelegem unde deciziile sunt interesante, regulile devin neclare, explicațiile ajută și provocările merită reluate.", cta: "Vreau să aflu despre experiențe" },
              { role: "Părinte", icon: Users, title: "Ajută-ne să construim încredere și acces", text: "Poți oferi perspectiva familiei asupra relevanței, comunicării, siguranței și modului în care o experiență se continuă acasă.", cta: "Contribui ca părinte" },
              { role: "Profesor sau educator", icon: GraduationCap, title: "Pune metoda în contact cu realitatea", text: "Ne poți ajuta să calibrăm limbajul, nivelul de sprijin, ritmul și condițiile în care o experiență poate fi facilitată.", cta: "Contribui ca educator" },
              { role: "Facilitator sau organizator", icon: Target, title: "Transformă designul într-o experiență repetabilă", text: "Ne interesează ce informații, materiale și suport sunt necesare pentru ca o sesiune să nu depindă de creatorul jocului.", cta: "Contribui ca facilitator" },
              { role: "Antreprenor sau specialist", icon: Briefcase, title: "Adu complexitatea reală, păstrează claritatea", text: "Exemplele, contraexemplele și deciziile din companii reale ne pot ajuta să evităm modele simpliste.", cta: "Contribui cu experiență practică" },
              { role: "Cercetător", icon: BookOpen, title: "Ajută-ne să separăm intuiția de dovadă", text: "Ne interesează sprijinul pentru formularea ipotezelor, alegerea metodelor, interpretarea atentă și comunicarea limitelor.", cta: "Contribui cu cercetare" },
              { role: "Partener sau sponsor", icon: Handshake, title: "Creează acces și capacitate", text: "Poți susține experiențe pentru comunități, dezvoltarea materialelor, cercetarea, documentarea sau infrastructura programului.", cta: "Discută un parteneriat" }
            ].map((item, idx) => (
              <div key={idx} className="bg-canvas border border-line p-6 rounded-2xl shadow-sm flex flex-col h-full hover:border-brand-charcoal transition-colors">
                <div className="flex items-center gap-2 text-brand-charcoal/60 font-bold text-xs uppercase tracking-wider mb-4">
                  <item.icon className="w-4 h-4" /> {item.role}
                </div>
                <h3 className="font-heading font-bold text-lg text-ink mb-3">{item.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-6 flex-1">{item.text}</p>
                <Button variant="outline" className="w-full text-xs font-bold border-line-strong text-ink hover:bg-surface" render={<Link href="#contact-form" />}>
                  {item.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 & S5 — Principii / Ce nu cerem */}
      <section className="w-full bg-canvas py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <div>
              <h2 className="font-heading text-3xl font-bold text-ink tracking-tight mb-8">
                Ce înseamnă o contribuție bună: Concretă, responsabilă și conectată cu o nevoie reală.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Are un scop clar", text: "Știm ce întrebare încercăm să lămurim și ce decizie poate informa răspunsul." },
                  { title: "Respectă participantul", text: "Siguranța, consimțământul și datele strict necesare au prioritate față de viteza dezvoltării, mai ales când lucrăm cu minori." },
                  { title: "Poate fi verificată", text: "Feedbackul explică situația, nu se limitează la „mi-a plăcut” sau „nu mi-a plăcut”. Materialele și regulile au responsabilitate clară." },
                  { title: "Primește recunoaștere corectă", text: "Condițiile de folosire, atribuirea și eventualele drepturi trebuie stabilite înaintea unei contribuții substanțiale." },
                  { title: "Nu promite o recompensă nedefinită", text: "Regulile Prestige nu sunt încă definite. Participarea de acum nu primește automat puncte, statut sau drept de decizie garantat." }
                ].map((prin, idx) => (
                  <div key={idx} className="bg-surface p-5 border border-line rounded-xl">
                    <h3 className="font-bold text-ink mb-2">{prin.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{prin.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-charcoal text-white p-8 md:p-12 rounded-[var(--radius-panel)]">
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Comunitatea nu este o scurtătură pentru muncă fără responsabilitate.
              </h2>
              <ul className="space-y-5">
                {[
                  "Nu cerem idei nelimitate fără să explicăm problema.",
                  "Nu promitem că orice propunere va fi implementată.",
                  "Nu folosim participarea copiilor ca material de promovare fără acorduri.",
                  "Nu prezentăm o sesiune izolată drept validare generală.",
                  "Nu cerem contribuții substanțiale fără să clarificăm utilizarea și recunoașterea lor.",
                  "Nu confundăm numărul de reacții cu valoarea unei contribuții."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                    <span className="text-white/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wider text-sm mb-4">
                  <Compass className="w-5 h-5" /> De la feedback la influență
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  Viziunea EZPLAY este ca oamenii care contribuie consecvent și își asumă responsabilitate să poată avea, în timp, un rol mai mare în comunitate. Până la clarificarea mecanismelor de guvernanță, fiecare colaborare trebuie să aibă așteptări explicite, iar deciziile finale rămân la responsabilul actual al proiectului.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S6 — Formular */}
      <section id="contact-form" className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[800px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Spune-ne perspectiva ta și unde ai vrea să ajuți.
            </h2>
            <p className="text-lg text-ink-muted">
              Nu trebuie să ai o propunere completă. Un context clar și o întrebare bună sunt suficiente pentru început.
            </p>
          </div>
          
          <div className="bg-canvas p-8 rounded-2xl border border-line shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-brand-charcoal mb-4">
              <MessageSquare className="w-12 h-12" />
            </div>
            <h3 className="font-bold text-xl text-ink mb-2">Formular de contribuție în curând</h3>
            <p className="text-ink-muted text-center max-w-[400px]">
              Platforma se află în dezvoltare. Pentru a ne trimite gândurile și disponibilitatea ta, te rugăm să folosești pagina de contact.
            </p>
            <Button className="mt-8 bg-brand-charcoal text-white hover:bg-brand-charcoal/90" render={<Link href="/contact" />}>
              Către pagina de contact
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-brand-charcoal py-20 md:py-32 text-white">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-[800px]">
            Nu toate contribuțiile încep cu un răspuns. Unele încep cu întrebarea care lipsea.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 text-base h-14 px-10 border-0" render={<Link href="#contact-form" />}>
              Contribuie la EZPLAY
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-10 border-white/30 text-white hover:bg-white/10" render={<Link href="/research" />}>
              Explorează cercetarea
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
