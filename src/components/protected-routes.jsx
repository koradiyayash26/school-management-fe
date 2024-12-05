import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./spinner/spinner";
import { useUserPermissions } from "@/contextAPI";
import NotFound from "./not-found";
import Forbidden from "./403forbidden";

function ProtectedRoutes({ requiredPermission }) {
  const { permissions, isSuperuser, isAuthenticated, isLoading } =
    useUserPermissions();

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Superusers have access to all routes
  if (isSuperuser) {
    return <Outlet />;
  }

  // For non-superusers, check the required permission
  const hasRequiredPermission = requiredPermission
    ? permissions.includes(requiredPermission)
    : true;

  return hasRequiredPermission ? <Outlet /> : <Forbidden />;
}

export default ProtectedRoutes;
