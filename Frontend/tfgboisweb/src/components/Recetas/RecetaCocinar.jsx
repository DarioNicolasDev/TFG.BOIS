import React from 'react'
import Header from '../Header/Header'
import BotonBack from '../BotonBack/BotonBack'
import './RecetaCocinar.css'
import Boton from '../Boton/Boton'
import { useNavigate } from 'react-router-dom'

const RecetaCocinar = ({ receta }) => {
    console.log(receta);
    const navigate = useNavigate();
    const comencemosEventHandler = (event) => {
        console.log("Recetaaaa");
        console.log(receta);
        navigate("/RecetaPasos", { state: { recetaPasos: receta.recetaPasos } });
    }
    return (
        <>
            <Header titulo={"Receta"} />
            <BotonBack color={"Blanco"} backPage={"/"} />
            <div className='receta'>
                <h2>{receta.nombreReceta}</h2>
                <h2>Ingredientes</h2>
                <ul>
                    {receta.recetaIngredientes.map((ingrediente, id) =>
                    (
                        <li key={id}>
                            {ingrediente.cantidad} {ingrediente.unidadMedida} de {ingrediente.ingrediente.nombreIngrediente}
                        </li>
                    ))}
                </ul>
                <br></br>
                <h3>Cuando tengas todo listo, comenzamos</h3>
                <Boton claseCss={"boton principal"} titulo={"Comencemos"} onclickEventHandler={comencemosEventHandler} />
                {/* <h2>Preparación</h2>
                <ul>
                    {receta.recetaPasos.map((paso, id) =>
                    (
                        <li key={id}>
                            <p><label>Paso {paso.numeroPaso} - {paso.tituloPaso}</label></p>
                            <p>{paso.descripcionPaso}</p>
                            <p>Duración: {paso.tiempoDeRealizacion} segundos</p>
                        </li>
                    ))}
                </ul> */}


            </div>
        </>
    )
}

export default RecetaCocinar