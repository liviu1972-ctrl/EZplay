import { PageHero } from "@/components/home/PageHero"
import { SectionIntro } from "@/components/home/SectionIntro"
import { StepSequence } from "@/components/home/StepSequence"
import { S4ProgramInfo } from "@/components/home/S4ProgramInfo"
import { S5LearningOutcomes } from "@/components/home/S5LearningOutcomes"
import { S6PerspectiveSystem } from "@/components/home/S6PerspectiveSystem"
import { S7BeyondGame } from "@/components/home/S7BeyondGame"
import { S8IntroExperience } from "@/components/home/S8IntroExperience"
import { S9Audiences } from "@/components/home/S9Audiences"
import { S10Research } from "@/components/home/S10Research"
import { S11Tools } from "@/components/home/S11Tools"
import { S12Development } from "@/components/home/S12Development"
import { S13FinalCta } from "@/components/home/S13FinalCta"

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-canvas">
      <PageHero />
      <SectionIntro />
      <StepSequence />
      <S4ProgramInfo />
      <S5LearningOutcomes />
      <S6PerspectiveSystem />
      <S7BeyondGame />
      <S8IntroExperience />
      <S9Audiences />
      <S10Research />
      <S11Tools />
      <S12Development />
      <S13FinalCta />
    </div>
  )
}
