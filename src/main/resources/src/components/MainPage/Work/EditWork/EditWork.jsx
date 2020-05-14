import React, { useEffect, useState } from 'react';
import './EditWork.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { getWorkById, editWork } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';

const EditWork = (props) => {
    const [workInputs, setWorkInputs] = useState({
        work: "",
        typeOfWork: "Продукция"
    })
    const [workErrors, setWorkErrors] = useState({
        work: false,
    })
    const [validInputs, setValidInputs] = useState({
        work: true,
    })
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [workId, setWorkId] = useState(0);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
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
            work: false,
        });
        for (let item in validInputs) {
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setWorkErrors(newErrors);
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
        console.log(workInputs);
        formIsValid() && editWork(workInputs, workId)
            .then(() => props.history.push("/work-list"))
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setWorkInputs({
            ...workInputs,
            [name]: value
        })
        setWorkErrors({
            ...workErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование работы";
        const id = props.history.location.pathname.split("/work-list/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс работы!');
            props.history.push("/work-list");
        } else {
            setWorkId(id);
            getWorkById(id)
                .then(res => res.json())
                .then(oldWork => {
                    setWorkInputs({
                        work: oldWork.work,
                        typeOfWork: oldWork.typeOfWork ? oldWork.typeOfWork : 'Продукция'
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс работы!');
                    props.history.push("/work-list");
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Редактирование работы</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название работы"
                    required
                    error={workErrors.work}
                    defaultValue={workInputs.work}
                    name="work"
                    handleInputChange={handleInputChange}
                    errorsArr={workErrors}
                    setErrorsArr={setWorkErrors}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Тип работы</div>
                    <div className="main-form__input_field">
                        <select
                            name="typeOfWork"
                            value={workInputs.typeOfWork}
                            onChange={handleInputChange}
                        >
                            <option>Продукция</option>
                            <option>Чертеж</option>
                            <option>Без продукции/чертежа</option>
                        </select>
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/work-list')} value="Вернуться назад" />
                    {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить работу" />
                    {isLoading && <ImgLoader />} */}
                    <Button
                        text="Изменить работу"
                        isLoading={isLoading}
                        className="main-form__submit"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditWork;