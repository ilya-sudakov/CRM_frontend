import React, { useState, useEffect } from "react"
import GraphPanel from './GraphPanel.jsx'
import ListIcon from '../../../../../../../../assets/sidemenu/list.inline.svg'
import { months } from '../../../../utils/dataObjects'
import { formatDateString } from '../../../../utils/functions.jsx'
import { createGraph, loadCanvas } from '../../../../utils/graphs.js'


const RequestsQuantityGraphPanel = (props) => {
  const [graph, setGraph] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)
  const [stats, setStats] = useState({
    category: 'Заказы',
    isLoaded: false,
    chartName: 'income-graph',
    timePeriod: `${months[new Date().getMonth() - 1]} - ${
      months[new Date().getMonth()]
    }`,
    renderIcon: () => <ListIcon className="panel__img panel__img--list" />,
  })

  const getStats = (data) => {
    let curMonthData = []
    let prevMonthData = []
    const date = new Date()
    let dates = []
    for (
      let i = 1;
      i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      i++
    ) {
      dates.push(i)
    }
    dates.map((item) => {
      const curDate = new Date(date.getFullYear(), date.getMonth(), item)
      const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, item)
      let curSum = 0
      let prevSum = 0
      data.map((request) => {
        if (formatDateString(request.date) === formatDateString(curDate)) {
          //   curMonthData.push()
          return curSum++
        }
        if (formatDateString(request.date) === formatDateString(prevDate)) {
          //   curMonthData.push()
          return prevSum++
        }
      })
      curMonthData.push(curSum)
      prevMonthData.push(prevSum)
    })
    let dataset = {
      labels: dates,
      datasets: [
        {
          data: prevMonthData,
          label: months[new Date().getMonth() - 1],
          borderColor: '#3e95cd',
          backgroundColor: 'rgba(62, 149, 205, 0.2)',
        },
        {
          data: curMonthData,
          label: months[new Date().getMonth()],
          borderColor: '#8e5ea2',
          backgroundColor: 'rgba(142, 94, 162, 0.2)',
        },
      ],
    }
    renderGraph(dataset)
  }

  const renderGraph = (dataset) => {
    if (!canvasLoaded) {
      setStats((stats) => ({
        ...stats,
        isLoaded: true,
      }))
      loadCanvas(
        `panel__chart-wrapper--${stats.chartName}`,
        `panel__chart panel__chart--${stats.chartName}`,
      )
    }

    setCanvasLoaded(true)
    const options = {
      type: 'line',
      data: dataset,
      options: {
        elements: {
          line: {
            tension: 0.5,
          },
        },
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
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
          },
        },
        tooltips: {
          mode: 'index',
        },

        scales: {
          yAxes: [
            {
              // display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                // display: false,
              },
            },
          ],
          xAxes: [
            {
              // display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                // display: false,
              },
            },
          ],
        },
      },
    }
    setTimeout(() => {
      setIsLoading(false)
      canvasLoaded && graph.destroy()
      setGraph(
        createGraph(
          options,
          document.getElementsByClassName(
            `panel__chart--${stats.chartName}`,
          )[0],
        ),
      )
    }, 150)
  }

  useEffect(() => {
    !stats.isLoaded && props.data.length > 1 && getStats(props.data)
  }, [props.data, stats])

  return <GraphPanel {...stats} />
}

export default RequestsQuantityGraphPanel
