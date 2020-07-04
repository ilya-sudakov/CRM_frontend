import React, { useState, useEffect } from 'react'
// import XLSX2 from 'xlsx'
import XLSX2 from 'xlsx'
import Excel from 'exceljs'
import FileSaver from 'file-saver'
import { AdminWorkspace } from '../lazyImports.jsx'
import { Link } from 'react-router-dom'
import './GeneralPage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import DownloadIcon from '../../../../../../../assets/download.svg'
import graphIcon from '../../../../../../../assets/graph-icon.svg'
import calenderIcon from '../../../../../../../assets/tableview/calendar.svg'
import {
  getRecordedWorkByMonth,
  getWorkReportByEmployee,
} from '../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { selectCellRange } from '../../../utils/xlsxFunctions.jsx'
import { getEmployeesByWorkshop } from '../../../utils/RequestsAPI/Employees.jsx'
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import ManagerWorkspace from './ManagerWorkspace/ManagerWorkspace.jsx'
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
    const dates = [[''], ['']]
    for (
      let i = 1;
      i <
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate() +
        1;
      i++
    )
      if (i < 16) dates[0].push(i)
      else dates[1].push(i)
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ]
    const monthsNew = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ]
    // console.log(XLSX.version)
    let workBook = new Excel.Workbook()

    const workSheet = workBook.addWorksheet(
      'Табель - ' + months[new Date().getMonth()],
    )

    workSheet.columns = [
      {
        key: 'name',
        width: 45,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 5,
        style: {
          font: { size: 12 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      {
        width: 10,
        style: {
          font: { bold: true, size: 14 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        },
      },
      // { header: 'Hours', key: 'name', width: 32 },
      // { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
    ]

    const titleRow = workSheet.addRow([
      'Табель - ' + months[new Date().getMonth()],
    ])
    workSheet.mergeCells(1, 1, 1, 18)
    titleRow.font = { bold: true, size: 18 }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    //adding date header
    workSheet.addRow([''])
    const dateTitleRow = workSheet.addRow([
      '1/2 ' +
        monthsNew[new Date().getMonth()] +
        '.' +
        new Date().getFullYear(),
    ])
    workSheet.getCell(workSheet.rowCount, 1).border = {
      top: { style: 'thin', color: { argb: '00000000' } },
      left: { style: 'thin', color: { argb: '00000000' } },
      bottom: { style: 'thin', color: { argb: '00000000' } },
      right: { style: 'thin', color: { argb: '00000000' } },
    }
    workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
    dateTitleRow.font = { bold: true, size: 16 }
    dateTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    //adding dates
    workSheet.addRow([...dates[0], '', 'Сумма'])
    for (let i = 1; i <= 18; i++) {
      workSheet.getCell(workSheet.rowCount, i).border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      }
    }

    let employeesList = []
    let employeesWorksList = []
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

    Promise.all(
      filteredWorkshops.map((workshop) => {
        // console.log(workshop);
        return getEmployeesByWorkshop({
          workshop: workshop,
        })
          .then((employees) => employees.json())
          .then((employees) => {
            return employeesList.push(...employees)
          })
      }),
    )
      .then(() => {
        // console.log(employeesList);
        return Promise.all(
          employeesList.map((item) => {
            return getWorkReportByEmployee(item.id, new Date().getMonth() + 1)
              .then((res) => res.json())
              .then((res) => {
                // console.log(res);
                return employeesWorksList.push(res)
              })
          }),
        )
      })
      .then(() => {
        return Promise.all(
          filteredWorkshops.map((workshop) => {
            if (
              employeesWorksList.filter(
                (employee) => employee.employee.workshop === workshop,
              ).length > 0
            ) {
              const titleRow = workSheet.addRow([workshop])
              workSheet.getCell(workSheet.rowCount, 1).border = {
                top: { style: 'thin', color: { argb: '00000000' } },
                left: { style: 'thin', color: { argb: '00000000' } },
                bottom: { style: 'thin', color: { argb: '00000000' } },
                right: { style: 'thin', color: { argb: '00000000' } },
              }
              workSheet.mergeCells(
                workSheet.rowCount,
                1,
                workSheet.rowCount,
                18,
              )
              titleRow.font = { size: 14 }
              titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
            }
            return employeesWorksList
              .filter((employee) => employee.employee.workshop === workshop)
              .sort((a, b) => {
                if (a.employee.lastName < b.employee.lastName) {
                  return -1
                }
                if (a.employee.lastName > b.employee.lastName) {
                  return 1
                }
                return 0
              })
              .map((item, index) => {
                let employeeInfo = [
                  [
                    item.employee.lastName +
                      ' ' +
                      item.employee.name +
                      ' ' +
                      item.employee.middleName,
                  ],
                ]
                let sum = 0
                dates[0].map((date, dateIndex) => {
                  let check = null
                  item.days.map((workDay) => {
                    if (workDay.day === date) {
                      check = workDay.hours
                      sum += check
                    }
                  })
                  if (date === '') {
                    return
                  }
                  if (check === null) {
                    return employeeInfo[0].push('')
                  } else {
                    return employeeInfo[0].push(check)
                  }
                })
                const tempRow = workSheet.addRow([...employeeInfo[0], '', sum])
                for (let i = 1; i <= 18; i++) {
                  workSheet.getCell(workSheet.rowCount, i).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                      argb: index % 2 === 0 ? 'FFFEFF99' : 'FFFFFFFF',
                    },
                  }
                }
                workSheet.getCell(workSheet.rowCount, 1).border = {
                  right: { style: 'thin', color: { argb: '00000000' } },
                }
                return (workSheet.getCell(workSheet.rowCount, 18).border = {
                  top: { style: 'thin', color: { argb: '00000000' } },
                  left: { style: 'thin', color: { argb: '00000000' } },
                  bottom: { style: 'thin', color: { argb: '00000000' } },
                  right: { style: 'thin', color: { argb: '00000000' } },
                })

                // const newRow = selectCellRange(
                //   workSheet,
                //   'A:' + workSheet.rowCount,
                //   'R:' + workSheet.rowCount,
                // )
                // return newRow.map((cell) => {
                //   cell.fill = {
                //     bgColor: { argb: 'FF0000FF' },
                //   }
                // })
              })
          }),
        )
      })
      .then(() => {
        for (let i = 1; i <= 18; i++) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            bottom: { style: 'thin', color: { argb: '00000000' } },
          }
        }
        workSheet.getCell(workSheet.rowCount, 1).border = {
          right: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
        }
        workSheet.getCell(workSheet.rowCount, 18).border = {
          right: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
          left: { style: 'thin', color: { argb: '00000000' } },
        }
        workSheet.addRow([''])
        const dateTitleRow = workSheet.addRow([
          '2/2 ' +
            monthsNew[new Date().getMonth()] +
            '.' +
            new Date().getFullYear(),
        ])
        workSheet.getCell(workSheet.rowCount, 1).border = {
          top: { style: 'thin', color: { argb: '00000000' } },
          left: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
          right: { style: 'thin', color: { argb: '00000000' } },
        }
        workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
        dateTitleRow.font = { bold: true, size: 16 }
        dateTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }

        workSheet.addRow([...dates[1], 'Сумма'])
        for (let i = 1; i <= 18; i++) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            top: { style: 'thin', color: { argb: '00000000' } },
            left: { style: 'thin', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
            right: { style: 'thin', color: { argb: '00000000' } },
          }
        }
        return Promise.all(
          filteredWorkshops.map((workshop) => {
            if (
              employeesWorksList.filter(
                (employee) => employee.employee.workshop === workshop,
              ).length > 0
            ) {
              const titleRow = workSheet.addRow([workshop])
              workSheet.getCell(workSheet.rowCount, 1).border = {
                top: { style: 'thin', color: { argb: '00000000' } },
                left: { style: 'thin', color: { argb: '00000000' } },
                bottom: { style: 'thin', color: { argb: '00000000' } },
                right: { style: 'thin', color: { argb: '00000000' } },
              }
              workSheet.mergeCells(
                workSheet.rowCount,
                1,
                workSheet.rowCount,
                18,
              )
              titleRow.font = { size: 14 }
              titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
            }
            return employeesWorksList
              .filter((employee) => employee.employee.workshop === workshop)
              .sort((a, b) => {
                if (a.employee.lastName < b.employee.lastName) {
                  return -1
                }
                if (a.employee.lastName > b.employee.lastName) {
                  return 1
                }
                return 0
              })
              .map((res, index) => {
                // console.log(res);
                let employeeInfo = [
                  [
                    res.employee.lastName +
                      ' ' +
                      res.employee.name +
                      ' ' +
                      res.employee.middleName,
                  ],
                ]
                let sum = 0
                dates[1].map((date) => {
                  let check = null
                  res.days.map((workDay) => {
                    if (workDay.day === date) {
                      check = workDay.hours
                      sum += check
                    }
                  })
                  if (date === '') {
                    return
                  }
                  if (check === null) {
                    employeeInfo[0].push('')
                  } else {
                    employeeInfo[0].push(check)
                  }
                })
                const diff = 16 - (employeeInfo[0].length - 1)
                let diffArray = []
                for (let i = 0; i < diff; i++) {
                  diffArray.push('')
                }
                workSheet.addRow([...employeeInfo[0], ...diffArray, sum])
                for (let i = 1; i <= 18; i++) {
                  workSheet.getCell(workSheet.rowCount, i).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                      argb: index % 2 === 0 ? 'FFFEFF99' : 'FFFFFFFF',
                    },
                  }
                }
                workSheet.getCell(workSheet.rowCount, 1).border = {
                  right: { style: 'thin', color: { argb: '00000000' } },
                }
                return (workSheet.getCell(workSheet.rowCount, 18).border = {
                  top: { style: 'thin', color: { argb: '00000000' } },
                  left: { style: 'thin', color: { argb: '00000000' } },
                  bottom: { style: 'thin', color: { argb: '00000000' } },
                  right: { style: 'thin', color: { argb: '00000000' } },
                })
              })
          }),
        )
      })
      .then(async () => {
        for (let i = 1; i <= 18; i++) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            bottom: { style: 'thin', color: { argb: '00000000' } },
          }
        }
        workSheet.getCell(workSheet.rowCount, 1).border = {
          right: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
        }
        workSheet.getCell(workSheet.rowCount, 18).border = {
          right: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
          left: { style: 'thin', color: { argb: '00000000' } },
        }

        const buffer = await workBook.xlsx.writeBuffer()
        saveAs(
          new Blob([buffer]),
          'Табель-' +
            months[new Date().getMonth()] +
            '_' +
            new Date().getFullYear() +
            '.xlsx',
        )
        setIsLoading(false)
      })
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
            {props.userHasAccess(['ROLE_ADMIN']) && (
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
