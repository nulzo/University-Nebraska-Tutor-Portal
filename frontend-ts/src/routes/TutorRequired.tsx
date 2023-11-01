import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function TutorRequired({ view }: { view: ReactNode }) {
  const isTutor = true;
  if (!isTutor) {
    return <Navigate to="/home" />;
  }
  return <>{view}</>;
}
