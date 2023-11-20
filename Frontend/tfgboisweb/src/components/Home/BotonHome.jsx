import React from 'react'
import './BotonHome.css'

const BotonHome = ({ imgUrl, titulo, clickEventHandler, claseCssAdicional }) => {
    return (
        <div onClick={clickEventHandler} className='botonHome' >
            <img className={claseCssAdicional} src={imgUrl}></img>
            <span>{titulo}</span>
        </div>
    )
}

export default BotonHome