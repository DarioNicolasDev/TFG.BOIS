import React, { useState } from 'react'
import { autenticar, registrar } from '../../services/UsuarioServices'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import Boton from '../../components/Boton/Boton';


const Login = () => {
    const navigate = useNavigate();
    const [estaCargando, setEstaCargando] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState({
        "id": 0,
        "nombreUsuario": "",
        "password": "",
        "email": "",
        "habilitado": true
    });


    const iniciarSesionEventHandler = async (event) => {
        setEstaCargando(true);
        event.preventDefault();
        try {
            const data = await autenticar(usuario);
            if (data && data.data && data.data[0].token) {
                const autenticacion = JSON.stringify(data.data[0]);
                login(autenticacion);
                setEstaCargando(false);
                navigate('/');
            } else {
                localStorage.setItem('autenticacion', null)
                if (data && data.detail) {
                    alert(data.detail);
                }
            }

        }
        catch (error) {
            setError(error);
            alert(error.statusText);
        }

        setEstaCargando(false);

    }

    const registrarUsuarioEventHandler = async (event) => {
        setEstaCargando(true);
        event.preventDefault();
        const data = await registrar(usuario);
        if (data && data.data && data.data[0].token) {
            const autenticacion = JSON.stringify(data.data[0]);
            login(autenticacion);
            navigate('/');
        } else {
            localStorage.setItem('autenticacion', null)
        }
        setEstaCargando(false);
    }

    const emailEventHandler = (event) => {
        event.preventDefault();
        setUsuario(usuarioActual => ({ ...usuarioActual, email: event.target.value }));
    }

    const passwordEventHandler = (event) => {
        event.preventDefault();
        setUsuario(usuarioActual => ({ ...usuarioActual, password: event.target.value }));
    }

    const nombreEventHandler = (event) => {
        event.preventDefault();
        setUsuario(usuarioActual => ({ ...usuarioActual, nombreUsuario: event.target.value }));
    }

    const mostrarRegistroToogle = (event) => {
        event.preventDefault();
        setMostrarRegistro(prev => !mostrarRegistro);
    }



    return (
        <>
            <img className='imgLogin' src='./images/chef.svg' />
            <div className='formContainer'>
                {!mostrarRegistro ?
                    (<form>
                        <h3>Ingreso a la aplicación</h3>
                        <input type='text' placeholder='Email' onChange={emailEventHandler} value={usuario.email}></input>
                        <input type='password' placeholder='Contraseña' onChange={passwordEventHandler} value={usuario.password}></input>
                        <Boton onclickEventHandler={iniciarSesionEventHandler} titulo={"Iniciar sesión"} tituloDeshabilitado={"Iniciando sesión..."} isDisable={estaCargando} claseCss={"boton principal"} />

                        <a href='#' onClick={mostrarRegistroToogle}>Quiero registrarme</a>
                    </form>)
                    :
                    (<form>
                        <h3>Registro de usuario</h3>
                        <input type='text' placeholder='Nombre' onChange={nombreEventHandler} value={usuario.nombreUsuario}></input>
                        <input type='text' placeholder='Email' onChange={emailEventHandler} value={usuario.email}></input>
                        <input type='password' placeholder='Contraseña' onChange={passwordEventHandler} value={usuario.password}></input>
                        <Boton onclickEventHandler={registrarUsuarioEventHandler} titulo={"Registrarme"} tituloDeshabilitado={"Registrando usuario..."} isDisable={estaCargando} claseCss={"boton principal"} />
                        <a href='#' onClick={mostrarRegistroToogle}>Cancelar</a>
                    </form>)}
            </div>

        </>
    )
}

export default Login