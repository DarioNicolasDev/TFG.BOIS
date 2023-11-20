import React, { useContext, useEffect } from 'react';
import './ProcesarReceta.css'
import Boton from '../Boton/Boton';
import { Link, useNavigate } from 'react-router-dom';


const ProcesarReceta = () => {
    let naviate = useNavigate();
    const volverEventHandler = () => {
        naviate("/");
    };

    return (<>
        <div className='procesandoReceta'>
            {/* <h2>Estamos creando tu receta... ¡Te avisaremos cuando esté lista!</h2> */}
            {/* <Boton claseCss={"boton principal"} titulo={"Ir al Inicio"} onclickEventHandler={volverEventHandler} /> */}
            <img className='creandoReceta' src="./images/CreandoReceta.svg" alt="" />
            <img className='inteligenciaArtificial' src="./images/InteligenciaArtificialProcesando.svg" alt="" />
            <h2>Estamos preparando tu receta, no te vayas.</h2>
            <Link className='procesandoReceta-link' to={"/"}>Volver al Inicio</Link>
        </div>

    </>


    )
}

export default ProcesarReceta