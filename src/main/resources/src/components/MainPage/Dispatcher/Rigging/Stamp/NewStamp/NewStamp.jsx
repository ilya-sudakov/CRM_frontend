import React, { useState, useEffect } from 'react';
import './NewStamp.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';

const NewStamp = (props) => {
    const [stampInputs, setStampInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [stampErrors, setStampErrors] = useState({
        name: '',
        number: '',
        comment: '',
        parts: ''
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
        console.log(stampInputs);
        // formIsValid() && addStamp(stampInputs)
        //     .then(() => props.history.push("/dispatcher/rigging/stamp"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setStampInputs({
            ...stampInputs,
            [name]: value
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setStampInputs({
            ...stampInputs,
            parts: newParts
        })
    }

    useEffect(() => {
        document.title = "Создание штампа";
    }, [])

    return (
        <div className="new_stamp">
            <div className="new_stamp__title">Новый штамп</div>
            <form className="new_stamp__form">
                <div className="new_stamp__item">
                    <div className="new_stamp__input_name">Название*</div>
                    <div className="new_stamp__input_field">
                        <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_stamp__item">
                    <div className="new_stamp__input_name">Артикул*</div>
                    <div className="new_stamp__input_field">
                        <input type="text" name="number" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_stamp__item">
                    <div className="new_stamp__input_name">Комментарий</div>
                    <div className="new_stamp__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_stamp__item">
                    <div className="new_stamp__input_name">Детали*</div>
                    <div className="new_stamp__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                        />
                    </div>
                </div>
                <div className="new_stamp__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_stamp__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
            </form>
        </div>
    )
}

export default NewStamp;