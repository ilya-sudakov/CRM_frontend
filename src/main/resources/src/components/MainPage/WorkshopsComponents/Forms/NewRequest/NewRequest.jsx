import React, { useState, useEffect, useContext } from 'react'

import './NewRequest.scss'
import '../../../../../utils/Form/Form.scss'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import InputText from '../../../../../utils/Form/InputText/InputText.jsx'
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx'
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { UserContext } from '../../../../../App.js'
import {
  addRequest,
  addProductsToRequest,
  connectClientToRequest,
} from '../../../../../utils/RequestsAPI/Requests.jsx'

import { requestStatuses, workshops } from '../../workshopVariables.js'
import SelectClient from '../../../Clients/SelectClients/SelectClients.jsx'

const NewRequest = (props) => {
  const userContext = useContext(UserContext)
  const [requestInputs, setRequestInputs] = useState({
    date: new Date(),
    // codeWord: '',
    responsible: userContext.userData.username,
    status: 'Ожидание',
    shippingDate: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
    comment: '',
    factory: props.type,
    sum: 0,
    clientId: 0,
  })
  const [requestErrors, setRequestErrors] = useState({
    date: false,
    requestProducts: false,
    // codeWord: false,
    responsible: false,
    shippingDate: false,
    clientId: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    requestProducts: false,
    // codeWord: false,
    responsible: true,
    shippingDate: true,
    clientId: false,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'date':
        setValidInputs({
          ...validInputs,
          date: value !== null,
        })
        break
      case 'shippingDate':
        setValidInputs({
          ...validInputs,
          shippingDate: value !== null,
        })
        break
      case 'requestProducts':
        setValidInputs({
          ...validInputs,
          requestProducts: value !== [],
        })
        break
      case 'clientId':
        setValidInputs({
          ...validInputs,
          clientId: value !== 0,
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
      requestProducts: false,
      // codeWord: false,
      responsible: false,
      shippingDate: false,
      clientId: false,
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
    setRequestErrors(newErrors)
    if (check === true) {
      return true
    } else {
      // alert("Форма не заполнена");
      setIsLoading(false)
      setShowError(true)
      return false
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    let id = 0
    console.log(requestInputs)
    formIsValid() &&
      addRequest(requestInputs)
        .then((res) => res.json())
        .then((res) => {
          id = res.id
        })
        .then(() =>
          Promise.all(
            requestInputs.requestProducts.map((item) => {
              return addProductsToRequest({
                requestId: id,
                quantity: item.quantity,
                packaging: item.packaging,
                status: item.status,
                name: item.name,
              })
            }),
          ),
        )
        .then(() => connectClientToRequest(id, requestInputs.clientId))
        .then(() => props.history.push(workshops[props.type].redirectURL))
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setRequestInputs({
      ...requestInputs,
      [name]: value,
    })
    setRequestErrors({
      ...requestErrors,
      [name]: false,
    })
  }

  useEffect(() => {
    document.title = 'Создание заявки'
  }, [])

  const handleDateChange = (date) => {
    validateField('date', date)
    setRequestInputs({
      ...requestInputs,
      date: date,
    })
    setRequestErrors({
      ...requestErrors,
      date: false,
    })
  }

  const handleDateShippedChange = (date) => {
    validateField('date', date)
    setRequestInputs({
      ...requestInputs,
      shippingDate: date,
    })
    setRequestErrors({
      ...requestErrors,
      shippingDate: false,
    })
  }

  const handleProductsChange = (newProducts) => {
    validateField('requestProducts', newProducts)
    setRequestInputs({
      ...requestInputs,
      requestProducts: newProducts,
    })
    setRequestErrors({
      ...requestErrors,
      requestProducts: false,
    })
  }

  const handleResponsibleChange = (newResponsible) => {
    validateField('responsible', newResponsible)
    setRequestInputs({
      ...requestInputs,
      responsible: newResponsible,
    })
    setRequestErrors({
      ...requestErrors,
      responsible: false,
    })
  }

  return (
    <div className="new-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Новая заявка ${
              workshops[props.type].title
            }`}</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <div className="main-form__row">
            <InputDate
              inputName="Дата заявки"
              required
              error={requestErrors.date}
              name="date"
              selected={Date.parse(requestInputs.date)}
              handleDateChange={handleDateChange}
              errorsArr={requestErrors}
              setErrorsArr={setRequestErrors}
            />
            <InputDate
              inputName="Дата отгрузки"
              name="shippingDate"
              selected={requestInputs.shippingDate}
              handleDateChange={handleDateShippedChange}
              errorsArr={requestErrors}
              setErrorsArr={setRequestErrors}
            />
          </div>
          <InputProducts
            inputName="Продукция"
            userHasAccess={userContext.userHasAccess}
            required
            options
            name="requestProducts"
            onChange={handleProductsChange}
            defaultValue={requestInputs.requestProducts}
            error={requestErrors.requestProducts}
            searchPlaceholder="Введите название продукта для поиска..."
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
          />
          <InputUser
            inputName="Ответственный"
            userData={userContext.userData}
            required
            error={requestErrors.responsible}
            defaultValue={requestInputs.responsible}
            name="responsible"
            handleUserChange={handleResponsibleChange}
            searchPlaceholder="Введите имя пользователя для поиска..."
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Статус*</div>
            <div className="main-form__input_field">
              <select
                name="status"
                onChange={handleInputChange}
                value={requestInputs.status}
              >
                {requestStatuses.map((status) => {
                  if (userContext.userHasAccess(status.access)) {
                    return (
                      <option
                        value={
                          status.oldName === requestInputs.status
                            ? status.oldName
                            : status.name
                        }
                      >
                        {status.name}
                      </option>
                    )
                  } else {
                    return (
                      <option style={{ display: `none` }}>{status.name}</option>
                    )
                  }
                })}
              </select>
            </div>
          </div>
          <InputText
            inputName="Комментарий"
            name="comment"
            defaultValue={requestInputs.comment}
            handleInputChange={handleInputChange}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
          />
          <InputText
            inputName="Сумма"
            name="sum"
            type="number"
            defaultValue={requestInputs.sum}
            handleInputChange={handleInputChange}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
          />
          <SelectClient
            inputName="Клиент"
            userHasAccess={userContext.userHasAccess}
            // defaultValue={requestInputs.clientId}
            required
            onChange={(value) => {
              validateField('clientId', value)
              setRequestInputs({
                ...requestInputs,
                clientId: value,
              })
              setRequestErrors({
                ...requestErrors,
                clientId: value,
              })
            }}
            error={requestErrors.clientId}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() =>
                props.history.push(workshops[props.type].redirectURL)
              }
              value="Вернуться назад"
            />
            <Button
              text="Оформить заявку"
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

export default NewRequest
