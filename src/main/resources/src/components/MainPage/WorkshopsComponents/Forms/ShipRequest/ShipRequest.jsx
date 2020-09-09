import React, { useEffect, useState, useContext } from 'react'
import './ShipRequest.scss'
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

const ShipRequest = (props) => {
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
    requestProducts: false,
  })
  const [validInputs, setValidInputs] = useState({
    requestProducts: true,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
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
      requestProducts: false,
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
    // return console.log(selectedProducts)
    formIsValid() &&
      editRequest(
        {
          ...requestInputs,
          status: 'Частично отгружено',
        },
        requestId,
      )
        .then(() => {
          return Promise.all(
            selectedProducts.map((selected) => {
              if (
                Number.parseFloat(selected.quantityNew) === 0 ||
                selected.quantityNew === undefined
              )
                return

              const diff =
                Number.parseFloat(selected.quantity) -
                Number.parseFloat(selected.quantityNew)

              editProductsToRequest(
                {
                  requestId: requestId,
                  quantity: diff < 0 ? 0 : diff,
                  status: diff <= 0 ? 'completed' : selected.status,
                  packaging: selected.packaging,
                  name: selected.name,
                },
                selected.id,
              )
            }),
          )
        })
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

  const handleProductsChange = (newProducts) => {
    validateField('requestProducts', newProducts)
    setSelectedProducts(newProducts)
    setRequestErrors({
      ...requestErrors,
      requestProducts: false,
    })
  }

  useEffect(() => {
    document.title = 'Отгрузка продукции'
    const id = props.history.location.pathname.split('ship/')[1]
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

  return (
    <div className="ship-request">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">{`Отгрузка продукции`}</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputDate
            inputName="Дата заявки"
            selected={Date.parse(requestInputs.date)}
            disabled
          />
          <InputProducts
            inputName="Продукция"
            userHasAccess={userContext.userHasAccess}
            required
            onChange={handleProductsChange}
            defaultValue={selectedProducts}
            error={requestErrors.requestProducts}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
            customSearch={{
              display: false,
            }}
            customSelectedItem={{
              isMinimized: true,
            }}
            customLayout={{
              productName: {
                showColorPicker: true,
                readOnly: true,
              },
              quantity: {
                customName: 'Исх. кол-во (шт.)',
                readOnly: true,
              },
              newQuantity: {
                customName: 'Отгружено (шт.)',
              },
            }}
          />
          <InputDate
            inputName="Дата отгрузки"
            name="shippingDate"
            selected={Date.parse(new Date())}
            disabled
          />
          <InputText
            inputName="Комментарий"
            name="comment"
            disabled
            defaultValue={requestInputs.comment}
            handleInputChange={handleInputChange}
          />
          <SelectClient
            inputName="Клиент"
            userHasAccess={userContext.userHasAccess}
            defaultValue={
              requestInputs.clientId === 0 ? false : requestInputs.client?.name
            }
            readOnly
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => {
                console.log(props.type)
                props.history.push(workshops[props.type].redirectURL)
              }}
              value="Вернуться назад"
            />
            <Button
              text="Отгрузить продукцию"
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

export default ShipRequest
