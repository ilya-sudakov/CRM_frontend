import React, { useState, useEffect } from 'react';
import './EditPressForm.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';

const EditPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [nameValid, setNameValid] = useState(true);

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
        // formIsValid() && addPressForm(pressFormInputs)
        //     .then(() => props.history.push("/dispatcher/rigging/press-form"))
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
        document.title = "Редактирование пресс-формы";
    }, [])

    return (
        <div className="edit_press_form">
            <div className="edit_press_form__title">Редактирование пресс-формы</div>
            <form className="edit_press_form__form">
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Название*</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.name}
                        />
                    </div>
                </div>
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Артикул*</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.number}
                        />
                    </div>
                </div>
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Комментарий</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.comment}
                        />
                    </div>
                </div>
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Детали*</div>
                    <div className="edit_press_form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={pressFormInputs.parts}
                        />
                    </div>
                </div>
                <div className="edit_press_form__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_press_form__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
            </form>
        </div>
    )
}

export default EditPressForm;