import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"

import { HeroSection } from "@/components/landing/HeroSection"
import { FounderLoopSection } from "@/components/landing/FounderLoopSection"
import { SkillsSection } from "@/components/landing/SkillsSection"
import { MotherboardSection } from "@/components/landing/MotherboardSection"
import { CtaSection } from "@/components/landing/CtaSection"

export default async function Home() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="flex flex-col w-full">
      <HeroSection dict={dict} />
      <FounderLoopSection dict={dict} />
      <SkillsSection dict={dict} />
      <MotherboardSection dict={dict} />
      <CtaSection dict={dict} />
    </div>
  )
}
