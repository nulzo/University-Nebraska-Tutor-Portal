import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function LoginRequired({ view }: { view: ReactNode }) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{view}</>;
}
