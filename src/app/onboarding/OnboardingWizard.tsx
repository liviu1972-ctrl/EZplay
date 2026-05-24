"use client"

import * as React from "react"
import { useTransition, useState } from "react"
import { updateOnboardingProfile } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Lightbulb, Settings, DollarSign, Compass, Loader2 } from "lucide-react"

interface OnboardingWizardProps {
  dict: any
  initialProfile: any
}

export function OnboardingWizard({ dict, initialProfile }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // State to hold values across steps
  const [displayName, setDisplayName] = useState(initialProfile?.display_name || "")
  const [bio, setBio] = useState(initialProfile?.bio || "")
  const [skillInterests, setSkillInterests] = useState<string[]>(initialProfile?.skill_interests || [])

  const skills = [
    { id: "market", icon: <Target className="w-5 h-5" />, label: dict.landing.skills.market },
    { id: "product", icon: <Lightbulb className="w-5 h-5" />, label: dict.landing.skills.product },
    { id: "operations", icon: <Settings className="w-5 h-5" />, label: dict.landing.skills.operations },
    { id: "finance", icon: <DollarSign className="w-5 h-5" />, label: dict.landing.skills.finance },
    { id: "strategy", icon: <Compass className="w-5 h-5" />, label: dict.landing.skills.strategy },
  ]

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (step < 3) {
      setStep(step + 1)
      return
    }

    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateOnboardingProfile(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <Card className="w-full max-w-lg shadow-lg border-2">
      <form onSubmit={onSubmit}>
        {/* Hidden inputs to pass state when submitting on Step 3 */}
        {step === 3 && (
          <>
            <input type="hidden" name="display_name" value={displayName} />
            <input type="hidden" name="bio" value={bio} />
            {skillInterests.map((skill) => (
              <input key={skill} type="hidden" name={`skill_${skill}`} value="on" />
            ))}
          </>
        )}

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 1 && dict.auth.onboarding.welcomeTitle}
            {step === 2 && dict.auth.onboarding.step2Title}
            {step === 3 && dict.auth.onboarding.step3Title}
          </CardTitle>
          <CardDescription className="text-base">
            {step === 1 && dict.auth.onboarding.welcomeSubtitle}
            {step === 2 && dict.auth.onboarding.interestsSubtitle}
            {step === 3 && dict.auth.onboarding.successSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? "bg-brand-orange text-white" : "bg-muted text-muted-foreground"}`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`h-1 w-full mt-[-20px] ml-[50%] z-[-1] ${step > s ? "bg-brand-orange" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <Label htmlFor="display_name">{dict.auth.onboarding.displayName}</Label>
                <Input
                  id="display_name"
                  name="display_name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{dict.auth.onboarding.bio}</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Ex: Pasionat de marketing..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="font-semibold">{dict.auth.onboarding.interestsTitle}</h3>
              <div className="grid gap-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <Checkbox
                      id={`skill_${skill.id}`}
                      name={`skill_${skill.id}`}
                      checked={skillInterests.includes(skill.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSkillInterests([...skillInterests, skill.id])
                        } else {
                          setSkillInterests(skillInterests.filter(s => s !== skill.id))
                        }
                      }}
                    />
                    <Label htmlFor={`skill_${skill.id}`} className="flex items-center gap-3 w-full cursor-pointer">
                      <span className="p-1 rounded-md bg-background shadow-sm border">{skill.icon}</span>
                      <span className="font-medium">{skill.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 py-8">
              <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold">{dict.auth.onboarding.successTitle}</h3>
              <p className="text-muted-foreground">Ești gata să îți începi aventura în EZPlay. Apasă pe Finalizare pentru a merge la panoul de control.</p>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6 bg-muted/20">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={isPending}
            >
              {dict.auth.onboarding.back}
            </Button>
          ) : (
            <div /> // Placeholder to keep the 'Next' button on the right
          )}
          
          <Button type="submit" disabled={isPending} className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step < 3 ? dict.auth.onboarding.next : dict.auth.onboarding.finish}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
