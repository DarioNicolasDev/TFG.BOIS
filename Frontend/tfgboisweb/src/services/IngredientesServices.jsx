import axios from 'axios';
import { API_URL, INGREDIENTES_ENDPOINT } from '../common/constantes';
import { token } from './UsuarioServices';


const obtenerIngredientes = async () => {
    try {
        const respuesta = await axios.get(API_URL + INGREDIENTES_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });

        return respuesta.data.data[0];
    } catch (error) {
        throw error;
    }
};


export { obtenerIngredientes }