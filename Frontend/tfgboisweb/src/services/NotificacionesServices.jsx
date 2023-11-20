import * as signalR from "@microsoft/signalr";
import { API_URL, NOTIFICACIONES_ENDPOINT } from "../common/constantes";
import { token } from './UsuarioServices';

console.log(API_URL + NOTIFICACIONES_ENDPOINT);

const connection = new signalR.HubConnectionBuilder()
    .withUrl(API_URL + NOTIFICACIONES_ENDPOINT, { accessTokenFactory: () => token() })
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start().then(function () {
    console.log("Conectado a SignalR Hub");
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("RecibirMensaje", (user, message) => {
    // Maneja el mensaje aquí
    console.log(user);
    console.log(message);
    alert(message);
});