import font from "pdfmake/build/vfs_fonts.js";
import pdfMake from "pdfmake";
import testImg from "../../../../../../../../assets/priceList/no_img.png";
import companyLogo from "../../../../../../../../assets/priceList/osfix_logo.png";
import listImg from "../../../../../../../../assets/priceList/list.png";
import companyLogoNoSlogan from "../../../../../../../../assets/priceList/osfix_logo__no_slogan.png";
import contactsImg from "../../../../../../../../assets/priceList/contacts.png";
import saleImg from "../../../../../../../../assets/priceList/onSale.png";
import { getDataUri } from "../../../../utils/functions.jsx";
import { pdfHeaderCompanyContacts } from "./objects.js";

export async function getPriceListPdfTextMini(
  categories,
  priceList,
  optionalCols,
  locationTypes,
  disclaimer,
  titlePage
) {
  let finalList = [];
  let dd;
  const testImgData = await getDataUri(testImg);
  const saleImgData = await getDataUri(saleImg);
  const companyLogoData = await getDataUri(companyLogo);
  const companyLogoNoSloganData = await getDataUri(companyLogoNoSlogan);
  const contactsImgData = await getDataUri(contactsImg);
  const listImgData = await getDataUri(listImg);
  let titlePageImg1Data, titlePageImg2Data, titlePageImg3Data;
  if (titlePage.img1 !== null && titlePage.img1 !== "") {
    titlePageImg1Data = await getDataUri(titlePage.img1, "jpeg", 0.3);
  }
  if (titlePage.img2 !== null && titlePage.img2 !== "") {
    titlePageImg2Data = await getDataUri(titlePage.img2, "jpeg", 0.3);
  }
  if (titlePage.img3 !== null && titlePage.img3 !== "") {
    titlePageImg3Data = await getDataUri(titlePage.img3, "jpeg", 0.3);
  }
  const temp = categories.map(async (category) => {
    let fullGroup = [];
    return Promise.all(
      priceList.map(async (groupOfProducts) => {
        let locations = [];
        if (category.name === groupOfProducts.category) {
          return Promise.all(
            // ХЗ что это
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
      header: function (currentPage, pageCount) {
        if (currentPage !== 1 || !titlePage.active) {
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
                  text: pdfHeaderCompanyContacts,
                  margin: [5, 0, 0, 0],
                  alignment: "left",
                },
                {
                  image: companyLogoData,
                  // width: 100,
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
        } else
          return [
            {
              text: "",
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
        if (currentPage === 1 && titlePage.active) {
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
                { text: "7842143789\t", fontSize: 10 },
                { text: "КПП ", fontSize: 10, bold: true },
                { text: "784201001\t", fontSize: 10 },
                { text: "ОГРН ", fontSize: 10, bold: true },
                { text: "117784736458\t", fontSize: 10 },
                { text: "ОКПО ", fontSize: 10, bold: true },
                { text: "20161337\n", fontSize: 10 },
                { text: "Банк ", fontSize: 10, bold: true },
                { text: "Филиал №7806 ВТБ (ПАО)\t", fontSize: 10 },
                { text: "Расчетный счет № ", fontSize: 10, bold: true },
                { text: "40702810117060000232\t", fontSize: 10 },
                { text: "БИК ", fontSize: 10, bold: true },
                { text: "044030707\t", fontSize: 10 },
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
        } else
          return {
            text: "Страница " + currentPage.toString(),
            alignment: "center",
            fontSize: 11,
            color: "#999999",
            margin: [0, 20, 0, 0],
          };
      },
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
                      image:
                        titlePageImg1Data !== undefined
                          ? titlePageImg1Data
                          : testImgData,
                      fit: [150, 130],
                      margin: [0, 0, 0, 5],
                      alignment: "right",
                    },
                    {
                      image:
                        titlePageImg2Data !== undefined
                          ? titlePageImg2Data
                          : testImgData,
                      fit: [150, 130],
                      margin: [0, 0, 0, 5],
                      alignment: "center",
                    },
                    {
                      image:
                        titlePageImg3Data !== undefined
                          ? titlePageImg3Data
                          : testImgData,
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
          margin: [0, 10, 10, 0],
          text: [
            {
              text: disclaimer,
            },
          ],
        },
      ],
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
