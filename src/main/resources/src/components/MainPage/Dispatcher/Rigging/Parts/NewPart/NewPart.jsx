import React, { useEffect, useState } from 'react';
import './NewPart.scss';
import { addPart } from '../../../../../../utils/utilsAPI.jsx';

const NewPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
    })
    const [productErrors, setProductErrors] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
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
        formIsValid() && addPart(partInputs)
            .then(() => props.history.push("/dispatcher/rigging/parts"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPartInputs({
            ...partInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Создание детали";
    }, [])
    return (
        <div className="new_part">
            <div className="new_part__title">Новая деталь</div>
            <form className="new_part__form">
                <div className="new_part__item">
                    <div className="new_part__input_name">Артикул*</div>
                    <div className="new_part__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_part__item">
                    <div className="new_part__input_name">Название*</div>
                    <div className="new_part__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_part__item">
                    <div className="new_part__input_name">Размеры*</div>
                    <div className="new_part__input_field">
                        <input type="text"
                            name="dimensions"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_part__item">
                    <div className="new_part__input_name">Обработка*</div>
                    <div className="new_part__input_field">
                        <input type="text"
                            name="processing"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_part__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_part__submit" type="submit" onClick={handleSubmit} value="Добавить деталь" />
            </form>
        </div>
    );
};

export default NewPart;