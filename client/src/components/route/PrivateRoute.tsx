import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const account = useSelector((s: RootState) => s.account.value);
  return account ? children : <Navigate to="/auth/login" replace />;
}
