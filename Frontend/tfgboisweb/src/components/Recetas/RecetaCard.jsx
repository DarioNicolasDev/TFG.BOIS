import React from 'react'
import './RecetaCard.css'
import Boton from '../../components/Boton/Boton'
import BarraProgreso from '../BarraProgreso/BarraProgreso'
import Favorito from '../Favorito/Favorito'

const RecetaCard = () => {


    return (
        <div className='recetaCard-container'>
            <div className='recetaCard recetasCard-mediano'>
                <div className='recetaCard-header'>
                    <label>Milanesas de cerdo con puré de manzanas asadas y flan de choclo</label>
                    <Favorito claseCss={'recetaCard-header-favorito'} />
                    {/* <img onClick={favoritosEventHandler} className='recetaCard-header-favorito' src='./images/Favoritos-vacio.svg' /> */}
                </div>
                <div className='recetaCard-fila columnar'>
                    <span>Valoración</span>
                    <div>
                        <img className='recetaCard-estrella' src="./images/estrella-llena.svg" />
                        <img className='recetaCard-estrella' src="./images/estrella-llena.svg" />
                        <img className='recetaCard-estrella' src="./images/estrella-llena.svg" />
                        <img className='recetaCard-estrella' src="./images/estrella-vacia.svg" />
                        <img className='recetaCard-estrella' src="./images/estrella-vacia.svg" />
                    </div>

                </div>
                <div className='recetaCard-fila columnar'>
                    <span>Dificultad</span>
                    <BarraProgreso total={10} avance={9} />
                </div>
                <div className='recetaCard-fila'>
                    <span>Tiempo:</span>
                    <span>1 hora 20 minutos</span>
                </div>
            </div>
            <Boton claseCss={"boton principal"} titulo={"Ver"} />
        </div>
    )
}

export default RecetaCard