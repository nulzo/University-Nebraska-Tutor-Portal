import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function LogoutRequired({ view }: { view: ReactNode }) {
  const loggedIn = true;
  if (loggedIn) {
    return <Navigate to="/home" />;
  }
  return <>{view}</>;
}
