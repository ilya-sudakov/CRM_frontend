import React, { useState, useEffect } from 'react';
import './ViewMachine.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getMachineById } from '../../../../../../utils/RequestsAPI/Rigging/Machine.jsx';

const ViewMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
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
        <div className="view_machine">
            <div className="view_machine__title">Просмотр станка</div>
            <form className="view_machine__form">
                <div className="view_machine__item">
                    <div className="view_machine__input_name">Название</div>
                    <div className="view_machine__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            readOnly
                            defaultValue={machineInputs.name}
                        />
                    </div>
                </div>
                <div className="view_machine__item">
                    <div className="view_machine__input_name">Артикул</div>
                    <div className="view_machine__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            readOnly
                            defaultValue={machineInputs.number}
                        />
                    </div>
                </div>
                <div className="view_machine__item">
                    <div className="view_machine__input_name">Комментарий</div>
                    <div className="view_machine__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            readOnly
                            defaultValue={machineInputs.comment}
                        />
                    </div>
                </div>
                <div className="view_machine__item">
                    <div className="view_machine__input_name">Детали</div>
                    <div className="view_machine__input_field">
                        <SelectParts
                            readOnly
                            defaultValue={machineInputs.benchParts}
                        />
                    </div>
                </div>
                <input className="view_machine__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
            </form>
        </div>
    )
}

export default ViewMachine;