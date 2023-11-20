import React, { useState, useEffect } from 'react';
import BotonBack from '../../components/BotonBack/BotonBack'
import Header from '../../components/Header/Header'
import './Perfil.css'
import { usuarioLogueado } from '../../services/UsuarioServices';
import PreferenciasContainer from '../../components/Preferencias/PreferenciasContainer';
import { obtenerPreferencias } from '../../services/PreferenciasSerivces'



const Perfil = () => {
    const usuario = usuarioLogueado();
    const [preferencias, setPreferencias] = useState([]);

    useEffect(() => {
        const cargarPreferencias = async () => {
            try {
                const data = await obtenerPreferencias();
                setPreferencias(data);
            }
            catch (error) {
                setError(error);
            }
        };
        cargarPreferencias();
    }, []);


    return (
        <>
            <Header titulo={"Perfil"} />
            <div className='perfilBody'>
                <h2>{usuario.nombreUsuario}</h2>
                <h3>{usuario.email}</h3>
                <PreferenciasContainer usuario={usuario} mostrarBoton={true} preferencias={preferencias} />

            </div>
            <br />


        </>
    )
}

export default Perfil