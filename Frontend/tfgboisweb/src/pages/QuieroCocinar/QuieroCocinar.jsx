import React from 'react'
import BotonBack from '../../components/BotonBack/BotonBack'
import BotonesQuieroCocinarContainer from '../../components/QuieroCocinar/BotonesQuieroCocinarContainer'

const QuieroCocinar = () => {
    return (
        <>
            <BotonBack color="Naranja" backPage={"/"} />
            <BotonesQuieroCocinarContainer />
        </>
    )
}

export default QuieroCocinar