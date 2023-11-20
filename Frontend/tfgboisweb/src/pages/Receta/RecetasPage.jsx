import React from 'react'
import Header from '../../components/Header/Header'
import BotonBack from '../../components/BotonBack/BotonBack'
import RecetaCard from '../../components/Recetas/RecetaCard'
import './RecetasPage.css'

const RecetasPage = () => {
    return (
        <>
            <Header titulo={"Recetas"} />
            <div className='recetasPageContainer'>
                <div className='subtitulo'>
                    <h3>Listado de recetas</h3>
                    <div className='recetasContainer'>
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                        <RecetaCard />
                    </div>
                </div>
            </div>
        </>

    )
}

export default RecetasPage