import React from 'react'
import './ReportTablePage.scss'
import DownloadIcon from '../../../../../../../../assets/download.svg'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import { exportReportTableExcel } from '../../../../utils/xlsxFunctions.jsx'
import ControlPanel from '../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'
import TableView from './TableView.jsx'
import { EmployeeInfo } from './InfoComponents.jsx'

const SummaryPage = ({
  setSearchQuery,
  isLoading,
  excelIsLoading,
  setExcelIsLoading,
  date,
  setDate,
  showWindow,
  setShowWindow,
  selectedInfo,
  dates,
  workList,
  setSelectedInfo,
  searchQuery,
  userContext,
}) => {
  return (
    <>
      <SearchBar
        fullSize
        // title="Поиск по сотрудникам"
        placeholder="Введите запрос для поиска по сотрудникам..."
        setSearchQuery={setSearchQuery}
      />
      <ControlPanel
        buttons={
          <>
            <div className="report-table-page__date">
              <InputDate
                selected={Date.parse(date)}
                inputName="Выбор месяца:"
                handleDateChange={(date) => {
                  setDate(date)
                }}
                showMonthYearPicker
              />
            </div>
            <Button
              text="Скачать .xlsx"
              imgSrc={DownloadIcon}
              className="main-window__button main-window__button--inverted"
              inverted
              isLoading={isLoading || excelIsLoading}
              onClick={async () => {
                setExcelIsLoading(true)
                const filteredWorkshops = [
                  'ЦехЛЭМЗ',
                  'ЦехЛепсари',
                  'ЦехЛиговский',
                  'Офис',
                  'Уволенные',
                ]
                await exportReportTableExcel(new Date(date), filteredWorkshops)
                setExcelIsLoading(false)
              }}
            />
          </>
        }
      />
      {/* //Окно для вывода информации о сотруднике и его работе за день */}
      <EmployeeInfo
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        selectedInfo={selectedInfo}
      />
      <TableView
        dates={dates}
        workData={workList}
        showWindow={showWindow}
        isLoading={isLoading}
        setShowWindow={setShowWindow}
        setSelectedInfo={setSelectedInfo}
        date={date}
        userContext={userContext}
        searchQuery={searchQuery}
      />
    </>
  )
}

export default SummaryPage
