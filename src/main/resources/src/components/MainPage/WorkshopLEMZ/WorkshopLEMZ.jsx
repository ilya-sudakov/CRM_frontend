import React, { useState, useEffect } from 'react'
import './WorkshopLEMZ.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import PrintIcon from '../../../../../../../assets/print.png'
import pdfMake from 'pdfmake'
import {
  getRequestsLEMZ,
  deleteRequestLEMZ,
  getRequestLEMZById,
  deleteProductsToRequestLEMZ,
} from '../../../utils/RequestsAPI/Workshop/LEMZ.jsx'
import TableView from './TableView/TableView.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import { getRequestsListPdfText } from '../../../utils/pdfFunctions.jsx'
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'

const WorkshopLEMZ = (props) => {
  const [requestsLEMZ, setRequestsLEMZ] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState('Открытые')

  const deleteItem = (event) => {
    const id = event.target.dataset.id
    getRequestLEMZById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.lemzProducts.map((product) => {
          return deleteProductsToRequestLEMZ(product.id)
        })
        Promise.all(productsArr).then(() => {
          deleteRequestLEMZ(id).then(() => loadRequestsLEMZ())
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const printRequestsList = () => {
    let dd = getRequestsListPdfText(
      requestsLEMZ.sort((a, b) => a.id - b.id),
      'ЦехЛЭМЗ',
      'lemzProducts',
    )
    pdfMake.createPdf(dd).print()
  }

  const copyRequest = (id) => {
    props.setTransferState(true)
    props.setTransferData(
      requestsLEMZ.find((item) => {
        if (item.id === id) {
          return true
        }
      }),
    )
    props.history.push('/lemz/workshop-lemz/new')
  }

  useEffect(() => {
    document.title = 'Заявки - ЛЭМЗ'
    const abortController = new AbortController()
    loadRequestsLEMZ(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadRequestsLEMZ = (signal) => {
    setIsLoading(true)
    getRequestsLEMZ(signal)
      .then((res) => res.json())
      .then((requests) => {
        setRequestsLEMZ(requests)
        setIsLoading(false)
      })
  }

  return (
    <div className="requests_LEMZ">
      <div className="main-window">
        <div className="main-window__header">
          <SearchBar
            title="Поиск по заявкам ЛЭМЗ"
            placeholder="Введите название продукции для поиска..."
            setSearchQuery={setSearchQuery}
          />
          <div className="main-window__menu">
            <div
              className={
                curPage === 'Открытые'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Открытые')}
            >
              Открытые
            </div>
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
          </div>
        </div>
        <div className="main-window__info-panel">
          {/* {isLoading ? <ImgLoader /> : <div className="main-window__button" onClick={printRequestsList}>
                        <img className="main-window__img" src={PrintIcon} alt="" />
                        <span>Печать списка</span>
                    </div>} */}
          <Button
            text="Печать списка"
            isLoading={isLoading}
            imgSrc={PrintIcon}
            className="main-window__button"
            onClick={printRequestsList}
          />
          <div className="main-window__amount_table">
            Всего: {requestsLEMZ.length} записей
          </div>
        </div>
        <TableView
          data={requestsLEMZ.filter((item) => {
            if (curPage === 'Открытые') {
              if (item.status !== 'Завершено') return true
            } else {
              if (item.status === 'Завершено') return true
            }
          })}
          loadData={loadRequestsLEMZ}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          copyRequest={copyRequest}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default WorkshopLEMZ
