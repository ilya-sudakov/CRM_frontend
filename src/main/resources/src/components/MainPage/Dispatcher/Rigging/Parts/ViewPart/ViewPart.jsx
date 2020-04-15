import React, { useState, useEffect } from 'react';
import './ViewPart.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getPartById } from '../../../../../../utils/RequestsAPI/Rigging/Parts.jsx';
import { formatDateString } from '../../../../../../utils/functions.jsx';

const ViewPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: [],
        lastEdited: new Date()
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/dispatcher/rigging/parts");
    }

    useEffect(() => {
        document.title = "Просмотр запчасти";
        const id = props.history.location.pathname.split("/dispatcher/rigging/parts/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс запчасти!');
            props.history.push("/dispatcher/rigging/parts");
        } else {
            getPartById(id)
                .then(res => res.json())
                .then(res => {
                    setPartInputs(res);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Просмотр запчасти</div>
            <form className="main-form__form">
                <div className="main-form__item">
                    <div className="main-form__input_name">Название</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            readOnly
                            defaultValue={partInputs.name}
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
                            defaultValue={partInputs.number}
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
                            defaultValue={partInputs.comment}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            readOnly
                            defaultValue={partInputs.detailParts}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Дата последнего изменения</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="lastEdited"
                            autoComplete="off"
                            readOnly
                            defaultValue={formatDateString(partInputs.lastEdited)}
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

export default ViewPart;