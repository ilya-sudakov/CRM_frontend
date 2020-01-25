import React, { useEffect } from 'react';
import './InputProducts.scss';
import Select from '../../../components/MainPage/Select/Select.jsx';

const InputProducts = (props) => {
    useEffect(() => {

    }, [])
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
                    workshop={props.workshop}
                    noPackaging={props.noPackaging}
                    userHasAccess={props.userHasAccess}
                />
            </div>
        </div>
    )
}

export default InputProducts;