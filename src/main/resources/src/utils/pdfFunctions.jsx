import font from 'pdfmake/build/vfs_fonts.js';
// import DejaVuSans from 'pdfmake/build/vfs_fonts_new.js'
import pdfMake from 'pdfmake';
import testImg from '../../../../../assets/priceList/no_img.png';
import companyLogo from '../../../../../assets/priceList/osfix_logo.png';
import contactsImg from '../../../../../assets/priceList/contacts.png';
import linkButtonImg from '../../../../../assets/priceList/linkButton.png';
import saleImg from '../../../../../assets/priceList/sale.png';
import topSellerImg from '../../../../../assets/priceList/top_seller.png';
import newItemImg from '../../../../../assets/priceList/new_item.png';
import uniqueItemImg from '../../../../../assets/priceList/unique_item.png';
import proprietaryItemImg from '../../../../../assets/priceList/proprietary_item.png';
import { formatDateString, getDataUri } from './functions.jsx';

export const getTransportationListPdfText = (transportation) => {
    const transportationList = [];
    let transportationInfo = [];
    transportation.map(item => {
        return transportationInfo.push([
            { text: formatDateString(item.date), style: 'regularText' },
            { text: item.cargo, style: 'regularText' },
            { text: item.quantity, style: 'regularText' },
            { text: item.sender, style: 'regularText' },
            { text: item.recipient, style: 'regularText' },
            { text: item.driver, style: 'regularText' },
        ])
    })
    transportationList.push({
        table: {
            widths: [60, 140, 40, 80, 80, '*'],
            body: [
                [
                    { text: 'Дата', style: 'tableHeader' },
                    { text: 'Товар', style: 'tableHeader' },
                    { text: 'Кол-во', style: 'tableHeader' },
                    { text: 'Откуда', style: 'tableHeader' },
                    { text: 'Куда', style: 'tableHeader' },
                    { text: 'Водитель', style: 'tableHeader' },
                ],
                ...transportationInfo
            ]
        }
    })
    var dd = {
        info: {
            title: 'Реестр транспортировок'
        },
        content: [
            {
                text: 'Реестр транспортировок\n',
                alignment: 'center',
                style: 'title',
                margin: [0, 0, 0, 10]
            },
            ...transportationList
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
                fontSize: 10,
                alignment: 'center'
            },
            tableHeader: {
                fontSize: 12,
                bold: true,
                italics: true,
                alignment: 'center'
            }
        }
    }
    pdfMake.vfs = font.pdfMake.vfs;
    return dd;
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

export async function getPriceListPdfText(categories, priceList, optionalCols, locationTypes, disclaimer) {
    let finalList = [];
    let dd;
    let linkButtonData = await getDataUri(linkButtonImg);
    const temp = categories.map(async category => {
        let fullGroup = [];
        return Promise.all(priceList.map(async groupOfProducts => {
            let locations = [];
            if (category.name === groupOfProducts.category) {
                return getDataUri((groupOfProducts.img !== null && groupOfProducts.img !== '') ? groupOfProducts.img : testImg)
                    .then(async (dataURI) => {
                        return Promise.all(groupOfProducts.locationType.split('/').map(location => {
                            return Promise.all(locationTypes.map(async locationType => {
                                if (locationType.name === location) {
                                    return locations.push({
                                        columnGap: 1,
                                        columns: [
                                            {
                                                text: location,
                                                style: 'regularText',
                                                fontSize: 8,
                                                color: '#e30434',
                                                alignment: 'right',
                                                margin: [0, 5, 1, 0]
                                            },
                                            {
                                                image: await getDataUri(locationType.img),
                                                width: 14
                                            }
                                        ]
                                    })
                                }
                            }))
                        }))
                            .then(async () => {
                                const saleImgData = await getDataUri(saleImg);
                                const topSellerImgData = await getDataUri(topSellerImg);
                                const newItemImgData = await getDataUri(newItemImg);
                                const uniqueItemImgData = await getDataUri(uniqueItemImg);
                                const proprietaryItemImgData = await getDataUri(proprietaryItemImg);
                                let draftImgData = '';
                                const testImgData = await getDataUri(testImg);
                                if (groupOfProducts.draftImg !== null && groupOfProducts.draftImg !== '') {
                                    draftImgData = await getDataUri(groupOfProducts.draftImg);
                                }
                                let noTags = true;
                                groupOfProducts.products.map(item => {
                                    if (item.isTopSeller || item.onSale) {
                                        noTags = false;
                                        return;
                                    };
                                });
                                fullGroup.push({
                                    unbreakable: true,
                                    stack: [
                                        {
                                            width: '*',
                                            headlineLevel: 1,
                                            columns: [
                                                {
                                                    text: [
                                                        {
                                                            text: ' ',
                                                            style: 'subheader'
                                                        },
                                                        {
                                                            text: groupOfProducts.name.toUpperCase(),
                                                            style: 'subheader',
                                                            fontSize: 11,
                                                            groupId: groupOfProducts.id
                                                        },
                                                        {
                                                            text: ' ',
                                                            style: 'subheader'
                                                        },
                                                        {
                                                            text: '  ' + groupOfProducts.description,
                                                            style: 'regularText',
                                                            color: '#666666',
                                                            fontSize: 8
                                                        }
                                                    ],
                                                    width: '*'
                                                },
                                                {
                                                    stack: [
                                                        {
                                                            columns: [
                                                                ...locations.sort((a, b) => {
                                                                    if (locations.length <= 1) return 0;
                                                                    else {
                                                                        if (a.columns[0].text.localeCompare(b.columns[0].text, undefined, { numeric: true }) < 0) {
                                                                            return -1;
                                                                        }
                                                                        if (a.columns[0].text.localeCompare(b.columns[0].text, undefined, { numeric: true }) > 0) {
                                                                            return 1;
                                                                        }
                                                                        return 0;
                                                                    }
                                                                })
                                                            ],
                                                            margin: [0, 0, 0, 2.5],
                                                            columnGap: 1,
                                                            width: 100,
                                                            // alignment: 'right'
                                                        },
                                                        // (groupOfProducts.newItem || groupOfProducts.uniqueItem || groupOfProducts.proprietaryItem)
                                                        //     ? {
                                                        //         image: (
                                                        //             groupOfProducts.newItem
                                                        //                 ? newItemImgData
                                                        //                 : groupOfProducts.uniqueItem
                                                        //                     ? uniqueItemImgData
                                                        //                     : proprietaryItemImgData
                                                        //         ),
                                                        //         fit: [60, 20]
                                                        //     }
                                                        //     : {
                                                        //         text: ' '
                                                        //     },
                                                    ],
                                                    width: 100,
                                                }
                                            ],
                                            margin: [0, 10, 0, 10]
                                        },
                                        {
                                            columns: [
                                                (groupOfProducts.newItem || groupOfProducts.uniqueItem || groupOfProducts.proprietaryItem)
                                                    ? {
                                                        width: 60,
                                                        stack: [
                                                            groupOfProducts.newItem
                                                                ? {
                                                                    image: newItemImgData,
                                                                    // fit: [60, 20],
                                                                    width: 70,
                                                                    margin: [70, 5, 0, 0],
                                                                    alignment: 'left'
                                                                }
                                                                : {
                                                                    text: ' ',
                                                                    // fit: [60, 20],
                                                                    width: 60,
                                                                    lineHeight: 0,
                                                                    margin: [80, 0, 0, 0],
                                                                    alignment: 'left'
                                                                },
                                                            groupOfProducts.uniqueItem
                                                                ? {
                                                                    image: uniqueItemImgData,
                                                                    // fit: [60, 20],
                                                                    width: 80,
                                                                    margin: [60, 5, 0, 0],
                                                                    alignment: 'left'
                                                                }
                                                                : {
                                                                    text: ' ',
                                                                    // fit: [60, 20],
                                                                    width: 60,
                                                                    margin: [80, 0, 0, 0],
                                                                    lineHeight: 0,
                                                                    alignment: 'left'
                                                                },
                                                            groupOfProducts.proprietaryItem
                                                                ? {
                                                                    image: proprietaryItemImgData,
                                                                    // fit: [60, 20],
                                                                    width: 100,
                                                                    margin: [40, 5, 0, 0],
                                                                    alignment: 'left'
                                                                }
                                                                : {
                                                                    text: ' ',
                                                                    // fit: [60, 20],
                                                                    width: 60,
                                                                    margin: [80, 0, 0, 0],
                                                                    lineHeight: 0,
                                                                    alignment: 'left'
                                                                },
                                                        ]
                                                    }
                                                    : {
                                                        text: ' ',
                                                        alignment: 'left',
                                                        width: 60,
                                                        margin: [80, 0, 0, 0],
                                                    },
                                                {
                                                    image: dataURI,
                                                    fit: [140, 100],
                                                    // margin: [80, 0, 0, 5],
                                                    margin: [80, 0, 0, 5],
                                                    alignment: 'left'
                                                },
                                                {
                                                    image: draftImgData !== '' ? draftImgData : testImgData,
                                                    // width: 200,
                                                    fit: [140, 100],
                                                    // margin: [70, 0, 0, 5],
                                                    margin: [0, 0, 40, 5],
                                                    alignment: 'right'
                                                },
                                            ]
                                        },
                                        {
                                            columns: [
                                                // {
                                                //     image: dataURI,
                                                //     width: optionalCols.length > 2 ? 62 : 90,
                                                //     // margin: [0, groupOfProducts.products.length * 3, 0, 0]
                                                //     margin: [0, 5, 0, 10]
                                                // },
                                                {
                                                    unbreakable: true,
                                                    table: {
                                                        widths: (noTags === true)
                                                            ? [40, '*', '*', 35, 35, 35, ...optionalCols.map((item, index) => index < (optionalCols.length - 1) ? 35 : 49)]
                                                            : [60, 40, '*', '*', 35, 35, 35, ...optionalCols.map((item, index) => index < (optionalCols.length - 1) ? 35 : 49)],
                                                        body: [
                                                            noTags === false
                                                                ? [
                                                                    { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    {
                                                                        text: groupOfProducts.priceHeader ? groupOfProducts.priceHeader : 'Цена за штуку',
                                                                        colSpan: (3 + optionalCols.length),
                                                                        // bold: true,
                                                                        italics: true
                                                                    },
                                                                    {},
                                                                    {},
                                                                    ...optionalCols.map(() => { })
                                                                ]
                                                                : [
                                                                    // { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    { text: '', border: [false, false, false, false] },
                                                                    {
                                                                        text: groupOfProducts.priceHeader ? groupOfProducts.priceHeader : 'Цена за штуку',
                                                                        colSpan: (3 + optionalCols.length),
                                                                        // bold: true,
                                                                        italics: true
                                                                    },
                                                                    {},
                                                                    {},
                                                                    ...optionalCols.map(() => { })
                                                                ],
                                                            noTags === false
                                                                ? [
                                                                    {
                                                                        text: '',
                                                                        border: [false, false, false, false]
                                                                    },
                                                                    {
                                                                        text: 'Артикул',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: 'Описание',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: 'Ед. изм.',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.retailName ? groupOfProducts.retailName : 'Розница',
                                                                        // bold: true
                                                                        margin: [0, 4.5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.firstPriceName ? groupOfProducts.firstPriceName : 'до 1500 шт.',
                                                                        // bold: true
                                                                        margin: [0, 1.5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.secondPriceName ? groupOfProducts.secondPriceName : 'до 5000 шт.',
                                                                        // bold: true
                                                                        margin: [0, 1.5, 0, 0]
                                                                    },
                                                                    ...optionalCols.map((column, index) => {
                                                                        return {
                                                                            text: column.property === 'partnerPrice'
                                                                                ? groupOfProducts.partnerName
                                                                                : column.property === 'dealerPrice'
                                                                                    ? groupOfProducts.dealerName
                                                                                    : column.property === 'distributorPrice'
                                                                                    && groupOfProducts.distributorName,
                                                                            // bold: true
                                                                            margin: [0, 4.5, 0, 0]
                                                                        }
                                                                    })
                                                                ]
                                                                : [
                                                                    // {
                                                                    //     text: '',
                                                                    //     border: [false, false, false, false]
                                                                    // },
                                                                    {
                                                                        text: 'Артикул',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: 'Описание',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: 'Ед. изм.',
                                                                        // bold: true
                                                                        margin: [0, 5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.retailName ? groupOfProducts.retailName : 'Розница',
                                                                        // bold: true
                                                                        margin: [0, 4.5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.firstPriceName ? groupOfProducts.firstPriceName : 'до 1500 шт.',
                                                                        // bold: true
                                                                        margin: [0, 1.5, 0, 0]
                                                                    },
                                                                    {
                                                                        text: groupOfProducts.secondPriceName ? groupOfProducts.secondPriceName : 'до 5000 шт.',
                                                                        // bold: true
                                                                        margin: [0, 1.5, 0, 0]
                                                                    },
                                                                    ...optionalCols.map((column, index) => {
                                                                        return {
                                                                            text: column.property === 'partnerPrice'
                                                                                ? groupOfProducts.partnerName
                                                                                : column.property === 'dealerPrice'
                                                                                    ? groupOfProducts.dealerName
                                                                                    : column.property === 'distributorPrice'
                                                                                    && groupOfProducts.distributorName,
                                                                            // bold: true
                                                                            margin: [0, 4.5, 0, 0]
                                                                        }
                                                                    })
                                                                ],
                                                            ...groupOfProducts.products.sort((a, b) => {
                                                                if (a.number.localeCompare(b.number, undefined, { numeric: true }) < 0) {
                                                                    return -1;
                                                                }
                                                                if (a.number.localeCompare(b.number, undefined, { numeric: true }) > 0) {
                                                                    return 1;
                                                                }
                                                                return 0;
                                                            }).map((product) => {
                                                                // return {
                                                                //     text: product.name
                                                                // };
                                                                if (noTags === false) {
                                                                    return [
                                                                        (product.onSale || product.isTopSeller)
                                                                            ? {
                                                                                image: (
                                                                                    product.isTopSeller
                                                                                        ? topSellerImgData
                                                                                        : product.onSale
                                                                                            ? saleImgData
                                                                                            : ''
                                                                                ),
                                                                                // width: 60,
                                                                                fit: [60, 15],
                                                                                border: [false, false, false, false]
                                                                            }
                                                                            : {
                                                                                text: '',
                                                                                border: [false, false, false, false]
                                                                            },
                                                                        {
                                                                            text: product.number,
                                                                            margin: [0, optionalCols.length > 1 ? 5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: product.description,
                                                                            margin: [0, optionalCols.length > 1 ? 1 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: product.units,
                                                                            margin: [0, optionalCols.length > 1 ? 1 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.retailPrice !== '' && !Number.isNaN(product.retailPrice) && product.retailPrice !== 0) ? product.retailPrice + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.lessThan1500Price !== '' && !Number.isNaN(product.lessThan1500Price) && product.lessThan1500Price !== 0) ? product.lessThan1500Price + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.lessThan5000Price !== '' && !Number.isNaN(product.lessThan5000Price) && product.lessThan5000Price !== 0) ? product.lessThan5000Price + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        ...optionalCols.map(column => product[column.property] !== undefined
                                                                            ? {
                                                                                text: (product[column.property] !== '' && !Number.isNaN(product[column.property]) && product[column.property] !== 0) ? product[column.property] + ' ₽' : ' ',
                                                                                margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                            }
                                                                            : {
                                                                                text: '',
                                                                                margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                            })
                                                                    ]
                                                                }
                                                                else {
                                                                    return [
                                                                        {
                                                                            text: product.number,
                                                                            margin: [0, optionalCols.length > 1 ? 5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: product.description,
                                                                            margin: [0, optionalCols.length > 1 ? 1 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: product.units,
                                                                            margin: [0, optionalCols.length > 1 ? 1 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.retailPrice !== '' && !Number.isNaN(product.retailPrice) && product.retailPrice !== 0) ? product.retailPrice + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.lessThan1500Price !== '' && !Number.isNaN(product.lessThan1500Price) && product.lessThan1500Price !== 0) ? product.lessThan1500Price + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        {
                                                                            text: (product.lessThan5000Price !== '' && !Number.isNaN(product.lessThan5000Price) && product.lessThan5000Price !== 0) ? product.lessThan5000Price + ' ₽' : ' ',
                                                                            margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                        },
                                                                        ...optionalCols.map(column => product[column.property] !== undefined
                                                                            ? {
                                                                                text: (product[column.property] !== '' && !Number.isNaN(product[column.property]) && product[column.property] !== 0) ? product[column.property] + ' ₽' : ' ',
                                                                                margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                            }
                                                                            : {
                                                                                text: '',
                                                                                margin: [0, optionalCols.length > 1 ? 4.5 : 0, 0, 0]
                                                                            })
                                                                    ];
                                                                }
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
                                                            return '#444444';
                                                        },
                                                        vLineColor: function (i, node) {
                                                            return '#444444';
                                                        },
                                                    },
                                                    alignment: 'center',
                                                    width: '*',
                                                    fontSize: 8,
                                                    color: '#555555',
                                                    // margin: [10, 0, 0, 5]
                                                    margin: [0, 0, 0, 5]
                                                }
                                            ]
                                        },
                                        {
                                            alignment: 'justify',
                                            width: '*',
                                            margin: [0, 0, 0, 10],
                                            columns: [
                                                {
                                                    table: {
                                                        body: [
                                                            [
                                                                {
                                                                    border: [true, false, false, false],
                                                                    style: 'regularText',
                                                                    borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
                                                                    text: groupOfProducts.infoText,

                                                                    margin: [0, 0, 10, 0],
                                                                },
                                                            ]
                                                        ],
                                                    },
                                                },
                                                {
                                                    // text: ' Смотреть на сайте '.toUpperCase(),
                                                    // link: groupOfProducts.linkAddress,
                                                    // fontSize: 8,
                                                    // margin: [0, 0, 3, 0],
                                                    // color: 'white',
                                                    // background: '#e30434',
                                                    // alignment: 'right'
                                                    image: linkButtonData,
                                                    link: groupOfProducts.linkAddress,
                                                    width: 100,
                                                    alignment: 'right'
                                                }
                                            ]
                                        }
                                    ],
                                })
                            })
                    })
            }
        }))
            .then(async () => {
                const tempImg = await getDataUri(category.img);
                const sortedArr = fullGroup.sort((a, b) => {
                    if (fullGroup.length <= 1) return 0;
                    else {
                        if (a.stack[0].columns[0].text[1].groupId.localeCompare(b.stack[0].columns[0].text[1].groupId, undefined, { numeric: true }) < 0) {
                            return -1;
                        }
                        if (a.stack[0].columns[0].text[1].groupId.localeCompare(b.stack[0].columns[0].text[1].groupId, undefined, { numeric: true }) > 0) {
                            return 1;
                        }
                        return 0;
                    }
                });
                //Перенос категории на некст страницу если она без продукции
                fullGroup.length > 0 && category.active && finalList.push({
                    stack: [
                        ...sortedArr.map((item, index) => {
                            if (index === 0) {
                                return {
                                    unbreakable: true,
                                    stack: [
                                        {
                                            image: tempImg,
                                            width: 510,
                                            height: 50,
                                            alignment: 'center',
                                        },
                                        {
                                            text: category.name.toUpperCase(),
                                            style: 'header',
                                            fontSize: 16,
                                            color: '#ffffff',
                                            alignment: 'center',
                                            relativePosition: { x: 0, y: -38 }
                                        },
                                        ...item.stack
                                    ]
                                }
                            }
                            else return item
                        }),
                    ]
                })
                //Без переноса категории на некст страницу если она без продукции
                // fullGroup.length > 0 && finalList.push({
                //     stack: [
                //         {
                //             image: tempImg,
                //             width: 510,
                //             height: 54,
                //             alignment: 'center',
                //         },
                //         {
                //             text: category.name.toUpperCase(),
                //             style: 'header',
                //             fontSize: 16,
                //             color: '#ffffff',
                //             alignment: 'center',
                //             relativePosition: { x: 0, y: -40 }
                //         },
                //         ...fullGroup.map(item => {
                //             return item
                //         })
                //     ],
                //     margin: [0, 10, 0, 10]
                // })
            })
    })
    Promise.all(temp)
        .then(async () => {
            // console.log(finalList);
            finalList = finalList.sort((a, b) => {
                // console.log(a.stack[0], b.stack[0]);
                if (finalList.length <= 1) return 0;
                else {
                    if (a.stack[0].stack[1].text.localeCompare(b.stack[0].stack[1].text, undefined, { numeric: true }) < 0) {
                        return -1;
                    }
                    if (a.stack[0].stack[1].text.localeCompare(b.stack[0].stack[1].text, undefined, { numeric: true }) > 0) {
                        return 1;
                    }
                    return 0;
                }
            })
            dd = {
                info: {
                    title: 'Прайс-лист'
                },
                // defaultStyle: {
                //     font: 'DejaVuSans'
                // },
                header: [
                    {
                        alignment: 'justify',
                        width: '*',
                        margin: [40, 40, 40, 0],
                        columns: [
                            {
                                image: await getDataUri(contactsImg),
                                width: 10,
                                alignment: 'left'
                            },
                            {
                                text: [
                                    { text: 'ООО «ОСФИКС»\n', bold: true, fontSize: 10, margin: [0, 0, 0, 2] },
                                    { text: 'Лиговский пр., 52, Санкт-Петербург, 191040\n', link: 'https://yandex.ru/maps/-/CKUrY0Ih', fontSize: 10, lineHeight: 1.1 },
                                    { text: 'osfix.ru\n', fontSize: 10, link: 'https://www.osfix.ru', lineHeight: 1.1 },
                                    { text: 'info@osfix.ru\n', fontSize: 10, lineHeight: 1.1 },
                                    { text: '+7 (812) 449-10-09\n', link: 'tel:88124491009', fontSize: 10, lineHeight: 1.1 },
                                ],
                                margin: [5, 0, 0, 0],
                                alignment: 'left'
                            },
                            {
                                image: await getDataUri(companyLogo),
                                // width: 100,
                                fit: [100, 100],
                                margin: [0, 13, 0, 0],
                                alignment: 'right'
                            }
                        ]
                    },
                    {
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: '#e30434' }],
                        alignment: 'justify',
                        width: '*',
                        margin: [40, 5, 40, 40],
                    },
                ],
                // pageMargins: function (currentPage, pageCount) {
                //     if (currentPage === pageCount) {
                //         return [40, 125, 40, 170]
                //     }
                //     else return [40, 125, 40, 70]
                // },
                pageMargins: [40, 125, 40, 70],
                // pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //     return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                // },
                footer: function (currentPage, pageCount) {
                    if (currentPage === pageCount) {
                        return [
                            {
                                canvas: [{
                                    type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: '#e30434'
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
                                    { text: 'Банк ', fontSize: 10, bold: true }, { text: 'Филиал №7806 ВТБ (ПАО)\t', fontSize: 10 },
                                    { text: 'Расчетный счет № ', fontSize: 10, bold: true }, { text: '40702810117060000232\t', fontSize: 10 },
                                    { text: 'БИК ', fontSize: 10, bold: true }, { text: '044030707\t', fontSize: 10 },
                                ],
                                alignment: 'left',
                                width: '*',
                                margin: [40, 0, 40, 10],
                            },
                            {
                                text: 'Страница ' + currentPage.toString(),
                                alignment: 'center',
                                fontSize: 11,
                                color: '#999999'
                            }
                        ]
                    }
                    else return {
                        text: 'Страница ' + currentPage.toString(),
                        alignment: 'center',
                        fontSize: 11,
                        color: '#999999',
                        margin: [0, 20, 0, 0]
                    }
                },
                // defaultStyle: {
                //     font: 'DejaVuSans'
                // },
                content: [
                    finalList,
                    // {
                    //     text: disclaimer,
                    //     margin: [0, 50, 0, 0],
                    //     alignment: 'left',
                    // }
                    // {
                    // margin: [0, 50, 0, 0],
                    // alignment: 'center',
                    // text: [
                    //     {
                    //         text: ' ',
                    //         style: 'subheader',
                    //     },
                    //     {
                    //         text: 'Дополнительная информация',
                    //         italics: true,
                    //         fontSize: 14,
                    //         style: 'subheader'
                    //     },
                    //     {
                    //         text: ' ',
                    //         style: 'subheader',
                    //     },
                    // ]
                    // },
                    {
                        // margin: [0, 50, 0, 0],
                        margin: [0, 10, 0, 0],
                        table: {
                            body: [
                                [
                                    {
                                        border: [true, false, false, false],
                                        fontSize: 12,
                                        borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
                                        text: [
                                            // {
                                            //     text: 'Дополнительная информация:\n\n',
                                            //     italics: true,
                                            //     fontSize: 10,
                                            // },
                                            {
                                                text: disclaimer
                                            }
                                        ],
                                        margin: [0, 0, 10, 0],
                                    },
                                ]
                            ],
                        },
                    }
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
                        fontSize: 12,
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
            };
            // pdfMake.fonts = {
            //     DejaVuSans: {
            //         normal: 'DejaVuSans.ttf',
            //         bold: 'DejaVuSans-Bold.ttf',
            //         italics: 'DejaVuSans-Oblique.ttf',
            //         bolditalics: 'DejaVuSans-BoldOblique.ttf'
            //     }
            // };
            // pdfMake.vfs = DejaVuSans.pdfMake.vfs;
            pdfMake.vfs = font.pdfMake.vfs;
            pdfMake.createPdf(dd).open();
            // return dd;
        })
}