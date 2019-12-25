import React, { useState, useEffect } from 'react';
import './EditMachine.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';

const EditMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
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
        console.log(machineInputs);
        // formIsValid() && addMachine(machineInputs)
        //     .then(() => props.history.push("/dispatcher/rigging/machine"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setMachineInputs({
            ...machineInputs,
            [name]: value
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setMachineInputs({
            ...machineInputs,
            parts: newParts
        })
    }

    useEffect(() => {
        document.title = "Редактирование штампа";
    }, [])

    return (
        <div className="edit_machine">
            <div className="edit_machine__title">Редактирование штампа</div>
            <form className="edit_machine__form">
                <div className="edit_machine__item">
                    <div className="edit_machine__input_name">Название*</div>
                    <div className="edit_machine__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={machineInputs.name}
                        />
                    </div>
                </div>
                <div className="edit_machine__item">
                    <div className="edit_machine__input_name">Артикул*</div>
                    <div className="edit_machine__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={machineInputs.number}
                        />
                    </div>
                </div>
                <div className="edit_machine__item">
                    <div className="edit_machine__input_name">Комментарий</div>
                    <div className="edit_machine__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={machineInputs.comment}
                        />
                    </div>
                </div>
                <div className="edit_machine__item">
                    <div className="edit_machine__input_name">Детали*</div>
                    <div className="edit_machine__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={machineInputs.parts}
                        />
                    </div>
                </div>
                <div className="edit_machine__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_machine__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
            </form>
        </div>
    )
}

export default EditMachine;