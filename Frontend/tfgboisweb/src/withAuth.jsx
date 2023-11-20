import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const withAuth = (Component) => {
    return (props) => {
        const { authToken } = useAuth();

        if (!authToken) {
            // Si no hay está autenticado redirige al login
            return <Navigate to="/login" />;
        }

        // Si está autenticado, muestra el componente protegido
        return <Component {...props} />;
    };
};