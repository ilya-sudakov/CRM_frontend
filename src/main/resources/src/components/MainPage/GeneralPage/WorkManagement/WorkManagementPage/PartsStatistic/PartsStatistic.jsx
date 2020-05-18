import React, { useEffect, useState } from 'react'
import './PartsStatistic.scss'
import { createGraph, loadCanvas } from '../../../../../../utils/graphs.js'
import { getRandomColor } from '../../../../../../utils/functions.jsx'

const PartsStatistic = (props) => {
  const [graph, setGraph] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const originalColor = '#00a3a2'

  const options = {
    type: 'horizontalBar',
    data: {
      labels: [...Object.entries(props.data).map((product) => product[1].name)],
      datasets: [
        {
          label: 'Количество ед. продукции',
          backgroundColor: [
            ...Object.entries(props.data).map(
              (product, index) =>
                '#' + (index % 10) + (index % 10) + 'a3a' + (index % 10),
            ),
          ],
          data: [
            ...Object.entries(props.data).map((product) => product[1].quantity),
          ],
        },
      ],
    },
    options: {
      responsive: true,
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
              labelString: 'Количество',
              fontStyle: 'italic',
            },
          },
        ],
      },
    },
  }

  useEffect(() => {
    console.log([
      ...Object.entries(props.data).map(
        (product, index) => '#00' + (index % 10) + '3a2',
      ),
    ])
    if (Object.entries(props.data).length > 0) {
      if (!canvasLoaded) {
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
      <div className="main-window__chart-wrapper"></div>
      {/* {Object.entries(props.data).map((part) => {
        return part[1].name + ': ' + part[1].quantity
      })} */}
    </div>
  )
}

export default PartsStatistic
