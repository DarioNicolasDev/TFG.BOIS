import React from 'react'
import './PopUp.css'
import { Link } from 'react-router-dom';
import Boton from '../Boton/Boton';

const PopUp = ({ mensaje, imagenUrl, backPage, tituloLink, tituloBoton, popUpButtonClickEventHandler }) => {
    const url = './images/' + imagenUrl;




    return (
        <div className='popUp'>
            <div className='popUp-Content'>
                <img src={url} />
                <h2>{mensaje}</h2>
                <div className='popUp-Options'>
                    <Link to={backPage}>{tituloLink}</Link>
                    <Boton titulo={tituloBoton} claseCss={"boton principal"} onclickEventHandler={popUpButtonClickEventHandler} />
                </div>

            </div>

        </div>
    )
}

export default PopUp