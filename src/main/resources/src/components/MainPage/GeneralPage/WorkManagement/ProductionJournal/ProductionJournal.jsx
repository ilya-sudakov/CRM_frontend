import React, { useState, useEffect } from 'react'
import './ProductionJournal.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import SelectEmployeeNew from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployeeNew.jsx'
import SelectWork from '../SelectWork/SelectWork.jsx'
import { getCategoriesNames } from '../../../../../utils/RequestsAPI/Products/Categories.jsx'
import {
  getProductById,
  getProductsByCategory,
  getProductsByLocation,
} from '../../../../../utils/RequestsAPI/Products.jsx'
import InputText from '../../../../../utils/Form/InputText/InputText.jsx'
import {
  getRecordedWorkById,
  editRecordedWork,
  deleteProductFromRecordedWork,
  addProductToRecordedWork,
  addRecordedWork,
  deleteDraftFromRecordedWork,
  addDraftToRecordedWork,
} from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { getEmployees } from '../../../../../utils/RequestsAPI/Employees.jsx'

const ProductionJournal = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    employee: null,
    works: [],
    originalWorks: [],
    lemz: [],
    lepsari: [],
    ligovskiy: [],
    office: [],
  })
  const [workTimeErrors, setWorkTimeErrors] = useState({
    date: false,
    employee: false,
    works: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    employee: true,
    works: true,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [employees, setEmployees] = useState([])
  const [itemId, setItemId] = useState(0)
  const [workshops, setWorkshops] = useState({
    ЦехЛЭМЗ: 'lemz',
    ЦехЛепсари: 'lepsari',
    ЦехЛиговский: 'ligovskiy',
    Офис: 'office',
  })

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'date':
        setValidInputs({
          ...validInputs,
          date: value !== null,
        })
        break
      case 'works':
        setValidInputs({
          ...validInputs,
          works: value !== null,
        })
        break
      default:
        if (validInputs[fieldName] !== undefined) {
          setValidInputs({
            ...validInputs,
            [fieldName]: value !== '',
          })
        }
        break
    }
  }

  const formIsValid = () => {
    let check = true
    let newErrors = Object.assign({
      date: false,
      employee: false,
      works: false,
    })
    for (let item in validInputs) {
      if (validInputs[item] === false) {
        check = false
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        })
      }
    }
    setWorkTimeErrors(newErrors)
    if (check === true) {
      return true
    } else {
      setShowError(true)
      return false
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setWorkTimeInputs({
      ...worktimeInputs,
      [name]: value,
    })
    setWorkTimeErrors({
      ...workTimeErrors,
      [name]: false,
    })
  }

  useEffect(() => {
    document.title = 'Журнал производства'
    const abortController = new AbortController()
    // .then(() => {
    loadEmployees(abortController.signal)
    loadProducts(abortController.signal)
    // })

    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadProducts = (signal) => {
    getCategoriesNames(signal) //Только категории
      .then((res) => res.json())
      .then((res) => {
        const categoriesArr = res
        setCategories(res)
        let productsArr = []
        if (
          props.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_DISPATCHER',
            'ROLE_ENGINEER',
            'ROLE_MANAGER',
          ])
        ) {
          Promise.all(
            categoriesArr.map((item) => {
              let category = {
                category: item.category,
              }
              return getProductsByCategory(category, signal) //Продукция по категории
                .then((res) => res.json())
                .then((res) => {
                  res.map((item) => productsArr.push(item))
                  setProducts([...productsArr])
                })
            }),
          ).then(() => {
            //Загружаем картинки по отдельности для каждой продукции
            Promise.all(
              productsArr.map((item, index) => {
                getProductById(item.id, signal)
                  .then((res) => res.json())
                  .then((res) => {
                    // console.log(res);
                    productsArr.splice(index, 1, res)
                    setProducts([...productsArr])
                  })
              }),
            ).then(() => {
              console.log('all images downloaded')
            })
          })
        } else {
          getProductsByLocation(
            {
              productionLocation: props.userHasAccess(['ROLE_LIGOVSKIY'])
                ? 'ЦехЛиговский'
                : props.userHasAccess(['ROLE_LEMZ'])
                ? 'ЦехЛЭМЗ'
                : props.userHasAccess(['ROLE_LEPSARI']) && 'ЦехЛепсари',
            },
            signal,
          )
            .then((res) => res.json())
            .then((res) => {
              res.map((item) => productsArr.push(item))
              setProducts([...productsArr])
              Promise.all(
                productsArr.map((item, index) => {
                  getProductById(item.id, signal)
                    .then((res) => res.json())
                    .then((res) => {
                      // console.log(res);
                      productsArr.splice(index, 1, res)
                      setProducts([...productsArr])
                    })
                }),
              ).then(() => {
                console.log('all images downloaded')
              })
            })
        }
      })
  }

  const loadEmployees = (signal) => {
    return getEmployees(signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false)
        setEmployees(res)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  return (
    <div className="production-journal">
      <div className="main-form">
        <form className="main-form__form main-form__form--full">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Журнал производства</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputDate
            inputName="Дата"
            required
            error={Date.parse(workTimeErrors.date)}
            name="date"
            selected={worktimeInputs.date}
            handleDateChange={(date) => {
              validateField('date', date)
              setWorkTimeInputs({
                ...worktimeInputs,
                date: date,
              })
              setWorkTimeErrors({
                ...workTimeErrors,
                date: false,
              })
            }}
            errorsArr={workTimeErrors}
            setErrorsArr={setWorkTimeErrors}
          />
          {Object.entries(workshops).map((workshop, index) => (
            <>
              <div className="production-journal__workshop-name">
                <span>{workshop[0]}</span>
              </div>
              <div className="production-journal__list">
                {worktimeInputs[workshop[1]].map((workItem, workIndex) => (
                  <div className="main-form__row" key={workIndex}>
                    {/* Список сотрудников */}
                    <SelectEmployeeNew
                      required
                      error={workTimeErrors.employee}
                      userHasAccess={props.userHasAccess}
                      defaultValue={worktimeInputs.employeeName}
                      employees={employees.filter(
                        (item) =>
                          item.workshop === workshop[0] &&
                          item.relevance !== 'Уволен',
                      )}
                      windowName="select-employee"
                      name="employee"
                      handleEmployeeChange={(value) => {
                        validateField('employee', value)
                        setWorkTimeInputs({
                          ...worktimeInputs,
                          employeeId: value,
                        })
                        setWorkTimeErrors({
                          ...workTimeErrors,
                          employee: false,
                        })
                      }}
                      errorsArr={workTimeErrors}
                      setErrorsArr={setWorkTimeErrors}
                      readOnly
                    />
                    {/* Создание работы */}
                    <div className="main-form__item">
                      <div className="main-form__input_field">
                        <SelectWork
                          handleWorkChange={(value) => {
                            validateField('works', value)
                            setWorkTimeInputs({
                              ...worktimeInputs,
                              works: value,
                            })
                            setWorkTimeErrors({
                              ...workTimeErrors,
                              works: false,
                            })
                          }}
                          userHasAccess={props.userHasAccess}
                          categories={categories}
                          products={products}
                          defaultValue={worktimeInputs.works}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="main-form__button main-form__button--inverted"
                onClick={() => {
                  setWorkTimeInputs((worktimeInputs) => {
                    let oldArray = worktimeInputs[workshop[1]]
                    oldArray.push({
                      date: new Date(),
                      employee: null,
                      works: [],
                      originalWorks: [],
                    })
                    return {
                      ...worktimeInputs,
                      [worktimeInputs[workshop[1]]]: oldArray,
                    }
                  })
                }}
              >
                Добавить
              </div>
            </>
          ))}

          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push('/work-management')}
              value="Вернуться назад"
            />
            {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
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
    </div>
  )
}

export default ProductionJournal
