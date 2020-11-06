import React, { useEffect, useState, useContext } from 'react'
import './EditRequest.scss'
import '../../../../../utils/Form/Form.scss'
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx'
import InputText from '../../../../../utils/Form/InputText/InputText.jsx'
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx'
import InputProducts from '../../../../../utils/Form/InputProducts/InputProducts.jsx'
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import Button from '../../../../../utils/Form/Button/Button.jsx'
import { UserContext } from '../../../../../App.js'
import {
  editRequest,
  editProductsToRequest,
  addProductsToRequest,
  deleteProductsToRequest,
  getRequestById,
  connectClientToRequest,
} from '../../../../../utils/RequestsAPI/Requests.jsx'
import { requestStatuses, workshops } from '../../workshopVariables.js'
import SelectClient from '../../../Clients/SelectClients/SelectClients.jsx'

const EditRequest = (props) => {
  const [requestId, setRequestId] = useState(1)
  const userContext = useContext(UserContext)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [requestInputs, setRequestInputs] = useState({
    date: '',
    products: [],
    // quantity: "",
    codeWord: '',
    responsible: '',
    status: 'Не готово',
    shippingDate: '',
    comment: '',
    sum: 0,
    clientId: 0,
    client: null,
  })
  const [requestErrors, setRequestErrors] = useState({
    date: false,
    requestProducts: false,
    // codeWord: false,
    clientId: false,
    responsible: false,
    shippingDate: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    requestProducts: true,
    codeWord: true,
    responsible: true,
    shippingDate: true,
    clientId:
      requestInputs.clientId !== 0 ||
      userContext.userHasAccess(['ROLE_WORKSHOP'])
        ? true
        : false,
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
      case 'clientId':
        setValidInputs({
          ...validInputs,
          clientId: value !== 0,
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
          requestProducts: value.length > 0,
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
    // console.log(validInputs);
    let check = true
    let newErrors = Object.assign({
      date: false,
      requestProducts: false,
      clientId: false,
      responsible: false,
      shippingDate: false,
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
    formIsValid() &&
      editRequest(requestInputs, requestId)
        .then(() => {
          //PUT if edited, POST if product is new
          const productsArr = selectedProducts.map((selected) => {
            let edited = false
            requestInputs.products.map((item) => {
              if (item.id === selected.id) {
                edited = true
                return
              }
            })
            return edited === true
              ? editProductsToRequest(
                  {
                    requestId: requestId,
                    quantity: selected.quantity,
                    status: selected.status,
                    packaging: selected.packaging,
                    name: selected.name,
                  },
                  selected.id,
                )
              : addProductsToRequest({
                  requestId: requestId,
                  quantity: selected.quantity,
                  packaging: selected.packaging,
                  status: selected.status,
                  name: selected.name,
                })
          })
          return Promise.all(productsArr).then(() => {
            //DELETE products removed by user
            const productsArr = requestInputs.products.map((item) => {
              let deleted = true
              selectedProducts.map((selected) => {
                if (selected.id === item.id) {
                  deleted = false
                  return
                }
              })
              return deleted === true && deleteProductsToRequest(item.id)
            })
            return Promise.all(productsArr)
          })
        })
        .then(() => {
          if (requestInputs.client?.id !== requestInputs.clientId) {
            return connectClientToRequest(requestId, requestInputs.clientId)
          }
        })
        .then(() => {
          const id = props.history.location.pathname.split('edit/')[1]
          props.history.push(`${workshops[props.type].redirectURL}#${id}`)
        })
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

  const handleProductsChange = (newProducts) => {
    validateField('requestProducts', newProducts)
    setSelectedProducts(newProducts)
    setRequestErrors({
      ...requestErrors,
      requestProducts: false,
    })
  }

  useEffect(() => {
    document.title = 'Редактирование заявки'
    const id = props.history.location.pathname.split('edit/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!')
      props.history.push(workshops[props.type].redirectURL)
    } else {
      setRequestId(id)
      getRequestById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          // console.log(oldRequest)
          setRequestInputs({
            date: oldRequest.date,
            products: oldRequest.requestProducts,
            quantity: oldRequest.quantity,
            codeWord: oldRequest.codeWord,
            responsible: oldRequest.responsible,
            status: oldRequest.status,
            shippingDate:
              oldRequest.shippingDate !== null
                ? oldRequest.shippingDate
                : new Date(),
            comment: oldRequest.comment,
            factory: oldRequest.factory,
            sum: oldRequest.sum,
            client: oldRequest.client,
            clientId: oldRequest.client ? oldRequest.client.id : 0,
          })
          oldRequest.client && validateField('clientId', oldRequest.client.id)
          setSelectedProducts(oldRequest.requestProducts)
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс заявки!')
          props.history.push(workshops[props.type].redirectURL)
        })
    }
  }, [])

  const handleDateShippedChange = (date) => {
    // validateField("date", date);
    setRequestInputs({
      ...requestInputs,
      shippingDate: date,
    })
    setRequestErrors({
      ...requestErrors,
      shippingDate: false,
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
    <div className="edit-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Редактирование заявки ${
              workshops[props.type].title
            }`}</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <div className="main-form__row">
            {userContext.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_MANAGER',
              'ROLE_WORKSHOP',
            ]) && (
              <InputDate
                inputName="Дата заявки"
                required
                error={requestErrors.date}
                name="date"
                selected={Date.parse(requestInputs.date)}
                handleDateChange={handleDateChange}
                errorsArr={requestErrors}
                setErrorsArr={setRequestErrors}
                readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
              />
            )}
            <InputDate
              inputName="Дата отгрузки"
              name="shippingDate"
              selected={Date.parse(requestInputs.shippingDate)}
              handleDateChange={handleDateShippedChange}
              errorsArr={requestErrors}
              setErrorsArr={setRequestErrors}
            />
          </div>
          {userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP',
          ]) && (
            <InputProducts
              inputName="Продукция"
              userHasAccess={userContext.userHasAccess}
              required
              options
              onChange={handleProductsChange}
              searchPlaceholder="Введите название продукта для поиска..."
              defaultValue={selectedProducts}
              error={requestErrors.requestProducts}
              errorsArr={requestErrors}
              setErrorsArr={setRequestErrors}
              workshop={userContext.userHasAccess(['ROLE_WORKSHOP'])}
            />
          )}
          {userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP',
          ]) &&
            requestInputs.codeWord !== '' && (
              <InputText
                inputName="Кодовое слово"
                defaultValue={requestInputs.codeWord}
                name="codeWord"
                readOnly
              />
            )}
          {userContext.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_WORKSHOP',
          ]) && (
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
              readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
            />
          )}
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
          />
          {userContext.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) ? (
            <InputText
              inputName="Сумма"
              name="sum"
              type="number"
              defaultValue={requestInputs.sum}
              handleInputChange={handleInputChange}
              errorsArr={requestErrors}
              setErrorsArr={setRequestErrors}
            />
          ) : null}
          <SelectClient
            inputName="Клиент"
            userHasAccess={userContext.userHasAccess}
            defaultValue={
              requestInputs.clientId === 0 ? false : requestInputs.client?.name
            }
            required
            readOnly={userContext.userHasAccess(['ROLE_WORKSHOP'])}
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
              onClick={(event) => {
                event.preventDefault()
                const id = props.history.location.pathname.split('edit/')[1]
                props.history.push(`${workshops[props.type].redirectURL}#${id}`)
              }}
              value="Вернуться назад"
            />
            <Button
              text="Обновить данные"
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

export default EditRequest
