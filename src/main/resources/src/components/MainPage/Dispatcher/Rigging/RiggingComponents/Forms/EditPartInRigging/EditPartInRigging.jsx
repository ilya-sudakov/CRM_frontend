import React, { useState, useEffect } from 'react'
import './EditPartInRigging.scss'
import '../../../../../../../utils/Form/Form.scss'
import {
  getPartFromStamp,
  editPartFromStamp,
} from '../../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import { rigTypes } from '../../rigsVariables.js'
import Button from '../../../../../../../utils/Form/Button/Button.jsx'

const EditPartInRigging = (props) => {
  const [partInputs, setPartInputs] = useState({
    number: '',
    name: '',
    amount: '',
    location: '',
    comment: '',
    cuttingDimensions: '',
    milling: '',
    harding: '',
    grinding: '',
    erosion: '',
    check: '',
  })
  const [nameValid, setNameValid] = useState(true)
  const [partId, setPartId] = useState(0)
  const [rigId, setRigId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setNameValid(value !== '')
        break
    }
  }

  const formIsValid = () => {
    if (nameValid) {
      return true
    } else {
      alert('Форма не заполнена')
      return false
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    const type = props.location.pathname.includes('/stamp')
      ? 'stamp'
      : props.location.pathname.includes('/machine')
      ? 'machine'
      : props.location.pathname.includes('/press-form')
      ? 'pressForm'
      : props.location.pathname.includes('/parts') && 'parts'

    formIsValid() &&
      editPartFromStamp(
        {
          ...partInputs,
          riggingId: rigId,
        },
        partId,
      )
        .then(() => props.history.push(rigTypes[type].redirectURL))
        .catch((error) => {
          setIsLoading(false)
          alert('Ошибка при добавлении записи')
          console.log(error)
        })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    validateField(name, value)
    setPartInputs({
      ...partInputs,
      [name]: value,
    })
  }

  useEffect(() => {
    document.title = 'Редактирование детали'
    const type = props.location.pathname.includes('/stamp')
      ? 'stamp'
      : props.location.pathname.includes('/machine')
      ? 'machine'
      : props.location.pathname.includes('/press-form')
      ? 'pressForm'
      : props.location.pathname.includes('/parts') && 'parts'

    let rigId = props.history.location.pathname.split('/edit-part/')[1]
    const partId = rigId.split('/')[1]
    rigId = rigId.split('/')[0]
    setPartId(partId)
    setRigId(rigId)
    if (isNaN(Number.parseInt(rigId)) || isNaN(Number.parseInt(partId))) {
      alert('Неправильный индекс!')
      props.history.push(rigTypes[type].redirectURL)
    } else {
      return getPartFromStamp(partId)
        .then((res) => res.json())
        .then((res) => {
          setPartInputs(res)
        })
    }
  }, [])

  return (
    <div className="main-form">
      <div className="main-form__title">Редактирование детали</div>
      <form className="main-form__form">
        <div className="main-form__item">
          <div className="main-form__input_name">Название*</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="name"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.name}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Артикул*</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="number"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.number}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Кол-во</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="amount"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.amount}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Местоположение</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="location"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.location}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Комментарий*</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="comment"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.comment}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Распил/Габариты</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="cuttingDimensions"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.cuttingDimensions}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Фрезеровка/Точение</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="milling"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.milling}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Закалка</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="harding"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.harding}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Шлифовка</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="grinding"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.grinding}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Эрозия</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="erosion"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.erosion}
            />
          </div>
        </div>
        <div className="main-form__item">
          <div className="main-form__input_name">Проверка</div>
          <div className="main-form__input_field">
            <input
              type="text"
              name="controll"
              autoComplete="off"
              onChange={handleInputChange}
              defaultValue={partInputs.controll}
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
              const type = props.location.pathname.includes('/stamp')
                ? 'stamp'
                : props.location.pathname.includes('/machine')
                ? 'machine'
                : props.location.pathname.includes('/press-form')
                ? 'pressForm'
                : props.location.pathname.includes('/parts') && 'parts'
              props.history.push(rigTypes[type].redirectURL)
            }}
            value="Вернуться назад"
          />
          <Button
            className="main-form__submit"
            text="Редактировать деталь"
            isLoading={isLoading}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default EditPartInRigging
