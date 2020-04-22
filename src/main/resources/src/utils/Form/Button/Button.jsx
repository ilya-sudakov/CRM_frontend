import React, { useEffect, useState } from 'react';
import './Button.scss';

const Button = (props) => {
    const [className, setClassName] = useState('button');

    useEffect(() => {
        if (props.inverted) {
            setClassName(className + " button--inverted")
        }
    }, [])

    return (
        <button className={className + (props.className ? (" " + props.className) : '')} onClick={(event) => {
            event.preventDefault();
            console.log(event);
            !props.isLoading && props.onClick();
        }}>
            {props.imgSrc && <img className="button__img" src={props.imgSrc} alt="" />}
            <span className="button__text">{props.text ?? 'Нажмите'}</span>
            {props.isLoading && <div className="button__cover">
                <div class="button__loader"></div>
            </div>}
        </button>
    );
};

export default Button;