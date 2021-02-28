import companyLogo from "../../../../../../../../assets/priceList/osfix_logo.png";
import contactsImg from "../../../../../../../../assets/priceList/contacts.png";
import testImg from "../../../../../../../../assets/priceList/no_img.png";
import listImg from "../../../../../../../../assets/priceList/list.png";
import companyLogoNoSlogan from "../../../../../../../../assets/priceList/osfix_logo__no_slogan.png";
import linkButtonImg from "../../../../../../../../assets/priceList/linkButton.png";
import saleImg from "../../../../../../../../assets/priceList/onSale.png";
import proprietaryItemImg from "../../../../../../../../assets/priceList/rospatent.png";
import { getDataUri } from "../../../../utils/functions.jsx";
import { pdfHeaderCompanyContacts } from "./objects.js";
import { createPDF } from "../../../../utils/pdfFunctions.js";
import { sortByField } from "../../../../utils/sorting/sorting";

const loadGroupImage = async (img) => {
  if (img !== null && img !== "") {
    return await getDataUri(img, "jpeg", 0.3);
  }
  return null;
};

const sortProductsByNumber = (data) => {
  return sortByField(data, { fieldName: "number", direction: "asc" });
};

const getLine = (margins) => {
  return {
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 2,
        lineColor: "#e30434",
      },
    ],
    alignment: "justify",
    width: "*",
    margin: [margins.l, margins.t, margins.r, margins.b],
  };
};

const priceStyles = {
  header: {
    fontSize: 20,
    bold: true,
    alignment: "center",
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
    color: "white",
    background: "#e30434",
  },
  regularText: {
    fontSize: 10,
    italics: true,
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    alignment: "center",
  },
};

const getPriceFooter = (currentPage, pageCount, active, companyContacts) => {
  if (currentPage === 1 && active) {
    return {
      text: " ",
    };
  }
  if (currentPage !== pageCount) {
    return {
      text: "Страница " + currentPage.toString(),
      alignment: "center",
      fontSize: 11,
      color: "#999999",
      margin: [0, 20, 0, 0],
    };
  }
  return [
    getLine({ l: 40, t: 0, r: 40, b: 10 }),
    {
      text: [
        { text: "ИНН ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.inn ?? "7842143789"}\t`,
          fontSize: 10,
        },
        { text: "КПП ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.kpp ?? "784201001"}\t`,
          fontSize: 10,
        },
        { text: "ОГРН ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.ogrn ?? "1177847364584"}\t`,
          fontSize: 10,
        },
        { text: "ОКПО ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.okpo ?? "20161337"}\n`,
          fontSize: 10,
        },
        { text: "Банк ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.bank ?? "Филиал №7806 ВТБ (ПАО)"}\t`,
          fontSize: 10,
        },
        { text: "Расчетный счет № ", fontSize: 10, bold: true },
        {
          text: `${
            companyContacts?.checkingAccount ?? "40702810717060000232"
          }\t`,
          fontSize: 10,
        },
        { text: "БИК ", fontSize: 10, bold: true },
        {
          text: `${companyContacts?.bik ?? "044525411"}\t`,
          fontSize: 10,
        },
      ],
      alignment: "left",
      width: "*",
      margin: [40, 0, 40, 10],
    },
  ];
};

const getPriceHeader = (
  currentPage,
  active,
  contactsImgData,
  companyLogoData,
  companyContacts
) => {
  if (currentPage === 1 && active) {
    return [
      {
        text: "",
      },
    ];
  }
  return [
    {
      alignment: "justify",
      width: "*",
      margin: [40, 40, 40, 0],
      columns: [
        {
          image: contactsImgData,
          width: 10,
          alignment: "left",
        },
        {
          text: [
            {
              text: `${
                companyContacts?.name ?? pdfHeaderCompanyContacts.name
              }\n`,
              link: companyContacts?.site ?? pdfHeaderCompanyContacts.site,
              bold: true,
              fontSize: 10,
              margin: [0, 0, 0, 2],
            },
            {
              text: `${
                companyContacts?.legalAddress ??
                pdfHeaderCompanyContacts.legalAddress
              }\n`,
              link: "https://yandex.ru/maps/-/CKUrY0Ih",
              fontSize: 10,
              lineHeight: 1.1,
            },
            {
              text: `${
                companyContacts?.site ?? pdfHeaderCompanyContacts.site
              }\n`,
              fontSize: 10,
              link: companyContacts?.site ?? pdfHeaderCompanyContacts.site,
              lineHeight: 1.1,
            },
            {
              text: `${
                companyContacts?.email ?? pdfHeaderCompanyContacts.email
              }\n`,
              fontSize: 10,
              lineHeight: 1.1,
            },
            {
              text: `${
                companyContacts?.phone ?? pdfHeaderCompanyContacts.phone
              }\n`,
              link: "tel:+78124491009",
              fontSize: 10,
              lineHeight: 1.1,
            },
          ],
          margin: [5, 0, 0, 0],
          alignment: "left",
        },
        companyContacts?.logo
          ? {
              image: companyContacts?.logo,
              link: "https://www.osfix.ru",
              fit: [100, 100],
              margin: [0, 13, 0, 0],
              alignment: "right",
            }
          : { text: "" },
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
              style: "regularText",
              fontSize: 8,
              color: "#e30434",
              alignment: "right",
              margin: [0, 5, 1, 0],
            },
            {
              image: await getDataUri(locationType.img),
              width: 14,
            },
          ],
        });
      }
    })
  );
};

const getGroupOfProductsName = ({ id, name, linkAddress }) => {
  return {
    text: [
      {
        text: " ",
        style: "subheader",
      },
      {
        text: name.toUpperCase(),
        style: "subheader",
        fontSize: 12,
        groupId: id,
        link: linkAddress,
        bold: true,
      },
      {
        text: " ",
        style: "subheader",
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
        style: "regularText",
        color: "#666666",
        fontSize: 8,
        bold: true,
      },
    ],
    margin: [10, 1, 0, 0],
    width: "*",
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
      }
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
    alignment: "right",
    width: 100,
  };
};

const getGroupOfProductsTopImages = (
  groupImg1Data,
  groupImg2Data,
  groupImg3Data,
  groupImg4Data,
  testImgData
) => {
  const getProductTopImage = (img, marginLeft = 0) => ({
    image: img ?? testImgData,
    fit: [120, 100],
    margin: [marginLeft, 0, 0, 5],
    alignment: "left",
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

const getProductsTableHeader = (groupOfProducts, optionalCols) => {
  return [
    [
      { text: "", border: [false, false, false, false] },
      { text: "", border: [false, false, false, false] },
      { text: "", border: [false, false, false, false] },
      {
        text: groupOfProducts.priceHeader
          ? groupOfProducts.priceHeader + ", ₽"
          : "Цена за штуку, ₽",
        colSpan: 3 + optionalCols.length,
        italics: true,
      },
      {},
      {},
      ...optionalCols.map(() => {}),
    ],
    [
      {
        text: "Артикул",
        margin: [0, 5, 0, 0],
      },
      {
        text: "Название",
        margin: [0, 5, 0, 0],
      },
      {
        text: "Ед. изм.",
        margin: [0, 5, 0, 0],
      },
      {
        text: groupOfProducts.retailName
          ? groupOfProducts.retailName
          : "Розница",
        margin: [0, 1.5, 0, 0],
      },
      {
        text: groupOfProducts.firstPriceName
          ? groupOfProducts.firstPriceName
          : "до 1500 шт.",
        margin: [0, 1.5, 0, 0],
      },
      {
        text: groupOfProducts.secondPriceName
          ? groupOfProducts.secondPriceName
          : "до 5000 шт.",
        margin: [0, 1.5, 0, 0],
      },
      ...optionalCols.map((column) => {
        return {
          text:
            column.property === "partnerPrice"
              ? groupOfProducts.partnerName
              : column.property === "dealerPrice"
              ? groupOfProducts.dealerName
              : column.property === "distributorPrice" &&
                groupOfProducts.distributorName,
          margin: [0, 1.5, 0, 0],
        };
      }),
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
            borderColor: ["#e30434", "#e30434", "#e30434", "#e30434"],
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
    alignment: "right",
    stack: [
      {
        columns: [
          { width: "*", text: "" },
          {
            width: 180,
            table: {
              body: [
                [
                  {
                    border: [true, true, true, false],
                    fontSize: 13,
                    borderColor: ["#e30434", "#e30434", "#e30434", "#e30434"],
                    text: to,
                    alignment: "left",
                    margin: [2.5, 2.5, 10, 2.5],
                  },
                ],
                [
                  {
                    text: date,
                    alignment: "right",
                    fontSize: 11,
                    color: "#666666",
                    border: [true, false, true, true],
                    borderColor: ["#e30434", "#e30434", "#e30434", "#e30434"],
                  },
                ],
              ],
            },
            alignment: "right",
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
      alignment: "left",
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
          alignment: "center",
          width: "auto",
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
        link: "https://www.osfix.ru",
        fit: [200, 200],
        margin: [0, 0, 0, 0],
        alignment: "center",
      },
      {
        text: slogan,
        alignment: "center",
        margin: [0, 5, 0, 15],
        fontSize: 18,
      },
    ],
  };
};

const getTitlePageImageObject = (img, testImgData, alignment = "right") => {
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
      getTitlePageImageObject(titlePageImg2Data, testImgData, "center"),
      getTitlePageImageObject(titlePageImg3Data, testImgData, "left"),
    ],
    alignment: "center",
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
            getTitlePageListItem(listImgData, item)
          ),
        ],
      },
    ],
    pageBreak: "after",
    margin: [0, -50, 0, 0],
  };
};

const sortFinalList = (data) => {
  if (data.length <= 1) return data;
  return data.sort((a, b) => {
    const element = a.stack[0].stack[1].text.localeCompare(
      b.stack[0].stack[1].text,
      undefined,
      { numeric: true }
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
    color: onSale ? "#111111" : "#666666",
  };
};

const getPriceColumnText = (price, onSale, isOptionsColsLengthMoreThanOne) => {
  const isNumber = price !== "" && !Number.isNaN(price) && price !== 0;
  return getCustomColumnText(
    isNumber ? price : " ",
    onSale,
    isOptionsColsLengthMoreThanOne ? 4.5 : 0
  );
};

const getProductsTableListItem = (product, optionalCols, saleImgData) => {
  const isOptionsColsLengthMoreThanOne = optionalCols.length > 1;
  return [
    getCustomColumnText(
      product.number,
      product.onSale,
      isOptionsColsLengthMoreThanOne ? 5 : 0
    ),
    getProductsTableOnSaleText(product, saleImgData),
    getCustomColumnText(
      product.units,
      product.onSale,
      isOptionsColsLengthMoreThanOne ? 1 : 0
    ),
    getPriceColumnText(
      product.retailPrice,
      product.onSale,
      isOptionsColsLengthMoreThanOne
    ),
    getPriceColumnText(
      product.lessThan1500Price,
      product.onSale,
      isOptionsColsLengthMoreThanOne
    ),
    getPriceColumnText(
      product.lessThan5000Price,
      product.onSale,
      isOptionsColsLengthMoreThanOne
    ),
    ...optionalCols.map((column) =>
      product[column.property] !== undefined
        ? getPriceColumnText(
            product[column.property],
            product.onSale,
            isOptionsColsLengthMoreThanOne
          )
        : getPriceColumnText(0, product.onSale, isOptionsColsLengthMoreThanOne)
    ),
  ];
};

const getProductsTableOnSaleText = (
  product,
  saleImgData,
  isOptionsColsLengthMoreThanOne
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
            alignment: "left",
            bold: product.onSale,
            color: "#111111",
          },
        ],
      }
    : {
        text: product.name,
        margin: [0, isOptionsColsLengthMoreThanOne ? 1 : 0, 0, 0],
        alignment: "left",
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
    return "#444444";
  },
  vLineColor: function () {
    return "#444444";
  },
};

const getProductsTableListWidths = (optionalCols) => {
  return [
    40,
    "*",
    "*",
    35,
    35,
    35,
    ...optionalCols.map((item, index) =>
      index < optionalCols.length - 1 ? 35 : 35
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
              getProductsTableListItem(product, optionalCols, saleImgData)
            ),
          ],
        },
        layout: productsTableListLayout,
        alignment: "center",
        width: "*",
        fontSize: 8,
        color: "#555555",
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
            style: "regularText",
            borderColor: ["#e30434", "#e30434", "#e30434", "#e30434"],
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
            alignment: "right",
          },
          {
            text: text,
            margin: [0, 5, 0, 0],
            alignment: "center",
            fontSize: 10,
          },
        ],
      }
    : {
        text: "  ",
      };
};

const sortFullGroup = (data) => {
  return data.sort((a, b) => {
    const first = a.stack[0].columns[0].text[1].groupId;
    const second = b.stack[0].columns[0].text[1].groupId;
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
    alignment: "right",
  };
};

export async function getPriceListPdfText(
  categories,
  priceList,
  optionalCols,
  locationTypes,
  disclaimer,
  titlePage,
  companyContacts,
  isMini = false
) {
  let finalList = [];
  let linkButtonData = await getDataUri(linkButtonImg);
  const testImgData = await getDataUri(testImg);
  const temp = categories.map(async (category) => {
    let fullGroup = [];
    return Promise.all(
      priceList.map(async (groupOfProducts) => {
        let locations = [];
        if (category.name !== groupOfProducts.category) return;
        //getting location types
        return Promise.all(
          groupOfProducts.locationType
            .split("/")
            .map((location) =>
              getAllLocationTypes(locationTypes, location, locations)
            )
        ).then(async () => {
          const groupImg1Data = await loadGroupImage(groupOfProducts.groupImg1);
          const groupImg2Data = await loadGroupImage(groupOfProducts.groupImg2);
          const groupImg3Data = await loadGroupImage(groupOfProducts.groupImg3);
          const groupImg4Data = await loadGroupImage(groupOfProducts.groupImg4);
          const groupImgFooterData = await loadGroupImage(
            groupOfProducts.footerImg
          );
          const productsTableList = await getProductsTableList(
            groupOfProducts,
            optionalCols
          );
          const proprietaryItem1 = await getProprietaryItem(
            groupOfProducts.proprietaryItemText1
          );
          const proprietaryItem2 = await getProprietaryItem(
            groupOfProducts.proprietaryItemText2
          );
          fullGroup.push({
            unbreakable: groupOfProducts.products.length <= 20 ? true : false,
            stack: [
              {
                width: "*",
                headlineLevel: 1,
                columns: [
                  getGroupOfProductsName(groupOfProducts),
                  getGroupOfProductsDescription(groupOfProducts),
                  getGroupOfProductsLocations(locations),
                ],
                margin: [0, 10, 0, 10],
              },
              getGroupOfProductsTopImages(
                groupImg1Data,
                groupImg2Data,
                groupImg3Data,
                groupImg4Data,
                testImgData
              ),
              productsTableList,
              {
                unbreakable: true,
                alignment: "justify",
                width: "*",
                margin: [0, 0, 0, 10],
                columns: [
                  getProductsInfoText(groupOfProducts.infoText),
                  {
                    unbreakable: true,
                    stack: [
                      getLinkButton(
                        linkButtonData,
                        groupOfProducts.linkAddress
                      ),
                      proprietaryItem1,
                      proprietaryItem2,
                    ],
                    width: 100,
                  },
                ],
              },
              groupImgFooterData !== null
                ? {
                    image: groupImgFooterData,
                    fit: [512, 100],
                  }
                : {
                    text: "  ",
                  },
            ],
          });
        });
      })
    ).then(async () => {
      const tempImg = await getDataUri(category.img);
      const sortedArr = sortFullGroup(fullGroup);
      //Перенос категории на некст страницу если она без продукции
      if (fullGroup.length === 0 || !category.active) return;
      return finalList.push({
        stack: [
          ...sortedArr.map((item, index) => {
            if (index === 0) {
              return {
                unbreakable:
                  item.stack[2].columns[0].table.body.length <= 10
                    ? true
                    : false,
                stack: [
                  {
                    image: tempImg,
                    width: 510,
                    height: 50,
                    alignment: "center",
                  },
                  {
                    text: category.name.toUpperCase(),
                    style: "header",
                    fontSize: 16,
                    color: "#ffffff",
                    alignment: "center",
                    relativePosition: { x: 0, y: -38 },
                  },
                  ...item.stack,
                ],
              };
            } else return item;
          }),
        ],
      });
    });
  });
  Promise.all(temp).then(async () => {
    finalList = sortFinalList(finalList);
    const contactsImgData = await getDataUri(contactsImg);
    const titlePageObject = await getTitlePage(titlePage);
    const dd = {
      info: {
        title: "Прайс-лист",
      },
      header: (currentPage) =>
        getPriceHeader(
          currentPage,
          titlePage.active,
          contactsImgData,
          companyContacts
        ),
      pageMargins: [40, 125, 40, 70],
      footer: (currentPage, pageCount) =>
        getPriceFooter(
          currentPage,
          pageCount,
          titlePage.active,
          companyContacts
        ),
      content: [
        titlePage.active
          ? titlePageObject
          : {
              text: "",
            },
        finalList,
        getDisclaimerText(disclaimer),
      ],
      styles: priceStyles,
    };
    createPDF(dd);
  });
}
