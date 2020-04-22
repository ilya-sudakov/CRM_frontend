import React, { useEffect, useState } from 'react';
import './EditPart.scss';
import '../../../../../../utils/Form/Form.scss';
import { getPartById, editPart, editPartsOfPart, addPartsToPart, deletePartsFromPart } from '../../../../../../utils/RequestsAPI/Rigging/Parts.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { formatDateString } from '../../../../../../utils/functions.jsx';
import Button from '../../../../../../utils/Form/Button/Button.jsx';

const EditPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: [],
        lastEdited: new Date()
    })
    const [partId, setPartId] = useState(0);
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
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        setIsLoading(true);
        // console.log(partInputs);
        formIsValid() && editPart({ ...partInputs, lastEdited: new Date() }, partId)
            .then(() => {
                //PUT if edited, POST if part is new
                const partsArr = partInputs.parts.map((selected) => {
                    let edited = false;
                    partInputs.detailParts.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editPartsOfPart({
                                ...selected,
                                riggingId: partId
                            }, selected.id)
                        )
                        : (
                            addPartsToPart({
                                ...selected,
                                riggingId: partId
                            })
                        )
                })
                Promise.all(partsArr)
                    .then(() => {
                        //DELETE parts removed by user
                        const partsArr = partInputs.detailParts.map((item) => {
                            let deleted = true;
                            partInputs.parts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deletePartsFromPart(item.id))
                        })
                        Promise.all(partsArr)
                            .then(() => {
                                props.history.push("/dispatcher/rigging/parts");
                            })
                    })
            })
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPartInputs({
            ...partInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование запчасти";
        const id = props.history.location.pathname.split("/dispatcher/rigging/parts/edit/")[1];
        setPartId(id);
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс запчасти!');
            props.history.push("/dispatcher/rigging/parts");
        } else {
            getPartById(id)
                .then(res => res.json())
                .then(res => {
                    setPartInputs({
                        ...res,
                        parts: res.detailParts
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPartInputs({
            ...partInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    return (
        <div className="main-form">
            <div className="main-form__title">Редактирование запчасти</div>
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
                    defaultValue={partInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={riggingErrors.number}
                    name="number"
                    defaultValue={partInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Комментарий"
                    // required
                    // error={riggingErrors.comment}
                    name="comment"
                    defaultValue={partInputs.comment}
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали*</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                            defaultValue={partInputs.detailParts}
                        />
                    </div>
                </div>
                <InputText
                    inputName="Дата последнего изменения"
                    name="lastEdited"
                    readOnly
                    defaultValue={formatDateString(partInputs.lastEdited)}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/rigging/parts')} value="Вернуться назад" />
                    {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить запчасть" />
                    {isLoading && <ImgLoader />} */}
                    <Button
                        text="Редактировать запись"
                        isLoading={isLoading}
                        className="main-form__submit"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditPart;