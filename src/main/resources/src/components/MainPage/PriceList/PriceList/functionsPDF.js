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

const loadGroupImage = async (img) => {
  if (img !== null && img !== "") {
    return await getDataUri(img, "jpeg", 0.3);
  }
  return null;
};

const sortProductsByNumber = (data) => {
  return data.sort((a, b) => {
    if (
      a.number.localeCompare(b.number, undefined, {
        numeric: true,
      }) < 0
    ) {
      return -1;
    }
    if (
      a.number.localeCompare(b.number, undefined, {
        numeric: true,
      }) > 0
    ) {
      return 1;
    }
    return 0;
  });
};

const getPriceFooter = (currentPage, pageCount, active, companyContacts) => {
  if (currentPage === 1 && active) {
    return {
      text: " ",
    };
  }
  if (currentPage === pageCount) {
    return [
      {
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
        margin: [40, 0, 40, 10],
      },
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
  } else
    return {
      text: "Страница " + currentPage.toString(),
      alignment: "center",
      fontSize: 11,
      color: "#999999",
      margin: [0, 20, 0, 0],
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

const getPriceHeader = async (currentPage, active, companyContacts) => {
  const contactsImgData = await getDataUri(contactsImg);
  if (currentPage !== 1 || !active) {
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
      {
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
        margin: [40, 5, 40, 40],
      },
    ];
  } else
    return [
      {
        text: "",
      },
    ];
};

export async function getPriceListPdfText(
  categories,
  priceList,
  optionalCols,
  locationTypes,
  disclaimer,
  titlePage,
  companyContacts,
  isMini
) {
  let finalList = [];
  let linkButtonData = await getDataUri(linkButtonImg);
  const testImgData = await getDataUri(testImg);
  const saleImgData = await getDataUri(saleImg);
  const companyLogoNoSloganData = await getDataUri(companyLogoNoSlogan);
  const proprietaryItemImgData = await getDataUri(proprietaryItemImg);
  const listImgData = await getDataUri(listImg);
  const titlePageImg1Data = await loadGroupImage(titlePage.img1),
    titlePageImg2Data = await loadGroupImage(titlePage.img2),
    titlePageImg3Data = await loadGroupImage(titlePage.img3);
  const temp = categories.map(async (category) => {
    let fullGroup = [];
    return Promise.all(
      priceList.map(async (groupOfProducts) => {
        let locations = [];
        if (category.name === groupOfProducts.category) {
          return Promise.all(
            groupOfProducts.locationType.split("/").map((location) => {
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
            })
          ).then(async () => {
            const groupImg1Data = await loadGroupImage(groupOfProducts.groupImg1);
            const groupImg2Data = await loadGroupImage(groupOfProducts.groupImg2);
            const groupImg3Data = await loadGroupImage(groupOfProducts.groupImg3);
            const groupImg4Data = await loadGroupImage(groupOfProducts.groupImg4);
            const groupImgFooterData = await loadGroupImage(
              groupOfProducts.footerImg
            );
            fullGroup.push({
              unbreakable: groupOfProducts.products.length <= 20 ? true : false,
              stack: [
                {
                  width: "*",
                  headlineLevel: 1,
                  columns: [
                    {
                      text: [
                        {
                          text: " ",
                          style: "subheader",
                        },
                        {
                          text: groupOfProducts.name.toUpperCase(),
                          style: "subheader",
                          fontSize: 12,
                          groupId: groupOfProducts.id,
                          link: groupOfProducts.linkAddress,
                          bold: true,
                          // noWrap: true
                        },
                        {
                          text: " ",
                          style: "subheader",
                        },
                      ],
                      // width: 'auto'
                      width: 110,
                    },
                    {
                      text: [
                        {
                          text: groupOfProducts.description,
                          style: "regularText",
                          color: "#666666",
                          fontSize: 8,
                          bold: true,
                        },
                      ],
                      margin: [10, 1, 0, 0],
                      // width: 250
                      width: "*",
                    },
                    {
                      stack: [
                        {
                          columns: [
                            ...locations.sort((a, b) => {
                              if (locations.length <= 1) return 0;
                              else {
                                if (
                                  a.columns[0].text.localeCompare(
                                    b.columns[0].text,
                                    undefined,
                                    { numeric: true }
                                  ) < 0
                                ) {
                                  return -1;
                                }
                                if (
                                  a.columns[0].text.localeCompare(
                                    b.columns[0].text,
                                    undefined,
                                    { numeric: true }
                                  ) > 0
                                ) {
                                  return 1;
                                }
                                return 0;
                              }
                            }),
                          ],
                          margin: [0, 0, 0, 2.5],
                          columnGap: 1,
                          width: 100,
                        },
                      ],
                      alignment: "right",
                      width: 100,
                    },
                  ],
                  margin: [0, 10, 0, 10],
                },
                {
                  columns: [
                    {
                      image: groupImg1Data ?? testImgData,
                      fit: [120, 100],
                      margin: [0, 0, 0, 5],
                      alignment: "left",
                    },
                    {
                      image: groupImg2Data ?? testImgData,
                      fit: [120, 100],
                      margin: [10, 0, 0, 5],
                      alignment: "right",
                    },
                    {
                      image: groupImg3Data ?? testImgData,
                      fit: [120, 100],
                      margin: [10, 0, 0, 5],
                      alignment: "right",
                    },
                    {
                      image: groupImg4Data ?? testImgData,
                      fit: [120, 100],
                      margin: [11, 0, 0, 5],
                      alignment: "right",
                    },
                  ],
                },
                {
                  columns: [
                    {
                      unbreakable:
                        groupOfProducts.products.length <= 10 ? true : false,
                      table: {
                        widths: [
                          40,
                          "*",
                          "*",
                          35,
                          35,
                          35,
                          ...optionalCols.map((item, index) =>
                            index < optionalCols.length - 1 ? 35 : 35
                          ),
                        ],
                        body: [
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
                          ...sortProductsByNumber(groupOfProducts.products).map(
                            (product) => {
                              return [
                                {
                                  text: product.number,
                                  margin: [
                                    0,
                                    optionalCols.length > 1 ? 5 : 0,
                                    0,
                                    0,
                                  ],
                                  bold: product.onSale,
                                  color: product.onSale ? "#111111" : "#666666",
                                },
                                product.onSale
                                  ? {
                                      columns: [
                                        {
                                          image: saleImgData,
                                          width: 15,
                                        },
                                        {
                                          text: product.name,
                                          margin: [
                                            5,
                                            optionalCols.length > 1 ? 2 : 1.5,
                                            0,
                                            0,
                                          ],
                                          alignment: "left",
                                          bold: product.onSale,
                                          color: "#111111",
                                        },
                                      ],
                                    }
                                  : {
                                      text: product.name,
                                      margin: [
                                        0,
                                        optionalCols.length > 1 ? 1 : 0,
                                        0,
                                        0,
                                      ],
                                      alignment: "left",
                                    },
                                {
                                  text: product.units,
                                  margin: [
                                    0,
                                    optionalCols.length > 1 ? 1 : 0,
                                    0,
                                    0,
                                  ],
                                  bold: product.onSale,
                                  color: product.onSale ? "#111111" : "#666666",
                                },
                                {
                                  text:
                                    product.retailPrice !== "" &&
                                    !Number.isNaN(product.retailPrice) &&
                                    product.retailPrice !== 0
                                      ? product.retailPrice
                                      : " ",
                                  margin: [
                                    0,
                                    optionalCols.length > 1 ? 4.5 : 0,
                                    0,
                                    0,
                                  ],
                                  bold: product.onSale,
                                  color: product.onSale ? "#111111" : "#666666",
                                },
                                {
                                  text:
                                    product.lessThan1500Price !== "" &&
                                    !Number.isNaN(product.lessThan1500Price) &&
                                    product.lessThan1500Price !== 0
                                      ? product.lessThan1500Price
                                      : " ",
                                  margin: [
                                    0,
                                    optionalCols.length > 1 ? 4.5 : 0,
                                    0,
                                    0,
                                  ],
                                  bold: product.onSale,
                                  color: product.onSale ? "#111111" : "#666666",
                                },
                                {
                                  text:
                                    product.lessThan5000Price !== "" &&
                                    !Number.isNaN(product.lessThan5000Price) &&
                                    product.lessThan5000Price !== 0
                                      ? product.lessThan5000Price
                                      : " ",
                                  margin: [
                                    0,
                                    optionalCols.length > 1 ? 4.5 : 0,
                                    0,
                                    0,
                                  ],
                                  bold: product.onSale,
                                  color: product.onSale ? "#111111" : "#666666",
                                },
                                ...optionalCols.map((column) =>
                                  product[column.property] !== undefined
                                    ? {
                                        text:
                                          product[column.property] !== "" &&
                                          !Number.isNaN(
                                            product[column.property]
                                          ) &&
                                          product[column.property] !== 0
                                            ? product[column.property]
                                            : " ",
                                        margin: [
                                          0,
                                          optionalCols.length > 1 ? 4.5 : 0,
                                          0,
                                          0,
                                        ],
                                        bold: product.onSale,
                                        color: product.onSale
                                          ? "#111111"
                                          : "#666666",
                                      }
                                    : {
                                        text: "",
                                        margin: [
                                          0,
                                          optionalCols.length > 1 ? 4.5 : 0,
                                          0,
                                          0,
                                        ],
                                        bold: product.onSale,
                                        color: product.onSale
                                          ? "#111111"
                                          : "#666666",
                                      }
                                ),
                              ];
                            }
                          ),
                        ],
                      },
                      layout: {
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
                      },
                      alignment: "center",
                      width: "*",
                      fontSize: 8,
                      color: "#555555",
                      margin: [0, 0, 0, 5],
                    },
                  ],
                },
                {
                  unbreakable: true,
                  alignment: "justify",
                  width: "*",
                  margin: [0, 0, 0, 10],
                  columns: [
                    {
                      table: {
                        body: [
                          [
                            {
                              border: [true, false, false, false],
                              style: "regularText",
                              borderColor: [
                                "#e30434",
                                "#e30434",
                                "#e30434",
                                "#e30434",
                              ],
                              text: groupOfProducts.infoText,

                              margin: [0, 0, 10, 0],
                            },
                          ],
                        ],
                      },
                    },
                    {
                      unbreakable: true,
                      stack: [
                        {
                          image: linkButtonData,
                          link: groupOfProducts.linkAddress,
                          width: 100,
                          alignment: "right",
                        },
                        groupOfProducts.proprietaryItemText1
                          ? {
                              stack: [
                                {
                                  image: proprietaryItemImgData,
                                  width: 65,
                                  margin: [0, 10, 9, 0],
                                  alignment: "right",
                                },
                                {
                                  text: groupOfProducts.proprietaryItemText1,
                                  margin: [0, 5, 0, 0],
                                  alignment: "center",
                                  fontSize: 10,
                                },
                              ],
                            }
                          : {
                              text: "  ",
                            },
                        groupOfProducts.proprietaryItemText2
                          ? {
                              stack: [
                                {
                                  image: proprietaryItemImgData,
                                  width: 65,
                                  margin: [0, 10, 9, 0],
                                  alignment: "right",
                                },
                                {
                                  text: groupOfProducts.proprietaryItemText2,
                                  margin: [0, 5, 0, 0],
                                  alignment: "center",
                                  fontSize: 10,
                                },
                              ],
                            }
                          : {
                              text: "  ",
                            },
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
        }
      })
    ).then(async () => {
      const tempImg = await getDataUri(category.img);
      const sortedArr = fullGroup.sort((a, b) => {
        if (
          a.stack[0].columns[0].text[1].groupId <
          b.stack[0].columns[0].text[1].groupId
        ) {
          return -1;
        }
        if (
          a.stack[0].columns[0].text[1].groupId >
          b.stack[0].columns[0].text[1].groupId
        ) {
          return 1;
        }
        return 0;
      });
      //Перенос категории на некст страницу если она без продукции
      fullGroup.length > 0 &&
        category.active &&
        finalList.push({
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
    finalList = finalList.sort((a, b) => {
      if (finalList.length <= 1) return 0;
      else {
        if (
          a.stack[0].stack[1].text.localeCompare(
            b.stack[0].stack[1].text,
            undefined,
            { numeric: true }
          ) < 0
        ) {
          return -1;
        }
        if (
          a.stack[0].stack[1].text.localeCompare(
            b.stack[0].stack[1].text,
            undefined,
            { numeric: true }
          ) > 0
        ) {
          return 1;
        }
        return 0;
      }
    });
    const dd = {
      info: {
        title: "Прайс-лист",
      },
      header: (currentPage) =>
        getPriceHeader(currentPage, titlePage.active, companyContacts),
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
          ? {
              stack: [
                {
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
                                  // style: 'regularText',
                                  fontSize: 13,
                                  borderColor: [
                                    "#e30434",
                                    "#e30434",
                                    "#e30434",
                                    "#e30434",
                                  ],
                                  text: titlePage.to,
                                  alignment: "left",
                                  margin: [2.5, 2.5, 10, 2.5],
                                },
                              ],
                              [
                                {
                                  text: titlePage.date,
                                  alignment: "right",
                                  fontSize: 11,
                                  color: "#666666",
                                  border: [true, false, true, true],
                                  borderColor: [
                                    "#e30434",
                                    "#e30434",
                                    "#e30434",
                                    "#e30434",
                                  ],
                                },
                              ],
                            ],
                          },
                          alignment: "right",
                          // margin: [0, 0, 0, 10],
                        },
                      ],
                      margin: [0, 0, 0, 5],
                    },
                  ],
                  margin: [0, 0, 0, 50],
                },
                {
                  stack: [
                    {
                      image: companyLogoNoSloganData,
                      link: "https://www.osfix.ru",
                      fit: [200, 200],
                      margin: [0, 0, 0, 0],
                      alignment: "center",
                    },
                    {
                      text: titlePage.slogan,
                      alignment: "center",
                      margin: [0, 5, 0, 15],
                      fontSize: 18,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      image: titlePageImg1Data ?? testImgData,
                      fit: [150, 130],
                      margin: [0, 0, 0, 5],
                      alignment: "right",
                    },
                    {
                      image: titlePageImg2Data ?? testImgData,
                      fit: [150, 130],
                      margin: [0, 0, 0, 5],
                      alignment: "center",
                    },
                    {
                      image: titlePageImg3Data ?? testImgData,
                      fit: [150, 130],
                      margin: [0, 0, 0, 5],
                      alignment: "left",
                    },
                  ],
                  alignment: "center",
                  width: 125,
                  margin: [0, 0, 0, 30],
                },
                {
                  stack: [
                    ...titlePage.list.map((item) => {
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
                    }),
                  ],
                },
              ],
              pageBreak: "after",
              margin: [0, -50, 0, 0],
            }
          : {
              text: "",
            },
        finalList,
        {
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
        },
      ],
      styles: priceStyles,
    };
    createPDF(dd);
  });
}

export async function getPriceListPdfTextMini(
  categories,
  priceList,
  optionalCols,
  companyContacts
) {
  let finalList = [];
  let dd;
  const contactsImgData = await getDataUri(contactsImg);
  const temp = categories.map(async (category) => {
    let fullGroup = [];
    return Promise.all(
      priceList.map(async (groupOfProducts) => {
        if (category.name === groupOfProducts.category) {
          return fullGroup.push({
            unbreakable: groupOfProducts.products.length <= 20 ? true : false,
            stack: [
              {
                columns: [
                  {
                    unbreakable:
                      groupOfProducts.products.length <= 10 ? true : false,
                    table: {
                      widths: [
                        40,
                        "*",
                        "*",
                        35,
                        35,
                        35,
                        ...optionalCols.map((item, index) =>
                          index < optionalCols.length - 1 ? 35 : 35
                        ),
                      ],
                      body: [
                        [
                          // { text: '', border: [false, false, false, false] },
                          { text: "", border: [false, false, false, false] },
                          { text: "", border: [false, false, false, false] },
                          { text: "", border: [false, false, false, false] },
                          {
                            text: groupOfProducts.priceHeader
                              ? groupOfProducts.priceHeader + ", ₽"
                              : "Цена за штуку, ₽",
                            colSpan: 3 + optionalCols.length,
                            // bold: true,
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
                        ...sortProductsByNumber(groupOfProducts.products).map(
                          (product) => {
                            return [
                              {
                                text: product.number,
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 5 : 0,
                                  0,
                                  0,
                                ],
                                bold: product.onSale,
                                color: product.onSale ? "#111111" : "#666666",
                              },
                              {
                                text: product.name,
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 1 : 0,
                                  0,
                                  0,
                                ],
                                alignment: "left",
                              },
                              {
                                text: product.units,
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 1 : 0,
                                  0,
                                  0,
                                ],
                                bold: product.onSale,
                                color: product.onSale ? "#111111" : "#666666",
                              },
                              {
                                text:
                                  product.retailPrice !== "" &&
                                  !Number.isNaN(product.retailPrice) &&
                                  product.retailPrice !== 0
                                    ? product.retailPrice
                                    : " ",
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 4.5 : 0,
                                  0,
                                  0,
                                ],
                                bold: product.onSale,
                                color: product.onSale ? "#111111" : "#666666",
                              },
                              {
                                text:
                                  product.lessThan1500Price !== "" &&
                                  !Number.isNaN(product.lessThan1500Price) &&
                                  product.lessThan1500Price !== 0
                                    ? product.lessThan1500Price
                                    : " ",
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 4.5 : 0,
                                  0,
                                  0,
                                ],
                                bold: product.onSale,
                                color: product.onSale ? "#111111" : "#666666",
                              },
                              {
                                text:
                                  product.lessThan5000Price !== "" &&
                                  !Number.isNaN(product.lessThan5000Price) &&
                                  product.lessThan5000Price !== 0
                                    ? product.lessThan5000Price
                                    : " ",
                                margin: [
                                  0,
                                  optionalCols.length > 1 ? 4.5 : 0,
                                  0,
                                  0,
                                ],
                                bold: product.onSale,
                                color: product.onSale ? "#111111" : "#666666",
                              },
                              ...optionalCols.map((column) =>
                                product[column.property] !== undefined
                                  ? {
                                      text:
                                        product[column.property] !== "" &&
                                        !Number.isNaN(
                                          product[column.property]
                                        ) &&
                                        product[column.property] !== 0
                                          ? product[column.property]
                                          : " ",
                                      margin: [
                                        0,
                                        optionalCols.length > 1 ? 4.5 : 0,
                                        0,
                                        0,
                                      ],
                                      bold: product.onSale,
                                      color: product.onSale
                                        ? "#111111"
                                        : "#666666",
                                    }
                                  : {
                                      text: "",
                                      margin: [
                                        0,
                                        optionalCols.length > 1 ? 4.5 : 0,
                                        0,
                                        0,
                                      ],
                                      bold: product.onSale,
                                      color: product.onSale
                                        ? "#111111"
                                        : "#666666",
                                    }
                              ),
                            ];
                          }
                        ),
                      ],
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => "#444444",
                      vLineColor: () => "#444444",
                    },
                    alignment: "center",
                    width: "*",
                    fontSize: 8,
                    color: "#555555",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },
              groupOfProducts.footerImg !== "" &&
              groupOfProducts.footerImg !== null
                ? {
                    image: await getDataUri(
                      groupOfProducts.footerImg,
                      "jpeg",
                      0.3
                    ),
                    fit: [512, 100],
                  }
                : {
                    text: "  ",
                  },
            ],
          });
        }
      })
    ).then(async () => {
      const sortedArr = fullGroup;
      fullGroup.length > 0 &&
        category.active &&
        finalList.push({
          stack: [...sortedArr],
        });
    });
  });
  Promise.all(temp).then(async () => {
    dd = {
      info: {
        title: "Прайс-лист",
      },
      header: function () {
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
                    link:
                      companyContacts?.site ?? pdfHeaderCompanyContacts.site,
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
                    link:
                      companyContacts?.site ?? pdfHeaderCompanyContacts.site,
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
          {
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
            margin: [40, 5, 40, 40],
          },
        ];
      },
      pageMargins: [40, 125, 40, 70],
      footer: function (currentPage) {},
      content: [finalList],
      styles: priceStyles,
    };
    createPDF(dd);
  });
}
