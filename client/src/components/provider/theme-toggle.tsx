import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-12 h-12 rounded-full border shadow-lg bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition"
    >
      <Sun className="h-6 w-6 dark:hidden" />
      <Moon className="h-6 w-6 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
