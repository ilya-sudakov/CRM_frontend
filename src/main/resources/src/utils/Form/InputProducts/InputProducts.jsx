import React from 'react';
import './InputProducts.scss';
import Select from '../../../components/MainPage/Select/Select.jsx';

const InputProducts = (props) => {
    return (
        <div className="input_products">
            <div className="input_products__input">
                <div className="input_products__input_name">{props.inputName + (props.required ? '*' : '')}</div>
                <Select
                    options={props.options}
                    onChange={props.onChange}
                    searchPlaceholder={props.searchPlaceholder}
                    error={props.error}
                    errorsArr={props.errorsArr}
                    setErrorsArr={props.setErrorsArr}
                    defaultValue={props.defaultValue}
                    readOnly={props.readOnly}
                />
            </div>
        </div>
    )
}

export default InputProducts;