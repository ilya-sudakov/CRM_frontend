import React, { useEffect, useState } from 'react'
import './AdminWorkspace.scss'
// import XLSX from 'xlsx';
import { Notifications, WorkManagement } from '../../lazyImports.jsx'
// import Chart from 'chart.js'
import { getRecordedWorkByDateRange } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import { formatDateStringNoYear } from '../../../../utils/functions.jsx'
import TableLoading from '../../../../utils/TableView/TableLoading/TableLoading.jsx'
import chevronDownSVG from '../../../../../../../../assets/tableview/chevron-down.svg'
import { createGraph, loadCanvas } from '../../../../utils/graphs.js'
import Button from '../../../../utils/Form/Button/Button.jsx'

const AdminWorkspace = (props) => {
  const lemz = '#1b4e6bbb'
  const lepsari = '#5c63a2bb'
  const ligovskiy = '#c068a8bb'
  const office = '#ec7176bb'
  // const lemz = '#365c8d'
  // const lepsari = '#277f8e'
  // const ligovskiy = '#1fa187'
  // const office = '#4ac16d'
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const [weekOffset, setWeekOffset] = useState(0)
  const [graph, setGraph] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [workshops, setWorkshops] = useState([
    {
      label: 'ЦехЛЭМЗ',
      backgroundColor: lemz,
      data: [],
      borderWidth: 1,
    },
    {
      label: 'ЦехЛепсари',
      backgroundColor: lepsari,
      data: [],
      borderWidth: 1,
    },
    {
      label: 'ЦехЛиговский',
      backgroundColor: ligovskiy,
      data: [],
      borderWidth: 1,
    },
    {
      label: 'Офис',
      backgroundColor: office,
      data: [],
      borderWidth: 1,
    },
  ])

  useEffect(() => {
    let abortController = new AbortController()
    const curDay = new Date(
      new Date().setDate(new Date().getDate() + -7 * weekOffset),
    )
    let week = []
    for (
      let i = 1;
      i <=
      (weekOffset === 0
        ? new Date().getDay() === 0
          ? 7
          : new Date().getDay()
        : 7);
      i++
    ) {
      let first = curDay.getDate() - curDay.getDay() + i
      let day = new Date(curDay.setDate(first))
      week.push(day)
    }
    // console.log(week);
    workshops.map((workshop, index) => {
      let temp = workshops
      temp.splice(index, 1, {
        ...workshop,
        data: [],
      })
    })
    setIsLoading(true)
    // console.log(week)
    getRecordedWorkByDateRange(
      week[0].getDate(),
      week[0].getMonth() + 1,
      week[week.length - 1].getDate(),
      week[week.length - 1].getMonth() + 1,
      abortController.signal,
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        week.map((day) => {
          workshops.map((workshop, index) => {
            let temp = workshops
            let oldData = workshop.data
            oldData.push(
              res.reduce((sum, cur) => {
                if (
                  workshop.label === cur.employee.workshop &&
                  new Date(day).getDate() ===
                    new Date(cur.year, cur.month + 1, cur.day).getDate()
                ) {
                  return Math.ceil((sum + cur.hours) * 10) / 10
                } else return sum
              }, 0),
            )
            temp.splice(index, 1, {
              ...workshop,
              data: oldData,
            })
          })
        })
        // console.log(workshops)
        if (props.userHasAccess(['ROLE_ADMIN'])) {
          !canvasLoaded &&
            loadCanvas(
              'admin-workspace__chart-wrapper',
              'admin-workspace__chart',
            )
          setCanvasLoaded(true)
          const options = {
            type:
              (window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth) > 500
                ? 'bar'
                : 'horizontalBar',
            data: {
              labels: [
                ...week.map(
                  (day, index) =>
                    // weekdays[index] + ' ' + formatDateStringNoYear(day),
                    weekdays[index],
                ),
              ],
              datasets: [...workshops],
            },
            options: {
              cornerRadius: 2.5,
              fullCornerRadius: false,
              responsive: true,
              maintainAspectRatio:
                (window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth) > 500
                  ? true
                  : false,
              animation: {
                easing: 'easeInOutCirc',
              },
              tooltips: {
                mode: 'index',
              },
              legend: {
                position:
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) > 500
                    ? 'right'
                    : 'bottom',
                labels: {
                  usePointStyle: true,
                },
              },
              scales: {
                yAxes: [
                  {
                    // display: false,
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      display:
                        (window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth) > 500
                          ? false
                          : true,
                      beginAtZero: true,
                    },
                    stacked: true,
                    scaleLabel: {
                      display: false,
                      labelString: 'Часы',
                      fontStyle: 'italic',
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      display:
                        (window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth) > 500
                          ? true
                          : false,
                    },
                    maxBarThickness: 80,
                    // barPercentage: 0.6,
                    // categoryPercentage: 0.9,
                    stacked: true,
                    scaleLabel: {
                      display: false,
                      labelString: 'Дни недели',
                      fontStyle: 'italic',
                    },
                  },
                ],
              },
            },
          }
          setTimeout(() => {
            setIsLoading(false)
            canvasLoaded && graph.destroy()
            setGraph(createGraph(options))
          }, 150)
        }
      })
    return function cancel() {
      abortController.abort()
    }
  }, [weekOffset, workshops])

  return (
    <div className="admin-workspace">
      <WorkManagement userHasAccess={props.userHasAccess} />
      {/* {props.userHasAccess(['ROLE_ADMIN']) && (
        <Notifications userHasAccess={props.userHasAccess} />
      )} */}
      {props.userHasAccess(['ROLE_ADMIN']) && (
        <div className="admin-workspace__chart-wrapper">
          <TableLoading isLoading={isLoading} />
          <div className="main-window__mobile-text">
            <span className="admin-workspace__date">
              {formatDateStringNoYear(
                new Date(
                  new Date().setDate(
                    new Date().getDate() +
                      -7 * weekOffset -
                      new Date(
                        new Date().setDate(
                          new Date().getDate() + -7 * weekOffset,
                        ),
                      ).getDay() +
                      1,
                  ),
                ),
              ) +
                ' - ' +
                formatDateStringNoYear(
                  new Date(
                    new Date().setDate(
                      new Date().getDate() +
                        -7 * weekOffset -
                        new Date(
                          new Date().setDate(
                            new Date().getDate() + -7 * weekOffset,
                          ),
                        ).getDay() +
                        7,
                    ),
                  ),
                )}
            </span>
            Сводка за неделю
          </div>
          <div className="admin-workspace__header">
            {/* <button className="admin-workspace__button" onClick={(event) => {
                        event.preventDefault();
                        setWeekOffset(weekOffset + 1);
                    }}>Пред. неделя</button>
                     */}
            {/* <img
              src={chevronDownSVG}
              onClick={(event) => {
                setWeekOffset(weekOffset + 1)
              }}
              className="admin-workspace__chevron admin-workspace__chevron--back"
            /> */}
            <div className="admin-workspace__title">
              <span className="admin-workspace__date">
                {formatDateStringNoYear(
                  new Date(
                    new Date().setDate(
                      new Date().getDate() +
                        -7 * weekOffset -
                        new Date(
                          new Date().setDate(
                            new Date().getDate() + -7 * weekOffset,
                          ),
                        ).getDay() +
                        1,
                    ),
                  ),
                ) +
                  ' - ' +
                  formatDateStringNoYear(
                    new Date(
                      new Date().setDate(
                        new Date().getDate() +
                          -7 * weekOffset -
                          new Date(
                            new Date().setDate(
                              new Date().getDate() + -7 * weekOffset,
                            ),
                          ).getDay() +
                          7,
                      ),
                    ),
                  )}
              </span>
              Сводка за неделю
            </div>
            <Button
              text="Пред. неделя"
              className="admin-workspace__button"
              isLoading={weekOffset === 0 ? false : isLoading}
              onClick={(event) => {
                setWeekOffset(weekOffset + 1)
              }}
              inverted
            />
            <Button
              text="Тек. неделя"
              className="admin-workspace__button"
              isLoading={weekOffset !== 0 ? false : isLoading}
              onClick={(event) => {
                setWeekOffset(0)
              }}
              inverted
            />
            {/* <img
              src={chevronDownSVG}
              className="admin-workspace__chevron admin-workspace__chevron--next"
              onClick={(event) => {
                setWeekOffset(0)
              }}
            /> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminWorkspace
