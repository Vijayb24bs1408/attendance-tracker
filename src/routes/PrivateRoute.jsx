import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  const demoMode = localStorage.getItem("demoMode") === "true";

  if (!currentUser && !demoMode) {
    return <Navigate to="/" replace />;
  }

  return children;
}
