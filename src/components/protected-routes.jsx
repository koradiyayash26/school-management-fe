import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Spinner from "./spinner/spinner";
import apiClient from "@/lib/api-client";

function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const ApiTokenVerify = async () => {
    try {
      const jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
      if (!jwt_token || !jwt_token.access) {
        throw new Error("JWT token not found");
      }

      const response = await apiClient.get(
        "/api-token-verify/",
        {
          headers: {
            Authorization: `Bearer ${jwt_token.access}`,
          },
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("user", response.data.user.username);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error verifying token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ApiTokenVerify();
  }, [location]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
