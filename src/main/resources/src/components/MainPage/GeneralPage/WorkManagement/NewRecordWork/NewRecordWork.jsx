import React, { useState, useEffect } from 'react';
import './NewRecordWork.scss';
import '../../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx';
import SelectWork from '../SelectWork/SelectWork.jsx';
import { getCategoriesNames } from '../../../../../utils/RequestsAPI/Products/Categories.jsx';
import { getProductById, getProductsByCategory } from '../../../../../utils/RequestsAPI/Products.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import { addRecordedWork, addProductToRecordedWork } from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectDraft from '../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx';

const NewRecordWork = (props) => {
    const [worktimeInputs, setWorkTimeInputs] = useState({
        date: new Date(),
        employee: null,
        works: []
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
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalHours, setTotalHours] = useState(0);

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
        setIsLoading(true);
        console.log(worktimeInputs);
        const newWork = worktimeInputs.works.map(item => {
            const temp = Object.assign({
                day: worktimeInputs.date.getDate(),
                month: (worktimeInputs.date.getMonth() + 1),
                year: worktimeInputs.date.getFullYear(),
                employeeId: worktimeInputs.employeeId,
                workListId: item.workId,
                hours: item.hours
            });
            if (formIsValid())
                return addRecordedWork(temp)
                    .then(res => res.json())
                    .then(res => {
                        // console.log(res);
                        const productsArr = item.product.map(product => {
                            // console.log(product);
                            addProductToRecordedWork(res.id, product.id, product.quantity, { name: product.name })
                        })
                        Promise.all(productsArr)
                            .then(() => {
                                props.history.push("/work-managment");
                            })
                    })
                    .catch(error => {
                        alert('Ошибка при добавлении записи');
                        setIsLoading(false);
                        // setShowError(true);
                        console.log(error);
                    })
        })
        Promise.all(newWork)
            .then(() => {
                setIsLoading(false);
            })
        // const temp = Object.assign({
        //     day: worktimeInputs.date.getDate(),
        //     month: (worktimeInputs.date.getMonth() + 1),
        //     year: worktimeInputs.date.getFullYear(),
        //     employeeId: worktimeInputs.employeeId,
        //     workListId: worktimeInputs.works[0].workId,
        //     hours: totalHours
        // });
        // console.log(temp);

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
                            employeeId: value
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
                            totalHours={totalHours}
                            setTotalHours={setTotalHours}
                            categories={categories}
                            products={products}
                        />
                    </div>
                </div>
                <InputText
                    inputName="Всего часов"
                    readOnly
                    defaultValue={totalHours}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Создать запись" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div >
    );
};

export default NewRecordWork;