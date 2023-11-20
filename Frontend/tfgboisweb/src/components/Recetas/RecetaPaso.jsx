import React, { useEffect, useState } from 'react'
import Temporizador from '../Temporizador/Temporizador'
import timer from '../../audio/timer.mp3'
import './RecetaPaso.css'

const RecetaPaso = ({ paso }) => {
    const [tiempo, setTiempo] = useState(paso.tiempoDeRealizacion);

    useEffect(() => {
        console.log(paso);
        setTiempo(paso.tiempoDeRealizacion)
    }, [paso])

    return (
        <div className='recetaPaso-container'>
            <h1>Paso: #{paso.numeroPaso} - {paso.tituloPaso}</h1>
            <p>{paso.descripcionPaso}</p>
            <p>Tiempo estimado para este paso: {tiempo} segundos</p>
            <Temporizador initialSeconds={tiempo} audioFile={timer} />

        </div>
    )
}

export default RecetaPaso