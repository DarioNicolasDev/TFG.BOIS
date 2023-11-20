import axios from 'axios';
import { API_URL, RECETAS_ENDPOINT, RECETAS_AI_ENDPOINT } from '../common/constantes';
import { token } from './UsuarioServices';


const obtenerRecetasPorIngredientes = async (apiRequest) => {
    const request = JSON.stringify(apiRequest);
    try {
        const respuesta = await axios.post(API_URL + RECETAS_ENDPOINT, request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });
        return respuesta.data;
    } catch (error) {

        throw error;
    }
};

const obtenerRecetasPorIngredientesIA = async (apiRequest) => {
    const request = JSON.stringify(apiRequest);
    console.log("Antes de invocar la api en RecetaServices");
    console.log(request);
    try {
        const respuesta = await axios.post(API_URL + RECETAS_AI_ENDPOINT, request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });
        return respuesta.data;
    } catch (error) {

        throw error;
    }
};


export { obtenerRecetasPorIngredientes, obtenerRecetasPorIngredientesIA }