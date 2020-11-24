const lemz = '#1b4e6bbb'
const lepsari = '#5c63a2bb'
const ligovskiy = '#c068a8bb'
const office = '#ec7176bb'

export const workshopsDefaultValue = [
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
]

export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const graphOptions = {
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
        stacked: true,
        scaleLabel: {
          display: false,
          labelString: 'Дни недели',
          fontStyle: 'italic',
        },
      },
    ],
  },
}
