import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = ({ visible }) => {
    if (visible) {
        return (

            <nav>
                <ol>
                    <li>
                        <Link to="/">
                            <img src='./images/Home.svg' />
                            <span>Inicio</span>
                        </Link>

                    </li>
                    <li>
                        <Link to="/favoritos">
                            <img src='./images/Favoritos.svg' />
                            <span>Favoritos</span>
                        </Link>

                    </li>
                    <li>
                        <Link to="/perfil">
                            <img src='./images/Perfil.svg' />
                            <span>Perfil</span>
                        </Link>
                    </li>

                </ol>
            </nav>
        )
    } else {
        return (<></>)
    }

}

export default Footer