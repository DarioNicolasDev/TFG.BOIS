import React from 'react'
import './BarraProgreso.css'

const BarraProgreso = ({ total, avance }) => {
    const posiciones = Array.from({ length: total }, (_, index) => {
        // Determinar la clase basada en si el índice actual es menor que el numeroLimite
        const clase = index < avance ? 'progreso-completo' : 'progreso-vacio';

        return <span key={index} className={clase}></span>;
    });
    return (
        <div className='barraProgreso'>
            {posiciones}
        </div>
    )
}

export default BarraProgreso