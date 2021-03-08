import Chart from 'chart.js';
Chart.defaults.global.defaultFontFamily = 'Montserrat';

export const loadCanvas = (className, canvasClassName) => {
  let canvas = document.createElement('canvas');
  let div = document.getElementsByClassName(className)[0];
  canvas.className = canvasClassName ?? 'graphs-page__chart';
  canvas.id = 'myChart';
  div.appendChild(canvas);
};

export const createGraph = (options, chart) => {
  let newChart = chart || document.getElementById('myChart');
  const ctx = newChart.getContext('2d');
  return new Chart(ctx, options);
};

// Limit the size of the labels on the x axis
Chart.scaleService.updateScaleDefaults('category', {
  ticks: {
    callback: function (tick) {
      var characterLimit = 20;
      if (tick.length >= characterLimit) {
        return (
          tick
            .slice(0, tick.length)
            .substring(0, characterLimit - 1)
            .trim() + '...'
        );
      }
      return tick;
    },
  },
});
