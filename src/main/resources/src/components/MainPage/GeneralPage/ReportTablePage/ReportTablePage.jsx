import React, { useEffect, useState, useContext } from 'react'
import './ReportTablePage.scss'
import DownloadIcon from '../../../../../../../../assets/download.svg'
import { getRecordedWorkByMonth } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import Button from '../../../../utils/Form/Button/Button.jsx'
import { exportReportTableExcel } from '../../../../utils/xlsxFunctions.jsx'
import { UserContext } from '../../../../App.js'
import ControlPanel from '../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'
import FloatingPlus from '../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import TableView from './TableView.jsx'
import { EmployeeInfo } from './InfoComponents.jsx'
import { EmployeePage } from './Pages.jsx'

const ReportTablePage = (props) => {
  const [date, setDate] = useState(new Date())
  const [workshops, setWorkshops] = useState([
    { name: 'ЦехЛЭМЗ', allowedRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'] },
    { name: 'ЦехЛиговский', allowedRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'] },
    { name: 'ЦехЛепсари', allowedRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'] },
    {
      name: 'Офис',
      allowedRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_MANAGER'],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [excelIsLoading, setExcelIsLoading] = useState(false)
  const [workData, setWorkData] = useState([])
  const [dates, setDates] = useState([])
  const [workList, setWorkList] = useState({})
  const [showWindow, setShowWindow] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const userContext = useContext(UserContext)
  const [curPage, setCurPage] = useState('summary') //Текущая страница

  const getAllEmployeesWorkData = (date, signal) => {
    setIsLoading(true)
    //Получаем массив с датами месяца
    const dates = []
    for (
      let i = 1;
      i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + 1;
      i++
    )
      dates.push(i)
    setDates([...dates])

    let employeesWorkList = {} //Массив работ для каждого сотрудника за месяц
    // let newWorkList = {}

    return getRecordedWorkByMonth(date.getMonth() + 1, signal)
      .then((res) => res.json())
      .then((res) => {
        //Создаем объект с работами сотрудников, в которых их id - поля объекта,
        //это помогает  для избегания излишних циклов
        res.map((workItem) => {
          if (employeesWorkList[workItem.employee.id] === undefined) {
            // console.log(workItem)
            employeesWorkList = Object.assign({
              ...employeesWorkList,
              [workItem.employee.id]: {
                employee: workItem.employee,
                workArray: [
                  {
                    workId: workItem.id,
                    workControlProduct: workItem.workControlProduct,
                    partsWorks: workItem.partsWorks,
                    workList: workItem.workList,
                    day: workItem.day,
                    hours: workItem.hours,
                  },
                ],
              },
            })
          } else {
            employeesWorkList = Object.assign({
              ...employeesWorkList,
              [workItem.employee.id]: {
                ...employeesWorkList[workItem.employee.id],
                workArray: [
                  ...employeesWorkList[workItem.employee.id].workArray,
                  {
                    workId: workItem.id,
                    workControlProduct: workItem.workControlProduct,
                    partsWorks: workItem.partsWorks,
                    workList: workItem.workList,
                    day: workItem.day,
                    hours: workItem.hours,
                  },
                ],
              },
            })
          }
        })
        // console.log('newArr:', employeesWorkList)
        // return setWorkList({ ...employeesWorkList })
      })
      .then(() => {
        //Объединяем работы за одни и те же дни
        let newWorkList = employeesWorkList
        Object.values(employeesWorkList).map((item) => {
          item.workArray.map((workItem) => {
            const prevWorks =
              newWorkList[item.employee.id].works === undefined ||
              newWorkList[item.employee.id]?.works[workItem.day] === undefined
                ? []
                : newWorkList[item.employee.id].works[workItem.day]

            newWorkList = Object.assign({
              ...newWorkList,
              [item.employee.id]: {
                ...newWorkList[item.employee.id],
                works: {
                  ...newWorkList[item.employee.id].works,
                  [workItem.day]: [
                    ...prevWorks,
                    {
                      workId: workItem.workId,
                      workControlProduct: workItem.workControlProduct,
                      partsWorks: workItem.partsWorks,
                      workList: workItem.workList,
                      day: workItem.day,
                      hours: workItem.hours,
                    },
                  ],
                },
              },
            })
          })
        })
        // console.log('newnewnew: ', newWorkList)
        employeesWorkList = newWorkList
      })
      .then(() => {
        //Заполняем дни, которых нет в сводке
        let newWorkList = employeesWorkList
        let sum = 0
        Object.values(employeesWorkList).map((item) => {
          dates.map((date) => {
            if (item.works[date] === undefined) {
              //Проверка, есть ли уже учтенная работа за этот день
              newWorkList = Object.assign({
                ...newWorkList,
                [item.employee.id]: {
                  ...newWorkList[item.employee.id],
                  works: {
                    ...newWorkList[item.employee.id].works,
                    [date]: { day: date, hours: 0 },
                  },
                },
              })
            }
          })
        })
        // console.log(newWorkList)
        setIsLoading(false)
        return setWorkList({ ...newWorkList })
      })
  }

  useEffect(() => {
    document.title = 'Табель'
    let abortController = new AbortController()
    getAllEmployeesWorkData(date, abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [date])

  const pages = {
    summary: () => (
      <SummaryPage
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        excelIsLoading={excelIsLoading}
        setExcelIsLoading={setExcelIsLoading}
        date={date}
        setDate={setDate}
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        selectedInfo={selectedInfo}
        dates={dates}
        workList={workList}
        setSelectedInfo={setSelectedInfo}
        searchQuery={searchQuery}
        userContext={userContext}
      />
    ),
    employee: () => (
      <>
        {/* <ControlPanel
          styles={{ marginTop: '-5px' }}
          buttons={
            <Button
              text="Пред. неделя"
              className="main-window__button main-window__button--inverted"
              inverted
              isLoading={isLoading || excelIsLoading}
              onClick={() => {
                const newDate = new Date(
                  new Date(date).setTime(
                    date.getTime() - 7 * 24 * 60 * 60 * 1000,
                  ),
                )
                console.log(date, newDate)
                return setDate(newDate)
              }}
            />
          }
        /> */}
        <EmployeePage
          userContext={userContext}
          workList={workList}
          isLoading={isLoading}
          date={date}
        />
      </>
    ),
  }

  return (
    <div className="report-table-page">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Табель</div>
          <div className="main-window__menu">
            <div
              className={
                curPage === 'summary'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('summary')}
            >
              Все сотрудники
            </div>
            <div
              className={
                curPage === 'employee'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('employee')}
            >
              Просмотр сотрудника
            </div>
          </div>
        </div>
        <FloatingPlus
          linkTo="/work-management/record-time/new"
          visibility={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
        />
        {pages[curPage]()}
      </div>
    </div>
  )
}

export default ReportTablePage

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
        }
        content={
          <div className="report-table-page__date">
            <InputDate
              selected={Date.parse(date)}
              inputName="Выбор месяца:"
              handleDateChange={(date) => {
                // console.log(value)
                setDate(date)
              }}
              showMonthYearPicker
            />
          </div>
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
