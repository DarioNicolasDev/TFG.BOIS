import React, { useState, useEffect } from 'react'
import './PreferenciasContainer.css'
import Interruptor from '../Interruptor/Interruptor';
import { guardarUsuarioPreferencias, eliminarUsuarioPreferencias } from '../../services/PreferenciasSerivces';
import Boton from '../Boton/Boton';
import { actualizarPreferenciasUsuario } from '../../services/UsuarioServices';


const PreferenciasContainer = ({ usuario, mostrarBoton, actualizarPreferenciasEventHandler, preferencias }) => {

    const [error, setError] = useState(null);
    const [usuarioPreferencias, setUsuarioPreferencias] = useState(usuario.usuarioPreferencias);
    const [preferenciasUsuario, setPreferenciasUsuario] = useState([]);
    const [preferenciasUsuarioOriginales, setPreferenciasUsuarioOriginales] = useState([]);
    const [estaCargando, setEstaCargando] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);


    const guardarEventHandler = async (event) => {
        setEstaCargando(true);
        const nuevasPreferencias = preferenciasUsuario.map((x) => {
            return {
                id: 0,
                usuarioId: usuario.id,
                preferenciaID: x.id,
                preferencia: null
            };
        });

        setUsuarioPreferencias(nuevasPreferencias);
        if (nuevasPreferencias && nuevasPreferencias.length > 0) {
            await guardarPreferencias(nuevasPreferencias);
        } else {
            await eliminarPreferencias(Number(usuario.id));
        }
        setEstaCargando(false);
    };

    const guardarPreferencias = async (nuevasPreferencias) => {

        const data = await guardarUsuarioPreferencias(nuevasPreferencias);
        actualizarPreferenciasUsuario(data.data);
    };

    const eliminarPreferencias = async (usuarioId) => {
        await eliminarUsuarioPreferencias(usuarioId);
        actualizarPreferenciasUsuario([]);
    };


    useEffect(() => {
        const compararPreferencias = () => {
            if (preferenciasUsuarioOriginales.length !== preferenciasUsuario.length) {
                setHayCambios(true);
                return;
            } else {
                // Clona y elimina 'tipoPreferencia' de cada objeto
                const cloneArray1 = preferenciasUsuarioOriginales.map(obj => {
                    const clone = { ...obj };
                    delete clone.tipoPreferencia;
                    return clone;
                });

                const cloneArray2 = preferenciasUsuario.map(obj => {
                    const clone = { ...obj };
                    delete clone.tipoPreferencia;
                    return clone;
                });

                // Convierte a string y ordena
                const sortedArray1 = cloneArray1.map(obj => JSON.stringify(obj)).sort();
                const sortedArray2 = cloneArray2.map(obj => JSON.stringify(obj)).sort();

                console.log(sortedArray1);
                console.log(sortedArray2);

                // Compara los arrays
                for (let i = 0; i < sortedArray1.length; i++) {
                    if (sortedArray1[i] !== sortedArray2[i]) {
                        setHayCambios(true);
                        console.log("hay cambios");
                        console.log(sortedArray1[i]);
                        console.log(sortedArray2[i]);
                        return;
                    }
                }
            }
            setHayCambios(false);
        }
        compararPreferencias();

    }, [preferenciasUsuario]);






    const onToggle = (event) => {
        const preferenciaID = Number(event.target.id);
        setPreferenciasUsuario((prevPreferenciasUsuario) => {
            const preferenciaIndex = prevPreferenciasUsuario.findIndex(item => item.id === preferenciaID);

            if (preferenciaIndex > -1) {
                // Si la preferencia ya existe, la eliminamos.
                return prevPreferenciasUsuario.filter((_, index) => index !== preferenciaIndex);
            } else {
                // Si la preferencia no existe, la agregamos.
                const preferencia = preferencias.data.find(x => x.id === preferenciaID);
                return [...prevPreferenciasUsuario, preferencia];
            }
        });
        if (actualizarPreferenciasEventHandler) {
            actualizarPreferenciasEventHandler(event);
        }
    };

    useEffect(() => {
        if (usuarioPreferencias && usuarioPreferencias.length > 0) {
            const aux = usuarioPreferencias.map(item => item.preferencia);
            const aux2 = usuarioPreferencias.map(item => item.preferencia);
            setPreferenciasUsuarioOriginales(aux2);
            setPreferenciasUsuario(aux);

        }
    }, []);



    if (error) {
        return (
            <>
                <div>Hubo un error al cargar las preferencias: {error.message}</div>
            </>
        )
    }
    return (
        <div className='preferenciasContainer'>
            <h4>Preferencias dietéticas</h4>
            <h3>Por temas de la salud:</h3>
            {preferencias && preferencias.data && preferencias.data.length > 0 ? (
                <ul>
                    {preferencias.data.filter(x => x.tipoPreferenciaID == 1).map((preferencia, id) => (

                        <li key={id}>
                            <span className='column izquierda' title={preferencia.descripcionPreferencia}>{preferencia.nombrePreferencia}</span>
                            <span className='column derecha'><Interruptor id={preferencia.id} checked={preferenciasUsuario.some(x => x.id == preferencia.id)} onChange={onToggle} /></span>
                        </li>
                    ))}
                </ul>
            ) : (<span>no hay preferencias</span>)
            }

            <h3>Otros:</h3>
            {preferencias && preferencias.data && preferencias.data.length > 0 ? (
                <ul>
                    {preferencias.data.filter(x => x.tipoPreferenciaID == 2).map((preferencia, id) => (
                        <li key={id}>
                            <span className='column izquierda' title={preferencia.descripcionPreferencia}>{preferencia.nombrePreferencia}</span>
                            <span className='column derecha'><Interruptor id={preferencia.id} checked={preferenciasUsuario.some(x => x.id == preferencia.id)} onChange={onToggle} /></span>
                        </li>
                    ))}
                </ul>
            ) : (<span>no hay preferencias</span>)
            }

            {
                mostrarBoton && hayCambios
                    ? (
                        <Boton isDisable={estaCargando} claseCss={"boton principal"} titulo={"Guardar"} tituloDeshabilitado={"Guardando..."} onclickEventHandler={guardarEventHandler} />

                    )
                    : (<></>)
            }


        </div>
    )
}

export default PreferenciasContainer