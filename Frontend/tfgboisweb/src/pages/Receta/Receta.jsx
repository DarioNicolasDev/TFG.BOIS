import React, { useState, useContext, useEffect } from 'react';
import ProcesarReceta from '../../components/Recetas/ProcesarReceta';
import PopUp from '../../components/PopUp/PopUp.jsx';
import { APIContext } from '../../contexts/ApiContext.jsx';
import { obtenerRecetasPorIngredientes, obtenerRecetasPorIngredientesIA } from '../../services/RecetasServices'
import { useLocation, useNavigate } from 'react-router-dom';
import { usuarioLogueado } from '../../services/UsuarioServices';
import './Receta.css';

const Receta = () => {
    const navigate = useNavigate();
    const { setApiData, isLoading, setIsLoading } = useContext(APIContext);
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [mensajePopUp, setMensajePopUp] = useState("");
    const location = useLocation();
    const ingredientes = location.state?.ingredientesSeleccionados;
    const preferenciasSeleccionadas = location.state?.preferenciasSeleccionadas;
    const usuarioPreferencias = usuarioLogueado().usuarioPreferencias;
    const [apiRequest, setApiRequest] = useState({ ingredientes: [], preferencias: [] });

    const popUpButtonClickEventHandler = async () => {
        try {
            setMostrarPopUp(false);
            const data = await obtenerRecetasPorIngredientesIA(apiRequest);
            setApiData(data);

            if (data && data.data && data.data.length > 0) {
                navigate('/RecetaDetalle', { state: { receta: data.data[0] } });
            }
            if (data && data.detail) {
                setMensajePopUp(data.detail);
                setMostrarPopUp(true);
            }
        } catch (error) {
            setError(error);
            alert(error.message);
        }

    };

    useEffect(() => {
        if (preferenciasSeleccionadas) {
            setApiRequest({ ingredientes: ingredientes, preferencias: preferenciasSeleccionadas });
        } else {
            if (usuarioPreferencias && usuarioPreferencias.length > 0) {
                const preferencias = [];
                usuarioPreferencias.forEach(item => {
                    preferencias.push(item.preferencia);
                });
                setApiRequest({ ingredientes: ingredientes, preferencias: preferencias });
            }
        }

    }, []);




    useEffect(() => {
        setIsLoading(true);

        const obtenerRecetas = async () => {
            try {

                if (apiRequest.ingredientes.length > 0) {
                    const data = await obtenerRecetasPorIngredientes(apiRequest);
                    setApiData(data);

                    if (data && data.data && data.data.length > 0) {
                        navigate('/RecetaDetalle', { state: { receta: data.data[0] } });
                    }
                    if (isLoading && data && data.detail) {
                        setIsLoading(false);
                        setMensajePopUp(data.detail);
                        setMostrarPopUp(true);
                    }
                }
            } catch (error) {
                setError(error);
            }

        }
        obtenerRecetas();

        // Limpiar al desmontar
        return () => {

            setIsLoading(false);
        };
    }, [apiRequest, setApiData, setIsLoading, location.pathname]);


    return (<>
        {mostrarPopUp
            ? <PopUp imagenUrl={"NoHayRecetas.svg"} popUpButtonClickEventHandler={popUpButtonClickEventHandler} mensaje={mensajePopUp} backPage={"/Cocinar"} tituloLink={"Volver"} tituloBoton={"Crear receta"} />
            : <ProcesarReceta />}
    </>)


}
export default Receta