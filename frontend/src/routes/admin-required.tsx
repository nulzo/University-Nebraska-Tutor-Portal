import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRequired({ view }: { view: ReactNode }) {
  const isAdmin = true;
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }
  return <>{view}</>;
}
