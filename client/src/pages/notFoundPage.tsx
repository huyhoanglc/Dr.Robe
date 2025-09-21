import Lottie from "lottie-react"
import cat404 from "@/assets/lottie/404-error-with-cat.json"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Home } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground gap-4 text-center px-4">
      <Lottie animationData={cat404} loop className="h-64 w-64" />

      <h1 className="text-3xl font-bold">{t("404-not-found")}</h1>
      <p className="text-muted-foreground">{t("404-not-found-oops")}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2 text-foreground hover:bg-muted/80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          {t("404-not-found-back")}
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-white hover:opacity-90 transition"
        >
          <Home className="w-5 h-5" />
          {t("404-not-found-home")}
        </button>
      </div>
    </div>
  )
}
