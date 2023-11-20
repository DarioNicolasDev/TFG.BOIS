import React, { useState, useEffect } from 'react'
import { obtenerIngredientes } from '../../services/IngredientesServices'
import { obtenerRecetasPorIngredientes } from '../../services/RecetasServices'
import './IngredientesContainer.css'
import Chips from '../Chip/Chips'
import Interruptor from '../Interruptor/Interruptor'
import Buscador from '../Buscador/Buscador'
import Boton from '../Boton/Boton'
import { useNavigate } from 'react-router-dom'



const IngredientesContainer = () => {
    const navigate = useNavigate();
    const [ingredientes, setIngredientes] = useState([]);
    const [tiposIngrediente, setTiposIngrediente] = useState([]);
    const [ingredientesID, setIngredientesID] = useState([]);
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(null);
    const [chipsSeleccionados, setChipsSeleccionados] = useState([]);
    const [buscador, setBuscador] = useState("");


    const buscarRecetaEventHandler = () => {
        console.log("Ingredientes seleccionados");
        console.log(ingredientesSeleccionados);
        navigate('/receta', { state: { ingredientesSeleccionados } });
    }

    const ingredientesFiltrados = ingredientes
        .filter(ingrediente => {
            const searchFilter = !buscador || ingrediente.nombreIngrediente.toLowerCase().includes(buscador.toLowerCase());
            return searchFilter;
        });


    const handleChipClick = (tipoIngrediente) => {
        const tipoIngredienteID = Number(tipoIngrediente.id);
        setChipsSeleccionados((prev) => {
            const chipIndex = prev.findIndex(item => item.id === tipoIngredienteID);

            if (chipIndex > -1) {
                // Si el tipo ya existe, la eliminamos.
                return prev.filter((_, index) => index !== chipIndex);
            } else {
                // si no existe lo agregamos

                return [...prev, tipoIngrediente];

            }
        });
    };

    useEffect(() => {
        const cargarIngredientes = async () => {
            try {
                const data = await obtenerIngredientes();
                setIngredientes(data.ingredientes);
                setTiposIngrediente(data.tiposIngrediente);
            }
            catch (error) {
                setError(error);
            }
        };
        cargarIngredientes();

    }, []);

    const obtenerRecetas = async () => {
        try {
            const data = await obtenerRecetasPorIngredientes(ingredientesID);

            setRecetas(data);
        } catch (error) {
            setError(error);
        }
    }

    const interruptorEventHandler = (event) => {
        let ingredienteId = +event.target.id;
        if (!ingredientesID.includes(ingredienteId)) {
            agregarEventHandler(event);
        } else {
            quitarEventHandler(event);
        }
    }

    const agregarEventHandler = (event) => {
        let ingredienteId = +event.target.id;
        let ingrediente = ingredientes.filter(x => x.id === ingredienteId)[0];

        setIngredientesSeleccionados(prev => [...prev, ingrediente])
        setIngredientesID(prev => [...prev, ingredienteId]);
    };

    const quitarEventHandler = (event) => {

        let ingredienteId = +event.id;
        if (event.target) {
            ingredienteId = +event.target.id;
        }

        setIngredientesSeleccionados(prev => prev.filter(x => x.id != ingredienteId))
        setIngredientesID(ingredientes => ingredientes.filter(x => x != ingredienteId));
    };



    if (error) {
        return (
            <>
                <div>Hubo un error al cargar los ingredientes: {error.message}</div>
            </>
        )
    }
    return (
        <div className='ingredientesContainer'>
            <h4>Selección de ingredientes</h4>
            <Buscador texto={buscador} setTexto={setBuscador} />
            <div className='chipsGeneral'>
                <h3>Tipos de ingrediente:</h3>
                <Chips items={tiposIngrediente} chipsSeleccionados={chipsSeleccionados} etiqueta={"nombreTipoIngrediente"} onChipClick={handleChipClick} />

            </div>
            <div className='listContainer'>
                {ingredientesSeleccionados.length > 0 ? (<h3>Ingredientes seleccionados:</h3>) : (<h3>Selecciona los ingredientes que usarás para buscar recetas:</h3>)}
                <Chips items={ingredientesSeleccionados} chipsSeleccionados={[]} etiqueta={"nombreIngrediente"} onChipClick={quitarEventHandler} />
                {ingredientesFiltrados && ingredientesFiltrados.length > 0 ? (
                    <ul className='listItems'>
                        {chipsSeleccionados.length === 0 ?
                            ingredientesFiltrados.map((ingrediente) => (
                                <li key={ingrediente.id.toString()}>
                                    <div className='item'>
                                        <span>{ingrediente.nombreIngrediente}</span>
                                        <p>{ingrediente.descripcionIngrediente}</p>
                                    </div>
                                    <div className='item interruptor'><Interruptor id={ingrediente.id} checked={ingredientesID.includes(ingrediente.id)} onChange={interruptorEventHandler} /></div>

                                </li>
                            ))
                            :
                            ingredientesFiltrados.filter(x => chipsSeleccionados.some(y => y.id === x.tipoIngredienteID)).map((ingrediente) => (
                                <li key={ingrediente.id.toString()}>
                                    <div className='item'>
                                        <span>{ingrediente.nombreIngrediente}</span>
                                        <p>{ingrediente.descripcionIngrediente}</p>
                                    </div>
                                    <div className='item interruptor'><Interruptor id={ingrediente.id} checked={ingredientesID.includes(ingrediente.id)} onChange={interruptorEventHandler} /></div>

                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <><span>¡No se encontró ningun ingrediente! </span><a href='#'>Quiero agregar uno</a></>
                )}

            </div>

            <Boton onclickEventHandler={buscarRecetaEventHandler} isDisable={ingredientesSeleccionados.length < 3} tituloDeshabilitado={"Mínimo debes seleccionar 3 ingredientes"} titulo={"¡Crear receta con Inteligencia Artificial!"} claseCss={"boton principal"} claseCssContenedor={"fixed"} />
        </div>
    )
}

export default IngredientesContainer