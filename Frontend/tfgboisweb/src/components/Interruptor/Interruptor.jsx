import React, { useState } from 'react';
import './Interruptor.css'; // Asegúrate de tener un archivo CSS con este nombre

const Interruptor = ({ id, checked, onChange }) => {

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="toggle-switch-checkbox"
            />
            <span className="toggle-switch-slider"></span>
        </label>
    );
};

export default Interruptor;