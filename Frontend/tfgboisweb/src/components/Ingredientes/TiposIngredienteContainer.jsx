import React from 'react'
import './TiposIngredienteContainer.css'


const TiposIngredienteContainer = ({ tiposIngrediente, tipoIngredienteSeleccionadoEventHandler }) => {
    return (
        <div >
            <h3>Categorías de ingredientes</h3>
            <div className='tipoIngredientesContainer' >
                {tiposIngrediente.map((tipoIngrediente) => (
                    <div id={tipoIngrediente.id.toString()} className='tipoIngrediente' onClick={tipoIngredienteSeleccionadoEventHandler} key={tipoIngrediente.id.toString()}>
                        <img src={`./images/${tipoIngrediente.nombreTipoIngrediente}.svg`} />
                        <h4> {tipoIngrediente.nombreTipoIngrediente}</h4>

                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default TiposIngredienteContainer