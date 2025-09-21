import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AuthService } from "@/services/auth.service"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const [fullNameError, setNameError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("")
  const [err, setErr] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()
  const { t } = useTranslation()

  const validate = () => {
    let valid = true
    setNameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")

    if (!name) {
      setNameError("full-name-required")
      valid = false
    }
    if (!email) {
      setEmailError("email-is-required")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("email-invalid")
      valid = false
    }
    if (!password) {
      setPasswordError("password-required")
      valid = false
    } else if (password.length < 6) {
      setPasswordError("password-short")
      valid = false
    }
    if (!confirmPassword) {
      setConfirmPasswordError("confirm-password-required")
      valid = false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("passwords-do-not-match")
      valid = false
    }

    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErr(null)
    setStatus("idle")

    try {
      const res = await AuthService.register({ name, email, password })
      if (res.success) {
        setStatus("success")
        navigate("/auth/login")
      } else {
        setErr(res.message)
        setStatus("error")
      }
    } catch (error: any) {
      setErr(error.message || "register-failed")
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border bg-card text-card-foreground">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">{t("create-account")}</CardTitle>
        <CardDescription>{t("fill-details-to-get-started")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="name">{t("full-name")}</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {fullNameError && <p className="text-red-500 text-sm">{t(fullNameError)}</p>}
          </div>

          {/* Email */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-sm">{t(emailError)}</p>}
          </div>

          {/* Password */}
          <div className="grid gap-2 text-left relative">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {passwordError && <p className="text-red-500 text-sm">{t(passwordError)}</p>}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2 text-left relative">
            <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{t(confirmPasswordError)}</p>
            )}
          </div>

          {/* Error */}
          {err && <p className="text-red-500 text-sm">{t(err)}</p>}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:opacity-90"
            disabled={loading}
          >
            {loading ? t("loading") : t("sign-up")}
          </Button>
        </form>
      </CardContent>

    <CardFooter className="flex justify-center mb-4">
  <p className="text-sm text-muted-foreground">
    {t("already-have-account")}{" "}
    <button
      type="button"
      onClick={() => navigate("/auth/login")}
      className="text-primary hover:underline"
    >
      {t("sign-in")}
    </button>
  </p>
</CardFooter>
    </Card>
  )
}
