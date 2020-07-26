import React, { useState, useEffect } from 'react'
import './Parts.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
// import TableView from './TableView/TableView.jsx';
// import { getParts, deletePart } from '../../../../../utils/RequestsAPI/Parts.jsx';
import TableView from '../TableView/TableView.jsx'
import {
  getPart,
  deletePart,
  deletePartsFromPart,
  getPartById,
} from '../../../../../utils/RequestsAPI/Rigging/Parts.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'

const Parts = (props) => {
  const [parts, setParts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [curPage, setCurPage] = useState('Активные')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Запчасти'
    const abortController = new AbortController()
    loadParts(abortController.signal)
    // loadData(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadParts = (signal) => {
    getPart(signal)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setParts(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loadData = (signal) => {
    setIsLoading(true)
    getStamp(signal)
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

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    getPartById(id)
      .then((res) => res.json())
      .then((res) => {
        const parts = res.detailParts.map((item) => {
          return deletePartsFromPart(item.id)
        })
        Promise.all(parts).then(() => {
          deletePart(id).then(() => loadParts())
        })
      })
  }

  return (
    <div className="parts">
      <div className="main-window">
        <SearchBar
          // title="Поиск запчастей"
          placeholder="Введите артикул запчасти для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <FloatingPlus
          linkTo="/dispatcher/rigging/parts/new"
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
            Всего: {parts.length} записей
          </div>
        </div>
        <TableView
          data={parts.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            } else if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          isLoading={isLoading}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadParts}
        />
      </div>
    </div>
  )
}

export default Parts
