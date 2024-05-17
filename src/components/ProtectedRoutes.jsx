import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getStudentCount = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api-token-verify/",
        { params: { token } }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
