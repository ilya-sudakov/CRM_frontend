import React, { useState, useEffect } from 'react';
import './EditStamp.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getStampById, editStamp, editPartsOfStamp, addPartsToStamp, deletePartsFromStamp } from '../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditStamp = (props) => {
    const [stampInputs, setStampInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [stampId, setStampId] = useState(0);
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
                setValidInputs({
                    ...validInputs,
                    [fieldName]: (value !== "")
                });
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
        // console.log(stampInputs.parts);
        formIsValid() && editStamp(stampInputs, stampId)
            .then(() => {
                //PUT if edited, POST if part is new
                const partsArr = stampInputs.parts.map((selected) => {
                    let edited = false;
                    stampInputs.stampParts.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editPartsOfStamp({
                                ...selected,
                                riggingId: stampId
                            }, selected.id)
                        )
                        : (
                            addPartsToStamp({
                                ...selected,
                                riggingId: stampId
                            })
                        )
                })
                Promise.all(partsArr)
                    .then(() => {
                        //DELETE parts removed by user
                        const partsArr = stampInputs.stampParts.map((item) => {
                            let deleted = true;
                            stampInputs.parts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deletePartsFromStamp(item.id))
                        })
                        Promise.all(partsArr)
                            .then(() => {
                                props.history.push("/dispatcher/rigging/stamp");
                            })
                    })
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setStampInputs({
            ...stampInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setStampInputs({
            ...stampInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование штампа";
        const id = props.history.location.pathname.split("/dispatcher/rigging/stamp/edit/")[1];
        setStampId(id);
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс штампа!');
            props.history.push("/dispatcher/rigging/stamp");
        } else {
            getStampById(id)
                .then(res => res.json())
                .then(res => {
                    setStampInputs({
                        ...res,
                        parts: res.stampParts
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="edit_stamp">
            <div className="edit_stamp__title">Редактирование штампа</div>
            <form className="edit_stamp__form">
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
                    defaultValue={stampInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={riggingErrors.number}
                    name="number"
                    defaultValue={stampInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Комментарий"
                    // required
                    // error={riggingErrors.comment}
                    name="comment"
                    defaultValue={stampInputs.comment}
                    handleInputChange={handleInputChange}
                />
                <div className="edit_stamp__item">
                    <div className="edit_stamp__input_name">Детали*</div>
                    <div className="edit_stamp__input_field">
                        {/* <input type="text" name="name" autoComplete="off" onChange={handleInputChange} /> */}
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={stampInputs.stampParts}
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