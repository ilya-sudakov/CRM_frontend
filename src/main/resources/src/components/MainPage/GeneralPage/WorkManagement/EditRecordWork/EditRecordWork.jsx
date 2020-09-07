import React, { useState, useEffect } from 'react'
import './EditRecordWork.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx'
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

const EditRecordWork = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    employee: null,
    works: [],
    originalWorks: [],
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
  const [totalHours, setTotalHours] = useState(0)
  const [itemId, setItemId] = useState(0)

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

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true)
    // console.log(worktimeInputs);
    const editedInputs = worktimeInputs.works.map((item, index) => {
      // console.log('works');
      const temp = Object.assign({
        day: worktimeInputs.date.getDate(),
        month: worktimeInputs.date.getMonth() + 1,
        year: worktimeInputs.date.getFullYear(),
        employeeId: worktimeInputs.employeeId,
        workListId: item.workId,
        hours: item.hours,
      })
      console.log(temp)
      if (formIsValid()) {
        if (index === 0) {
          return editRecordedWork(temp, itemId)
            .then(() => {
              // console.log(res);
              const oldProductsArr = worktimeInputs.originalWorks[0].product.map(
                (product) => {
                  console.log(product.id)
                  deleteProductFromRecordedWork(itemId, product.id)
                },
              )
              return Promise.all(oldProductsArr).then(() => {
                const productsArr = item.product.map((product) => {
                  addProductToRecordedWork(
                    itemId,
                    product.id,
                    product.quantity,
                    {
                      name: product.name,
                    },
                  )
                })
                Promise.all(productsArr)
              })
            })
            .then(() => {
              // console.log(res);
              const oldProductsArr = worktimeInputs.originalWorks[0].draft.map(
                (draft) => {
                  deleteDraftFromRecordedWork(itemId, draft.partId, draft.type)
                },
              )
              Promise.all(oldProductsArr).then(() => {
                return Promise.all(
                  item.draft.map((draft) => {
                    addDraftToRecordedWork(
                      itemId,
                      draft.partId,
                      draft.type,
                      draft.quantity,
                      draft.name,
                    )
                  }),
                )
              })
            })
            .then(() => {
              props.history.push('/work-management')
            })
            .catch((error) => {
              alert('Ошибка при добавлении записи')
              setIsLoading(false)
              // setShowError(true);
              console.log(error)
            })
        } else {
          return addRecordedWork(temp)
            .then((res) => res.json())
            .then((res) => {
              const productsArr = item.product.map((product) => {
                addProductToRecordedWork(res.id, product.id, product.quantity, {
                  name: product.name,
                })
              })
              Promise.all(productsArr)
                .then(() => {
                  const productsArr = item.draft.map((draft) => {
                    addDraftToRecordedWork(
                      itemId,
                      draft.partId,
                      draft.type,
                      draft.quantity,
                    )
                  })
                })
                .then(() => {
                  props.history.push('/')
                })
            })
            .catch((error) => {
              alert('Ошибка при добавлении записи')
              setIsLoading(false)
              // setShowError(true);
              console.log(error)
            })
        }
      }
      Promise.all(editedInputs).then(() => {})
    })
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
    document.title = 'Редактирование заявки'
    const abortController = new AbortController()
    const id = props.history.location.pathname.split(
      '/work-management/record-time/edit/',
    )[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс работы!')
      props.history.push('/')
    } else {
      setItemId(id)
      getRecordedWorkById(id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setWorkTimeInputs({
            date: new Date(res.year, res.month - 1, res.day),
            employeeId: res.employee.id,
            employeeName:
              res.employee.lastName +
              ' ' +
              res.employee.name +
              ' ' +
              res.employee.middleName,
            works: [
              {
                workName: res.workList.work,
                workId: res.workList.id,
                workType: res.workList.typeOfWork,
                hours: res.hours,
                product: [
                  ...res.workControlProduct.map((item) =>
                    Object.assign({
                      id: item.product.id,
                      name: item.product.name,
                      quantity: item.quantity,
                    }),
                  ),
                ],
                draft: [
                  ...res.partsWorks.map((item) =>
                    Object.assign({
                      id: item.id,
                      partId: item.partId,
                      name: item.name,
                      type: item.partType,
                      quantity: item.quantity,
                    }),
                  ),
                ],
              },
            ],
            originalWorks: [
              {
                workName: res.workList.work,
                workId: res.workList.id,
                hours: res.hours,
                product: [
                  ...res.workControlProduct.map((item) =>
                    Object.assign({
                      id: item.product.id,
                      name: item.product.name,
                      quantity: item.quantity,
                    }),
                  ),
                ],
                draft: [
                  ...res.partsWorks.map((item) =>
                    Object.assign({
                      id: item.id,
                      partId: item.partId,
                      name: item.name,
                      type: item.partType,
                      quantity: item.quantity,
                    }),
                  ),
                ],
              },
            ],
          })
        })
        .then(() => {
          return loadProducts(abortController.signal)
        })
    }
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

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__header main-form__header--full">
          <div className="main-form__title">Редактирование записи о работе</div>
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
        {/* Список сотрудников */}
        <SelectEmployee
          inputName="Выбор сотрудника"
          required
          error={workTimeErrors.employee}
          userHasAccess={props.userHasAccess}
          defaultValue={worktimeInputs.employeeName}
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
          <div className="main-form__input_name">Работы*</div>
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
              totalHours={totalHours}
              setTotalHours={setTotalHours}
              categories={categories}
              products={products}
              defaultValue={worktimeInputs.works}
            />
          </div>
        </div>
        <InputText inputName="Всего часов" readOnly defaultValue={totalHours} />
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
  )
}

export default EditRecordWork
