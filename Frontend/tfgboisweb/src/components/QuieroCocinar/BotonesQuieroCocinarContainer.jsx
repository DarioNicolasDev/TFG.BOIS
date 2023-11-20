import React from 'react'
import BotonQuieroCocinar from './BotonQuieroCocinar'
import './BotonesQuieroCocinarContainer.css'
import { useNavigate } from 'react-router-dom'

const BotonesQuieroCocinarContainer = () => {
    let navigate = useNavigate();

    const sorprendemeEventHandler = (event) => {
        navigate('/sorprendeme')
    }

    const elegirIngredienteEventHandler = (event) => {

    }

    return (
        <div className='quieroCocinarContainer'>
            <h2>¿Qué quieres cocinar?</h2>
            <BotonQuieroCocinar imgUrl='./images/sorprendeme.svg' titulo='¡Sorpréndeme!' clickEventHandler={sorprendemeEventHandler} />
            <BotonQuieroCocinar imgUrl='./images/elegiringredientes.svg' titulo='Elegir en base a mis ingredientes' clickEventHandler={elegirIngredienteEventHandler} />
        </div>
    )
}

export default BotonesQuieroCocinarContainer