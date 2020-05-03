import React, { useState, useEffect } from 'react'
import deleteSVG from '../../../../../../../../assets/select/delete.svg'
import './SelectContacts.scss'

const SelectContacts = (props) => {
  const [selected, setSelected] = useState([
    {
      name: '',
      lastName: '',
      email: '',
      position: '',
      phoneNumber: '',
    },
  ])
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const clickOverlay = (event) => {
    const overlay = document.getElementsByClassName(
      'select-contacts__overlay',
    )[0]
    if (!overlay.classList.contains('select-contacts__overlay--hidden')) {
      overlay.classList.add('select-contacts__overlay--hidden')
    }
  }

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
      setSelected([...props.defaultValue])
    }
    if (props.options !== undefined) {
      setOptions([...props.options])
    }
  }, [props.defaultValue, props.options])

  const clickOnForm = (e) => {
    const id = e.currentTarget.getAttribute('index')
    const form = document.getElementsByClassName(
      'select-contacts__selected_form',
    )[id]
    if (form.classList.contains('select-contacts__selected_form--hidden')) {
      e.target.type !== 'text' &&
        !e.target.classList.contains('select-contacts__img') &&
        form.classList.remove('select-contacts__selected_form--hidden')
    } else {
      e.target.type !== 'text' &&
        !e.target.classList.contains('select-contacts__img') &&
        form.classList.add('select-contacts__selected_form--hidden')
    }
  }

  const handleNewContact = (e) => {
    e.preventDefault()
    //Открыть по дефолту форму
    const id = selected.length
    setSelected([
      ...selected,
      {
        name: '',
        lastName: '',
        email: '',
        position: '',
        phoneNumber: '',
      },
    ])
    props.handleContactsChange([
      ...selected,
      {
        name: '',
        lastName: '',
        email: '',
        position: '',
        phoneNumber: '',
      },
    ])
  }

  const deleteContact = (e) => {
    const id = e.target.getAttribute('index')
    let temp = selected
    temp.splice(id, 1)
    setSelected([...temp])
    props.handleContactsChange([...temp])
  }

  const handleInputChange = (event) => {
    const id = event.target.getAttribute('index')
    const name = event.target.getAttribute('name')
    let value = event.target.value
    let temp = selected
    let originalItem = selected[id]
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    })
    setSelected([...temp])
    props.handleContactsChange([...temp])
  }

  return (
    <div className="select-contacts">
      <div
        className="select-contacts__overlay select-contacts__overlay--hidden"
        onClick={clickOverlay}
      ></div>
      {!props.readOnly && (
        <button className="select-contacts__button" onClick={handleNewContact}>
          Добавить контактное лицо
        </button>
      )}
      <div className="select-contacts__selected">
        {selected.map((item, index) => (
          <div
            className={
              !props.readOnly && selected.length > 1
                ? 'select-contacts__selected_item select-contacts__selected_item--minimized'
                : 'select-contacts__selected_item'
            }
          >
            <div
              className="select-contacts__selected_header"
              index={index}
              onClick={clickOnForm}
            >
              <div className="select-contacts__selected_name">
                <span>ФИО: </span>{' '}
                <span>{item.lastName + ' ' + item.name}</span>
              </div>
              <div className="select-contacts__selected_name">
                <span>E-mail: </span> <span>{item.email}</span>
              </div>
              <div className="select-contacts__selected_name">
                <span>Телефон: </span> <span>{item.phoneNumber}</span>
              </div>
            </div>
            <div className="select-contacts__selected_form select-contacts__selected_form--hidden">
              <div className="select-contacts__item">
                <div className="select-contacts__input_name">Имя</div>
                <div className="select-contacts__input_field">
                  <input
                    type="text"
                    name="name"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.name}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-contacts__item">
                <div className="select-contacts__input_name">Фамилия</div>
                <div className="select-contacts__input_field">
                  <input
                    type="text"
                    name="lastName"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.lastName}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-contacts__item">
                <div className="select-contacts__input_name">Должность</div>
                <div className="select-contacts__input_field">
                  <input
                    type="text"
                    name="position"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.position}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-contacts__item">
                <div className="select-contacts__input_name">E-mail</div>
                <div className="select-contacts__input_field">
                  <input
                    type="text"
                    name="email"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.email}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-contacts__item">
                <div className="select-contacts__input_name">
                  Номер телефона
                </div>
                <div className="select-contacts__input_field">
                  <input
                    type="text"
                    name="phoneNumber"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.phoneNumber}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
            </div>
            {!props.readOnly && selected.length > 1 && (
              <img
                index={index}
                onClick={deleteContact}
                className="select-contacts__img"
                src={deleteSVG}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectContacts
