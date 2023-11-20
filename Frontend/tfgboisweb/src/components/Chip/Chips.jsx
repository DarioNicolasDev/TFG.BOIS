import React, { useState, useEffect } from 'react';
import './Chips.css';


const Chips = ({ items, etiqueta, onChipClick, chipsSeleccionados, agregarX, claseCss }) => {
    const [chipColores, setChipColores] = useState({});

    // Generar color pastel aleatorio
    const generatePastelColor = () => {
        const h = Math.floor(Math.random() * 360);
        const s = 75 + Math.floor(Math.random() * 10); // Manteniendo la saturación en rangos altos para tonos pastel
        const l = 85 + Math.floor(Math.random() * 10); // Manteniendo la luminosidad en rangos altos para tonos pastel
        return `hsl(${h},${s}%,${l}%)`;
    };

    // Actualizar colores para nuevos chips seleccionados
    useEffect(() => {
        const newChipColores = { ...chipColores };
        chipsSeleccionados.forEach(chip => {
            if (!newChipColores[chip.id]) {
                newChipColores[chip.id] = generatePastelColor();
            }
        });
        setChipColores(newChipColores);
        // Dependerá de los chips seleccionados, si cambian, actualizamos los colores
    }, [chipsSeleccionados]);

    // Ordenar los elementos para mostrar primero los seleccionados
    const orderedItems = [...items].sort((a, b) => {
        const aSelected = chipsSeleccionados.some(chip => chip.id === a.id);
        const bSelected = chipsSeleccionados.some(chip => chip.id === b.id);
        return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
    });

    if (items) {
        return (
            <div className="chips-container">
                {orderedItems.map((item) => {
                    const isSelected = chipsSeleccionados.some(chip => chip.id === item.id);
                    const style = isSelected ? { backgroundColor: chipColores[item.id] } : undefined;

                    return (

                        item
                            ? (
                                <div
                                    key={item.id}
                                    className={`chip ${isSelected ? 'selected' + claseCss : '' + claseCss}`}
                                    style={style}
                                    onClick={() => onChipClick(item)}>
                                    {agregarX
                                        ? (item[etiqueta] + ' X')
                                        : (item[etiqueta])}
                                </div>)
                            : (<></>)
                    );
                })}
            </div>
        );
    } else {
        return (<></>)
    }


};

export default Chips;
