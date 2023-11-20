import React, { useState } from 'react'

const Favorito = ({ claseCss }) => {
    const [favoritoActivo, setFavoritoActivo] = useState(false);
    const [favoritoImage, setFavoritoImage] = useState('Favoritos-vacio.svg');
    const favoritosEventHandler = () => {
        if (favoritoActivo) {
            setFavoritoImage('Favoritos-lleno.svg')
        } else {
            setFavoritoImage('Favoritos-vacio.svg')
        }
        setFavoritoActivo(!favoritoActivo);
    }

    return (
        <img className={claseCss} onClick={favoritosEventHandler} src={`./images/${favoritoImage}`} />
    )
}

export default Favorito