import React, { useState } from 'react'
import RecetaDetalle from '../../components/Recetas/RecetaDetalle';
import Boton from '../../components/Boton/Boton';
import BotonBack from '../../components/BotonBack/BotonBack'
import { useLocation, useNavigate } from 'react-router-dom';
import RecetaCocinar from '../../components/Recetas/RecetaCocinar';

const RecetaDetallePage = () => {

    const location = useLocation();
    const [cocinar, setCocinar] = useState(false);
    const [receta] = useState(location.state?.receta);
    const navigate = useNavigate();
    console.log("Location");
    console.log(location.state?.receta);
    console.log("Dentro de RecetaDetalle");
    console.log(receta);

    const cocinarEventHandler = () => {

        setCocinar(true);
    }

    return (
        <>
            <BotonBack color={"Naranja"} backPage={"/Cocinar"} />
            {
                cocinar
                    ? (<RecetaCocinar receta={receta} />)
                    : (
                        <RecetaDetalle receta={receta} cocinarEventHandler={cocinarEventHandler} />
                    )
            }


        </>
    )
}

export default RecetaDetallePage