import font from 'pdfmake/build/vfs_fonts';

export const formatDateString = (dateString) => {
    const testDate = new Date(dateString);
    return (
        ((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
        + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
        + '.' + testDate.getFullYear()
    );
}

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

export const getRequestPdfText = (date, requestProducts, codeWord, workshopName, itemId) => {
    let productsArr = requestProducts.map((item) => {
        return [item.name, item.quantity, item.packaging, '', '']
    })
    var dd = {
        info: {
            title: 'План производства №' + itemId
        },
        content: [
            {
                text: 'План производства' + ' №' + itemId + '\n',
                alignment: 'center',
                style: 'header',
            },
            workshopName ? {
                text: [
                    {
                        text: '\n' + 'Подразделение: ',
                        style: 'subheader'
                    },
                    {
                        text: workshopName + '\n' + '\n',
                        style: 'regularText'
                    }
                ],
            } : '\n',
            {
                text: [
                    {
                        text: 'Дата: ',
                        style: 'subheader'
                    },
                    {
                        text: formatDateString(date) + '\n' + '\n',
                        style: 'regularText'
                    }
                ],
            },
            {
                text: 'Продукция: ',
                style: 'subheader',
                margin: [0, 0, 0, 5],
            },
            {
                table: {
                    widths: ['*', 70, 70, 70, 70],
                    body: [
                        [
                            { text: 'Название', style: 'tableHeader' },
                            { text: 'Кол-во', style: 'tableHeader' },
                            { text: 'Фасовка', style: 'tableHeader' },
                            { text: '', style: 'tableHeader' },
                            { text: '', style: 'tableHeader' }
                        ],
                        ...productsArr
                    ]
                }
            },
            ('\n'),
            {
                text: [
                    {
                        text: 'Кодовое слово: ',
                        style: 'subheader'
                    },
                    {
                        text: codeWord,
                        style: 'regularText'
                    }
                ]
            },
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            subheader: {
                fontSize: 18,
                bold: true
            },
            regularText: {
                fontSize: 16
            },
            tableHeader: {
                fontSize: 16,
                bold: true,
                alignment: 'center'
            }
        }
    }
    pdfMake.vfs = font.pdfMake.vfs;
    return dd;
}

export const getRequestsListPdfText = (requests, workshopName, productsName) => {
    const requestsFormatted = requests.map(item => {
        if (item.status !== 'Завершено') {
            return [
                {
                    text: [
                        {
                            text: 'План производства №' + item.id + '\n',
                            style: 'header',
                            alignment: 'center',
                            margin: [0, 0, 0, 10]
                        }
                    ],
                },
                {
                    text: [
                        {
                            text: 'Дата: ',
                            style: 'subheader'
                        },
                        {
                            text: formatDateString(item.date) + '\n',
                            style: 'regularText'
                        }
                    ],
                },
                {
                    text: [
                        {
                            text: 'Статус: ',
                            style: 'subheader'
                        },
                        {
                            text: item.status + '\n',
                            style: 'regularText'
                        }
                    ],
                },
                {
                    text: 'Продукция: ',
                    style: 'subheader',
                    margin: [0, 0, 0, 5],
                },
                {
                    table: {
                        widths: ['*', 70, 70, 70, 70],
                        body: [
                            [
                                { text: 'Название', style: 'tableHeader' },
                                { text: 'Кол-во', style: 'tableHeader' },
                                { text: 'Фасовка', style: 'tableHeader' },
                                { text: '', style: 'tableHeader' },
                                { text: '', style: 'tableHeader' }
                            ],
                            ...item[productsName].map((item) => {
                                return [item.name, item.quantity, item.packaging, '', '']
                            })
                        ]
                    }
                },
                ('\n'),
                {
                    text: [
                        {
                            text: 'Кодовое слово: ',
                            style: 'subheader'
                        },
                        {
                            text: item.codeWord,
                            style: 'regularText'
                        }
                    ]
                },
                ('\n\n\n')
            ]
        }
    });
    var dd = {
        info: {
            title: 'План производства - список'
        },
        content: [
            {
                text: 'План производства - список\n',
                alignment: 'center',
                style: 'title',
            },
            workshopName ? {
                text: [
                    {
                        text: '\n' + 'Подразделение: ',
                        style: 'subheader'
                    },
                    {
                        text: workshopName + '\n\n',
                        style: 'regularText'
                    }
                ],
            } : '\n',
            ...requestsFormatted
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            title: {
                fontSize: 24,
                bold: true
            },
            subheader: {
                fontSize: 18,
                bold: true
            },
            regularText: {
                fontSize: 16
            },
            tableHeader: {
                fontSize: 16,
                bold: true,
                alignment: 'center'
            }
        }
    }
    pdfMake.vfs = font.pdfMake.vfs;
    return dd;
}