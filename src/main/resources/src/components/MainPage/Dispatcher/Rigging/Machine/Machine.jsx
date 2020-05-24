import React, { useState, useEffect } from 'react'
import SearchBar from '../../../SearchBar/SearchBar.jsx'
import './Machine.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'
import TableView from '../TableView/TableView.jsx'
import {
  getMachine,
  getMachineById,
  deletePartsFromMachine,
  deleteMachine,
} from '../../../../../utils/RequestsAPI/Rigging/Machine.jsx'

const Machine = (props) => {
  const [machines, setMachines] = useState([])
  const [curPage, setCurPage] = useState('Активные')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Станки'
    loadMachines()
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

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    getMachineById(id)
      .then((res) => res.json())
      .then((res) => {
        const parts = res.benchParts.map((item) => {
          return deletePartsFromMachine(item.id)
        })
        Promise.all(parts).then(() => {
          deleteMachine(id).then(() => loadMachines())
        })
      })
  }

  return (
    <div className="machine">
      <div className="main-window">
        <SearchBar
          title="Поиск станка"
          setSearchQuery={setSearchQuery}
          placeholder="Введите здесь запрос для поиска..."
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
            <div
              className={
                curPage === 'Завершено'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() =>
                !props.userHasAccess(['ROLE_WORKSHOP']) &&
                setCurPage('Завершено')
              }
            >
              Завершено
            </div>
          </div>
        </div>
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {machines.length} записей
          </div>
        </div>
        <TableView
          data={machines.filter((item) => {
            if (item.color === 'completed' && curPage === 'Завершено') {
              return true
            } else if (curPage === 'Активные' && item.color !== 'completed') {
              return true
            }
          })}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          loadData={loadMachines}
        />
      </div>
    </div>
  )
}

export default Machine
