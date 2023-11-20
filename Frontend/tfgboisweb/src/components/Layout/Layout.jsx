import React, { useContext, useEffect, useState } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { APIContext } from '../../contexts/ApiContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [actual, setActual] = useState("");
    const showFooter = (location.pathname !== '/login'
        && location.pathname !== '/sorprendeme'
        && location.pathname !== '/quieroCocinar'
        && location.pathname !== '/receta'
        && location.pathname !== '/Cocinar');

    const { apiData } = useContext(APIContext);

    useEffect(() => {
        if (showFooter) {
            switch (location.pathname) {
                case "/":
                    setActual("Home");
                    break;
                case "/favoritos":
                    setActual("Favoritos");
                    break;
                case "/perfil":
                    setActual("Perfil");
                    break;
                default:
                    setActual("");

            }
        }
    }, [location]);

    useEffect(() => {
        if (apiData && location.pathname !== '/receta' && location.pathname !== '/RecetaDetalle' && apiData.data.length) {
            // alert('¡Tu receta está lista!');
            // navigate("/RecetaDetalle", { state: { receta: apiData.data[0] } })
            const isConfirmed = window.confirm('¡Tu receta está lista! ¿Quieres ver ir a verla?');
            if (isConfirmed) {
                navigate("/RecetaDetalle", { state: { receta: apiData.data[0] } });
            }
        }
    }, [apiData]);

    return (
        <>
            {children}

            {showFooter && <Footer actual={actual} visible={true} />}
        </>
    );
};

export default Layout;