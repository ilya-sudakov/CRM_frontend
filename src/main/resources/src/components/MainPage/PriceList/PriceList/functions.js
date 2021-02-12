import font from "pdfmake/build/vfs_fonts.js";
import pdfMake from "pdfmake";
import companyLogo from "../../../../../../../../assets/priceList/osfix_logo.png";
import contactsImg from "../../../../../../../../assets/priceList/contacts.png";
import { getDataUri } from "../../../../utils/functions.jsx";
import { pdfHeaderCompanyContacts } from "./objects.js";

export async function getPriceListPdfTextMini(
  categories,
  priceList,
  optionalCols,
  locationTypes,
  companyContacts
) {
  let finalList = [];
  let dd;
  const companyLogoData = await getDataUri(companyLogo);
  const contactsImgData = await getDataUri(contactsImg);
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
                      ],
                    });
                  }
                })
              );
            })
            //Таблица с продукцией
          ).then(async () => {
            fullGroup.push({
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
                            ...optionalCols.map((column, index) => {
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
                          ...groupOfProducts.products
                            .sort((a, b) => {
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
                            })
                            .map((product) => {
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
                            }),
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
      header: function (currentPage) {
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
              {
                image: companyContacts?.logo ?? companyLogoData,
                link: "https://www.osfix.ru",
                fit: [100, 100],
                margin: [0, 13, 0, 0],
                alignment: "right",
              },
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
          {
            text: "Страница " + currentPage.toString(),
            alignment: "center",
            fontSize: 11,
            color: "#999999",
          },
        ];
      },
      content: [finalList],
      styles: {
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
      },
    };
    pdfMake.vfs = font.pdfMake.vfs;
    pdfMake.createPdf(dd).open();
  });
}
