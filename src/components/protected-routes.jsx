import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getStudentCount = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api-token-verify/",
        { params: { token } }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("user", response.data.user.username);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudentCount();
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
