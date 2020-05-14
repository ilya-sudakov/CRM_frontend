export const loadCanvas = (className, canvasClassName) => {
    let canvas = document.createElement('canvas');
    let div = document.getElementsByClassName(className)[0];
    canvas.className = canvasClassName ?? "graphs-page__chart";
    canvas.id = "myChart";
    div.appendChild(canvas);
};

export const createGraph = (options) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, options);
};