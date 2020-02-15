import font from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake';
import testImg from '../../../../../assets/priceList/test.jpg';
import companyLogo from '../../../../../assets/priceList/osfix_logo.png';
import contactsImg from '../../../../../assets/priceList/contacts.png';

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

export const getEmployeesListPdfText = (employees, workshops) => {
    const employeesList = [];
    workshops.map(workshop => {
        employeesList.push({
            text: [
                {
                    text: '\n' + 'Подразделение: ',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: workshop + '\n\n',
                    style: 'regularText'
                }
            ],
        });
        let employeeInfo = [];
        employees.map(item => {
            if (item.workshop === workshop) {
                employeeInfo.push([
                    (item.lastName + ' ' + item.name + ' ' + item.middleName),
                    formatDateString(item.yearOfBirth),
                    item.citizenship,
                    item.position,
                    ''
                ]);
            }
        })
        employeesList.push({
            table: {
                widths: ['*', 70, 80, 120, 100],
                body: [
                    [
                        { text: 'ФИО', style: 'tableHeader' },
                        { text: 'Дата рождения', style: 'tableHeader' },
                        { text: 'Гражданство', style: 'tableHeader' },
                        { text: 'Должность', style: 'tableHeader' },
                        { text: '', style: 'tableHeader' },
                    ],
                    ...employeeInfo
                ]
            }
        })

    })
    var dd = {
        info: {
            title: 'Список сотрудников'
        },
        content: [
            {
                text: 'Список сотрудников\n',
                alignment: 'center',
                style: 'title',
            },
            ...employeesList
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
                fontSize: 12,
                bold: true,
                alignment: 'center'
            }
        }
    }
    pdfMake.vfs = font.pdfMake.vfs;
    return dd;
}

export const getEmployeesByWorkshopListPdfText = (employees, workshop) => {
    const employeesList = [];
    // employeesList.push({
    //     text: [
    //         {
    //             text: '\n' + 'Подразделение: ',
    //             style: 'header',
    //             alignment: 'center'
    //         },
    //         {
    //             text: workshop + '\n\n',
    //             style: 'regularText'
    //         }
    //     ],
    // });
    let employeeInfo = [];
    employees.map(item => {
        employeeInfo.push([
            (item.lastName + ' ' + item.name + ' ' + item.middleName),
            formatDateString(item.yearOfBirth),
            item.citizenship,
            item.position,
            ''
        ]);
    })
    employeesList.push({
        table: {
            widths: ['*', 70, 80, 120, 100],
            body: [
                [
                    { text: 'ФИО', style: 'tableHeader' },
                    { text: 'Дата рождения', style: 'tableHeader' },
                    { text: 'Гражданство', style: 'tableHeader' },
                    { text: 'Должность', style: 'tableHeader' },
                    { text: '', style: 'tableHeader' }
                ],
                ...employeeInfo
            ]
        }
    })
    var dd = {
        info: {
            title: 'Список сотрудников - ' + workshop
        },
        content: [
            {
                text: 'Список сотрудников ' + workshop + '\n\n',
                alignment: 'center',
                style: 'title',
            },
            ...employeesList
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
                fontSize: 12,
                bold: true,
                alignment: 'center'
            }
        }
    }
    pdfMake.vfs = font.pdfMake.vfs;
    return dd;
}

function getDataUri(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        // img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            resolve(dataURL);
        };
        img.onerror = error => {
            reject(error);
        };
        img.src = url;
    });
}

export function getPriceListPdfText(categories, priceList, optionalCols) {
    let finalList = [];
    let dd;
    const temp = categories.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }).map(category => {
        let fullGroup = [];
        return Promise.all(priceList.map(groupOfProducts => {
            if (category.name === groupOfProducts.category) {
                console.log(groupOfProducts.img);
                return getDataUri((groupOfProducts.img !== null && groupOfProducts.img !== '') ? groupOfProducts.img : testImg)
                    .then((dataURI) => {
                        // console.log(temp3);
                        fullGroup.push({
                            width: '*',
                            columns: [
                                {
                                    text: [{
                                        text: ' ',
                                        style: 'subheader'
                                    }, {
                                        text: groupOfProducts.name,
                                        style: 'subheader'
                                    }, {
                                        text: ' ',
                                        style: 'subheader'
                                    }, {
                                        text: '  ' + groupOfProducts.description,
                                        style: 'regularText',
                                    }],
                                    width: '*'
                                },
                                {
                                    text: {
                                        text: groupOfProducts.locationType,
                                        style: 'regularText',
                                        alignment: 'right'
                                    },
                                    width: 100,
                                    alignment: 'right'
                                }],
                            margin: [0, 10, 0, 10]
                        });
                        fullGroup.push({
                            // alignment: 'justify',
                            columns: [
                                {
                                    image: dataURI,
                                    width: optionalCols.length > 2 ? 62 : 100
                                },
                                {
                                    table: {
                                        widths: ['*', '*', '*', 33, 30, 30, ...optionalCols.map((item, index) => index < (optionalCols.length - 1) ? 45 : 50)],
                                        body: [
                                            [
                                                { text: '', border: [false, false, false, false] },
                                                { text: '', border: [false, false, false, false] },
                                                { text: '', border: [false, false, false, false] },
                                                {
                                                    text: 'Цена за штуку',
                                                    colSpan: (3 + optionalCols.length),
                                                    bold: true
                                                },
                                                {},
                                                {},
                                                ...optionalCols.map(() => { })
                                            ],
                                            [
                                                { text: 'Артикул', bold: true },
                                                { text: 'Описание', bold: true },
                                                { text: 'Ед. изм.', bold: true },
                                                { text: 'Розница', bold: true },
                                                { text: 'до 1500 шт.', bold: true },
                                                { text: 'до 5000 шт.', bold: true },
                                                ...optionalCols.map(column => { return { text: column.name, bold: true } })
                                            ],
                                            ...groupOfProducts.products.map(product => {
                                                // return {
                                                //     text: product.name
                                                // };
                                                return [
                                                    product.number,
                                                    product.description,
                                                    product.units,
                                                    product.retailPrice + ' ₽',
                                                    product.lessThan1500Price + ' ₽',
                                                    product.lessThan5000Price + ' ₽',
                                                    ...optionalCols.map(column => product[column.property] !== undefined
                                                        ? product[column.property] + ' ₽'
                                                        : '')
                                                ];
                                            }),
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: function (i, node) {
                                            return 1;
                                        },
                                        vLineWidth: function (i, node) {
                                            return 1;
                                        },
                                        hLineColor: function (i, node) {
                                            return '#222222';
                                        },
                                        vLineColor: function (i, node) {
                                            return '#222222';
                                        },
                                    },
                                    alignment: 'center',
                                    width: '*',
                                    fontSize: 8,
                                    color: '#333333',
                                    margin: [20, 0, 0, 10]
                                }
                            ]
                        });
                        fullGroup.push({
                            alignment: 'justify',
                            width: '*',
                            margin: [0, 0, 0, 5],
                            columns: [
                                {
                                    table: {
                                        body: [
                                            [
                                                {
                                                    border: [true, false, false, false],
                                                    style: 'regularText',
                                                    borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
                                                    text: groupOfProducts.infoText
                                                },
                                            ]
                                        ],
                                        // margin: [0, 0, 0, 200],
                                        // heights: 1,
                                    }
                                },
                                {
                                    text: ' Смотреть на сайте ',
                                    link: groupOfProducts.linkAddress,
                                    fontSize: 12,
                                    margin: [0, 0, 3, 0],
                                    color: 'white',
                                    background: '#e30434',
                                    alignment: 'right'
                                }
                            ]
                        })
                    })
            }
        }))
            .then(async () => {
                fullGroup.length > 0 && finalList.push({
                    stack: [
                        {
                            image: await getDataUri(category.img),
                            width: 400,
                            height: 40,
                            alignment: 'center',
                            // margin: [0, 10, 0, 10]
                        },
                        {
                            text: category.name,
                            style: 'header',
                            bold: false,
                            color: '#ffffff',
                            alignment: 'center',
                            relativePosition: { x: 0, y: -37 }
                            // absolutePosition: {x: 100, y: 50}
                        },
                        ...fullGroup
                    ],
                    margin: [0, 10, 0, 10]
                })
            })
    })
    Promise.all(temp)
        .then(async () => {
            dd = {
                info: {
                    title: 'Прайс-лист'
                },
                header: [
                    {
                        alignment: 'justify',
                        width: '*',
                        margin: [40, 40, 40, 30],
                        columns: [
                            {
                                image: await getDataUri(contactsImg),
                                width: 200,
                                alignment: 'left'
                            },
                            {
                                image: await getDataUri(companyLogo),
                                // width: 100,
                                fit: [100, 100],
                                alignment: 'right'
                            }
                        ]
                    }],
                pageMargins: [40, 100, 40, 60],
                // pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //     return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                // },
                footer: function (currentPage, pageCount) {
                    if (currentPage === pageCount) {
                        return [
                            {
                                canvas: [{
                                    type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e30434'
                                }],
                                alignment: 'justify',
                                width: '*',
                                margin: [40, 0, 40, 10],
                            },
                            {
                                text: [
                                    { text: 'ИНН ', fontSize: 10, bold: true }, { text: '7842143789\t', fontSize: 10 },
                                    { text: 'КПП ', fontSize: 10, bold: true }, { text: '784201001\t', fontSize: 10 },
                                    { text: 'ОГРН ', fontSize: 10, bold: true }, { text: '117784736458\t', fontSize: 10 },
                                    { text: 'ОКПО ', fontSize: 10, bold: true }, { text: '20161337\n', fontSize: 10 },
                                    { text: 'Банк ', fontSize: 10, bold: true }, { text: 'Филиал No7806 ВТБ (ПАО)\t', fontSize: 10 },
                                    { text: 'Расчетный счет № ', fontSize: 10, bold: true }, { text: '40702810117060000232\t', fontSize: 10 },
                                    { text: 'БИК ', fontSize: 10, bold: true }, { text: '044030707\t', fontSize: 10 },
                                ],
                                alignment: 'left',
                                width: '*',
                                margin: [40, 0, 40, 0],
                            },
                            {
                                text: 'Страница ' + currentPage.toString(),
                                alignment: 'center',
                                fontSize: 11,
                                color: '#555555'
                            }
                        ]
                    }
                    else return {
                        text: 'Страница ' + currentPage.toString(),
                        alignment: 'center',
                        fontSize: 11,
                        color: '#555555',
                        margin: [0, 20, 0, 0]
                    }
                },
                content: [
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e30434' }] },
                    finalList
                ],
                styles: {
                    header: {
                        fontSize: 20,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 5, 0, 5]
                    },
                    title: {
                        fontSize: 24,
                        bold: true
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 0, 0, 5],
                        color: 'white',
                        background: '#e30434'
                    },
                    regularText: {
                        fontSize: 10,
                        italics: true
                    },
                    tableHeader: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center'
                    }
                }
            }
            pdfMake.vfs = font.pdfMake.vfs;
            pdfMake.createPdf(dd).open();
            // return dd;
        })
}