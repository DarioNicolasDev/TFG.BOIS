import React from 'react'
import axios from 'axios';
import { API_URL, PREFERENCIAS_ENDPOINT } from '../common/constantes';
import { token } from './UsuarioServices';


const obtenerPreferencias = async () => {

    try {
        const respuesta = await axios.get(API_URL + PREFERENCIAS_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });
        return respuesta.data;
    } catch (error) {
        throw error;
    }
}

const guardarUsuarioPreferencias = async (usuarioPreferencias) => {
    try {
        const request = JSON.stringify(usuarioPreferencias);
        const respuesta = await axios.post(API_URL + PREFERENCIAS_ENDPOINT, request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });

        return respuesta.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const eliminarUsuarioPreferencias = async (usuarioId) => {
    try {

        const respuesta = await axios.delete(API_URL + PREFERENCIAS_ENDPOINT + "/" + usuarioId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        });

        return respuesta.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export { obtenerPreferencias, guardarUsuarioPreferencias, eliminarUsuarioPreferencias }