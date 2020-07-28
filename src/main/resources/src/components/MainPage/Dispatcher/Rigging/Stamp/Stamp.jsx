import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './Stamp.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'

const Stamp = (props) => {
  const [stamps, setStamps] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [curPage, setCurPage] = useState('Активные')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Штампы'
    const abortController = new AbortController()
    !isLoaded && !isLoading && loadStamps(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadStamps = (signal) => {
    setIsLoading(true)
    getStampsByStatus('stamp', signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true)
        console.log(res)
        setStamps(res)
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
      .then(() => loadStamps())
  }

  return (
    <div className="stamp">
      <div className="main-window">
        <SearchBar
          // title="Поиск штампа"
          setSearchQuery={setSearchQuery}
          placeholder="Введите здесь запрос для поиска..."
        />
        <FloatingPlus
          linkTo="/dispatcher/rigging/stamp/new"
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
            Всего: {stamps.length} записей
          </div>
        </div>
        <TableView
          data={stamps.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            }
            if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          loadData={loadStamps}
          deleteItem={deleteItem}
          isLoading={isLoading}
          type="stamp"
        />
      </div>
    </div>
  )
}

export default Stamp
