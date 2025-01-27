import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) return <LoadingSpinner />;
  if (user && role === "admin") return children;
  return <Navigate to="/login" />;
}

export default AdminRoute;
