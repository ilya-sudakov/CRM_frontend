import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './PressForm.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import {
  getStampsByStatus,
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'

const PressForm = (props) => {
  const [pressForm, setPressForms] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [curPage, setCurPage] = useState('Активные')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Пресс-формы'
    const abortController = new AbortController()
    // loadPressForm(abortController.signal)
    loadData(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadData = (signal) => {
    setIsLoading(true)
    getStampsByStatus('pressForm', signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true)
        console.log(res)
        setPressForms(res)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const deleteItem = (id) => {
    getStampById(id)
      .then((res) => res.json())
      .then((res) =>
        Promise.all(
          res.stampParts.map((item) => deletePartsFromStamp(item.id)),
        ),
      )
      .then(() => deleteStamp(id))
      .then(() => loadData())
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
            }
            if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          searchQuery={searchQuery}
          isLoading={isLoading}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadData}
          type="pressForm"
        />
      </div>
    </div>
  )
}

export default PressForm
