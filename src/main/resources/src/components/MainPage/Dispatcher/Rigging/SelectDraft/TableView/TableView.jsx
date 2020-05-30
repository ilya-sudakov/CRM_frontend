import React, { useEffect } from 'react'
import './TableView.scss'
import '../../../../../../utils/MainWindow/MainWindow.scss'
import okSVG from '../../../../../../../../../../assets/tableview/ok.svg'

const TableView = (props) => {
  useEffect(() => {
    // console.log(props.drafts);
    props.setShowWindow(false)
  }, [props.drafts, props.closeWindow])

  return (
    <div className="select-drafts__list">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Артикул</span>
            <span>Название</span>
            <span>Местоположение</span>
            <div className="main-window__actions">Действие</div>
          </div>
          {props.drafts
            .filter(
              (draft) =>
                draft.number
                  .toLowerCase()
                  .includes(props.searchQuery.toLowerCase()) ||
                draft.name
                  .toLowerCase()
                  .includes(props.searchQuery.toLowerCase()) ||
                draft.location
                  .toLowerCase()
                  .includes(props.searchQuery.toLowerCase()),
            )
            .map((draft, index) => {
              return (
                <div
                  className="main-window__list-item"
                  onClick={() => {
                    props.selectDraft(draft.id, draft.name, draft.type)
                    console.log(props.closeWindow)
                    props.setCloseWindow(!props.closeWindow)
                  }}
                >
                  <span>{draft.number}</span>
                  <span>{draft.name}</span>
                  <span>{draft.location}</span>
                  <div className="main-window__actions">
                    <div
                      className="main-window__action"
                      onClick={() => {
                        props.selectDraft(draft.id, draft.name, draft.type)
                        console.log(props.closeWindow)
                        props.setCloseWindow(!props.closeWindow)
                      }}
                      title="Выбрать деталь"
                    >
                      {/* Выбрать */}
                      <img className="main-window__img" src={okSVG} alt="" />
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
