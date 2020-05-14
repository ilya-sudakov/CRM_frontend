import React, { useEffect, useState } from 'react'
import './Work.scss'
import SearchBar from '../SearchBar/SearchBar.jsx'
import TableView from './TableView/TableView.jsx'
import {
  deleteWork,
  getWork,
} from '../../../utils/RequestsAPI/WorkManaging/WorkList.jsx'
import '../../../utils/MainWindow/MainWindow.scss'

const Work = (props) => {
  const [work, setWork] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Работы'
    let abortController = new AbortController()
    loadWork(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    deleteWork(id).then(() => loadWork())
  }

  const loadWork = (signal) => {
    getWork(signal)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setWork(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="work">
      <div className="main-window">
        <div className="main-window__title">Работы</div>
        <SearchBar
          title="Поиск работы"
          placeholder="Введите название работы для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {work.length} записей
          </div>
        </div>
        <TableView
          data={work}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  )
}

export default Work
