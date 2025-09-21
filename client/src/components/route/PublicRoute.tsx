import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import type { JSX } from "react";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const account = useSelector((s: RootState) => s.account.value);
  return account ? <Navigate to="/dashboard" replace /> : children;
}
