import React, { useState, useEffect } from 'react';
import './RecordWork.scss';
import '../../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx';
import SelectWork from '../SelectWork/SelectWork.jsx';
import { getCategoriesNames } from '../../../../../utils/RequestsAPI/Products/Categories.jsx';
import { getProductById, getProductsByCategory } from '../../../../../utils/RequestsAPI/Products.jsx';

const RecordWork = (props) => {
    const [worktimeInputs, setWorkTimeInputs] = useState({
        date: new Date(),
        employee: '',
        works: ''
    })
    const [workTimeErrors, setWorkTimeErrors] = useState({
        date: false,
        employee: false,
        works: false
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        employee: false,
        works: false
    })
    const [showError, setShowError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            case 'works':
                setValidInputs({
                    ...validInputs,
                    works: (value !== null)
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
            date: false,
            employee: false,
            works: false
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
        setWorkTimeErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let id = 0;
        console.log(worktimeInputs);
        formIsValid() && addRequest(requestInputs)
            .then(res => res.json())
            .then(res => {
                id = res.id;
            })
            .then(() => {
                const productsArr = requestInputs.requestProducts.map((item) => {
                    return addProductsToRequest({
                        requestId: id,
                        quantity: item.quantity,
                        packaging: item.packaging,
                        name: item.name
                    })
                })
                Promise.all(productsArr)
                    .then(() => props.history.push("/"))
            })
            .catch(error => {
                alert('Ошибка при добавлении записи');
                // setShowError(true);
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setWorkTimeInputs({
            ...worktimeInputs,
            [name]: value
        })
        setWorkTimeErrors({
            ...workTimeErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание заявки";
        //Загружаем продукцию один раз, чтобы не загружать её в каждом окошке SelectWork
        getCategoriesNames() //Только категории
            .then(res => res.json())
            .then(res => {
                const categoriesArr = res;
                setCategories(res);
                let productsArr = [];
                const temp = categoriesArr.map((item) => {
                    let category = {
                        category: item.name
                    };
                    return getProductsByCategory(category) //Продукция по категории
                        .then(res => res.json())
                        .then(res => {
                            res.map(item => productsArr.push(item));
                            setProducts([...productsArr]);
                        })
                })
                Promise.all(temp)
                    .then(() => {
                        //Загружаем картинки по отдельности для каждой продукции
                        const temp = productsArr.map((item, index) => {
                            getProductById(item.id)
                                .then(res => res.json())
                                .then(res => {
                                    // console.log(res);
                                    productsArr.splice(index, 1, res);
                                    setProducts([...productsArr]);
                                })
                        })
                        Promise.all(temp)
                            .then(() => {
                                // console.log('all images downloaded');
                            })
                    })
            })
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Новая запись о работе</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата"
                    required
                    error={workTimeErrors.date}
                    name="date"
                    selected={worktimeInputs.date}
                    handleDateChange={(date) => {
                        validateField("date", date);
                        setWorkTimeInputs({
                            ...worktimeInputs,
                            date: date
                        })
                        setWorkTimeErrors({
                            ...workTimeErrors,
                            date: false
                        })
                    }}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                />
                {/* Список сотрудников */}
                <SelectEmployee
                    inputName="Выбор сотрудника"
                    required
                    error={workTimeErrors.employee}
                    userHasAccess={props.userHasAccess}
                    windowName="select-employee"
                    name="employee"
                    handleEmployeeChange={(value) => {
                        validateField("employee", value);
                        setWorkTimeInputs({
                            ...worktimeInputs,
                            employee: value
                        })
                        setWorkTimeErrors({
                            ...workTimeErrors,
                            employee: false
                        })
                    }}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                    readOnly
                />
                {/* Создание работы */}
                <div className="main-form__item">
                    <div className="main-form__input_name">Работы*</div>
                    <div className="main-form__input_field">
                        <SelectWork
                            handleWorkChange={(value) => {
                                validateField("works", value);
                                setWorkTimeInputs({
                                    ...worktimeInputs,
                                    works: value
                                })
                                setWorkTimeErrors({
                                    ...workTimeErrors,
                                    works: false
                                })
                            }}
                            userHasAccess={props.userHasAccess}
                            categories={categories}
                            products={products}
                        />
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Создать запись" />
                </div>
            </form>
        </div>
    );
};

export default RecordWork;