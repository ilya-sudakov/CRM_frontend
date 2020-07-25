import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './Stamp.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import {
  getStamp,
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  addStamp,
  addPartsToStamp,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import { getPressForm } from '../../../../../utils/RequestsAPI/Rigging/PressForm.jsx'
import { getMachine } from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import { getParts } from '../../../../../utils/RequestsAPI/Parts.jsx'

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
    getStampById(id)
      .then((res) => res.json())
      .then((res) => {
        const parts = res.stampParts.map((item) => {
          return deletePartsFromStamp(item.id)
        })
        Promise.all(parts).then(() => {
          deleteStamp(id).then(() => loadStamps())
        })
      })
  }

  const handleCopyDataToStamp = (event) => {
    event.preventDefault()
    getPressForm()
      .then((res) => res.json())
      .then((res) => {
        return Promise.all(
          res.map((item) =>
            addStamp({
              color: item.color,
              comment: item.comment,
              lastEdited: item.lastEdited,
              name: item.name,
              number: item.number,
              type: 'pressForm',
            })
              .then((res) => res.json())
              .then((newId) =>
                item.pressParts.map((part) =>
                  addPartsToStamp({
                    amount: part.amount,
                    comment: part.comment,
                    controll: part.controll,
                    cuttingDimension: part.cuttingDimension,
                    erosion: part.erosion,
                    grinding: part.grinding,
                    harding: part.harding,
                    location: part.location,
                    milling: part.milling,
                    name: part.name,
                    number: part.number,
                    color: part.color,
                    riggingId: newId.id,
                  }),
                ),
              ),
          ),
        )
      })
      .then(() => getMachine())
      .then((res) => res.json())
      .then((res) => {
        return Promise.all(
          res.map((item) =>
            addStamp({
              color: item.color,
              comment: item.comment,
              lastEdited: item.lastEdited,
              name: item.name,
              number: item.number,
              type: 'machine',
            })
              .then((res) => res.json())
              .then((newId) =>
                item.benchParts.map((part) =>
                  addPartsToStamp({
                    amount: part.amount,
                    comment: part.comment,
                    controll: part.controll,
                    cuttingDimension: part.cuttingDimension,
                    erosion: part.erosion,
                    grinding: part.grinding,
                    harding: part.harding,
                    location: part.location,
                    milling: part.milling,
                    name: part.name,
                    number: part.number,
                    color: part.color,
                    riggingId: newId.id,
                  }),
                ),
              ),
          ),
        )
      })
      .then(() => getParts())
      .then((res) => res.json())
      .then((res) => {
        return Promise.all(
          res.map((item) =>
            addStamp({
              color: item.color,
              comment: item.comment,
              lastEdited: item.lastEdited,
              name: item.name,
              number: item.number,
              type: 'parts',
            })
              .then((res) => res.json())
              .then((newId) =>
                item.detailParts.map((part) =>
                  addPartsToStamp({
                    amount: part.amount,
                    comment: part.comment,
                    controll: part.controll,
                    cuttingDimension: part.cuttingDimension,
                    erosion: part.erosion,
                    grinding: part.grinding,
                    harding: part.harding,
                    location: part.location,
                    milling: part.milling,
                    name: part.name,
                    number: part.number,
                    color: part.color,
                    riggingId: newId.id,
                  }),
                ),
              ),
          ),
        )
      })
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
          {/* <button
            className="main-window__button main-window__button--inverted"
            onClick={handleCopyDataToStamp}
          >
            Перекинуть все сюда
          </button> */}
          <div className="main-window__amount_table">
            Всего: {stamps.length} записей
          </div>
        </div>
        <TableView
          data={stamps.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            } else if (curPage === 'Активные' && item.color !== 'completed') {
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
