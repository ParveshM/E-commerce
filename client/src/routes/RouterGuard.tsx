import { useAppSelector } from "@/redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ requiredRole }: { requiredRole: string }) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);

  // Check if the user is authenticated and has the required role
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const user = useAppSelector((state) => state.user);
  return !user.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
