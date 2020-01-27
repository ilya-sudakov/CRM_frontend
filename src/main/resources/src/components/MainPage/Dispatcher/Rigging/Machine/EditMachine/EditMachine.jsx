import React, { useState, useEffect } from 'react';
import './EditMachine.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { editMachine, editPartsOfMachine, deletePartsFromMachine, getMachineById, addPartsToMachine } from '../../../../../../utils/RequestsAPI/Rigging/Machine.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [machineId, setMachineId] = useState(0);
    const [riggingErrors, setRiggingErrors] = useState({
        name: false,
        number: false,
        // comment: false,
        parts: false,
    })
    const [validInputs, setValidInputs] = useState({
        name: true,
        number: true,
        // comment: true,
        parts: true,
    })
    const [showError, setShowError] = useState(false);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'parts':
                setValidInputs({
                    ...validInputs,
                    parts: (value.length > 0)
                });
                break;
            default:
                if (validInputs[fieldName] !== undefined) {
                    setValidInputs({
                        ...validInputs,
                        [fieldName]: (value !== "")
                    })
                }
                break;
        }
    }

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            name: false,
            number: false,
            // comment: false,
            parts: false,
        });
        for (let item in validInputs) {
            // console.log(item, validInputs[item]);            
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setRiggingErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(machineInputs);
        formIsValid() && editMachine(machineInputs, machineId)
            .then(() => {
                //PUT if edited, POST if part is new
                const partsArr = machineInputs.parts.map((selected) => {
                    let edited = false;
                    machineInputs.benchParts.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editPartsOfMachine({
                                ...selected,
                                riggingId: machineId
                            }, selected.id)
                        )
                        : (
                            addPartsToMachine({
                                ...selected,
                                riggingId: machineId
                            })
                        )
                })
                Promise.all(partsArr)
                    .then(() => {
                        //DELETE parts removed by user
                        const partsArr = machineInputs.benchParts.map((item) => {
                            let deleted = true;
                            machineInputs.parts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deletePartsFromMachine(item.id))
                        })
                        Promise.all(partsArr)
                            .then(() => {
                                props.history.push("/dispatcher/rigging/machine");
                            })
                    })
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setMachineInputs({
            ...machineInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setMachineInputs({
            ...machineInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование станка";
        const id = props.history.location.pathname.split("/dispatcher/rigging/machine/edit/")[1];
        setMachineId(id);
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс станка!');
            props.history.push("/dispatcher/rigging/machine");
        } else {
            getMachineById(id)
                .then(res => res.json())
                .then(res => {
                    setMachineInputs({
                        ...res,
                        parts: res.benchParts
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Редактирование станка</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название"
                    required
                    error={riggingErrors.name}
                    name="name"
                    defaultValue={machineInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={riggingErrors.number}
                    name="number"
                    defaultValue={machineInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Комментарий"
                    // required
                    // error={riggingErrors.comment}
                    name="comment"
                    defaultValue={machineInputs.comment}
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали*</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={machineInputs.benchParts}
                        />
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/rigging/machine')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
                </div>
            </form>
        </div>
    )
}

export default EditMachine;