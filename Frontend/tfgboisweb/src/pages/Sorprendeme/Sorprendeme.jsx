import React from 'react'
import BotonBack from '../../components/BotonBack/BotonBack'
import Header from '../../components/Header/Header'
import IngredientesContainer from '../../components/Ingredientes/IngredientesContainer'

const Sorprendeme = () => {
    return (
        <>
            <BotonBack color={"Blanco"} backPage={"/quierococinar"} />
            <Header />
            <IngredientesContainer />
        </>
    )
}

export default Sorprendeme