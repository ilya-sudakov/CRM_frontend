import React, { useState, useEffect } from 'react'
import './Parts.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
// import TableView from './TableView/TableView.jsx';
// import { getParts, deletePart } from '../../../../../utils/RequestsAPI/Parts.jsx';
import TableViewOld from '../TableView/TableView.jsx'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import {
  getPart,
  deletePart,
  deletePartsFromPart,
  getPartById,
} from '../../../../../utils/RequestsAPI/Rigging/Parts.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'

const Parts = (props) => {
  const [parts, setParts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [curPage, setCurPage] = useState('Активные')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Запчасти'
    const abortController = new AbortController()
    // loadParts(abortController.signal)
    loadData(abortController.signal)
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
    getStampsByStatus('parts', signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true)
        console.log(res)
        setParts(res)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    getStampById(id)
      .then((res) => res.json())
      .then((res) => {
        const parts = res.detailParts.map((item) => {
          return deletePartsFromStamp(item.id)
        })
        Promise.all(parts).then(() => {
          deleteStamp(id).then(() => loadParts())
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
        {/* <TableViewOld
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
        /> */}
        <TableView
          data={parts.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            }
            if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          isLoading={isLoading}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadParts}
          type="parts"
        />
      </div>
    </div>
  )
}

export default Parts
