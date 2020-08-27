import React, { useState, useEffect } from 'react'
import './Storage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import TableView from './TableView/TableView.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import {
  deleteStorage,
  getStorage,
} from '../../../utils/RequestsAPI/Workshop/LemzStorage.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'

const Storage = (props) => {
  const [storage, setStorage] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Склад'
    const abortController = new AbortController()
    loadStorage(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadStorage = (signal) => {
    getStorage(signal)
      .then((res) => res.json())
      .then((res) => {
        setStorage(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    deleteStorage(id).then(() => loadStorage())
  }

  return (
    <div className="storage">
      <div className="main-window">
        <FloatingPlus
          linkTo="/lemz/workshop-storage/new"
          visibility={['ROLE_ADMIN', 'ROLE_WORKSHOP']}
        />
        <SearchBar
          // title="Поиск по складу"
          placeholder="Введите артикул детали для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {storage.length} записей
          </div>
        </div>
        <TableView
          data={storage}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          workshopName="lemz"
        />
      </div>
    </div>
  )
}

export default Storage
