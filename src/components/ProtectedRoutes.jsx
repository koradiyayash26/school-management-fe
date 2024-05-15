import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes() {
    let auth = { token: localStorage.getItem("Token") || false };

    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutes;