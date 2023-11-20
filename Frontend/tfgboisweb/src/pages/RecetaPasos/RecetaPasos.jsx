import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecetaPaso from '../../components/Recetas/RecetaPaso';
import './RecetaPasos.css'


const RecetaPasos = () => {
    const location = useLocation();
    const [indice, setIndice] = useState(0);
    const pasos = location.state?.recetaPasos;

    const aumentarPasoEventHandler = (event) => {
        if (indice < pasos.length - 1) {
            setIndice(indice + 1);
        }
    }

    const disminuirPasoEventHandler = (event) => {
        if (indice > 0) {
            setIndice(indice - 1);
        }
    }

    return (
        <>
            <RecetaPaso paso={pasos[indice]} />
            <div className='botoneraPasos'>
                {
                    indice > 0
                        ? (<button onClick={disminuirPasoEventHandler}>{"<<<"}</button>)
                        : (<button disabled={true} >{"-"}</button>)
                }
                {
                    indice < (pasos.length - 1)
                        ? (<button onClick={aumentarPasoEventHandler}>{">>>"}</button>)
                        : (<button disabled={true} >{"-"}</button>)
                }

            </div>

        </>
    )
}

export default RecetaPasos