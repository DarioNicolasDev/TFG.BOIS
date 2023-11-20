import { React, useState } from 'react'
import './Buscador.css'




const Buscador = ({ texto, setTexto }) => {

    const [inputValue, setInputValue] = useState(texto)

    const onChangeEventHandler = (event) => {
        setInputValue(event.target.value);
        setTexto(event.target.value);
    }

    return (
        <input className='buscador' placeholder='buscar...' type='text' value={texto} onChange={onChangeEventHandler} />
    )
}

export default Buscador