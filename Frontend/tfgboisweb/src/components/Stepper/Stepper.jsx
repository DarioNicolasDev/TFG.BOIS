import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep, steps, onclickEventHandler }) => {


    return (
        <div className="stepper-container">
            <div className="step-line"></div>
            {steps.map((step, index) => (
                <div className="step-container" key={index}>
                    <div id={index + 1} onClick={onclickEventHandler} className={`step ${currentStep >= index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </div>
                    <div className={`step-title ${currentStep === index + 1 ? 'active' : ''}`}>
                        {step}
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Stepper;
