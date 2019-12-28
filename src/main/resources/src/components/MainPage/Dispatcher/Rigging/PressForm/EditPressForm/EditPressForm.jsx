import React, { useState, useEffect } from 'react';
import './EditPressForm.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getPressFormById, editPressForm, editPartFromPressForm, addPartsToPressForm, deletePartsFromPressForm } from '../../../../../../utils/utilsAPI.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';

const EditPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [pressFormId, setPressFormId] = useState(0);
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
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(pressFormInputs);
        formIsValid() && editPressForm(pressFormInputs, pressFormId)
            .then(() => {
                //PUT if edited, POST if part is new
                const partsArr = pressFormInputs.parts.map((selected) => {
                    let edited = false;
                    pressFormInputs.pressParts.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editPartFromPressForm({
                                ...selected,
                                riggingId: pressFormId
                            }, selected.id)
                        )
                        : (
                            addPartsToPressForm({
                                ...selected,
                                riggingId: pressFormId
                            })
                        )
                })
                Promise.all(partsArr)
                    .then(() => {
                        //DELETE parts removed by user
                        const partsArr = pressFormInputs.pressParts.map((item) => {
                            let deleted = true;
                            pressFormInputs.parts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deletePartsFromPressForm(item.id))
                        })
                        Promise.all(partsArr)
                            .then(() => {
                                props.history.push("/dispatcher/rigging/press-form");
                            })
                    })
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPressFormInputs({
            ...pressFormInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPressFormInputs({
            ...pressFormInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование пресс-формы";
        const id = props.history.location.pathname.split("/dispatcher/rigging/press-form/edit/")[1];
        setPressFormId(id);
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс пресс-формы!');
            props.history.push("/dispatcher/rigging/press-form");
        } else {
            getPressFormById(id)
                .then(res => res.json())
                .then(res => {
                    setPressFormInputs({
                        ...res,
                        parts: res.pressParts
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <div className="edit_press_form">
            <div className="edit_press_form__title">Редактирование пресс-формы</div>
            <form className="edit_press_form__form">
                <InputText
                    inputName="Название"
                    required
                    error={riggingErrors.name}
                    name="name"
                    defaultValue={pressFormInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={riggingErrors.number}
                    name="number"
                    defaultValue={pressFormInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Комментарий"
                    // required
                    // error={riggingErrors.comment}
                    name="comment"
                    defaultValue={pressFormInputs.comment}
                    handleInputChange={handleInputChange}
                />
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Детали*</div>
                    <div className="edit_press_form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={pressFormInputs.pressParts}
                        />
                    </div>
                </div>
                <div className="edit_press_form__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_press_form__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
            </form>
        </div>
    )
}

export default EditPressForm;