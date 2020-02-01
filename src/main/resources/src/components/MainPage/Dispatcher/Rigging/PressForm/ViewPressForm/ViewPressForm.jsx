import React, { useState, useEffect } from 'react';
import './ViewPressForm.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getPressFormById } from '../../../../../../utils/RequestsAPI/Rigging/PressForm.jsx';

const ViewPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/dispatcher/rigging/press-form");
    }

    useEffect(() => {
        document.title = "Просмотр пресс-формы";
        const id = props.history.location.pathname.split("/dispatcher/rigging/press-form/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс пресс-формы!');
            props.history.push("/dispatcher/rigging/press-form");
        } else {
            getPressFormById(id)
                .then(res => res.json())
                .then(res => {
                    setPressFormInputs(res);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Просмотр пресс-формы</div>
            <form className="main-form__form">
                <div className="main-form__item">
                    <div className="main-form__input_name">Название</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            readOnly
                            defaultValue={pressFormInputs.name}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Артикул</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            readOnly
                            defaultValue={pressFormInputs.number}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Комментарий</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            readOnly
                            defaultValue={pressFormInputs.comment}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            readOnly
                            defaultValue={pressFormInputs.pressParts}
                        />
                    </div>
                </div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={handleSubmit} value="Вернуться назад" />
                </div>
            </form>
        </div>
    )
}

export default ViewPressForm;