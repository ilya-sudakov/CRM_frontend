import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './Machine.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableViewOld from '../TableView/TableView.jsx'
import TableView from '../RiggingComponents/TableView/TableView.jsx'
import {
  getMachine,
  getMachineById,
  deletePartsFromMachine,
  deleteMachine,
} from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'
import FloatingPlus from '../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from '../../../../../utils/RequestsAPI/Rigging/Stamp.jsx'

const Machine = (props) => {
  const [machines, setMachines] = useState([])
  const [curPage, setCurPage] = useState('Активные')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    document.title = 'Станки'
    // loadMachines()
    loadData(abortController.signal)
  }, [])

  const loadMachines = () => {
    getMachine()
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setMachines(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loadData = (signal) => {
    setIsLoading(true)
    getStampsByStatus('machine', signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true)
        console.log(res)
        setMachines(res)
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
        const parts = res.benchParts.map((item) => {
          return deletePartsFromStamp(item.id)
        })
        Promise.all(parts).then(() => {
          deleteStamp(id).then(() => loadMachines())
        })
      })
  }

  return (
    <div className="machine">
      <div className="main-window">
        <SearchBar
          // title="Поиск станка"
          setSearchQuery={setSearchQuery}
          placeholder="Введите здесь запрос для поиска..."
        />
        <FloatingPlus
          linkTo="/dispatcher/rigging/machine/new"
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
            Всего: {machines.length} записей
          </div>
        </div>
        {/* <TableViewOld
          data={machines.filter((item) => {
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
          loadData={loadMachines}
        /> */}
        <TableView
          data={machines.filter((item) => {
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
          loadData={loadMachines}
          type="machine"
        />
      </div>
    </div>
  )
}

export default Machine
