"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  MonitorSmartphone, 
  Lock, 
  LayoutDashboard, 
  Map, 
  Users, 
  Layers, 
  AlertCircle,
  ShieldCheck,
  Globe,
  ArrowRight
} from "lucide-react"

export default function PlatformPage() {
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAuthError("")
    // Simulăm o eroare generică pentru moment (în lipsa Supabase Auth activ)
    setTimeout(() => {
      setIsSubmitting(false)
      setAuthError("Datele de autentificare nu sunt corecte. Verifică adresa și parola sau solicită un link nou.")
    }, 1000)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24">
        <div className="container relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto px-4 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal mb-8">
            <Globe className="w-4 h-4" />
            Platforma digitală ezplay.org
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-6">
            Un loc pentru a continua ceea ce începe prin experiență.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10">
            Platforma EZPLAY va conecta jocurile și experiențele fizice cu resursele de învățare, progresul participantului și contribuția la comunitate. Este în dezvoltare, iar funcțiile vor deveni publice numai atunci când au un rol clar și pot fi folosite responsabil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-8" onClick={() => document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' })}>
              Intră în cont
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-line-strong text-ink hover:bg-surface-soft" render={<Link href="/contact" />}>
              Anunță-mă când se deschide accesul
            </Button>
          </div>
          <p className="text-sm text-ink-muted mt-6 max-w-[500px]">
            Autentificarea este disponibilă pentru conturile care au deja acces. Crearea unui cont nou poate fi limitată în perioada de dezvoltare.
          </p>
        </div>
      </section>

      {/* S2 & S9 — Ce găsești acum & Autentificare */}
      <section className="w-full bg-canvas py-16 md:py-24 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Login Box */}
            <div id="login" className="lg:col-span-5 bg-surface border border-line rounded-[var(--radius-panel)] p-8 md:p-10 shadow-sm scroll-mt-24">
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-ink mb-2">Bine ai revenit.</h2>
                <p className="text-ink-muted">Intră în cont pentru a accesa funcțiile disponibile rolului tău.</p>
              </div>

              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-lg text-xs text-brand-orange-dark mb-8 flex gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Accesul este încă limitat. Dacă ai primit o invitație, autentifică-te cu adresa folosită la înscriere. Altfel, ne poți lăsa datele pentru a afla când se deschide un flux potrivit.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-ink">E-mail</label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border border-line bg-canvas focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-bold text-ink">Parolă</label>
                  <input 
                    id="password" 
                    type="password" 
                    required 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-line bg-canvas focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors" 
                  />
                  <div className="flex justify-end mt-1">
                    <Link href="#" className="text-xs font-bold text-brand-teal hover:underline">Ai uitat parola?</Link>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
                    {authError}
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-lg">
                  {isSubmitting ? "Se autentifică..." : "Intră în cont"}
                </Button>

                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-line"></div></div>
                  <div className="relative bg-surface px-4 text-xs font-bold text-ink-muted uppercase">sau</div>
                </div>

                <Button type="button" variant="outline" className="w-full h-12 border-line-strong text-ink hover:bg-canvas rounded-lg">
                  Primește un link de acces
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-line text-center">
                <p className="text-sm text-ink-muted mb-2">Nu ai acces încă?</p>
                <Link href="/contact" className="text-sm font-bold text-brand-teal hover:underline">
                  Află când se deschide un flux potrivit pentru tine
                </Link>
              </div>
            </div>

            {/* Disponibilitate */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="mb-4">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
                  Disponibilitatea reală,<br /> fără funcții desenate în avans.
                </h2>
                <p className="text-lg text-ink-muted">
                  Nu afișăm funcții doar pentru că există un ecran în prototip.
                </p>
              </div>

              <div className="space-y-4">
                {/* Disponibil */}
                <div className="bg-surface border border-line p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 mt-1">
                    Disponibil (autorizați)
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg mb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-brand-teal" /> Autentificare</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">
                      Intră în contul tău folosind metoda de acces disponibilă.
                    </p>
                  </div>
                </div>

                {/* În testare */}
                <div className="bg-surface border border-brand-teal/20 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start shadow-sm">
                  <div className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 mt-1">
                    În testare
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg mb-2 flex items-center gap-2"><MonitorSmartphone className="w-5 h-5 text-brand-teal" /> Deckbuilder digital</h3>
                    <p className="text-ink-muted text-sm leading-relaxed mb-4">
                      Versiunea funcțională a jocului de bază este folosită pentru testarea mecanicii și a rolului ei în experiențele EZPLAY.
                    </p>
                    <Link href="/ezplay" className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal hover:underline">
                      Deschide Deckbuilder-ul <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* În dezvoltare */}
                <div className="bg-surface border border-line border-dashed p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start opacity-70 hover:opacity-100 transition-opacity">
                  <div className="bg-line-strong text-ink-muted text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 mt-1">
                    În dezvoltare
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg mb-2 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-ink-muted" /> Profil și parcurs</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">
                      Profilul va conecta experiențele parcurse cu cele cinci perspective EZPLAY și cu următorii pași relevanți.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* S1 & S3 — De ce există & Roluri */}
      <section className="w-full bg-surface-strong py-20 md:py-32 border-t border-line">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
              Experiența nu trebuie să se oprească atunci când masa de joc se strânge.
            </h2>
            <div className="space-y-4 text-lg text-ink-muted max-w-[800px] leading-relaxed">
              <p>O sesiune poate deschide întrebări, dar dezvoltarea are nevoie de continuitate. Platforma este infrastructura prin care un participant poate reveni la experiențe, poate găsi explicații relevante, își poate vedea parcursul și poate primi următoarea provocare.</p>
            </div>
          </div>
          
          <div className="mt-16 pt-16 border-t border-line">
            <h3 className="font-heading text-2xl font-bold text-ink mb-10">O singură platformă, roluri diferite (în direcție)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Participant", text: "Acces la experiențe, resurse, reflecții, provocări și imaginea progresului." },
                { title: "Părinte", text: "Informații despre program, consimțământ și date relevante în limitele stabilite." },
                { title: "Facilitator", text: "Ghiduri, materiale, întrebări de debrief și instrumente pentru organizarea sesiunilor." },
                { title: "Organizație", text: "Înscrieri, programare, roluri și informații despre activitățile găzduite." },
                { title: "Contributor", text: "Procese pentru testare, propuneri, documentare și recunoașterea contribuțiilor." }
              ].map((role, idx) => (
                <div key={idx} className="bg-canvas border border-line p-6 rounded-2xl flex flex-col">
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">Pentru {role.title}</div>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1">{role.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S4 & S5 & S6 — Skills, Prestige, Ce nu introducem */}
      <section className="w-full bg-brand-charcoal text-white py-20 md:py-32">
        <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            
            {/* Founder Skills */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-8 h-8 text-brand-teal" />
                <h2 className="font-heading text-3xl font-bold tracking-tight">Founder Skills</h2>
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-6">Un profil care arată unde ai exersat și ce poți aplica.</h3>
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p>Progresul educațional va fi organizat în jurul celor cinci perspective EZPLAY: Strategy, Product, Market, Operations, Finance.</p>
                <p>Skill XP este numele de lucru pentru progresul din fiecare perspectivă. El nu trebuie acordat doar pentru prezență sau timp petrecut. Până când pragurile sunt definite, un profil nou va afișa perspectivele ca <strong>neîncepute</strong>, fără valori numerice inventate și fără comparație publică.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-brand-teal">
                <div className="font-bold mb-2">Parcursul tău începe cu prima experiență.</div>
                <div className="text-sm text-white/60">După ce participi la activități eligibile, profilul te va ajuta să vezi ce ai exersat și ce poți explora.</div>
              </div>
            </div>

            {/* Prestige */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-brand-orange" />
                <h2 className="font-heading text-3xl font-bold tracking-tight">Contribuție și Prestige</h2>
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-6">Învățarea și contribuția sunt două lucruri diferite.</h3>
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p>Dacă Founder Skills descriu progresul educațional, Prestige va descrie contribuția demonstrată, încrederea și responsabilitatea câștigate în comunitatea EZPLAY.</p>
                <p>Prestige nu este Equity, nu este o monedă financiară și nu poate fi cumpărat. Platforma nu va afișa puncte înainte de validarea regulilor de acordare.</p>
              </div>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" render={<Link href="/development" />}>
                Vezi cum poți contribui
              </Button>
            </div>

          </div>

          <div className="pt-16 border-t border-white/10">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-8 text-center">Ce nu introducem încă (Mai întâi rolul, apoi funcția)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Monede sau recompense fără o definiție clară;",
                "Clasamente publice pentru copii;",
                "Mesagerie directă între necunoscuți și minori;",
                "Valori Skill XP fără criterii observabile;",
                "Badge-uri acordate doar pentru activitate;",
                "Comunitate fără moderare și responsabilitate;",
                "Acces la date necerut de rolul utilizatorului;",
                "Promisiunea că programul este complet online."
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl text-sm text-white/70 flex items-start gap-2 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-surface py-20 md:py-32">
        <div className="container max-w-[1000px] mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            Platforma va crește odată cu programul,<br className="hidden md:inline" /> nu înaintea lui.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed mb-12 max-w-[700px]">
            Dacă vrei să înțelegi ce experiență susține tehnologia, începe cu programul și metoda EZPLAY.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 text-base h-14 px-10" render={<Link href="/program" />}>
              Descoperă programul
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base h-14 px-10 border-line-strong text-ink hover:bg-surface" onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
              Înapoi sus la Autentificare
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
