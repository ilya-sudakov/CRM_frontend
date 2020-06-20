import React, { useEffect, useState, useContext } from 'react'
import './EditRequestLEMZ.scss'
import '../../../../utils/Form/Form.scss'
import { getUsers } from '../../../../utils/RequestsAPI/Users.jsx'
import {
  getRequestLEMZById,
  editRequestLEMZ,
  editProductsToRequestLEMZ,
  addProductsToRequestLEMZ,
  deleteProductsToRequestLEMZ,
} from '../../../../utils/RequestsAPI/Workshop/LEMZ.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import InputText from '../../../../utils/Form/InputText/InputText.jsx'
import InputUser from '../../../../utils/Form/InputUser/InputUser.jsx'
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx'
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import { UserContext } from '../../../../App.js'

const EditRequestLEMZ = (props) => {
  const [requestId, setRequestId] = useState(1)
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
  })
  const [requestErrors, setRequestErrors] = useState({
    date: false,
    requestProducts: false,
    codeWord: false,
    responsible: false,
    shippingDate: false,
  })
  const [validInputs, setValidInputs] = useState({
    date: true,
    requestProducts: true,
    codeWord: true,
    responsible: true,
    shippingDate: true,
  })
  const [users, setUsers] = useState([])
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userContext = useContext(UserContext)
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: 'Проблема/Материалы',
      oldName: 'Проблема-материалы',
      className: 'materials',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    },
    {
      name: 'Отгружено',
      className: 'shipped',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    },
    {
      name: 'Готово к отгрузке',
      oldName: 'Готово',
      className: 'ready',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
    },
    {
      name: 'В производстве',
      className: 'in-production',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MANAGER'],
    },
    {
      name: 'Ожидание',
      className: 'waiting',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MANAGER'],
    },
    {
      name: 'Завершено',
      className: 'completed',
      access: ['ROLE_ADMIN'],
    },
    {
      name: 'Приоритет',
      className: 'priority',
      access: ['ROLE_ADMIN'],
    },
  ])

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
      codeWord: false,
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

  const handleSubmit = (event) => {
    // event.preventDefault();
    setIsLoading(true)
    // console.log(requestInputs);
    formIsValid() &&
      editRequestLEMZ(requestInputs, requestId)
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
              ? editProductsToRequestLEMZ(
                  {
                    requestId: requestId,
                    quantity: selected.quantity,
                    status: selected.status,
                    packaging: selected.packaging,
                    name: selected.name,
                  },
                  selected.id,
                )
              : addProductsToRequestLEMZ({
                  requestId: requestId,
                  quantity: selected.quantity,
                  packaging: selected.packaging,
                  status: selected.status,
                  name: selected.name,
                })
          })
          Promise.all(productsArr).then(() => {
            //DELETE products removed by user
            const productsArr = requestInputs.products.map((item) => {
              let deleted = true
              selectedProducts.map((selected) => {
                if (selected.id === item.id) {
                  deleted = false
                  return
                }
              })
              return deleted === true && deleteProductsToRequestLEMZ(item.id)
            })
            Promise.all(productsArr).then(() =>
              props.history.push('/lemz/workshop-lemz'),
            )
          })
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
    document.title = 'Редактирование заявки ЛЭМЗ'
    const id = props.history.location.pathname.split(
      '/lemz/workshop-lemz/edit/',
    )[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс заявки!')
      props.history.push('/lemz/workshop-lemz')
    } else {
      setRequestId(id)
      getRequestLEMZById(id)
        .then((res) => res.json())
        .then((oldRequest) => {
          // console.log(oldRequest),
          setRequestInputs({
            date: oldRequest.date,
            products: oldRequest.lemzProducts,
            quantity: oldRequest.quantity,
            codeWord: oldRequest.codeWord,
            responsible: oldRequest.responsible,
            status: oldRequest.status,
            shippingDate: oldRequest.shippingDate,
            comment: oldRequest.comment,
          })
          setSelectedProducts(oldRequest.lemzProducts)
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс заявки!')
          props.history.push('/lemz/workshop-lemz')
        })
      getUsers()
        .then((res) => res.json())
        .then((res) => {
          setUsers(res)
        })
    }
  }, [])

  const handleDateShippedChange = (date) => {
    const regex = '(0[1-9]|[12]d|3[01]).(0[1-9]|1[0-2]).[12]d{3})'
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
    <div className="main-form">
      <div className="main-form__title">Редактирование заявки ЛЭМЗ</div>
      <form className="main-form__form">
        <ErrorMessage
          message="Не заполнены все обязательные поля!"
          showError={showError}
          setShowError={setShowError}
        />
        {props.userHasAccess([
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
            readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
          />
        )}
        {props.userHasAccess([
          'ROLE_ADMIN',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
        ]) && (
          <InputProducts
            inputName="Продукция"
            userHasAccess={props.userHasAccess}
            required
            options
            onChange={handleProductsChange}
            searchPlaceholder="Введите название продукта для поиска..."
            defaultValue={selectedProducts}
            error={requestErrors.requestProducts}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
            workshop={props.userHasAccess(['ROLE_WORKSHOP'])}
          />
        )}
        {props.userHasAccess([
          'ROLE_ADMIN',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
        ]) && (
          <InputText
            inputName="Кодовое слово"
            required
            error={requestErrors.codeWord}
            defaultValue={requestInputs.codeWord}
            name="codeWord"
            handleInputChange={handleInputChange}
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
            readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
          />
        )}
        {props.userHasAccess([
          'ROLE_ADMIN',
          'ROLE_MANAGER',
          'ROLE_WORKSHOP',
        ]) && (
          <InputUser
            inputName="Ответственный"
            userData={props.userData}
            required
            error={requestErrors.responsible}
            defaultValue={requestInputs.responsible}
            name="responsible"
            options={users}
            handleUserChange={handleResponsibleChange}
            searchPlaceholder="Введите имя пользователя для поиска..."
            errorsArr={requestErrors}
            setErrorsArr={setRequestErrors}
            readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
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
        <InputDate
          inputName="Дата отгрузки"
          name="shippingDate"
          selected={Date.parse(requestInputs.shippingDate)}
          handleDateChange={handleDateShippedChange}
          errorsArr={requestErrors}
          setErrorsArr={setRequestErrors}
        />
        <InputText
          inputName="Комментарий"
          name="comment"
          defaultValue={requestInputs.comment}
          handleInputChange={handleInputChange}
        />
        <div className="main-form__input_hint">
          * - поля, обязательные для заполнения
        </div>
        <div className="main-form__buttons">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => props.history.push('/lemz/workshop-lemz')}
            value="Вернуться назад"
          />
          {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
                    {isLoading && <ImgLoader />} */}
          <Button
            text="Обновить данные"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default EditRequestLEMZ
