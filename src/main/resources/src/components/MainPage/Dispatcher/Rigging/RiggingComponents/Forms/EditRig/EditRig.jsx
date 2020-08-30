import React, { useState, useEffect } from 'react'
import './EditRig.scss'
import '../../../../../../../utils/Form/Form.scss'
import SelectParts from '../../../SelectParts/SelectParts.jsx'
import {
  getStampById,
  editStamp,
  editPartsOfStamp,
  addPartsToStamp,
  deletePartsFromStamp,
} from '../../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import InputText from '../../../../../../../utils/Form/InputText/InputText.jsx'
import ErrorMessage from '../../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx'
import Button from '../../../../../../../utils/Form/Button/Button.jsx'
import { formatDateString } from '../../../../../../../utils/functions.jsx'
import { rigTypes } from '../../rigsVariables.js'

const EditRig = (props) => {
  const [rigInputs, setRigInputs] = useState({
    name: '',
    number: '',
    comment: '',
    parts: [],
    lastEdited: new Date(),
    status: props.type,
  })
  const [stampId, setStampId] = useState(0)
  const [riggingErrors, setRiggingErrors] = useState({
    name: false,
    number: false,
    // comment: false,
    parts: false,
  })
  const [validInputs, setValidInputs] = useState({
    name: true,
    number: true,
    // comment: true,
    parts: true,
  })
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'parts':
        setValidInputs({
          ...validInputs,
          parts: value.length > 0,
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
      name: false,
      number: false,
      // comment: false,
      parts: false,
    })
    for (let item in validInputs) {
      // console.log(item, validInputs[item]);
      if (validInputs[item] === false) {
        check = false
        newErrors = Object.assign({
          ...newErrors,
          [item]: true,
        })
      }
    }
    setRiggingErrors(newErrors)
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
    // console.log(rigInputs.parts);
    formIsValid() &&
      editStamp({ ...rigInputs, lastEdited: new Date() }, stampId)
        .then(() => {
          //PUT if edited, POST if part is new
          const partsArr = rigInputs.parts.map((selected) => {
            let edited = false
            rigInputs.stampParts.map((item) => {
              if (item.id === selected.id) {
                edited = true
                return
              }
            })
            return edited === true
              ? editPartsOfStamp(
                  {
                    ...selected,
                    riggingId: stampId,
                  },
                  selected.id,
                )
              : addPartsToStamp({
                  ...selected,
                  riggingId: stampId,
                })
          })
          Promise.all(partsArr).then(() => {
            //DELETE parts removed by user
            const partsArr = rigInputs.stampParts.map((item) => {
              let deleted = true
              rigInputs.parts.map((selected) => {
                if (selected.id === item.id) {
                  deleted = false
                  return
                }
              })
              return deleted === true && deletePartsFromStamp(item.id)
            })
            Promise.all(partsArr).then(() => {
              props.history.push(rigTypes[props.type].redirectURL)
            })
          })
        })
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при добавлении записи')
          console.log(error)
        })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setRigInputs({
      ...rigInputs,
      [name]: value,
    })
    setRiggingErrors({
      ...riggingErrors,
      [name]: false,
    })
  }

  const handlePartsChange = (newParts) => {
    validateField('parts', newParts)
    setRigInputs({
      ...rigInputs,
      parts: newParts,
    })
    setRiggingErrors({
      ...riggingErrors,
      parts: false,
    })
  }

  useEffect(() => {
    document.title = 'Редактирование записи'
    const id = props.history.location.pathname.split('/edit/')[1]
    setStampId(id)
    if (isNaN(Number.parseInt(id))) {
      alert('Неправильный индекс!')
      props.history.push(rigTypes[props.type].redirectURL)
    } else {
      getStampById(id)
        .then((res) => res.json())
        .then((res) => {
          setRigInputs({
            ...res,
            lastEdited: res.lastEdited ? res.lastEdited : new Date(),
            parts: res.stampParts,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  return (
    <div className="edit-rig">
      <div className="main-form">
        <form className="main-form__form">
          <div className="main-form__header main-form__header--full">
            <div className="main-form__title">Редактирование записи</div>
          </div>
          <ErrorMessage
            message="Не заполнены все обязательные поля!"
            showError={showError}
            setShowError={setShowError}
          />
          <InputText
            inputName="Название оснастки(оборудования)"
            required
            error={riggingErrors.name}
            name="name"
            defaultValue={rigInputs.name}
            handleInputChange={handleInputChange}
            errorsArr={riggingErrors}
            setErrorsArr={setRiggingErrors}
          />
          <InputText
            inputName="Артикул оснастки(оборудования)"
            required
            error={riggingErrors.number}
            name="number"
            defaultValue={rigInputs.number}
            handleInputChange={handleInputChange}
            errorsArr={riggingErrors}
            setErrorsArr={setRiggingErrors}
          />
          <InputText
            inputName="Комментарий"
            // required
            // error={riggingErrors.comment}
            name="comment"
            defaultValue={rigInputs.comment}
            handleInputChange={handleInputChange}
          />
          <div className="main-form__item">
            <div className="main-form__input_name">Детали*</div>
            <div className="main-form__input_field">
              {/* <input type="text" name="name" autoComplete="off" onChange={handleInputChange} /> */}
              <SelectParts
                handlePartsChange={handlePartsChange}
                defaultValue={rigInputs.stampParts}
                searchPlaceholder="Введите название продукта для поиска..."
              />
            </div>
          </div>
          <InputText
            inputName="Дата последнего изменения"
            name="lastEdited"
            readOnly
            defaultValue={formatDateString(rigInputs.lastEdited)}
          />
          <div className="main-form__input_hint">
            * - поля, обязательные для заполнения
          </div>
          <div className="main-form__buttons">
            <input
              className="main-form__submit main-form__submit--inverted"
              type="submit"
              onClick={() =>
                props.history.push(rigTypes[props.type].redirectURL)
              }
              value="Вернуться назад"
            />
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

export default EditRig
