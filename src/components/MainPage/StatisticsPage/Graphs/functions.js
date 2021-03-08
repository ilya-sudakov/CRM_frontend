export const getStatsticsGraphWidgetOptions = (dataset) => {
  return {
    type: 'pie',
    data: {
      labels: Object.entries(dataset).map((item) => item[0]),
      datasets: [
        {
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#bbbbbb',
            '#bbbbbb',
            '#bbbbbb',
          ],
          data: Object.entries(dataset).map((item) => item[1].data ?? item[1]),
        },
      ],
    },
    options: {
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
    },
  };
};
