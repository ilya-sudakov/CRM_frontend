import contactsImg from 'Assets/priceList/contacts.png';
import testImg from 'Assets/priceList/no_img.png';
import listImg from 'Assets/priceList/list.png';
import companyLogoNoSlogan from 'Assets/priceList/osfix_logo__no_slogan.png';
import linkButtonImg from 'Assets/priceList/linkButton.png';
import saleImg from 'Assets/priceList/onSale.png';
import proprietaryItemImg from 'Assets/priceList/rospatent.png';
import { getDataUri } from 'Utils/functions.jsx';
import { pdfHeaderCompanyContacts } from './objects.js';
import { createPDF } from 'Utils/pdfFunctions.js';
import { sortByField } from 'Utils/sorting/sorting';
import { getPriceListColumnValue } from './functions.js';

const loadGroupImage = async (img) => {
  if (img !== null && img !== '') {
    return await getDataUri(img, 'jpeg', 0.3);
  }
  return null;
};

const sortProductsByNumber = (data) => {
  return sortByField(data, { fieldName: 'number', direction: 'asc' });
};

const getLine = (margins) => {
  return {
    canvas: [
      {
        type: 'line',
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 2,
        lineColor: '#e30434',
      },
    ],
    alignment: 'justify',
    width: '*',
    margin: [margins.l, margins.t, margins.r, margins.b],
  };
};

const priceStyles = {
  header: {
    fontSize: 20,
    bold: true,
    alignment: 'center',
    margin: [0, 5, 0, 5],
  },
  title: {
    fontSize: 24,
    bold: true,
  },
  subheader: {
    fontSize: 12,
    bold: true,
    margin: [0, 0, 0, 5],
    color: 'white',
    background: '#e30434',
  },
  regularText: {
    fontSize: 10,
    italics: true,
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    alignment: 'center',
  },
};

const getPriceFooterItem = (title, value) => {
  return [
    { text: `${title} `, fontSize: 10, bold: true },
    {
      text: `${value}\t`,
      fontSize: 10,
    },
  ];
};

const getPriceFooterList = (companyContacts) => {
  return {
    text: [
      ...getPriceFooterItem('ИНН', companyContacts?.inn ?? '7842143789'),
      ...getPriceFooterItem('КПП', companyContacts?.kpp ?? '784201001'),
      ...getPriceFooterItem('ОГРН', companyContacts?.ogrn ?? '1177847364584'),
      ...getPriceFooterItem('ОКПО', companyContacts?.okpo ?? '20161337'),
      ...getPriceFooterItem(
        'Банк',
        companyContacts?.bank ?? 'Филиал №7806 ВТБ (ПАО)',
      ),
      ...getPriceFooterItem(
        'Расчетный счет №',
        companyContacts?.checkingAccount ?? '40702810717060000232',
      ),
      ...getPriceFooterItem('БИК', companyContacts?.bik ?? '044525411'),
    ],
    alignment: 'left',
    width: '*',
    margin: [40, 0, 40, 10],
  };
};

const getPriceFooter = (
  currentPage,
  pageCount,
  active,
  companyContacts,
  isMini,
) => {
  if (currentPage === 1 && active && !isMini)
    return {
      text: ' ',
    };
  if (currentPage !== pageCount && !isMini) {
    return {
      text: 'Страница ' + currentPage.toString(),
      alignment: 'center',
      fontSize: 11,
      color: '#999999',
      margin: [0, 20, 0, 0],
    };
  }
  return [
    getLine({ l: 40, t: 0, r: 40, b: 10 }),
    getPriceFooterList(companyContacts),
  ];
};

const emptyTextObject = {
  text: '',
};

const getPriceHeaderItem = (name, link, options = {}) => {
  return {
    text: `${name}\n`,
    link: link ?? undefined,
    bold: options.bold ?? false,
    fontSize: 10,
    margin: options.margin ?? [0, 0, 0, 0],
    lineHeight: options.lineHeight ?? 1,
  };
};

const getPriceHeaderList = (companyContacts) => {
  const site = companyContacts?.site ?? pdfHeaderCompanyContacts.site;
  const name = companyContacts?.name ?? pdfHeaderCompanyContacts.name;
  const phone = companyContacts?.phone ?? pdfHeaderCompanyContacts.phone;
  const email = companyContacts?.email ?? pdfHeaderCompanyContacts.email;
  const legalAddress =
    companyContacts?.legalAddress ?? pdfHeaderCompanyContacts.legalAddress;
  return {
    text: [
      getPriceHeaderItem(name, site, { margin: [0, 0, 0, 0], bold: true }),
      getPriceHeaderItem(legalAddress, 'https://yandex.ru/maps/-/CKUrY0Ih', {
        lineHeight: 1.1,
      }),
      getPriceHeaderItem(site, site, { lineHeight: 1.1 }),
      getPriceHeaderItem(email, null, { lineHeight: 1.1 }),
      getPriceHeaderItem(phone, 'tel:+78124491009', { lineHeight: 1.1 }),
    ],
    margin: [5, 0, 0, 0],
    alignment: 'left',
  };
};

const getPriceHeaderLogo = (logo) => {
  return logo
    ? {
        image: logo,
        link: 'https://www.osfix.ru',
        fit: [100, 100],
        margin: [0, 13, 0, 0],
        alignment: 'right',
      }
    : emptyTextObject;
};

const getPriceHeader = (
  currentPage,
  active,
  contactsImgData,
  companyContacts = {},
  isMini,
) => {
  if (currentPage === 1 && active && !isMini) return [emptyTextObject];
  return [
    {
      alignment: 'justify',
      width: '*',
      margin: [40, 40, 40, 0],
      columns: [
        {
          image: contactsImgData,
          width: 10,
          alignment: 'left',
        },
        getPriceHeaderList(companyContacts),
        getPriceHeaderLogo(companyContacts?.logo),
      ],
    },
    getLine({ l: 40, t: 5, r: 40, b: 40 }),
  ];
};

const getAllLocationTypes = (locationTypes, location, locations) => {
  return Promise.all(
    locationTypes.map(async (locationType) => {
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
              margin: [0, 5, 1, 0],
            },
            {
              image: await getDataUri(locationType.img),
              width: 14,
            },
          ],
        });
      }
    }),
  );
};

const getGroupOfProductsName = ({ id, name, linkAddress }) => {
  return {
    text: [
      {
        text: ' ',
        style: 'subheader',
      },
      {
        text: name.toUpperCase(),
        style: 'subheader',
        fontSize: 12,
        groupId: id,
        link: linkAddress,
        bold: true,
      },
      {
        text: ' ',
        style: 'subheader',
      },
    ],
    width: 110,
  };
};

const getGroupOfProductsDescription = ({ description }) => {
  return {
    text: [
      {
        text: description,
        style: 'regularText',
        color: '#666666',
        fontSize: 8,
        bold: true,
      },
    ],
    margin: [10, 1, 0, 0],
    width: '*',
  };
};

const sortLocations = (locations) => {
  if (locations.length <= 1) return locations;
  return locations.sort((a, b) => {
    const element = a.columns[0].text.localeCompare(
      b.columns[0].text,
      undefined,
      {
        numeric: true,
      },
    );
    if (element < 0) return -1;
    if (element > 0) return 1;
    return 0;
  });
};

const getGroupOfProductsLocations = (locations) => {
  return {
    stack: [
      {
        columns: [...sortLocations(locations)],
        margin: [0, 0, 0, 2.5],
        columnGap: 1,
        width: 100,
      },
    ],
    alignment: 'right',
    width: 100,
  };
};

const getGroupOfProductsTopImages = (
  groupImg1Data,
  groupImg2Data,
  groupImg3Data,
  groupImg4Data,
  testImgData,
) => {
  const getProductTopImage = (img, marginLeft = 0) => ({
    image: img ?? testImgData,
    fit: [120, 100],
    margin: [marginLeft, 0, 0, 5],
    alignment: 'left',
  });
  return {
    columns: [
      getProductTopImage(groupImg1Data),
      getProductTopImage(groupImg2Data, 10),
      getProductTopImage(groupImg3Data, 10),
      getProductTopImage(groupImg4Data, 11),
    ],
  };
};

const getProductsTableHeaderItem = (text, marginTop = 1.5) => {
  return {
    text: text,
    margin: [0, marginTop, 0, 0],
  };
};

const getProductsTableHeaderFakeRow = (priceHeader, optionalCols) => {
  const emptyRow = { text: '', border: [false, false, false, false] };
  return [
    emptyRow,
    emptyRow,
    emptyRow,
    {
      text: priceHeader ? `${priceHeader}, ₽` : 'Цена за штуку, ₽',
      colSpan: 3 + optionalCols.length,
      italics: true,
    },
    {},
    {},
    ...optionalCols.map(() => {}),
  ];
};

const getProductsTableHeader = (groupOfProducts, optionalCols) => {
  const { retailName, firstPriceName, secondPriceName } = groupOfProducts;
  return [
    getProductsTableHeaderFakeRow(groupOfProducts.priceHeader, optionalCols),
    [
      getProductsTableHeaderItem('Артикул', 5),
      getProductsTableHeaderItem('Название', 5),
      getProductsTableHeaderItem('Ед. изм.', 5),
      getProductsTableHeaderItem(retailName ?? 'Розница'),
      getProductsTableHeaderItem(firstPriceName ?? 'до 1500 шт.'),
      getProductsTableHeaderItem(secondPriceName ?? 'до 5000 шт.'),
      ...optionalCols.map((column) =>
        getProductsTableHeaderItem(
          getPriceListColumnValue(column, groupOfProducts),
        ),
      ),
    ],
  ];
};

const getDisclaimerText = (disclaimer) => {
  return {
    margin: [0, 10, 0, 0],
    table: {
      body: [
        [
          {
            border: [true, false, false, false],
            fontSize: 12,
            borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
            text: [
              {
                text: disclaimer,
              },
            ],
            margin: [0, 0, 10, 0],
          },
        ],
      ],
    },
  };
};

const getTitlePageReceiver = ({ to, date }) => {
  return {
    alignment: 'right',
    stack: [
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 180,
            table: {
              body: [
                [
                  {
                    border: [true, true, true, false],
                    fontSize: 13,
                    borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
                    text: to,
                    alignment: 'left',
                    margin: [2.5, 2.5, 10, 2.5],
                  },
                ],
                [
                  {
                    text: date,
                    alignment: 'right',
                    fontSize: 11,
                    color: '#666666',
                    border: [true, false, true, true],
                    borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
                  },
                ],
              ],
            },
            alignment: 'right',
          },
        ],
        margin: [0, 0, 0, 5],
      },
    ],
    margin: [0, 0, 0, 50],
  };
};

const getTitlePageListItem = (listImgData, item) => {
  return [
    {
      margin: [0, 10, 0, 0],
      alignment: 'left',
      columns: [
        {
          image: listImgData,
          fit: [15, 15],
          margin: [0, 1, 0, 0],
          width: 15,
        },
        {
          text: item,
          margin: [5, 0, 0, 0],
          fontSize: 16,
          alignment: 'center',
          width: 'auto',
        },
      ],
    },
  ];
};

const getTitlePageLogo = async ({ slogan }) => {
  const companyLogoNoSloganData = await getDataUri(companyLogoNoSlogan);
  return {
    stack: [
      {
        image: companyLogoNoSloganData,
        link: 'https://www.osfix.ru',
        fit: [200, 200],
        margin: [0, 0, 0, 0],
        alignment: 'center',
      },
      {
        text: slogan,
        alignment: 'center',
        margin: [0, 5, 0, 15],
        fontSize: 18,
      },
    ],
  };
};

const getTitlePageImageObject = (img, testImgData, alignment = 'right') => {
  return {
    image: img ?? testImgData,
    fit: [150, 130],
    margin: [0, 0, 0, 5],
    alignment: alignment,
  };
};

const getTitlePageImagesList = async ({ img1, img2, img3 }) => {
  const titlePageImg1Data = await loadGroupImage(img1),
    titlePageImg2Data = await loadGroupImage(img2),
    titlePageImg3Data = await loadGroupImage(img3),
    testImgData = await getDataUri(testImg);
  return {
    columns: [
      getTitlePageImageObject(titlePageImg1Data, testImgData),
      getTitlePageImageObject(titlePageImg2Data, testImgData, 'center'),
      getTitlePageImageObject(titlePageImg3Data, testImgData, 'left'),
    ],
    alignment: 'center',
    width: 125,
    margin: [0, 0, 0, 30],
  };
};

const getTitlePage = async (titlePage) => {
  const listImgData = await getDataUri(listImg);
  const titlePageLogo = await getTitlePageLogo(titlePage),
    titlePageImagesList = await getTitlePageImagesList(titlePage);
  return {
    stack: [
      getTitlePageReceiver(titlePage),
      titlePageLogo,
      titlePageImagesList,
      {
        stack: [
          ...titlePage.list.map((item) =>
            getTitlePageListItem(listImgData, item),
          ),
        ],
      },
    ],
    pageBreak: 'after',
    margin: [0, -50, 0, 0],
  };
};

const sortFinalList = (data) => {
  if (data.length <= 1) return data;
  return data.sort((a, b) => {
    const element = a.stack[0].stack[1].text.localeCompare(
      b.stack[0].stack[1].text,
      undefined,
      { numeric: true },
    );
    if (element < 0) return -1;
    if (element > 0) return 1;
    return 0;
  });
};

const getCustomColumnText = (field, onSale, marginTop = 5) => {
  return {
    text: field,
    margin: [0, marginTop, 0, 0],
    bold: onSale,
    color: onSale ? '#111111' : '#666666',
  };
};

const getPriceColumnText = (price, onSale, isOptionsColsLengthMoreThanOne) => {
  const isNumber = price !== '' && !Number.isNaN(price) && price !== 0;
  return getCustomColumnText(
    isNumber ? price : ' ',
    onSale,
    isOptionsColsLengthMoreThanOne ? 4.5 : 0,
  );
};

const getProductsTablePriceColumns = (
  product,
  isOptionsColsLengthMoreThanOne,
) => {
  return ['retailPrice', 'lessThan1500Price', 'lessThan5000Price'].map((item) =>
    getPriceColumnText(
      product[item],
      product.onSale,
      isOptionsColsLengthMoreThanOne,
    ),
  );
};

const getProductsTableListItem = (product, optionalCols, saleImgData) => {
  const isOptionsColsLengthMoreThanOne = optionalCols.length > 1;
  return [
    getCustomColumnText(
      product.number,
      product.onSale,
      isOptionsColsLengthMoreThanOne ? 5 : 0,
    ),
    getProductsTableOnSaleText(product, saleImgData),
    getCustomColumnText(
      product.units,
      product.onSale,
      isOptionsColsLengthMoreThanOne ? 1 : 0,
    ),
    ...getProductsTablePriceColumns(product, isOptionsColsLengthMoreThanOne),
    ...optionalCols.map((column) =>
      product[column.property] !== undefined
        ? getPriceColumnText(
            product[column.property],
            product.onSale,
            isOptionsColsLengthMoreThanOne,
          )
        : getPriceColumnText(0, product.onSale, isOptionsColsLengthMoreThanOne),
    ),
  ];
};

const getProductsTableOnSaleText = (
  product,
  saleImgData,
  isOptionsColsLengthMoreThanOne,
) => {
  return product.onSale
    ? {
        columns: [
          {
            image: saleImgData,
            width: 15,
          },
          {
            text: product.name,
            margin: [5, isOptionsColsLengthMoreThanOne ? 2 : 1.5, 0, 0],
            alignment: 'left',
            bold: product.onSale,
            color: '#111111',
          },
        ],
      }
    : {
        text: product.name,
        margin: [0, isOptionsColsLengthMoreThanOne ? 1 : 0, 0, 0],
        alignment: 'left',
      };
};

const productsTableListLayout = {
  hLineWidth: function () {
    return 1;
  },
  vLineWidth: function () {
    return 1;
  },
  hLineColor: function () {
    return '#444444';
  },
  vLineColor: function () {
    return '#444444';
  },
};

const getProductsTableListWidths = (optionalCols) => {
  return [
    40,
    '*',
    '*',
    35,
    35,
    35,
    ...optionalCols.map((item, index) =>
      index < optionalCols.length - 1 ? 35 : 35,
    ),
  ];
};

const getProductsTableList = async (groupOfProducts, optionalCols) => {
  const saleImgData = await getDataUri(saleImg);
  return {
    columns: [
      {
        unbreakable: groupOfProducts.products.length <= 10 ? true : false,
        table: {
          widths: getProductsTableListWidths(optionalCols),
          body: [
            ...getProductsTableHeader(groupOfProducts, optionalCols),
            ...sortProductsByNumber(groupOfProducts.products).map((product) =>
              getProductsTableListItem(product, optionalCols, saleImgData),
            ),
          ],
        },
        layout: productsTableListLayout,
        alignment: 'center',
        width: '*',
        fontSize: 8,
        color: '#555555',
        margin: [0, 0, 0, 5],
      },
    ],
  };
};

const getProductsInfoText = (infoText) => {
  return {
    table: {
      body: [
        [
          {
            border: [true, false, false, false],
            style: 'regularText',
            borderColor: ['#e30434', '#e30434', '#e30434', '#e30434'],
            text: infoText,

            margin: [0, 0, 10, 0],
          },
        ],
      ],
    },
  };
};

const getProprietaryItem = async (text) => {
  const proprietaryItemImgData = await getDataUri(proprietaryItemImg);
  return text
    ? {
        stack: [
          {
            image: proprietaryItemImgData,
            width: 65,
            margin: [0, 10, 9, 0],
            alignment: 'right',
          },
          {
            text: text,
            margin: [0, 5, 0, 0],
            alignment: 'center',
            fontSize: 10,
          },
        ],
      }
    : {
        text: '  ',
      };
};

const getGroupSortItem = (item, isMini) => {
  return isMini
    ? item.stack[2].columns[0].table.body[2][0].text
    : item.stack[0].columns[0].text[1].groupId;
};

const sortFullGroup = (data, isMini) => {
  return data.sort((a, b) => {
    const first = getGroupSortItem(a, isMini);
    const second = getGroupSortItem(b, isMini);
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
};

const getLinkButton = (linkButtonData, linkAddress) => {
  return {
    image: linkButtonData,
    link: linkAddress,
    width: 100,
    alignment: 'right',
  };
};

const priceListCategoryNameStyles = {
  style: 'header',
  fontSize: 16,
  color: '#ffffff',
  alignment: 'center',
  relativePosition: { x: 0, y: -38 },
};

const makeListUnbreakable = (sortedArr, tempImg, category) => {
  return {
    stack: [
      ...sortedArr.map((item, index) => {
        if (index !== 0) return item;
        return {
          unbreakable:
            item.stack[2].columns[0].table.body.length <= 10 ? true : false,
          stack: [
            {
              image: tempImg,
              width: 510,
              height: 50,
              alignment: 'center',
            },
            {
              text: category.toUpperCase(),
              ...priceListCategoryNameStyles,
            },
            ...item.stack,
          ],
        };
      }),
    ],
  };
};

const getProductsHeader = (groupOfProducts, locations) => {
  return {
    width: '*',
    headlineLevel: 1,
    columns: [
      getGroupOfProductsName(groupOfProducts),
      getGroupOfProductsDescription(groupOfProducts),
      getGroupOfProductsLocations(locations),
    ],
    margin: [0, 10, 0, 10],
  };
};

const getProductsFooter = (
  groupOfProducts,
  linkButtonData,
  proprietaryItems = {},
) => {
  return {
    unbreakable: true,
    alignment: 'justify',
    width: '*',
    margin: [0, 0, 0, 10],
    columns: [
      getProductsInfoText(groupOfProducts.infoText),
      {
        unbreakable: true,
        stack: [
          getLinkButton(linkButtonData, groupOfProducts.linkAddress),
          proprietaryItems.proprietaryItem1,
          proprietaryItems.proprietaryItem2,
        ],
        width: 100,
      },
    ],
  };
};

const getProductFooterImg = (groupImgFooterData) => {
  return groupImgFooterData !== null
    ? {
        image: groupImgFooterData,
        fit: [512, 100],
      }
    : emptyTextObject;
};

const getFullGroup = async (
  groupOfProducts,
  locations,
  testImgData,
  optionalCols,
  isMini,
) => {
  let linkButtonData = await getDataUri(linkButtonImg);
  const groupImg1Data = await loadGroupImage(groupOfProducts.groupImg1);
  const groupImg2Data = await loadGroupImage(groupOfProducts.groupImg2);
  const groupImg3Data = await loadGroupImage(groupOfProducts.groupImg3);
  const groupImg4Data = await loadGroupImage(groupOfProducts.groupImg4);
  const groupImgFooterData = await loadGroupImage(groupOfProducts.footerImg);
  const proprietaryItem1 = await getProprietaryItem(
    groupOfProducts.proprietaryItemText1,
  );
  const proprietaryItem2 = await getProprietaryItem(
    groupOfProducts.proprietaryItemText2,
  );
  const productsTableList = await getProductsTableList(
    groupOfProducts,
    optionalCols,
  );
  return {
    unbreakable: groupOfProducts.products.length <= 20 ? true : false,
    stack: [
      !isMini ? getProductsHeader(groupOfProducts, locations) : emptyTextObject,
      !isMini
        ? getGroupOfProductsTopImages(
            groupImg1Data,
            groupImg2Data,
            groupImg3Data,
            groupImg4Data,
            testImgData,
          )
        : emptyTextObject,
      productsTableList,
      !isMini
        ? getProductsFooter(groupOfProducts, linkButtonData, {
            proprietaryItem1: proprietaryItem1,
            proprietaryItem2: proprietaryItem2,
          })
        : emptyTextObject,
      !isMini ? getProductFooterImg(groupImgFooterData) : emptyTextObject,
    ],
  };
};

export async function getPriceListPdf(categories, priceList, options) {
  const {
    optionalCols,
    locationTypes,
    disclaimer,
    titlePage,
    companyContacts,
    isMini,
  } = options;
  let finalList = [];
  const testImgData = await getDataUri(testImg);
  const temp = await categories.map(async (category) => {
    let fullGroup = [];
    return Promise.all(
      priceList.map(async (groupOfProducts) => {
        let locations = [];
        if (category.name !== groupOfProducts.category) return;
        const locationTypesArray = groupOfProducts.locationType.split('/');
        //getting location types
        return Promise.all(
          locationTypesArray.map((location) =>
            getAllLocationTypes(locationTypes, location, locations),
          ),
        ).then(async () => {
          const temp = await getFullGroup(
            groupOfProducts,
            locations,
            testImgData,
            optionalCols,
            isMini,
          );
          fullGroup.push(temp);
        });
      }),
    ).then(async () => {
      const tempImg = await getDataUri(category.img);
      if (fullGroup.length === 0 || !category.active)
        //Перенос категории на некст страницу если она без продукции
        return;
      const sortedArr = sortFullGroup(fullGroup, isMini);
      if (isMini) {
        return finalList.push({
          stack: [...sortedArr],
        });
      }
      return finalList.push(
        makeListUnbreakable(sortedArr, tempImg, category.name),
      );
    });
  });
  return await Promise.all(temp).then(async () => {
    finalList = isMini ? finalList : sortFinalList(finalList);
    const contactsImgData = await getDataUri(contactsImg);
    const titlePageObject = await getTitlePage(titlePage);
    const dd = {
      info: {
        title: 'Прайс-лист',
      },
      header: (currentPage) =>
        getPriceHeader(
          currentPage,
          titlePage.active,
          contactsImgData,
          companyContacts,
          isMini,
        ),
      pageMargins: [40, 125, 40, 70],
      footer: (currentPage, pageCount) =>
        getPriceFooter(
          currentPage,
          pageCount,
          titlePage.active,
          companyContacts,
          isMini,
        ),
      content: [
        titlePage.active && !isMini ? titlePageObject : emptyTextObject,
        finalList,
        !isMini ? getDisclaimerText(disclaimer) : emptyTextObject,
      ],
      styles: priceStyles,
    };
    return createPDF(dd);
  });
}
