import React, { useState, useEffect } from 'react'
import './TableView.scss'
import '../../../../../../utils/MainWindow/MainWindow.scss'
import okSVG from '../../../../../../../assets/tableview/ok.svg'
import PlaceholderLoading from '../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // props.data.length > 0 && setIsLoading(false)
    props.setShowWindow && props.setShowWindow(false)
  }, [props.closeWindow, props.data])

  return (
    <div className="client-categories__list">
      <div className="main-window">
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Видимость</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="20px"
              items={2}
            />
          )}
          {props.data
            .filter((item) => {
              return item.name
                .toLowerCase()
                .includes(props.searchQuery.toLowerCase())
            })
            .sort((a, b) => {
              if (
                a.name.localeCompare(b.name, undefined, { numeric: true }) < 0
              ) {
                return -1
              }
              if (
                a.name.localeCompare(b.name, undefined, { numeric: true }) > 0
              ) {
                return 1
              }
              return 0
            })
            .map((item) => {
              return (
                <div
                  className="main-window__list-item"
                  onClick={() => {
                    props.selectCategory(item.id, item.name)
                    props.setCloseWindow(!props.closeWindow)
                  }}
                >
                  <span>
                    <div className="main-window__mobile-text">Название: </div>
                    {item.name}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Видимость: </div>
                    {item.visibility}
                  </span>
                  <div className="main-window__actions">
                    <div
                      className="main-window__action"
                      title="Выбрать категорию"
                    >
                      <img className="main-window__img" src={okSVG} />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default TableView
