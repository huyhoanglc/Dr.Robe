import type { PropsWithChildren } from "react"
import Lottie from "lottie-react"
import dogAvatar from "@/assets/lottie/dog-avatar.json"
import panelLogin from "@/assets/images/panel_login.png"
import { ThemeToggle } from "@/components/provider/theme-toggle"
import { LanguageToggle } from "@/components/provider/language-toggle" 

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-dvh w-full grid-cols-1 md:grid-cols-10 overflow-hidden bg-background text-foreground transition-colors duration-300">
  {/* Left panel */}
  <div
    className="relative col-span-6 hidden md:block bg-cover bg-center"
    style={{ backgroundImage: `url(${panelLogin})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-blue-100/40 to-green-300/60 dark:from-white/10 dark:via-white/5 dark:to-white/10" />
  </div>

  {/* Right panel */}
  <div className="relative col-span-4 flex items-center justify-center bg-card text-card-foreground">
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <LanguageToggle />
      <ThemeToggle />
    </div>

    <div className="w-full max-w-md p-4 md:p-6">
      <div role="img" aria-label="Dog avatar animation" className="flex justify-center mb-4">
        <Lottie animationData={dogAvatar} loop className="h-32 w-32" /> 
      </div>

      {children}
    </div>
  </div>
</div>

  )
}
