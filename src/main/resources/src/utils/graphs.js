export const loadCanvas = (className) => {
    let canvas = document.createElement('canvas');
    let div = document.getElementsByClassName(className)[0];
    canvas.className = "graphs-page__chart";
    canvas.id = "myChart";
    div.appendChild(canvas);
};

export const createGraph = (options) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, options);
};