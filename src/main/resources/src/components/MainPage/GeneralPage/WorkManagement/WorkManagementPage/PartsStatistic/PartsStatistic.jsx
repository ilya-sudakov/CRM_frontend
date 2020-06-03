import React, { useEffect, useState, useContext } from 'react'
import './PartsStatistic.scss'
import { createGraph, loadCanvas } from '../../../../../../utils/graphs.js'
import {
  getRandomColor,
  addHexColor,
  addSpaceDelimiter,
} from '../../../../../../utils/functions.jsx'
import chevronDownSVG from '../../../../../../../../../../assets/tableview/chevron-down.svg'
import TableLoading from '../../../../../../utils/TableView/TableLoading/TableLoading.jsx'
import { UserContext } from '../../../../../../App.js'

const PartsStatistic = (props) => {
  const [graph, setGraph] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  // const originalColor = '029b09' // ? green color, but works for big amount of elements
  const originalColor = '00a3a2'
  const userContext = useContext(UserContext)
  const [curPage, setCurPage] = useState('Продукция')
  const workshopsSwitch = {
    ЦехЛЭМЗ: 'ROLE_LEMZ',
    ЦехЛепсари: 'ROLE_LEPSARI',
    ЦехЛиговский: 'ROLE_LIGOVSKIY',
  }
  const filterWorkshops = (data) => {
    return data.filter((part) => {
      if (userContext.userHasAccess(['ROLE_ADMIN'])) {
        return true
      } else {
        return userContext.userHasAccess([
          workshopsSwitch[part.product.productionLocation],
        ])
      }
    })
  }

  const optionsProducts = {
    type: 'horizontalBar',
    data: {
      labels: [
        ...filterWorkshops(Object.values(props.data))
          .sort((a, b) => {
            if (a.quantity < b.quantity) {
              return 1
            }
            if (a.quantity > b.quantity) {
              return -1
            }
            return 0
          })
          .map((product) => product.name),
      ],
      datasets: [
        {
          barThickness: 'flex',
          label: 'Количество ед. продукции',
          // backgroundColor: [
          //   ...Object.entries(props.data).map(
          //     (product, index) =>
          //       '#' +
          //       addHexColor(originalColor, index.toString(16).padEnd(6, '0')),
          //   ),
          // ],
          backgroundColor: [
            ...filterWorkshops(Object.values(props.data)).map(
              () => '#' + originalColor,
            ),
          ],
          data: [
            ...filterWorkshops(Object.values(props.data))
              .sort((a, b) => {
                if (a.quantity < b.quantity) {
                  return 1
                }
                if (a.quantity > b.quantity) {
                  return -1
                }
                return 0
              })
              .map((product) => product.quantity),
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

  const optionsDrafts = {
    type: 'horizontalBar',
    data: {
      labels: [
        ...props.drafts
          .sort((a, b) => {
            if (a.quantity < b.quantity) {
              return 1
            }
            if (a.quantity > b.quantity) {
              return -1
            }
            return 0
          })
          .map((product) => product.name),
      ],
      datasets: [
        {
          barThickness: 'flex',
          label: 'Количество ед. чертежей',
          backgroundColor: [
            ...props.drafts.map((product, index) => '#' + originalColor),
          ],
          data: [
            ...props.drafts
              .sort((a, b) => {
                if (a.quantity < b.quantity) {
                  return 1
                }
                if (a.quantity > b.quantity) {
                  return -1
                }
                return 0
              })
              .map((product) => product.quantity),
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
    if (filterWorkshops(Object.values(props.data)).length > 0) {
      setIsLoading(true)
      if (!canvasLoaded) {
        // setIsLoading(true)
        console.log('loading canvas')
        loadCanvas('main-window__chart-wrapper', 'main-window__chart')
        setCanvasLoaded(true)
      }
      setTimeout(() => {
        setIsVisible(true)
        console.log(canvasLoaded, 'destroying graph1')
        canvasLoaded && graph.destroy()
        setGraph(
          createGraph(
            curPage === 'Продукция' ? optionsProducts : optionsDrafts,
          ),
        )
        setIsLoading(false)
      }, 150)
    } else {
      setIsVisible(false)
      console.log(canvasLoaded, 'destroying graph2')
      canvasLoaded && graph.destroy()
      setIsLoading(false)
    }
  }, [props.drafts, curPage])

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <div className="parts-statistic">
          <div
            className="main-window__title"
            onClick={() => {
              return setIsVisible(!isVisible)
            }}
          >
            Отчет производства
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
                ? 'main-window__header'
                : 'main-window__header main-window__header--hidden'
            }
          >
            <div className="main-window__menu">
              <div
                className={
                  curPage === 'Продукция'
                    ? 'main-window__item main-window__item--active'
                    : 'main-window__item'
                }
                onClick={() => setCurPage('Продукция')}
              >
                Продукция
              </div>
              <div
                className={
                  curPage === 'Чертежи'
                    ? 'main-window__item main-window__item--active'
                    : 'main-window__item'
                }
                onClick={() => setCurPage('Чертежи')}
              >
                Чертежи
              </div>
            </div>
          </div>
          <div
            className={
              isVisible
                ? 'parts-statistic__wrapper'
                : 'parts-statistic__wrapper parts-statistic__wrapper--hidden'
            }
          >
            <TableLoading isLoading={props.isLoading} />
            <div
              className="main-window__chart-wrapper"
              style={{
                height: `${
                  curPage === 'Продукция'
                    ? filterWorkshops(Object.values(props.data)).length * 50
                    : props.drafts.length * 50
                }px`,
              }}
            ></div>
            <ProductsStatistics
              data={filterWorkshops(Object.values(props.data))}
              isLoading={isLoading}
              isHidden={curPage !== 'Продукция'}
            />
            <DraftsStatistics
              data={props.drafts}
              isLoading={isLoading}
              isHidden={curPage !== 'Чертежи'}
            />
          </div>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default PartsStatistic

const ProductsStatistics = (props) => {
  useEffect(() => {}, [])

  return (
    <>
      <div
        className={
          props.isHidden
            ? 'main-window__list main-window__list--hidden'
            : 'main-window__list'
        }
      >
        <div className="main-window__list-item main-window__list-item--header">
          <span>Название</span>
          <span>Количество</span>
        </div>
        {props.data
          .sort((a, b) => {
            if (a.quantity < b.quantity) {
              return 1
            }
            if (a.quantity > b.quantity) {
              return -1
            }
            return 0
          })
          .map((part, index) => {
            return (
              <div className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {part.name}
                </span>
                <span>
                  <div className="main-window__mobile-text">Количество:</div>
                  {addSpaceDelimiter(part.quantity)}
                </span>
              </div>
            )
          })}
      </div>
    </>
  )
}

const DraftsStatistics = (props) => {
  useEffect(() => {}, [])

  return (
    <>
      <div
        className={
          props.isHidden
            ? 'main-window__list main-window__list--hidden'
            : 'main-window__list'
        }
      >
        <div className="main-window__list-item main-window__list-item--header">
          <span>Название</span>
          <span>Количество</span>
        </div>
        {props.data
          .sort((a, b) => {
            if (a.quantity < b.quantity) {
              return 1
            }
            if (a.quantity > b.quantity) {
              return -1
            }
            return 0
          })
          .map((part, index) => {
            return (
              <div className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {part.name}
                </span>
                <span>
                  <div className="main-window__mobile-text">Количество:</div>
                  {addSpaceDelimiter(part.quantity)}
                </span>
              </div>
            )
          })}
      </div>
    </>
  )
}
