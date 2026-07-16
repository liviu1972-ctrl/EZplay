"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  UserPlus, 
  Wrench, 
  Handshake, 
  Mic, 
  MessageSquare,
  Mail,
  ShieldAlert,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // O formă simplă fără endpoint pentru v1
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24">
        <div className="container relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            Contact
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-6">
            Spune-ne ce vrei să faci posibil.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed">
            Vrei să aduci o experiență EZPLAY într-o comunitate, să afli cum poate participa un tânăr, să contribui la dezvoltare sau să discutăm un parteneriat? Alege direcția potrivită și oferă-ne contextul de care avem nevoie.
          </p>
        </div>
      </section>

      {/* S1 — Alege subiectul (Cards) */}
      <section className="w-full bg-canvas py-16 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-ink tracking-tight">Cu ce începem?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Organizează o experiență", text: "Pentru școli, cluburi, ONG-uri și comunități care vor să găzduiască o experiență introductivă sau să exploreze un parcurs.", cta: "Formular pentru organizații", hash: "#formular", color: "text-brand-orange" },
              { icon: UserPlus, title: "Participare pentru un tânăr", text: "Pentru tineri și părinți care vor să afle când și unde pot participa la o experiență EZPLAY.", cta: "Anunță-mă despre oportunități", hash: "#formular", color: "text-brand-teal" },
              { icon: Wrench, title: "Contribuie la dezvoltare", text: "Pentru educatori, facilitatori, antreprenori, cercetători și alți oameni care pot ajuta proiectul să evolueze.", cta: "Propune o contribuție", href: "/development", color: "text-brand-charcoal" },
              { icon: Handshake, title: "Parteneriat sau sponsorizare", text: "Pentru organizații care pot crea acces, capacitate, expertiză sau resurse pentru dezvoltarea responsabilă a programului.", cta: "Discută un parteneriat", hash: "#formular", color: "text-brand-teal" },
              { icon: Mic, title: "Presă și comunicare", text: "Pentru interviuri, prezentări, informații despre proiect și solicitări de materiale aprobate pentru publicare.", cta: "Trimite o solicitare media", hash: "#formular", color: "text-brand-orange" },
              { icon: MessageSquare, title: "Altă întrebare", text: "Dacă solicitarea ta nu se potrivește categoriilor de mai sus, trimite-ne un mesaj general.", cta: "Scrie-ne", hash: "#formular", color: "text-ink-muted" }
            ].map((card, idx) => (
              <div key={idx} className="bg-surface border border-line p-6 rounded-2xl flex flex-col hover:shadow-sm transition-shadow">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-brand-charcoal/5 ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink mb-2">{card.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-6 flex-1">{card.text}</p>
                {card.href ? (
                  <Button variant="ghost" className="w-full justify-between px-0 text-brand-teal hover:bg-transparent hover:text-brand-teal-dark font-bold" render={<Link href={card.href} />}>
                    {card.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full justify-between px-0 text-brand-charcoal hover:bg-transparent hover:text-ink font-bold" onClick={() => {
                    document.getElementById('formular')?.scrollIntoView({ behavior: 'smooth' });
                    const select = document.getElementById('subject') as HTMLSelectElement;
                    if (select) {
                      const option = Array.from(select.options).find(o => o.text.toLowerCase().includes(card.title.toLowerCase().split(' ')[0]));
                      if (option) select.value = option.value;
                    }
                  }}>
                    {card.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S2 & S3 & S4 — Formular & Contact direct & Minori */}
      <section id="formular" className="w-full bg-surface-strong py-20 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Formular */}
            <div className="lg:col-span-7 bg-canvas p-6 md:p-10 rounded-[var(--radius-panel)] border border-line shadow-sm">
              {!isSuccess ? (
                <>
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-2">Începe conversația.</h2>
                    <p className="text-ink-muted">Câteva detalii ne ajută să înțelegem solicitarea și să o tratăm în contextul potrivit.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-ink">Nume *</label>
                        <input id="name" required placeholder="Cum te numești?" className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-ink">E-mail *</label>
                        <input id="email" type="email" required placeholder="nume@exemplu.ro" className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-ink">Telefon — opțional</label>
                        <input id="phone" type="tel" placeholder="Număr de telefon" className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="org" className="text-sm font-bold text-ink">Organizație — opțional</label>
                        <input id="org" placeholder="Școală, club, ONG sau companie" className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-ink">Subiect *</label>
                      <select id="subject" required className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors">
                        <option value="">Alege subiectul mesajului...</option>
                        <option value="organizare">Organizarea unei experiențe</option>
                        <option value="participare">Participarea unui tânăr</option>
                        <option value="contributie">Contribuție la dezvoltare</option>
                        <option value="parteneriat">Parteneriat sau sponsorizare</option>
                        <option value="presa">Presă și comunicare</option>
                        <option value="altul">Altă întrebare</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <label htmlFor="message" className="text-sm font-bold text-ink">Mesaj *</label>
                        <span className="text-xs text-brand-orange">Nu include date sensibile despre minori.</span>
                      </div>
                      <textarea id="message" required rows={5} placeholder="Spune-ne ce ai vrea să discutăm și orice context care ne poate ajuta." className="w-full p-3 rounded-lg border border-line bg-surface focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors resize-y" />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-line">
                      <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 rounded border-line text-brand-teal focus:ring-brand-teal" />
                      <label htmlFor="consent" className="text-sm text-ink-muted leading-relaxed">
                        Sunt de acord ca EZPLAY să folosească datele trimise pentru a răspunde solicitării mele, conform politicii de confidențialitate.
                      </label>
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-lg bg-brand-charcoal text-white hover:bg-brand-charcoal/90 h-14 text-base">
                      {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 h-full">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-4">Mesajul a ajuns la noi.</h2>
                  <p className="text-ink-muted mb-8 max-w-[400px]">
                    Îți mulțumim pentru context. Vom folosi datele trimise pentru a reveni asupra solicitării tale.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)} className="border-line-strong">
                    Trimite alt mesaj
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              <div className="bg-canvas p-8 rounded-2xl border border-line shadow-sm">
                <h3 className="font-heading text-xl font-bold text-ink mb-4">Preferi e-mailul?</h3>
                <p className="text-ink-muted text-sm mb-6">Ne poți scrie direct la:</p>
                <a href="mailto:contact@ezplay.org" className="inline-flex items-center gap-2 text-brand-teal font-bold hover:underline mb-6 text-lg">
                  <Mail className="w-5 h-5" /> contact@ezplay.org
                </a>
                <div className="p-4 bg-brand-charcoal/5 border border-brand-charcoal/10 rounded-lg text-xs text-ink-muted leading-relaxed flex gap-3">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  Nu trimite prin e-mail parole, documente de identitate, date medicale sau alte informații sensibile despre participanți.
                </div>
              </div>

              <div className="bg-brand-orange/5 p-8 rounded-2xl border border-brand-orange/20">
                <h3 className="font-heading text-xl font-bold text-brand-orange-dark mb-4">
                  Dacă ești minor, nu trebuie să trimiți singur date de care nu este nevoie.
                </h3>
                <p className="text-brand-orange-dark/80 text-sm leading-relaxed mb-4">
                  Pentru întrebări despre înscriere, participare, fotografii, profil sau date personale, implică un părinte, tutore sau adultul responsabil din organizația ta. Formularul public nu trebuie să ceară data nașterii, adresa de acasă, școala exactă sau alte informații sensibile.
                </p>
                <p className="text-[10px] text-brand-orange-dark/50 uppercase tracking-wider font-bold">
                  Politica de confidențialitate și termenii sunt în dezvoltare.
                </p>
              </div>

              <div className="bg-canvas p-8 rounded-2xl border border-line shadow-sm">
                <h3 className="font-heading text-lg font-bold text-ink mb-4">Poate răspunsul este deja aici:</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Descoperă programul", href: "/program" },
                    { label: "Cum învățăm", href: "/how-we-learn" },
                    { label: "Pentru părinți", href: "/for/parents" },
                    { label: "Pentru organizații", href: "/for/organizations" },
                    { label: "Cercetare", href: "/research" },
                    { label: "Contribuie la dezvoltare", href: "/development" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-brand-teal hover:underline text-sm font-medium flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
