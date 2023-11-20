import React, { useState, useEffect, useRef } from 'react';
import Boton from '../Boton/Boton';
import './Temporizador.css'

const Temporizador = ({ initialSeconds, audioFile }) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(audioFile));

    useEffect(() => {
        setTimeLeft(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        let intervalId;

        if (isActive && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            playSound();
        }

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setTimeLeft(initialSeconds);
        setIsActive(false);
        stopSound();
    };

    const playSound = () => {
        setIsPlaying(true);
        audioRef.current.play();
    };

    const stopSound = () => {
        setIsPlaying(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return (
        <div className='temporizador-Container'>
            <div className='temporizador'>
                <label className='temporizador-restante'>{timeLeft}</label>
            </div>
            <Boton onclickEventHandler={toggleTimer} claseCss={"boton principal"} titulo={isActive ? 'Pausar' : 'Comenzar'} />

            {
                initialSeconds === timeLeft
                    ? (<></>)
                    : (<Boton onclickEventHandler={resetTimer} claseCss={"boton principal"} titulo={"Resetear"} />)
            }

            {isPlaying && <button onClick={stopSound}>Detener Sonido</button>}
        </div>
    );
};

export default Temporizador;
