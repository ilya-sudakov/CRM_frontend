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
            // console.log(event);
            if (!props.isLoading) {
                props.onClick();
            }
        }}>
            {props.imgSrc && <img className={props.isLoading ? "button__img button__img--hidden" : "button__img"} src={props.imgSrc} alt="" />}
            <span className={props.isLoading ? "button__text button__text--hidden" : "button__text"}>{props.text ?? 'Нажмите'}</span>
            {props.isLoading && <div class="button__circle"></div>}
        </button>
    );
};

export default Button;