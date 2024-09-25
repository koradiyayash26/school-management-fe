import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "@/lib/api-client";

const UserPermissionsContext = createContext();

export const UserPermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
        if (!jwt_token || !jwt_token.access) {
          throw new Error("JWT token not found");
        }

        const response = await apiClient.get("/api-token-verify/", {
          headers: {
            Authorization: `Bearer ${jwt_token.access}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setPermissions(response.data.groups);
          setIsSuperuser(response.data.user.is_superuser);
          localStorage.setItem("user", response.data.user.username);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error verifying token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <UserPermissionsContext.Provider
      value={{
        permissions,
        setPermissions,
        isSuperuser,
        setIsSuperuser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
      }}
    >
      {children}
    </UserPermissionsContext.Provider>
  );
};

export const useUserPermissions = () => useContext(UserPermissionsContext);
