import React from 'react';
import './button.scss';

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`btn ${props.variant}`}
        >
            {props.label}
        </button>
    )
}

export default Button;