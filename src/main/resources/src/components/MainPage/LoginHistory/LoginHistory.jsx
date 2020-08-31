import React, { useState, useEffect } from 'react'
import './LoginHistory.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import ControlPanel from '../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

const LoginHistory = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [history, setHistory] = useState([
    {
      id: 1,
      username: 'ЦехЛепсари',
      date: '12.01.2020',
    },
  ])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    //API
  }

  const deleteItem = () => {
    //API
  }

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: 'id',
    id: 'desc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.getAttribute('name')
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase()
    return data.filter(
      (item) =>
        item.username.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    )
  }

  const sortHistory = (data) => {
    return filterSearchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  return (
    <div className="login-history">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">История входов (Тест)</div>
        </div>
        <SearchBar
          //   title="Поиск по истории входов"
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="date desc">По дате (убыв.)</option>
              </select>
            </div>
          }
          itemsCount={`Всего: ${history.length} записей`}
        />
        <TableView
          data={sortHistory(history)}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  )
}

export default LoginHistory
