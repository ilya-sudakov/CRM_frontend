import React, { useEffect } from 'react'
import './TableView.scss'
import '../../../../../../utils/MainWindow/MainWindow.scss'
import okSVG from '../../../../../../../../../../assets/tableview/ok.svg'

const TableView = (props) => {
  const search = () => {
    // console.log(drafts);
    let re = /[.,\s]/gi
    const query = props.searchQuery.toLowerCase()
    let searchArr = query.split(' ')
    return props.drafts.filter((item) => {
      let check = true
      searchArr.map((searchWord) => {
        if (
          item.name.toLowerCase().includes(searchWord.toLowerCase()) ===
            false &&
          item.number
            .toLowerCase()
            .replace(re, '')
            .includes(query.replace(re, '')) === false
        )
          check = false
      })
      if (check === true) {
        return true
      } else {
        return false
      }
    })
  }

  const partTypes = {
    Bench: 'Станок',
    Stamp: 'Штамп',
    Press: 'Пресс-форма',
    Detail: 'Деталь',
  }

  useEffect(() => {
    // console.log(props.drafts);
    props.setShowWindow(false)
  }, [props.closeWindow])

  return (
    <div className="select-drafts__list">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Артикул</span>
            <span>Название</span>
            <span>Местоположение</span>
            <span>Тип</span>
            <div className="main-window__actions">Действие</div>
          </div>
          {search()
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
                    // console.log(props.closeWindow)
                    props.setCloseWindow(!props.closeWindow)
                  }}
                >
                  <span>
                    <div className="main-window__mobile-text">Артикул:</div>
                    {draft.number}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Название:</div>
                    {draft.name}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">
                      Местоположение:
                    </div>
                    {draft.location}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Тип:</div>
                    {partTypes[draft.type]}
                  </span>
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
