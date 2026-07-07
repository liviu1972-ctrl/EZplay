import Link from "next/link"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n/config"
import { RegisterForm } from "./RegisterForm"

export default async function RegisterPage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get(LANGUAGE_COOKIE)?.value as Locale) || "ro"
  const dict = await getDictionary(lang)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.auth.register.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dict.auth.register.subtitle}
          </p>
        </div>
        <RegisterForm dict={dict} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          {dict.auth.register.haveAccount}{" "}
          <Link
            href="/login"
            className="hover:text-brand-orange underline underline-offset-4"
          >
            {dict.auth.register.loginLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
