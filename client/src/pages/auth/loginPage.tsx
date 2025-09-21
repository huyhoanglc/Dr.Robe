import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Hand } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // 👈 để điều hướng

import Lottie from "lottie-react";
import successAnim from "@/assets/lottie/success.json";
import errorAnim from "@/assets/lottie/error.json";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("email-is-required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("email-invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("password-required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("password-short");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await AuthService.login({ email, password });

      if (res.success) {
        console.log("Login success:", res);
        setStatus("success");

        setTimeout(() => navigate("/"), 1500);
      } else {
        console.error("Login failed:", res.message);
        setStatus("error");
        setErr(res.message);

        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch (error: any) {
      console.error(error.message);
      setStatus("error");
      setErr(error.message);

      setTimeout(() => setStatus("idle"), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "idle" && (
        <Card className="w-full max-w-sm shadow-lg border bg-card text-card-foreground">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              {t("welcome-back")} <Hand className="h-6 w-6 text-primary" />
            </CardTitle>
            <CardDescription>{t("enter-credentials")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email */}
              <div className="grid gap-2 text-left">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{t(emailError)}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2 text-left">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("password")}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{t(passwordError)}</p>
                )}
                <a
                  onClick={() => navigate("/auth/forgot-password")}
                  className="ml-auto text-sm text-primary hover:underline"
                >
                  {t("forgot-password")}
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("logging-in") : t("login")}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="h-5 w-5" />
              <span>{t("continue-with-google")}</span>
            </Button>

            <p className="text-sm text-muted-foreground">
              {t("no-account")}{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/register")}
                className="text-primary hover:underline"
              >
                {t("sign-up")}
              </button>
            </p>
          </CardFooter>
        </Card>
      )}

      {status === "success" && (
        <div className="flex items-center justify-center h-[70vh]">
          <Lottie
            animationData={successAnim}
            loop={false}
            className="h-52 w-52"
          />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Lottie
            animationData={errorAnim}
            loop={false}
            className="h-52 w-52"
          />
          {err && <p className="mt-4 text-sm text-red-500">{t(err)}</p>}
        </div>
      )}
    </>
  );
}
