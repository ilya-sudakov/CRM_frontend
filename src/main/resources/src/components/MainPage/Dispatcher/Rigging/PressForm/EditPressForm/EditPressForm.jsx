import React, { useState, useEffect } from 'react';
import './EditPressForm.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { getPressFormById, editPressForm, editPartFromPressForm, addPartsToPressForm, deletePartsFromPressForm } from '../../../../../../utils/utilsAPI.jsx';

const EditPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [nameValid, setNameValid] = useState(true);
    const [pressFormId, setPressFormId] = useState(0);

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
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPressFormInputs({
            ...pressFormInputs,
            parts: newParts
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
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Название*</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.name}
                        />
                    </div>
                </div>
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Артикул*</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="number"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.number}
                        />
                    </div>
                </div>
                <div className="edit_press_form__item">
                    <div className="edit_press_form__input_name">Комментарий</div>
                    <div className="edit_press_form__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={pressFormInputs.comment}
                        />
                    </div>
                </div>
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