import React, { useEffect, useState } from 'react'
import './PartsStatistic.scss'
import { createGraph, loadCanvas } from '../../../../../../utils/graphs.js'
import {
  getRandomColor,
  addHexColor,
  addSpaceDelimiter,
} from '../../../../../../utils/functions.jsx'
import chevronDownSVG from '../../../../../../../../../../assets/tableview/chevron-down.svg'
import TableLoading from '../../../../../../utils/TableView/TableLoading/TableLoading.jsx'

const PartsStatistic = (props) => {
  const [graph, setGraph] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  // const originalColor = '029b09' // ? green color, but works for big amount of elements
  const originalColor = '00a3a2'

  const options = {
    type: 'horizontalBar',
    data: {
      labels: [
        ...Object.entries(props.data)
          .sort((a, b) => {
            if (a[1].quantity < b[1].quantity) {
              return 1
            }
            if (a[1].quantity > b[1].quantity) {
              return -1
            }
            return 0
          })
          .map((product) => product[1].name),
      ],
      datasets: [
        {
          barThickness: 'flex',
          label: 'Количество ед. продукции',
          backgroundColor: [
            ...Object.entries(props.data).map(
              (product, index) =>
                '#' +
                addHexColor(originalColor, index.toString(16).padEnd(6, '0')),
            ),
          ],
          data: [
            ...Object.entries(props.data)
              .sort((a, b) => {
                if (a[1].quantity < b[1].quantity) {
                  return 1
                }
                if (a[1].quantity > b[1].quantity) {
                  return -1
                }
                return 0
              })
              .map((product) => product[1].quantity),
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cornerRadius: 2.5,
      fullCornerRadius: false,
      animation: {
        easing: 'easeInOutCirc',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Название',
              fontStyle: 'italic',
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Количество (шт.)',
              fontStyle: 'italic',
            },
          },
        ],
      },
    },
  }

  useEffect(() => {
    setIsLoading(true)
    if (Object.entries(props.data).length > 0) {
      setIsLoading(true)
      if (!canvasLoaded) {
        setIsLoading(true)
        loadCanvas('main-window__chart-wrapper', 'main-window__chart')
        setCanvasLoaded(true)
      }
      setTimeout(() => {
        setIsLoading(false)
        canvasLoaded && graph.destroy()
        setGraph(createGraph(options))
      }, 150)
    }
  }, [props.data])
  return (
    <div className="parts-statistic">
      <div
        className="main-window__title"
        onClick={() => {
          return setIsVisible(!isVisible)
        }}
      >
        Отчет по произведенной продукции
        <img
          className={
            isVisible
              ? 'main-window__img'
              : 'main-window__img main-window__img--rotated'
          }
          src={chevronDownSVG}
        />
      </div>
      <div
        className={
          isVisible
            ? 'parts-statistic__wrapper'
            : 'parts-statistic__wrapper parts-statistic__wrapper--hidden'
        }
      >
        <TableLoading isLoading={isLoading} />
        <div
          className="main-window__chart-wrapper"
          style={{
            height: `${Object.entries(props.data).length * 50}px`,
          }}
        ></div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Количество</span>
          </div>
          {Object.entries(props.data)
            .sort((a, b) => {
              if (a[1].quantity < b[1].quantity) {
                return 1
              }
              if (a[1].quantity > b[1].quantity) {
                return -1
              }
              return 0
            })
            .map((part, index) => {
              return (
                <div
                  className="main-window__list-item"
                  style={{
                    backgroundColor: `#${addHexColor(
                      originalColor,
                      index.toString(16).padEnd(6, '0'),
                    )}ee`,
                  }}
                >
                  <span>
                    <div className="main-window__mobile-text">Название:</div>
                    {part[1].name}
                    {/* {addHexColor(
                      originalColor,
                      (index * 10).toString(16).padStart(6, '0'),
                    )} */}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Количество:</div>
                    {addSpaceDelimiter(part[1].quantity)}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default PartsStatistic
