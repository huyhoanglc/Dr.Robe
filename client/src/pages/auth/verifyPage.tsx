import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "@/services/auth.service";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import doggieRun from "@/assets/lottie/cute-doggie-run.json";
import { useTranslation } from "react-i18next";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function verify() {
      if (!token) return;
      const res = await AuthService.verifyEmail(token);
      if (res.success) {
        navigate("/", { replace: true });
      } else {
        navigate("/auth/login", { replace: true });
      }
    }
    verify();

    const timer = setTimeout(() => {
      lottieRef.current?.stop();
    }, 3000);

    return () => clearTimeout(timer);
  }, [token, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <Lottie
        lottieRef={lottieRef}
        animationData={doggieRun}
        loop
        className="h-48 w-48"
      />

      <p className="text-lg font-semibold text-gray-600">
        {t("verify-email-loading")}
      </p>
    </div>
  );
}
