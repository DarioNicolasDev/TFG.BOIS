import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { APIContext } from '../../contexts/ApiContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const showFooter = (location.pathname !== '/login'
        && location.pathname !== '/sorprendeme'
        && location.pathname !== '/quieroCocinar'
        && location.pathname !== '/receta'
        && location.pathname !== '/Cocinar');

    const { apiData } = useContext(APIContext);


    useEffect(() => {
        if (apiData && location.pathname !== '/receta' && location.pathname !== '/RecetaDetalle') {
            alert('¡Tu receta está lista!');

        }
    }, [apiData]);

    return (
        <>
            {children}

            {showFooter && <Footer visible={true} />}
        </>
    );
};

export default Layout;