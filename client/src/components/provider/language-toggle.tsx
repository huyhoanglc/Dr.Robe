import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import usFlag from "@/assets/images/flags/us.png"
import vnFlag from "@/assets/images/flags/vn.png"

export function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "vi" : "en"
    i18n.changeLanguage(newLang)
    localStorage.setItem("lang", newLang)
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={toggleLanguage}
      className="rounded-full px-4 py-2 shadow-md flex items-center gap-2"
    >
      <img
        src={i18n.language === "en" ? usFlag : vnFlag}
        alt="flag"
        className="w-6 h-6 rounded-full"
      />
      {i18n.language === "en" ? "EN" : "VI"}
    </Button>
  )
}
