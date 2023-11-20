import React from 'react'
import './BotonesHomeContainer.css'
import BotonHome from './BotonHome'
import { useNavigate } from 'react-router-dom'



const BotonesHomeContainer = () => {
    let navigate = useNavigate();
    const quieroCocinarEventHandler = (event) => {
        // navigate('/quieroCocinar');
        navigate('/Cocinar');
    };

    const listadoDeRecetasEventHandler = (event) => {
        alert('Proximamente');
    };

    const planificarEventHandler = (event) => {
        alert('Proximamente vas a poder planificar las comidas de la semana.');
    };

    const ayudaEventHandler = (event) => {
        alert('Proximamente vas a poder encontrar tips que te ayudarán en tu cocina.');
    };


    return (
        <div className='botonesHomeContainer'>
            <BotonHome titulo={"Cocinar"} claseCssAdicional={"mediano"} imgUrl={"./images/quierococinar.svg"} clickEventHandler={quieroCocinarEventHandler} />
            <BotonHome titulo={"Recetas"} imgUrl={"./images/listadorecetas.svg"} clickEventHandler={listadoDeRecetasEventHandler} />
            <BotonHome titulo={"Planificar"} claseCssAdicional={"mediano"} imgUrl={"./images/Planificar.svg"} clickEventHandler={planificarEventHandler} />
            <BotonHome titulo={"Ayuda"} claseCssAdicional={"mediano"} imgUrl={"./images/Ayuda.svg"} clickEventHandler={ayudaEventHandler} />
        </div>
    )
}

export default BotonesHomeContainer