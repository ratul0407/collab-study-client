import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (user && user?.email) return children;
  return <Navigate to="/login" />;
}

export default PrivateRoute;
