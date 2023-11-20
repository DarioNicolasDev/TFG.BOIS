import React from 'react'
import './BotonQuieroCocinar.css'

const BotonQuieroCocinar = ({ imgUrl, titulo, clickEventHandler }) => {
    return (
        <div className='botonQuieroCocinar' onClick={clickEventHandler}>
            <img src={imgUrl} />
            <h3>{titulo}</h3>
        </div>
    )
}

export default BotonQuieroCocinar