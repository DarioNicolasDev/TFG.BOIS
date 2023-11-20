import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigation = useNavigate();
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('autenticacion')));

    useEffect(() => {
        const autenticacion = JSON.parse(localStorage.getItem('autenticacion'));

        if (autenticacion) {
            const token = autenticacion.token;
            const expiration = autenticacion.tokenExpiration;
            const now = new Date();
            if (token && expiration && new Date(expiration) > now) {

                setAuthToken(autenticacion);
            } else {
                navigation('/login');
            }
        } else {
            navigation('/login');
        }


    }, [navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
            const autenticacion = JSON.parse(localStorage.getItem('autenticacion'));
            if (autenticacion) {
                const expiration = autenticacion.tokenExpiration;
                const now = new Date();
                if (!expiration || new Date(expiration) <= now) {
                    setAuthToken(null);
                    localStorage.removeItem('autenticacion');
                    navigation('/login');
                }
            } else {
                navigation('/login');
            }

        }, 30000);

        return () => clearInterval(interval);
    }, [navigation]);

    const login = (autenticacion) => {
        localStorage.setItem('autenticacion', autenticacion);
        setAuthToken(autenticacion);
    };

    const logout = () => {
        localStorage.removeItem('autenticacion');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);