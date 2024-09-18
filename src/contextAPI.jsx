import React, { createContext, useState, useContext } from 'react';

const UserPermissionsContext = createContext();

export const UserPermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);

  return (
    <UserPermissionsContext.Provider value={{ permissions, setPermissions,isSuperuser,setIsSuperuser }}>
      {children}
    </UserPermissionsContext.Provider>
  );
};

export const useUserPermissions = () => useContext(UserPermissionsContext);