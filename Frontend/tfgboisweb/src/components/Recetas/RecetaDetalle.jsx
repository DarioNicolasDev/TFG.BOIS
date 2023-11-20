
import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import BotonBack from '../BotonBack/BotonBack';
import './RecetaDetalle.css'
import Boton from '../Boton/Boton'


const RecetaDetalle = ({ receta, cocinarEventHandler }) => {
    const [favoritoActivo, setFavoritoActivo] = useState(false);
    const [favoritoImage, setFavoritoImage] = useState('Favoritos-vacio.svg');
    const favoritosEventHandler = () => {
        if (favoritoActivo) {
            setFavoritoImage('Favoritos-lleno.svg')
        } else {
            setFavoritoImage('Favoritos-vacio.svg')
        }
        setFavoritoActivo(!favoritoActivo);
    }

    if (receta) {
        return (
            <>
                <Header titulo={"Receta"} />
                <BotonBack color={"Blanco"} backPage={"/"} />
                <div className='recetaContainer'>
                    <div className='recetaCard'>

                        <h2>{receta.nombreReceta}</h2>
                        <p>{receta.descripcionReceta}</p>
                        <p><label>Dificultad:</label> {receta.dificultad}</p>
                        <p><label>Autor:</label> {receta.autor}</p>
                        <p><label>Tiempo de preparación:</label> {receta.tiempoPreparacion}</p>
                        <p><label>Cantidad de porciones:</label> {receta.cantidadPorciones}</p>

                    </div>
                    <div className='botonesContainer'>
                        <img onClick={favoritosEventHandler} src={`./images/${favoritoImage}`} />
                        <Boton onclickEventHandler={cocinarEventHandler} claseCss={"boton principal"} titulo={"¡A cocinar!"} />
                    </div>

                </div>
                {/*                 
                <div className='receta'>
                    <h2>{receta.nombreReceta}</h2>
                    <p>{receta.descripcionReceta}</p>
                    <p><label>Dificultad:</label> {receta.dificultad}</p>
                    <p><label>Autor:</label> {receta.autor}</p>
                    <p><label>Tiempo de preparación:</label> {receta.tiempoPreparacion}</p>
                    <p><label>Cantidad de porciones:</label> {receta.cantidadPorciones}</p>
                    <h2>Ingredientes</h2>
                    <ul>
                        {receta.recetaIngredientes.map((ingrediente, id) =>
                        (
                            <li key={id}>
                                {ingrediente.cantidad} {ingrediente.unidadMedida} de {ingrediente.ingrediente.nombreIngrediente}
                            </li>
                        ))}
                    </ul>
                    <h2>Preparación</h2>
                    <ul>
                        {receta.recetaPasos.map((paso, id) =>
                        (
                            <li key={id}>
                                <p><label>Paso {paso.numeroPaso} - {paso.tituloPaso}</label></p>
                                <p>{paso.descripcionPaso}</p>
                                <p>Duración: {paso.tiempoDeRealizacion} segundos</p>
                            </li>
                        ))}
                    </ul>


                </div> */}

            </>
        );
    } else {
        return (<>No hay receta</>);
    }

};

export default RecetaDetalle
