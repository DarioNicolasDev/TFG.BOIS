import React, { useState } from 'react'
import './BotonBack.css'
import { useNavigate } from 'react-router-dom';

const BotonBack = ({ color, backPage }) => {
    let naviate = useNavigate();
    let logo = "./images/BackArrow_" + color + ".svg";

    const backEventHandler = (event) => {
        if (backPage) {
            console.log(backPage);
            naviate(backPage);
        } else {
            naviate(-1);
        }

    };



    return <img className='backArrow' onClick={backEventHandler} src={logo} />


}

export default BotonBack