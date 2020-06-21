import React, { useState, useEffect } from 'react';
import style from './dropdown.scss';

const Dropdown = (props) => {

    const [isOpen, toggleIsOpen] = useState(false);
    const [wrapperRef, setWrapperRef] = useState(null);
    
    const onChange = (val, index) => {
        props.onChange && props.onChange(val, index);
    }

    const toggleDropdown = (state) => {
        toggleIsOpen(state);
    }

    const handleClickOutside = (event) => {
        if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            toggleDropdown(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return function CleanUp(){
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div
            className={`dropdown ${isOpen ? 'active' : ''}`}
            onClick={() => toggleIsOpen(!isOpen)}
            ref={r => {setWrapperRef(r)}}>
            {props.label ? <label className={`dropdown-label`}>{props.label}</label> : null}
            <div
                className='value-holder'
            >
                <div
                    className='placeholder'>
                    {props.optionList.length && props.value != undefined ? (props.optionList[props.value].label || props.optionList[props.value]) : props.placeholder}
                </div>
            </div>
            <ul className={`${isOpen ? 'open' : 'close'}`}>
                {
                    props.optionList.map((cur, index) => {
                        return (
                            <li
                                key={cur.label || cur}
                                className={`list-item ${props.value == index ? 'active' : ''}`}
                                onClick={() => onChange(cur, index)}
                            >
                                {cur.label ? cur.label : cur}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

export default Dropdown;