import React, { useState, useEffect } from 'react'
import './EditPackaging.scss'
import '../../../../utils/Form/Form.scss'
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import InputText from '../../../../utils/Form/InputText/InputText.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import {
  getPackagingById,
  editPackaging,
} from '../../../../utils/RequestsAPI/Products/packaging.js'

const EditPackaging = (props) => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    quantity: 0,
    size: '',
    comment: '',
  })
  const [formErrors, setFormErrors] = useState({
    name: false,
    quantity: false,
    size: false,
  })
  const [validInputs, setValidInputs] = useState({
    name: true,
    quantity: true,
    size: true,
  })
  const [packagingId, setPackagingId] = useState(0)
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
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
      name: false,
      quantity: false,
      size: false,
      comment: false,
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
    setFormErrors(newErrors)
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
    console.log(formInputs)
    formIsValid() &&
      editPackaging(packagingId, formInputs)
        .then(() => {})
        .then(() => props.history.push('/packaging'))
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при изменении записи')
        })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setFormInputs({
      ...formInputs,
      [name]: value,
    })
    setFormErrors({
      ...formErrors,
      [name]: false,
    })
  }

  useEffect(() => {
    document.title = 'Редактирование упаковки'
    const id = props.history.location.pathname.split('/packaging/edit/')[1]
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс записи!')
      props.history.push('/packaging')
    } else {
      setPackagingId(id)
      getPackagingById(id)
        .then((res) => res.json())
        .then((oldPackaging) => {
          setFormInputs({
            name: oldPackaging.name,
            comment: oldPackaging.comment,
            quantity: oldPackaging.quantity,
            size: oldPackaging.size,
          })
        })
        .catch((error) => {
          console.log(error)
          alert('Неправильный индекс заявки!')
          props.history.push('/packaging')
        })
    }
  }, [])

  return (
    <div className="new-packaging">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование упаковки</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputText
            inputName="Наименование"
            required
            error={formErrors.name}
            defaultValue={formInputs.name}
            name="name"
            handleInputChange={handleInputChange}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Кол-во штук"
            required
            defaultValue={formInputs.quantity}
            type="number"
            error={formErrors.quantity}
            name="quantity"
            handleInputChange={handleInputChange}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            inputName="Размер"
            required
            defaultValue={formInputs.size}
            error={formErrors.size}
            name="size"
            handleInputChange={handleInputChange}
            errorsArr={formErrors}
            setErrorsArr={setFormErrors}
          />
          <InputText
            defaultValue={formInputs.comment}
            inputName="Комментарий"
            name="comment"
            handleInputChange={handleInputChange}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() => props.history.push('/packaging')}
              value="Вернуться назад"
            />
            <Button
              text="Редактировать упаковку"
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

export default EditPackaging
