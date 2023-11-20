import axios from 'axios';
import { API_URL, AUTENTICACION_ENDPOINT, REGISTROUSUARIO_ENDPOINT } from '../common/constantes';

const autenticar = async (usuario) => {
    const request = JSON.stringify(usuario);
    try {
        const respuesta = await axios.post(API_URL + AUTENTICACION_ENDPOINT, request, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        console.log(respuesta.data);
        return respuesta.data;
    } catch (error) {

        throw error;
    }
};

const registrar = async (usuario) => {
    const request = JSON.stringify(usuario);
    try {
        const respuesta = await axios.post(API_URL + REGISTROUSUARIO_ENDPOINT, request, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        return respuesta.data;
    } catch (error) {

        throw error;
    }
};

const usuarioLogueado = () => {
    const autenticacion = JSON.parse(localStorage.getItem('autenticacion'));
    if (autenticacion.usuario) {

        return autenticacion.usuario;
    } else {
        return null;
    }
}

const actualizarPreferenciasUsuario = (nuevasPreferencias) => {
    const autenticacion = JSON.parse(localStorage.getItem('autenticacion'));
    if (autenticacion && autenticacion.usuario) {

        autenticacion.usuario.usuarioPreferencias = nuevasPreferencias;

        localStorage.setItem('autenticacion', JSON.stringify(autenticacion));

        return autenticacion.usuario;
    } else {

    }
};

const token = () => {
    const autenticacion = JSON.parse(localStorage.getItem('autenticacion'));
    if (autenticacion.token) {

        return autenticacion.token;
    } else {
        return null;
    }
}


export { autenticar, registrar, usuarioLogueado, token, actualizarPreferenciasUsuario }