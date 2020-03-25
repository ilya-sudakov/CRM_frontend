export const formatDateString = (dateString) => {
    const testDate = new Date(dateString);
    return (
        ((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
        + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
        + '.' + testDate.getFullYear()
    );
}

export const formatDateStringWithTime = (dateString) => {
    const testDate = new Date(dateString);
    return (
        ((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
        + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
        + '.' + testDate.getFullYear()
        + ' ' + ((testDate.getHours() < 10) ? ('0' + testDate.getHours()) : testDate.getHours())
        + ':' + ((testDate.getMinutes() < 10) ? ('0' + testDate.getMinutes()) : testDate.getMinutes())
    );
};

export const formatDateStringToTime = (dateString) => {
    const testDate = new Date(dateString);
    return (
        ((testDate.getHours() < 10) ? ('0' + testDate.getHours()) : testDate.getHours())
        + ':' + (((testDate.getMinutes()) < 10) ? ('0' + (testDate.getMinutes())) : testDate.getMinutes())
    );
};

export const imgToBlobDownload = (imageSrc, imageName) => {
    var img = new Image();
    img.src = imageSrc;
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = img.naturalWidth;     // update canvas size to match image
    c.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);       // draw in image
    c.toBlob(function (blob) {        // get content as JPEG blob
        // here the image is a blob
        let link = document.createElement('a');
        link.download = imageName;
        link.href = URL.createObjectURL(blob);
        link.click();
        // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
        URL.revokeObjectURL(link.href);
    }, "image/jpeg", 1);
    img.crossOrigin = "";              // if from different origin
    img.src = "url-to-image";
}

export function getDataUri(url, extension, quality) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        // img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(extension ? ("image/" + extension) : "image/png", quality ? quality : 0.92);
            resolve(dataURL);
        };
        img.onerror = error => {
            reject(error);
        };
        img.src = url;
    });
}