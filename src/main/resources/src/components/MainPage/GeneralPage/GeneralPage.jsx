import React, { useState, useEffect } from 'react'
import { AdminWorkspace } from '../lazyImports.jsx'
import { Link } from 'react-router-dom'
import './GeneralPage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import DownloadIcon from '../../../../../../../assets/download.svg'
import graphIcon from '../../../../../../../assets/graph-icon.svg'
import calenderIcon from '../../../../../../../assets/tableview/calendar.svg'
import { exportReportTableExcel } from '../../../utils/xlsxFunctions.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'

const GeneralPage = (props) => {
  const [date, setDate] = useState(new Date())
  const [workshops, setWorkshops] = useState([
    'ЦехЛЭМЗ',
    'ЦехЛепсари',
    'ЦехЛиговский',
    'Офис',
    'Уволенные',
  ])
  const [isLoading, setIsLoading] = useState(false)

  async function testExcelJSLibrary() {
    setIsLoading(true)
    let filteredWorkshops = []
    if (
      props.userHasAccess(['ROLE_ADMIN']) ||
      props.userHasAccess(['ROLE_DISPATCHER'])
    ) {
      filteredWorkshops = workshops
    } else if (props.userHasAccess(['ROLE_LEMZ'])) {
      filteredWorkshops = ['ЦехЛЭМЗ']
    } else if (props.userHasAccess(['ROLE_LEPSARI'])) {
      filteredWorkshops = ['ЦехЛепсари']
    } else if (props.userHasAccess(['ROLE_LIGOVSKIY'])) {
      filteredWorkshops = ['ЦехЛиговский']
    } else if (props.userHasAccess(['ROLE_ENGINEER'])) {
      filteredWorkshops = ['Офис']
    } else if (props.userHasAccess(['ROLE_MANAGER'])) {
      filteredWorkshops = ['Офис']
    }
    await exportReportTableExcel(new Date(), filteredWorkshops)
    setIsLoading(false)
  }

  useEffect(() => {
    document.title = 'Главная страница'
  })

  return (
    <div className="general-page">
      <div className="main-window">
        <div className="main-window__title">Главная страница</div>
        <div className="main-window__content">
          {/* <div className="main-window__date">{'Дата: ' + formatDateString(date)}</div> */}
          <div className="main-window__control-panel">
            {props.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_DISPATCHER',
              'ROLE_MANAGER',
              'ROLE_WORKSHOP',
              'ROLE_ENGINEER',
            ]) && (
              <Link
                className="main-window__button"
                to="/work-management/record-time/new"
              >
                Учесть рабочее время
              </Link>
            )}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && (
              <Link className="main-window__button" to="/report-table">
                <img className="main-window__img" src={calenderIcon} />
                Интерактивный табель
              </Link>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <Link className="main-window__button" to="/graphs">
                <img className="main-window__img" src={graphIcon} />
                Графики
              </Link>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <Link className="main-window__button" to="/statistics">
                <img className="main-window__img" src={graphIcon} />
                Статистика
              </Link>
            )}
            <Button
              text="Скачать Табель"
              imgSrc={DownloadIcon}
              className="main-window__button main-window__button--inverted"
              inverted
              isLoading={isLoading}
              onClick={testExcelJSLibrary}
            />
          </div>
          {props.userHasAccess([
            'ROLE_ADMIN',
            'ROLE_DISPATCHER',
            'ROLE_MANAGER',
            'ROLE_LIGOVSKIY',
            'ROLE_LEMZ',
            'ROLE_LEPSARI',
            'ROLE_ENGINEER',
          ]) && <AdminWorkspace userHasAccess={props.userHasAccess} />}
        </div>
      </div>
    </div>
  )
}

export default GeneralPage
