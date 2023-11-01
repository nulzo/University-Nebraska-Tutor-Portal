import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRequired({ view }: { view: ReactNode }) {
  const isAdmin = false;
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }
  return <>{view}</>;
}
