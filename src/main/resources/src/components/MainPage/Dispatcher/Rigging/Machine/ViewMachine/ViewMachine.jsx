import React, { useState, useEffect } from 'react';
import './ViewMachine.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getMachineById } from '../../../../../../utils/RequestsAPI/Rigging/Machine.jsx';
import { formatDateString } from '../../../../../../utils/functions.jsx';

const ViewMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: [],
        lastEdited: new Date()
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/dispatcher/rigging/machine");
    }

    useEffect(() => {
        document.title = "Просмотр станка";
        const id = props.history.location.pathname.split("/dispatcher/rigging/machine/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс станка!');
            props.history.push("/dispatcher/rigging/machine");
        } else {
            getMachineById(id)
                .then(res => res.json())
                .then(res => {
                    setMachineInputs(res);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Просмотр станка</div>
            <form className="main-form__form">
                <div className="main-form__item">
                    <div className="main-form__input_name">Название</div>
                    <div className="main-form__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            readOnly
                            defaultValue={machineInputs.name}
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
                            defaultValue={machineInputs.number}
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
                            defaultValue={machineInputs.comment}
                        />
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            readOnly
                            defaultValue={machineInputs.benchParts}
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
                            defaultValue={formatDateString(machineInputs.lastEdited)}
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

export default ViewMachine;