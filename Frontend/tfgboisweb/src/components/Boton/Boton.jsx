import React from 'react'
import './Boton.css'

const Boton = ({ titulo, tituloDeshabilitado, onclickEventHandler, isDisable, claseCss, claseCssContenedor }) => {
    return (
        <div className={'botonContainer ' + claseCssContenedor}>
            <button className={claseCss} disabled={isDisable} onClick={onclickEventHandler}> {isDisable ? tituloDeshabilitado : titulo}</button>
        </div>
    )
}

export default Boton