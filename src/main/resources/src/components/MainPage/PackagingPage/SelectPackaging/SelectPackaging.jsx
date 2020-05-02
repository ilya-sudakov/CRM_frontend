import React, { useEffect, useState } from 'react'
import './SelectPackaging.scss'
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx'
import {
  getPackaging,
  deletePackaging,
} from '../../../../utils/RequestsAPI/Products/packaging.js'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import '../../../../utils/MainWindow/MainWindow.scss'

const SelectPackaging = (props) => {
  const [selected, setSelected] = useState([])
  const [packages, setPackages] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadData = (signal) => {
    setIsLoading(true)
    getPackaging(signal)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setPackages(res)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const abortController = new AbortController()
    loadData(abortController.signal)
    if (props.defaultValue) {
      setSelected(props.defaultValue)
    }
  }, [])

  return (
    <div className="select-packaging">
      <FormWindow
        title="Выбор упаковки"
        content={
          <React.Fragment>
            <SearchBar
              title="Поиск по упаковкам"
              setSearchQuery={setSearchQuery}
              placeholder="Введите название упаковки для поиска..."
            />
            <TableView packages={packages} />
          </React.Fragment>
        }
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
      <div className="select-packaging__input">
        <div className="select-packaging__input_name">
          {'Упаковка' + (props.required ? '*' : '')}
        </div>
        <div className="select-packaging__input-field">
          {!props.readOnly && (
            <button
              onClick={(event) => {
                event.preventDefault()
                setShowWindow(!showWindow)
              }}
              className="select-packaging__button"
            >
              Добавить упаковку
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const TableView = (props) => {
  useEffect(() => {}, [props.packages])

  return (
    <div className="main-window">
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Название</span>
          <span>Количество</span>
          <span>Комментарий</span>
          <span>Размер</span>
        </div>
        {props.packages.map((item) => {
          return (
            <div className="main-window__list-item">
              <span>
                <div className="main-window__mobile-text">Название</div>
                {item.name}
              </span>
              <span>
                <div className="main-window__mobile-text">Количество</div>
                {item.quantity}
              </span>
              <span>
                <div className="main-window__mobile-text">Комментарий</div>
                {item.comment}
              </span>
              <span>
                <div className="main-window__mobile-text">Размер</div>
                {item.size}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectPackaging
