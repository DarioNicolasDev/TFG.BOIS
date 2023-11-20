import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = ({ visible, actual }) => {

    if (visible) {
        return (

            <nav>
                <ol>
                    <li >
                        <Link to="/">
                            <div className={actual === 'Home' ? 'nav-opcion nav-activo' : 'nav-opcion'}>
                                <img src='./images/Home.svg' />
                                <span>Inicio</span>
                            </div>
                        </Link>

                    </li>
                    <li >
                        <Link to="/favoritos">
                            <div className={actual === 'Favoritos' ? 'nav-opcion nav-activo' : 'nav-opcion'}>
                                <img src='./images/Favoritos.svg' />
                                <span>Favoritos</span>
                            </div>

                        </Link>

                    </li>
                    <li >
                        <Link to="/perfil">
                            <div className={actual === 'Perfil' ? 'nav-opcion nav-activo' : 'nav-opcion'}>
                                <img src='./images/Perfil.svg' />
                                <span>Perfil</span>
                            </div>

                        </Link>
                    </li>

                </ol>
            </nav >
        )
    } else {
        return (<></>)
    }

}

export default Footer