import React, { useState, useEffect } from 'react'
import './Parts.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import ControlPanel from '../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

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
    <div className="parts">
      <div className="main-window">
        <FloatingPlus
          linkTo="/dispatcher/rigging/parts/new"
          visibility={['ROLE_ADMIN', 'ROLE_WORKSHOP', 'ROLE_ENGINEER']}
        />
        <SearchBar
          fullSize
          // title="Поиск запчастей"
          placeholder="Введите артикул запчасти для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__header main-window__header--full">
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
        <ControlPanel itemsCount={`Всего: ${parts.length} записей`} />
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
          loadData={loadData}
          type="parts"
        />
      </div>
    </div>
  )
}

export default Parts
