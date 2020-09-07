import React, { useState, useEffect } from 'react'
import deleteSVG from '../../../../../../../../../assets/select/delete.svg'
import './SelectParts.scss'
import {
  workshopsLocations,
  checkRiggingTypesInputs,
} from '../RiggingComponents/rigsVariables'

const SelectParts = (props) => {
  const [selected, setSelected] = useState([])
  const [options, setOptions] = useState([])
  const [defaultValueLoaded, setDefaultValueLoaded] = useState(false)

  useEffect(() => {
    if (props.defaultValue !== undefined && !defaultValueLoaded) {
      setSelected([...props.defaultValue])
      setDefaultValueLoaded(true)
    }
  }, [props.defaultValue, selected])

  const handleNewPart = (e) => {
    e.preventDefault()
    setSelected([
      ...selected,
      {
        number: '',
        name: '',
        amount: '',
        location: 'lemz',
        comment: '',
        cuttingDimensions: '',
        milling: '',
        harding: '',
        grinding: '',
        erosion: '',
        controll: '',
        color: 'production',
        isMinimized: true,
      },
    ])
    props.handlePartsChange([
      ...selected,
      {
        number: '',
        name: '',
        amount: '',
        location: 'lemz',
        comment: '',
        cuttingDimensions: '',
        milling: '',
        harding: '',
        grinding: '',
        erosion: '',
        controll: '',
        color: 'production',
      },
    ])
  }

  const deletePart = (e) => {
    const id = e.target.getAttribute('index')
    let temp = selected
    temp.splice(id, 1)
    setSelected([...temp])
    props.handlePartsChange([...temp])
  }

  const handleInputChange = (event) => {
    const id = event.target.getAttribute('index')
    const name = event.target.getAttribute('name')
    const value = event.target.value
    let temp = selected
    let originalItem = selected[id]
    temp.splice(id, 1, {
      ...originalItem,
      [name]: value,
    })
    setSelected([...temp])
    props.handlePartsChange([...temp])
  }

  return (
    <div className="select_parts">
      {!props.readOnly && (
        <button className="select_parts__button" onClick={handleNewPart}>
          Добавить деталь
        </button>
      )}
      <div className="select_parts__selected">
        {selected.map((item, index) => (
          <div
            className={
              !props.readOnly && selected.length > 1
                ? 'select_parts__selected_item select_parts__selected_item--minimized'
                : 'select_parts__selected_item'
            }
          >
            <div
              className="select_parts__selected_header"
              index={index}
              onClick={() => {
                const temp = selected
                temp.splice(index, 1, {
                  ...item,
                  isMinimized: !item.isMinimized,
                })
                setSelected([...temp])
                props.handlePartsChange([...temp])
              }}
            >
              <div className="select_parts__selected_name">
                <span>Название: </span>
                <span>{item.name}</span>
              </div>
              <div className="select_parts__selected_name">
                <span>Артикул: </span>
                <span>{item.number}</span>
              </div>
              <div className="select_parts__selected_name">
                <span>Комментарий: </span>
                <span>{item.comment}</span>
              </div>
            </div>
            <div
              className={
                item.isMinimized
                  ? 'select_parts__selected_form select_parts__selected_form--hidden'
                  : 'select_parts__selected_form'
              }
            >
              <div className="select_parts__item">
                <div className="select_parts__input_name">Название</div>
                <div className="select_parts__input_field">
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
              <div className="select_parts__item">
                <div className="select_parts__input_name">Артикул</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="number"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.number}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Кол-во</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="amount"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.amount}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Местоположение</div>
                <div className="select_parts__input_field">
                  <select
                    index={index}
                    name="location"
                    onChange={handleInputChange}
                    value={item.location}
                    readOnly={props.readOnly}
                  >
                    {Object.entries(workshopsLocations).map((workshop) => (
                      <option value={workshop[0]}>{workshop[1].name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Комментарий</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="comment"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.comment}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Распил/Габариты</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="cuttingDimensions"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.cuttingDimensions}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly &&
                      !checkRiggingTypesInputs(item, 'cuttingDimensions')
                    }
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">
                  Фрезеровка/Точение
                </div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    index={index}
                    name="milling"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.milling}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly && !checkRiggingTypesInputs(item, 'milling')
                    }
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Закалка</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    index={index}
                    name="harding"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.harding}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly && !checkRiggingTypesInputs(item, 'harding')
                    }
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Шлифовка</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    index={index}
                    name="grinding"
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.grinding}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly && !checkRiggingTypesInputs(item, 'grinding')
                    }
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Эрозия</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="erosion"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.erosion}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly && !checkRiggingTypesInputs(item, 'erosion')
                    }
                  />
                </div>
              </div>
              <div className="select_parts__item">
                <div className="select_parts__input_name">Проверка</div>
                <div className="select_parts__input_field">
                  <input
                    type="text"
                    name="controll"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    defaultValue={item.controll}
                    readOnly={props.readOnly}
                    disabled={
                      !props.readOnly && !checkRiggingTypesInputs(item, 'controll')
                    }
                  />
                </div>
              </div>
            </div>
            {!props.readOnly && selected.length > 1 && (
              <img
                index={index}
                onClick={deletePart}
                className="select_parts__img"
                src={deleteSVG}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectParts
