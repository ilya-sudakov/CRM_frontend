import React, { useState, useEffect } from 'react';
import './EditStamp.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';

const EditStamp = (props) => {
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
        document.title = "Редактирование штампа";
    }, [])

    return (
        <div className="edit_stamp">
            <div className="edit_stamp__title">Редактирование штампа</div>
            <form className="edit_stamp__form">
                <div className="edit_stamp__item">
                    <div className="edit_stamp__input_name">Название*</div>
                    <div className="edit_stamp__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={stampInputs.name}
                        />
                    </div>
                </div>
                <div className="edit_stamp__item">
                    <div className="edit_stamp__input_name">Артикул*</div>
                    <div className="edit_stamp__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={stampInputs.number}
                        />
                    </div>
                </div>
                <div className="edit_stamp__item">
                    <div className="edit_stamp__input_name">Комментарий</div>
                    <div className="edit_stamp__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={stampInputs.comment}
                        />
                    </div>
                </div>
                <div className="edit_stamp__item">
                    <div className="edit_stamp__input_name">Детали*</div>
                    <div className="edit_stamp__input_field">
                        {/* <input type="text" name="name" autoComplete="off" onChange={handleInputChange} /> */}
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={stampInputs.parts}
                            searchPlaceholder="Введите название продукта для поиска..."
                        />
                    </div>
                </div>
                <div className="edit_stamp__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_stamp__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
            </form>
        </div>
    )
}

export default EditStamp;