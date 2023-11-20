import React, { useEffect, useState } from 'react'
import BotonBack from '../../components/BotonBack/BotonBack'
import Chips from '../../components/Chip/Chips'
import Boton from '../../components/Boton/Boton'
import Stepper from '../../components/Stepper/Stepper'
import Buscador from '../../components/Buscador/Buscador'
import TiposIngredienteContainer from '../../components/Ingredientes/TiposIngredienteContainer'
import Ingredientes from '../../components/Ingredientes/Ingredientes'
import { obtenerIngredientes } from '../../services/IngredientesServices'
import './Cocinar.css'
import PreferenciasContainer from '../../components/Preferencias/PreferenciasContainer'
import { usuarioLogueado } from '../../services/UsuarioServices';
import { obtenerPreferencias } from '../../services/PreferenciasSerivces'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'


const Cocinar = () => {
    const navigate = useNavigate();
    const [pasoActual, setPasoActual] = useState(1);
    const [tipoIngredienteSeleccionado, setTipoIngredienteSelecionado] = useState(0);
    const [ingredientes, setIngredientes] = useState([]);
    const [tiposIngredientes, setTiposIngrediente] = useState([]);
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
    const usuario = usuarioLogueado();
    const [preferencias, setPreferencias] = useState([]);
    const [preferenciasSeleccionadas, setPreferenciasSeleccionadas] = useState([]);
    const pasos = [
        "Ingredientes",
        "Preferencias",
        "Confirmación"
    ];


    const tipoIngredienteSeleccionadoEventHandler = (event) => {

        setTipoIngredienteSelecionado(+event.currentTarget.id);

    }
    const quitarTipoIngredienteEventHandler = () => {
        setTipoIngredienteSelecionado(0);
    }


    const ingredienteSeleccionadoEventHandler = (event) => {

        let ingredienteId = +event.currentTarget.id;
        let ingrediente = ingredientes.filter(x => x.id === ingredienteId)[0];
        setIngredientesSeleccionados(prev => [...prev, ingrediente])


    }
    const quitarIngredienteEventHandler = (event) => {
        let ingredienteId = +event.id;

        setIngredientesSeleccionados(prev => prev.filter(x => x.id != ingredienteId))
    }

    const continuarEventHandler = () => {
        // if (pasoActual === 2) {
        //     console.log(usuario);
        // } else {
        //     setPasoActual(pasoActual + 1);
        // }
        setPasoActual(pasoActual + 1);

    }

    const actualizarPreferenciasEventHandler = (event) => {
        const preferenciaID = Number(event.target.id); // Asegurándonos de que es un número si los IDs son numéricos
        setPreferenciasSeleccionadas((prevPreferencias) => {
            const preferenciaIndex = prevPreferencias.findIndex(item => item.id === preferenciaID);

            if (preferenciaIndex > -1) {
                // Si la preferencia ya existe, la eliminamos.
                return prevPreferencias.filter((_, index) => index !== preferenciaIndex);
            } else {
                // Si la preferencia no existe, la agregamos.
                const preferencia = preferencias.data.find(x => x.id === preferenciaID);
                return [...prevPreferencias, preferencia];
            }
        });
        console.log(preferenciasSeleccionadas);
    }

    const buscarRecetaEventHandler = () => {

        navigate('/receta', { state: { ingredientesSeleccionados, preferenciasSeleccionadas } });
    }

    const cambiarPasoEventHandler = (event) => {
        console.log(+event.target.id);
        if (pasoActual > +event.target.id) {
            setPasoActual(+event.target.id);
        }
    }


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

    useEffect(() => {
        const cargarPreferencias = async () => {
            try {
                const data = await obtenerPreferencias();
                setPreferencias(data);
            }
            catch (error) {
                setError(error);
            }
        };
        cargarPreferencias();
    }, []);

    useEffect(() => {
        if (usuario.usuarioPreferencias && usuario.usuarioPreferencias.length > 0) {
            const aux = [];
            usuario.usuarioPreferencias.forEach(item => {
                aux.push(item.preferencia);
            });
            setPreferenciasSeleccionadas(aux);
        }
    }, []);



    return (
        <>
            <BotonBack color={"Blanco"} backPage={"/"} />
            <Header titulo={"Cocinar"} />
            <div className='cocinarContainer'>


                <div className='cocinarContainer-item'>
                    <Stepper onclickEventHandler={cambiarPasoEventHandler} currentStep={pasoActual} steps={pasos} />
                </div>
                {
                    pasoActual < 2
                        ? (<div className='cocinarContainer-item'><Buscador /></div>)
                        : (<></>)
                }
                {
                    pasoActual === 1
                        ? (<div className='cocinarContainer-item'>
                            <div className='cocinarContainer-item'>
                                <Chips claseCss={"principal"} agregarX={true} items={tiposIngredientes.filter(x => x.id === tipoIngredienteSeleccionado)} etiqueta={"nombreTipoIngrediente"} chipsSeleccionados={[]} onChipClick={quitarTipoIngredienteEventHandler} />
                            </div>

                            <div className='cocinarContainer-item'>
                                <Chips claseCss={"secundario"} agregarX={true} items={ingredientesSeleccionados} etiqueta={"nombreIngrediente"} chipsSeleccionados={[]} onChipClick={quitarIngredienteEventHandler} />
                            </div>


                            <div className='cocinarContainer-item'>
                                {
                                    tipoIngredienteSeleccionado === 0
                                        ? (
                                            <TiposIngredienteContainer tiposIngrediente={tiposIngredientes} tipoIngredienteSeleccionadoEventHandler={tipoIngredienteSeleccionadoEventHandler} />
                                        ) :
                                        (
                                            <Ingredientes ingredientes={ingredientes.filter(x => x.tipoIngredienteID === tipoIngredienteSeleccionado && !ingredientesSeleccionados.some(y => y.id === x.id))} tipoIngredienteSeleccionado={tipoIngredienteSeleccionado} ingredienteSeleccionadoEventHandler={ingredienteSeleccionadoEventHandler} />
                                        )
                                }
                            </div>
                        </div>)
                        :
                        pasoActual === 2
                            ? (<div className='cocinarContainer-item'>
                                <h3>¿Deseas modificar alguna de tus preferencias para esta receta?</h3>
                                <PreferenciasContainer usuario={usuario} preferencias={preferencias} mostrarBoton={false} actualizarPreferenciasEventHandler={actualizarPreferenciasEventHandler} />
                            </div>)
                            : pasoActual === 3
                                ? (
                                    <div className='cocinarContainer-item confirmar'>
                                        <h4>Vamos a buscarte una receta</h4>
                                        <h4>Con:</h4>
                                        <div className='confirmar-seccion'>
                                            <div className='izquierda'>
                                                <h4>Ingredientes</h4>
                                                <ul>
                                                    {ingredientesSeleccionados.map((ingrediente) => (
                                                        <li id={ingrediente.id.toString()} key={ingrediente.id.toString()}>
                                                            <h3> {ingrediente.nombreIngrediente}</h3>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='derecha' onClick={() => { setPasoActual(1) }}>
                                                <img src='./images/Editar.svg' />
                                            </div>
                                        </div>
                                        {
                                            preferenciasSeleccionadas.length > 0
                                                ? (
                                                    <div className='confirmar-seccion'>
                                                        <div className='izquierda'>
                                                            <h4>Preferencias</h4>
                                                            <ul>
                                                                {preferenciasSeleccionadas.map((preferencia) => (
                                                                    <li id={preferencia.id.toString()} key={preferencia.id.toString()}>
                                                                        <h3> {preferencia.nombrePreferencia}</h3>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className='derecha' onClick={() => { setPasoActual(2) }}>
                                                            <img src='./images/Editar.svg' />
                                                        </div>
                                                    </div>
                                                )
                                                : (<></>)
                                        }
                                    </div>
                                )
                                : (<></>)

                }






                {
                    ingredientesSeleccionados.length < 3
                        ? (
                            <>
                                <label className='textoValidacion'>Recuerda que al menos necesitas 3 ingredientes</label>
                                <Boton claseCssContenedor={"fixed solid"} claseCss={"boton principal"} isDisable={true} tituloDeshabilitado={"Continuar"} />
                            </>
                        )
                        :
                        pasoActual === 3
                            ? (
                                <>
                                    <Boton claseCssContenedor={"fixed solid"} claseCss={"boton principal"} titulo={"Crear receta"} isDisable={false} onclickEventHandler={buscarRecetaEventHandler} />
                                </>
                            )
                            : (
                                <>
                                    <Boton claseCssContenedor={"fixed solid"} claseCss={"boton principal"} titulo={"Continuar"} isDisable={false} tituloDeshabilitado={"Continuar"} onclickEventHandler={continuarEventHandler} />
                                </>
                            )
                }

            </div>

        </>
    )
}

export default Cocinar