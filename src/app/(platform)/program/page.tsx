import { Metadata } from "next"
import { ProgramHero } from "@/components/program/ProgramHero"
import { ProgramTarget } from "@/components/program/ProgramTarget"
import { ProgramIntroExperience } from "@/components/program/ProgramIntroExperience"
import { FounderRoundsInfo } from "@/components/program/FounderRoundsInfo"
import { ProgramPerspectives } from "@/components/program/ProgramPerspectives"
import { ProgramProgression } from "@/components/program/ProgramProgression"
import { ProgramPathFreedom } from "@/components/program/ProgramPathFreedom"
import { ProgramTeamDynamics } from "@/components/program/ProgramTeamDynamics"
import { ProgramMeasurement } from "@/components/program/ProgramMeasurement"
import { ProgramAntiGoals } from "@/components/program/ProgramAntiGoals"
import { ProgramCta } from "@/components/program/ProgramCta"

export const metadata: Metadata = {
  title: "Programul EZPLAY pentru tineri — Educație antreprenorială prin experiență",
  description: "Descoperă programul EZPLAY pentru tineri: experiențe, Founder Rounds și trasee de progres construite în jurul deciziilor antreprenoriale.",
}

export default function ProgramPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      <ProgramHero />
      <ProgramTarget />
      <ProgramIntroExperience />
      <FounderRoundsInfo />
      <ProgramPerspectives />
      <ProgramProgression />
      <ProgramPathFreedom />
      <ProgramTeamDynamics />
      <ProgramMeasurement />
      <ProgramAntiGoals />
      <ProgramCta />
    </div>
  )
}
