import React, { useState, useEffect } from 'react';
import './NewMachine.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { addMachine, addPartsToMachine } from '../../../../../../utils/utilsAPI.jsx';

const NewMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
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
        // console.log(machineInputs);
        let machineId = 1;
        formIsValid() && addMachine(machineInputs)
            .then(res => res.json())
            .then(res => machineId = res.id)
            .then(() => {
                const parts = machineInputs.parts.map((item) => {
                    let newPart = Object.assign({
                        ...item,
                        riggingId: machineId
                    })
                    return addPartsToMachine(newPart);
                })
                Promise.all(parts)
                    .then(() => props.history.push("/dispatcher/rigging/machine"))
            })
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
        document.title = "Создание станка";
    }, [])

    return (
        <div className="new_machine">
            <div className="new_machine__title">Новый станок</div>
            <form className="new_machine__form">
                <div className="new_machine__item">
                    <div className="new_machine__input_name">Название*</div>
                    <div className="new_machine__input_field">
                        <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_machine__item">
                    <div className="new_machine__input_name">Артикул*</div>
                    <div className="new_machine__input_field">
                        <input type="text" name="number" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_machine__item">
                    <div className="new_machine__input_name">Комментарий</div>
                    <div className="new_machine__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_machine__item">
                    <div className="new_machine__input_name">Детали*</div>
                    <div className="new_machine__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                        />
                    </div>
                </div>
                <div className="new_machine__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_machine__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
            </form>
        </div>
    )
}

export default NewMachine;