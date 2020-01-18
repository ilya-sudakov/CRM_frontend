import React from 'react';
import './InputText.scss';

const InputText = (props) => {
    return (
        <div className="input_text">
            <div className="input_text__input">
                <div className="input_text__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <div className={props.error === true ? "input_text__input_field input_text__input_field--error" : "input_text__input_field"}>
                    <input type={props.type ? props.type : "text"}
                        name={props.name}
                        autoComplete="off"
                        onChange={props.handleInputChange}
                        defaultValue={props.defaultValue}
                        readOnly={props.readOnly}
                    />
                </div>
            </div>
            {props.error === true && <div className="input_text__error" onClick={
                props.setErrorsArr ? (() => props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false
                })) : null
            }>Поле не заполнено!</div>}
        </div>
    )
}

export default InputText;