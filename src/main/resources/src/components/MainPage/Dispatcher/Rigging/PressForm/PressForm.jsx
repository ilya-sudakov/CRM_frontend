import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './PressForm.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableView from '../TableView/TableView.jsx'
import {
  getPressForm,
  getPressFormById,
  deletePartsFromPressForm,
  deletePressForm,
} from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'

const PressForm = (props) => {
  const [pressForm, setPressForms] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [curPage, setCurPage] = useState('Активные')

  useEffect(() => {
    document.title = 'Пресс-формы'
    const abortController = new AbortController()
    loadPressForm(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadPressForm = (signal) => {
    getPressForm(signal)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setPressForms(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    getPressFormById(id)
      .then((res) => res.json())
      .then((res) => {
        const parts = res.pressParts.map((item) => {
          return deletePartsFromPressForm(item.id)
        })
        Promise.all(parts).then(() => {
          deletePressForm(id).then(() => loadPressForm())
        })
      })
  }

  return (
    <div className="press_form">
      <div className="main-window">
        <SearchBar
          // title="Поиск пресс-формы"
          setSearchQuery={setSearchQuery}
          placeholder="Введите здесь запрос для поиска..."
        />
        <FloatingPlus
          linkTo="/dispatcher/rigging/press-form/new"
          visibility={['ROLE_ADMIN', 'ROLE_WORKSHOP', 'ROLE_ENGINEER']}
        />
        <div className="main-window__header">
          <div className="main-window__menu">
            <div
              className={
                curPage === 'Активные'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Активные')}
            >
              Активные
            </div>
            {!props.userHasAccess(['ROLE_WORKSHOP']) && (
              <div
                className={
                  curPage === 'Завершено'
                    ? 'main-window__item--active main-window__item'
                    : 'main-window__item'
                }
                onClick={() => setCurPage('Завершено')}
              >
                Завершено
              </div>
            )}
          </div>
        </div>
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {pressForm.length} записей
          </div>
        </div>
        <TableView
          data={pressForm.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            } else if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadPressForm}
        />
      </div>
    </div>
  )
}

export default PressForm
