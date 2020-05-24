import React, { useState, useEffect } from 'react'
import deleteSVG from '../../../../../../../../assets/select/delete.svg'
import './SelectLegalEntity.scss'
import {
  getInfoByINN,
  getBIKByINN,
} from '../../../../utils/RequestsAPI/Clients.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'

const SelectLegalEntity = (props) => {
  const [selected, setSelected] = useState([
    {
      name: '',
      inn: '',
      kpp: '',
      ogrn: '',
      bik: '',
      checkingAccount: '',
      legalAddress: '',
      factualAddress: '',
    },
  ])
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue.length !== 0) {
      setSelected([...props.defaultValue])
    }
    if (props.options !== undefined) {
      setOptions([...props.options])
    }
  }, [props.defaultValue, props.options])

  const handleNewLegalEntity = (e) => {
    e.preventDefault()
    //Открыть по дефолту форму
    const id = selected.length
    setSelected([
      ...selected,
      {
        name: '',
        inn: '7842143789',
        kpp: '',
        ogrn: '',
        bik: '',
        checkingAccount: '',
        legalAddress: '',
        factualAddress: '',
      },
    ])
    props.handleLegalEntityChange([
      ...selected,
      {
        name: '',
        inn: '7842143789',
        kpp: '',
        ogrn: '',
        bik: '',
        checkingAccount: '',
        legalAddress: '',
        factualAddress: '',
      },
    ])
  }

  const deleteLegalEntity = (e) => {
    const id = e.target.getAttribute('index')
    let temp = selected
    temp.splice(id, 1)
    setSelected([...temp])
    props.handleLegalEntityChange([...temp])
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
    props.handleLegalEntityChange([...temp])
  }

  return (
    <div className="select-legal-entity">
      {!props.readOnly && (
        <button
          className="select-legal-entity__button"
          onClick={handleNewLegalEntity}
        >
          Добавить юридическое лицо
        </button>
      )}
      <div className="select-legal-entity__selected">
        {selected.map((item, index) => (
          <div
            className={
              !props.readOnly && selected.length > 1
                ? 'select-legal-entity__selected_item select-legal-entity__selected_item--minimized'
                : 'select-legal-entity__selected_item'
            }
          >
            <div
              className="select-legal-entity__selected_header"
              index={index}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <div className="select-legal-entity__selected_name">
                <span>ИНН: </span> <span>{item.inn}</span>
              </div>
              <div className="select-legal-entity__selected_name">
                <span>Название: </span> <span>{item.name}</span>
              </div>
              <div className="select-legal-entity__selected_name">
                <span>Адрес: </span> <span>{item.legalAddress}</span>
              </div>
            </div>
            <div
              className={
                isMinimized
                  ? 'select-legal-entity__selected_form select-legal-entity__selected_form--hidden'
                  : 'select-legal-entity__selected_form'
              }
            >
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">Название</div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="name"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.name}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">ИНН</div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="inn"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.inn}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">КПП</div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="kpp"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.kpp}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">ОГРН</div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="ogrn"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.ogrn}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">БИК</div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="bik"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.bik}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">
                  Расчетный счет
                </div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="checkingAccount"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.checkingAccount}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">
                  Юридический адрес
                </div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="legalAddress"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.legalAddress}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              <div className="select-legal-entity__item">
                <div className="select-legal-entity__input_name">
                  Фактический адрес
                </div>
                <div className="select-legal-entity__input_field">
                  <input
                    type="text"
                    name="factualAddress"
                    index={index}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={item.factualAddress}
                    readOnly={props.readOnly}
                  />
                </div>
              </div>
              {!props.readOnly && (
                <Button
                  text="Загрузить данные по ИНН"
                  isLoading={isLoading}
                  className="select-legal-entity__button"
                  onClick={(event) => {
                    // event.preventDefault()
                    setIsLoading(true)
                    //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
                    getInfoByINN({ query: item.inn, branch_type: 'MAIN' })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res)
                        if (res.suggestions.length > 0) {
                          let newData = Object.assign({
                            ...item,
                            name: res.suggestions[0].data.name.short_with_opf,
                            kpp: res.suggestions[0].data.kpp,
                            ogrn: res.suggestions[0].data.ogrn,
                            legalAddress: res.suggestions[0].data.address.value,
                            legalEntity:
                              res.suggestions[0].data.management.name,
                          })
                          return newData
                        } else return null
                      })
                      .then((newData) => {
                        if (newData !== null) {
                          //Получаем БИК банка по названию компании
                          getBIKByINN({ query: newData.name })
                            .then((res) => res.json())
                            .then((res) => {
                              console.log(res)
                              setIsLoading(false)
                              let temp = selected
                              temp.splice(index, 1, {
                                ...item,
                                ...newData,
                                bik:
                                  res.suggestions.length > 0
                                    ? res.suggestions[0].data.bic
                                    : '',
                              })
                              setSelected([...temp])
                              props.handleLegalEntityChange([...temp])
                              setIsLoading(false)
                            })
                        } else {
                          alert('Не найдено данных с данным ИНН')
                          setIsLoading(false)
                        }
                      })
                  }}
                />
              )}
            </div>
            {!props.readOnly && selected.length > 1 && (
              <img
                index={index}
                onClick={deleteLegalEntity}
                className="select-legal-entity__img"
                src={deleteSVG}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectLegalEntity
