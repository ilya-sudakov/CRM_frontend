import React, { useState, useEffect } from 'react'
import './ProductionJournal.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import SelectEmployeeNew from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployeeNew.jsx'
import SelectWork from '../SelectWork/SelectWork.jsx'
import ChevronImg from '../../../../../../../../../assets/tableview/chevron-down.inline.svg'
import { getCategoriesNames } from '../../../../../utils/RequestsAPI/Products/Categories.jsx'
import {
  getProductById,
  getProductsByCategory,
  getProductsByLocation,
} from '../../../../../utils/RequestsAPI/Products.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { getEmployees } from '../../../../../utils/RequestsAPI/Employees.jsx'

const ProductionJournal = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    lemz: [
      {
        isMinimized: true,
        employee: null,
        works: [
          {
            product: [],
            draft: [],
            workName: '',
            workType: '',
            workId: null,
            hours: 0,
            comment: '',
          },
        ],
        originalWorks: [],
        totalHours: 0,
      },
    ],
    lepsari: [
      {
        isMinimized: true,
        employee: null,
        works: [
          {
            product: [],
            draft: [],
            workName: '',
            workType: '',
            workId: null,
            hours: 0,
            comment: '',
          },
        ],
        originalWorks: [],
        totalHours: 0,
      },
    ],
    ligovskiy: [
      {
        isMinimized: true,
        employee: null,
        works: [
          {
            product: [],
            draft: [],
            workName: '',
            workType: '',
            workId: null,
            hours: 0,
            comment: '',
          },
        ],
        originalWorks: [],
        totalHours: 0,
      },
    ],
    office: [
      {
        isMinimized: true,
        employee: null,
        works: [
          {
            product: [],
            draft: [],
            workName: '',
            workType: '',
            workId: null,
            hours: 0,
            comment: '',
          },
        ],
        originalWorks: [],
        totalHours: 0,
      },
    ],
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
    // setIsLoading(true)
    console.log(worktimeInputs)
    alert('Тест формы')
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
        <form className="main-form__form">
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
            error={Date.parse(workTimeErrors.date)}
            name="date"
            disabled
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
                  <>
                    <div className="main-form__row" key={workIndex}>
                      <FormRow
                        workTimeErrors={workTimeErrors}
                        setWorkTimeErrors={setWorkTimeErrors}
                        setWorkTimeInputs={setWorkTimeInputs}
                        worktimeInputs={worktimeInputs}
                        employees={employees}
                        workItem={workItem}
                        workshop={workshop}
                        workIndex={workIndex}
                      />
                    </div>
                    {!workItem.isMinimized ? (
                      <JournalForm
                        setWorkTimeInputs={setWorkTimeInputs}
                        worktimeInputs={worktimeInputs}
                        workItem={workItem}
                        workshop={workshop}
                        workIndex={workIndex}
                        categories={categories}
                        products={products}
                      />
                    ) : null}
                  </>
                ))}
              </div>
              <AddEmployeeButton
                setWorkTimeInputs={setWorkTimeInputs}
                workshop={workshop}
              />
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
            <Button
              text="Сохранить данные"
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

const FormRow = ({
  workTimeErrors,
  setWorkTimeErrors,
  setWorkTimeInputs,
  worktimeInputs,
  employees,
  workItem,
  workshop,
  workIndex,
}) => {
  return (
    <>
      {/* Список сотрудников */}
      <SelectEmployeeNew
        required
        error={workTimeErrors.employee}
        defaultValue={workItem.employee}
        employees={employees
          .filter(
            (item) =>
              item.workshop === workshop[0] && item.relevance !== 'Уволен',
          )
          .sort((a, b) => {
            if (a.lastName < b.lastName) {
              return -1
            }
            if (a.lastName > b.lastName) {
              return 1
            }
            return 0
          })}
        name="employee"
        handleEmployeeChange={(employee) => {
          setWorkTimeInputs((worktimeInputs) => {
            let oldArray = worktimeInputs[workshop[1]]
            oldArray.splice(workIndex, 1, {
              ...workItem,
              isMinimized: false,
              employee: employee.value,
            })
            return {
              ...worktimeInputs,
              [workshop[1]]: oldArray,
            }
          })
        }}
        errorsArr={workTimeErrors}
        setErrorsArr={setWorkTimeErrors}
      />
      <div
        className="main-form__button main-form__button--inverted"
        style={{ borderColor: 'transparent' }}
        onClick={() => {
          setWorkTimeInputs((worktimeInputs) => {
            let oldArray = worktimeInputs[workshop[1]]
            oldArray.splice(workIndex, 1, {
              ...workItem,
              isMinimized: !workItem.isMinimized,
            })
            return {
              ...worktimeInputs,
              [workshop[1]]: oldArray,
            }
          })
        }}
      >
        <span>{workItem.isMinimized ? 'Развернуть' : 'Свернуть'}</span>
        <ChevronImg className="production-journal__img production-journal__img--chevron" />
      </div>
    </>
  )
}

const JournalForm = ({
  setWorkTimeInputs,
  workItem,
  workshop,
  workIndex,
  products,
  categories,
}) => {
  return (
    <div className="production-journal__form">
      {/* Создание работы */}
      <div className="main-form__item">
        <div className="main-form__input_field">
          <SelectWork
            handleWorkChange={(value) => {
              setWorkTimeInputs((worktimeInputs) => {
                let oldArray = worktimeInputs[workshop[1]]
                oldArray.splice(workIndex, 1, {
                  ...workItem,
                  works: value,
                })
                console.log(oldArray)
                return {
                  ...worktimeInputs,
                  [workshop[1]]: oldArray,
                }
              })
            }}
            totalHours={workItem.totalHours}
            newSelectWork
            defaultConfig={[
              {
                product: [],
                draft: [],
                workName: '',
                workType: '',
                workId: null,
                hours: 0,
                comment: '',
              },
            ]}
            setTotalHours={(value) => {
              setWorkTimeInputs((worktimeInputs) => {
                let oldArray = worktimeInputs[workshop[1]]
                oldArray.splice(workIndex, 1, {
                  ...workItem,
                  totalHours: value,
                })
                return {
                  ...worktimeInputs,
                  [workshop[1]]: oldArray,
                }
              })
            }}
            categories={categories}
            products={products}
            defaultValue={workItem.works}
          />
        </div>
      </div>
    </div>
  )
}

const AddEmployeeButton = ({ setWorkTimeInputs, workshop }) => {
  return (
    <div
      className="main-form__button main-form__button--inverted"
      style={{ marginBottom: '25px' }}
      onClick={() => {
        setWorkTimeInputs((worktimeInputs) => {
          let oldArray = worktimeInputs[workshop[1]]
          oldArray.push({
            employee: null,
            works: [
              {
                product: [],
                draft: [],
                workName: '',
                workType: '',
                workId: null,
                hours: 0,
                comment: '',
              },
            ],
            originalWorks: [],
            isMinimized: true,
            totalHours: 0,
          })
          return {
            ...worktimeInputs,
            [workshop[1]]: oldArray,
          }
        })
      }}
    >
      Добавить
    </div>
  )
}
