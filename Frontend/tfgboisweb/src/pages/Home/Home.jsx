import React from 'react'
import Header from '../../components/Header/Header'
import BotonesHomeContainer from '../../components/Home/BotonesHomeContainer'
import { usuarioLogueado } from '../../services/UsuarioServices'
import '../../services/NotificacionesServices';

const Home = () => {
    const usuario = usuarioLogueado();

    return (
        <>
            <Header titulo={"Cocinar en Casa"} />
            <div className='subtitulo'>
                <h2>¡Hola {usuario.nombreUsuario}!</h2>
                <h3>¿Cómo podemos ayudarte hoy?</h3>
            </div>
            <BotonesHomeContainer />

        </>
    )
}

export default Home