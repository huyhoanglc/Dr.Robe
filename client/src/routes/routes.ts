import HomePage from "@/pages/homePage";
import LoginPage from "@/pages/auth/loginPage";
import DashboardPage from "@/pages/dashboardPage";

// Layouts
import DefaultLayout from "@/components/layouts/default-layout";
import AuthLayout from "@/components/layouts/auth-layout";
import RegisterPage from "@/pages/auth/registerPage";
import VerifyEmailPage from "@/pages/auth/verifyPage";
import NotFoundPage from "@/pages/notFoundPage";
import NoLayout from "@/components/layouts/no-layout";

export const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/auth/login", component: LoginPage, layout: AuthLayout },
  { path: "/auth/register", component: RegisterPage, layout: AuthLayout },
  { path: "/verify/:token", component: VerifyEmailPage, layout: NoLayout },
  { path: "*", component: NotFoundPage, layout: NoLayout },
];

export const privateRoutes = [
  { path: "/dashboard", component: DashboardPage, layout: DefaultLayout },
];
