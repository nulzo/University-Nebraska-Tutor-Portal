import { useIsAuthenticated } from "@azure/msal-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function LoginRequired({ view }: { view: ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  console.log("user is", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{view}</>;
}
