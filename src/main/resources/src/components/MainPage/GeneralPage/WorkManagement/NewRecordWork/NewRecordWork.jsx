import React, { useState, useEffect } from 'react'
import './NewRecordWork.scss'
import '../../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx'
import SelectWork from '../SelectWork/SelectWork.jsx'
import {
  addRecordedWork,
  addProductToRecordedWork,
  addDraftToRecordedWork,
} from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
// import SelectDraft from '../../../Dispatcher/Rigging/SelectDraft/SelectDraft.jsx'
import SelectWorkHours from '../SelectWorkHours/SelectWorkHours.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { dateDiffInDays } from '../../../../../utils/functions.jsx'
import useProductsList from '../../../../../utils/hooks/useProductsList/useProductsList.js'

const NewRecordWork = (props) => {
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: new Date(),
    employee: null,
    works: [],
  })
  const [workTimeErrors, setWorkTimeErrors] = useState({
    date: false,
    employee: false,
    works: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    employee: false,
    works: false,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { products, categories, isLoadingProducts } = useProductsList()
  const [totalHours, setTotalHours] = useState(0)
  const [curPage, setCurPage] = useState(0)
  const [wrapperHeight, setWrapperHeight] = useState('0px')

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
    if (curPage !== 1) {
      return setCurPage(1)
    } else {
      let workId = 0
      setIsLoading(true)
      console.log(worktimeInputs)
      const newWork = worktimeInputs.works.map((item) => {
        const temp = Object.assign({
          day: worktimeInputs.date.getDate(),
          month: worktimeInputs.date.getMonth() + 1,
          year: worktimeInputs.date.getFullYear(),
          employeeId: worktimeInputs.employeeId,
          comment: item.comment,
          workListId: item.workId,
          hours: item.hours,
        })
        if (formIsValid())
          return addRecordedWork(temp)
            .then((res) => res.json())
            .then((res) => {
              workId = res.id
              // console.log(res);
              Promise.all(
                item.product.map((product) => {
                  // console.log(product);
                  return addProductToRecordedWork(
                    workId,
                    product.id,
                    product.quantity,
                    { name: product.name },
                  )
                }),
              )
            })
            .then(() => {
              return Promise.all(
                item.draft.map((draft) => {
                  // console.log(product);
                  return addDraftToRecordedWork(
                    workId,
                    draft.partId,
                    draft.type,
                    draft.quantity,
                    draft.name,
                  )
                }),
              )
            })
            .then(() => {
              props.history.push('/work-management')
            })
      })
      Promise.all(newWork)
        .then(() => {
          setIsLoading(false)
        })
        .catch((error) => {
          alert('Ошибка при добавлении записи')
          setIsLoading(false)
          // setShowError(true);
          console.log(error)
        })
    }
  }

  useEffect(() => {
    document.title = 'Создание заявки'
    const abortController = new AbortController()
    setWrapperHeight(
      document.getElementsByClassName('main-form__wrapper')[0]?.scrollHeight +
        ((window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) >= 768
          ? 50
          : 80) +
        'px',
    )
    return function cancel() {
      abortController.abort()
    }
  }, [worktimeInputs])

  const isNewDate = (date) => {
    return Math.abs(dateDiffInDays(date, new Date())) <= 3 && date <= new Date()
  }

  return (
    <div className="record-work">
      <div className="main-form">
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        <form
          className="main-form__form"
          style={{
            minHeight: `calc(${
              curPage !== 1
                ? wrapperHeight
                : document.getElementsByClassName('select-work-hours')[0]
                    ?.scrollHeight + 'px + var(--buttons-height) + 50px'
            })`,
          }}
        >
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Новая запись о работе</div>
          </div>
          <div
            className="main-form__wrapper"
            style={{
              left: `calc(-100% * ${curPage} + (${
                (window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth) >= 768
                  ? '35px'
                  : '20px'
              } + 15px * ${curPage}))`,
            }}
          >
            <div className="main-form__wrapper-item">
              <InputDate
                inputName="Дата"
                required
                error={workTimeErrors.date}
                name="date"
                // filterDate={isNewDate}
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
                windowName="select-employee"
                name="employee"
                handleEmployeeChange={(value, name) => {
                  validateField('employee', value)
                  setWorkTimeInputs({
                    ...worktimeInputs,
                    employeeId: value,
                    employeeName: name,
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
                    noTime
                  />
                </div>
              </div>
              <div className="main-form__input_hint">
                * - поля, обязательные для заполнения
              </div>
              <div className="main-form__buttons">
                <input
                  className="main-form__submit main-form__submit--inverted"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault()
                    if (curPage !== 0) {
                      let temp = curPage - 1
                      setCurPage(temp)
                    } else {
                      props.history.push('/')
                    }
                  }}
                  value="Вернуться назад"
                />
                {worktimeInputs.works.length > 0 &&
                worktimeInputs.works.reduce((sum, cur) => {
                  if (cur.workType === 'Без продукции/чертежа') {
                    return sum + 1
                  } else if (cur.workType === 'Чертеж') {
                    {
                      /* return sum + cur?.draft.length */
                    }
                    return sum + 1
                  } else return cur?.product.length
                }, 0) > 0 ? (
                  <Button
                    text="Указать часы"
                    isLoading={isLoading}
                    className="main-form__submit"
                    onClick={handleSubmit}
                  />
                ) : null}
              </div>
            </div>
            <div className="main-form__wrapper-item">
              <SelectWorkHours
                workArray={worktimeInputs.works}
                date={worktimeInputs.date}
                employee={worktimeInputs.employeeName}
                onChange={(value) => {
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
              />
              <div className="main-form__input_hint">
                * - поля, обязательные для заполнения
              </div>
              <div className="main-form__buttons">
                <input
                  className="main-form__submit main-form__submit--inverted"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault()
                    if (curPage !== 0) {
                      let temp = curPage - 1
                      setCurPage(temp)
                    } else {
                      props.history.push('/')
                    }
                  }}
                  value="Вернуться назад"
                />
                <Button
                  text="Создать запись"
                  isLoading={isLoading}
                  className="main-form__submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRecordWork
