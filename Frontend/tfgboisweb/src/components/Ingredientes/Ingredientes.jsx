import React from 'react'
import './ingredientes.css'

const Ingredientes = ({ ingredientes, ingredienteSeleccionadoEventHandler }) => {
    return (
        <div>
            <h3>Ingredientes</h3>
            <div className='ingredienteContainer' >
                {ingredientes.map((ingrediente) => (
                    <div id={ingrediente.id.toString()} className='ingrediente' onClick={ingredienteSeleccionadoEventHandler} key={ingrediente.id.toString()}>
                        <img src={`./images/${ingrediente.tipoIngrediente.nombreTipoIngrediente}.svg`} />
                        <h4> {ingrediente.nombreIngrediente}</h4>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default Ingredientes