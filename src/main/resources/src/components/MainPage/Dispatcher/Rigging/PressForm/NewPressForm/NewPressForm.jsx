import React, { useState, useEffect } from 'react';
import './NewPressForm.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';

const NewPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [nameValid, setNameValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setNameValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (nameValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(pressFormInputs);
        // formIsValid() && addMachine(pressFormInputs)
        //     .then(() => props.history.push("/dispatcher/rigging/machine"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPressFormInputs({
            ...pressFormInputs,
            [name]: value
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPressFormInputs({
            ...pressFormInputs,
            parts: newParts
        })
    }

    useEffect(() => {
        document.title = "Создание пресс-формы";
    }, [])

    return (
        <div className="new_press_form">
            <div className="new_press_form__title">Новая пресс-форма</div>
            <form className="new_press_form__form">
                <div className="new_press_form__item">
                    <div className="new_press_form__input_name">Название*</div>
                    <div className="new_press_form__input_field">
                        <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_press_form__item">
                    <div className="new_press_form__input_name">Артикул*</div>
                    <div className="new_press_form__input_field">
                        <input type="text" name="number" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_press_form__item">
                    <div className="new_press_form__input_name">Комментарий</div>
                    <div className="new_press_form__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_press_form__item">
                    <div className="new_press_form__input_name">Детали*</div>
                    <div className="new_press_form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                        />
                    </div>
                </div>
                <div className="new_press_form__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_press_form__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
            </form>
        </div>
    )
}

export default NewPressForm;