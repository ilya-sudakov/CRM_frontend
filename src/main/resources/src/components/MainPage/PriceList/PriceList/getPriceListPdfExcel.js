import Excel from "exceljs";
import { getDataUri } from "../../../../utils/functions.jsx";

const getPriceListDefaultColumnXLSX = (name, width = 30) => {
  return {
    key: name,
    width: width,
    style: {
      font: {
        size: 11,
        color: { argb: "FF333333" },
      },
      alignment: { vertical: "middle", horizontal: "center", wrapText: true },
    },
  };
};

const getPriceListDefaultColumns = () => {
  return [
    getPriceListDefaultColumnXLSX(undefined, 30),
    getPriceListDefaultColumnXLSX("number", 30),
    getPriceListDefaultColumnXLSX("name", 30),
    getPriceListDefaultColumnXLSX("units", 30),
    getPriceListDefaultColumnXLSX("group1", 14),
    getPriceListDefaultColumnXLSX("group2", 14),
    getPriceListDefaultColumnXLSX("group3", 14),
    getPriceListDefaultColumnXLSX("group4", 14),
    getPriceListDefaultColumnXLSX("group5", 14),
    getPriceListDefaultColumnXLSX("group6", 14),
  ];
};

const getPriceListHeaderItem = (workSheet, data = {}, customStyles = {}) => {
  let temp = workSheet.addRow([""]);
  const curRow = workSheet.rowCount;
  const value = data.link
    ? {
        text: data.text,
        hyperlink: data.link,
        tooltip: data.tooltip,
      }
    : data.text;
  workSheet.getCell(curRow, 3).value = value;
  workSheet.getCell(curRow, 3).font = {
    name: "DejaVu",
    family: 2,
    ...customStyles,
  };
  temp.alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(curRow, 3, curRow, 4);
  temp.height = 25;
};

const priceListHeaderItems = [
  {
    data: {
      text: "ООО «ОСФИКС»",
      link: "https://www.osfix.ru",
      tooltip: "Перейти на сайт www.osfix.ru",
    },
    styles: {
      size: 16,
      bold: true,
    },
  },
  {
    data: {
      text: "Лиговский пр., 52, Санкт-Петербург, 191040",
      link: "https://yandex.ru/maps/-/CKUrY0Ih",
      tooltip: "Открыть Яндекс.Карту",
    },
  },
  {
    data: {
      text: "info@osfix.ru, +7 (812) 449-10-09",
    },
  },
  {
    data: {
      text: "www.osfix.ru",
      link: "https://www.osfix.ru",
      tooltip: "Открыть сайт",
    },
    styles: {
      size: 14,
    },
  },
];

const getPriceListHeaderBorder = (workSheet, lastColumnNumber) => {
  const border = { style: "medium", color: { argb: "FFFF1B5F" } };
  //border-bottom
  for (let i = 1; i <= lastColumnNumber; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      bottom: border,
    };
  }
  //border-right
  for (let i = 1; i <= workSheet.rowCount; i++) {
    workSheet.getCell(i, lastColumnNumber).border = {
      ...workSheet.getCell(i, lastColumnNumber).border,
      right: border,
    };
  }
};

const priceListHeaderAddImage = (workBook, workSheet, imgObject) => {
  const logoImg = workBook.addImage({
    base64: imgObject.imgData,
    extension: "jpeg",
  });
  imgObject.mergeCells && imgObject.mergeCells();
  workSheet.addImage(logoImg, {
    tl: imgObject.tl,
    ext: imgObject.ext,
  });
};

const getPriceListHeader = async (workSheet, workBook, lastColumnNumber) => {
  const tempImg = await getDataUri("assets/osfix_logo.png");
  const contactsImg = await getDataUri("assets/contacts_excel.png");
  priceListHeaderItems.map((item) =>
    getPriceListHeaderItem(workSheet, item.data, item.styles)
  );
  priceListHeaderAddImage(workBook, workSheet, {
    imgData: tempImg,
    mergeCells: () => workSheet.mergeCells(1, 1, 4, 1),
    tl: { col: 0.3, row: 0.4 },
    ext: { width: 180, height: 80 },
  }); // adding logo assets/osfix_logo.png
  priceListHeaderAddImage(workBook, workSheet, {
    imgData: contactsImg,
    tl: { col: 2.1, row: 0.3 },
    ext: { width: 22, height: 120 },
  }); // adding contacts icons
  getPriceListHeaderBorder(workSheet, lastColumnNumber); // adding border
  //add row for space after header
  const temp = workSheet.addRow([""]);
  temp.height = 25;
};

const filterPriceListItems = (priceList) => {
  return priceList.filter((item) => item.category === category.name);
};

const greyBorder = {
  left: { style: "medium", color: { argb: "FF666666" } },
  top: { style: "medium", color: { argb: "FF666666" } },
  right: { style: "medium", color: { argb: "FF666666" } },
  bottom: { style: "medium", color: { argb: "FF666666" } },
};

const getPriceListCategoryName = (workSheet, name, lastColumnNumber) => {
  const rowCategoryName = workSheet.addRow([name]);
  workSheet.getCell(workSheet.rowCount, 1).border = greyBorder;
  rowCategoryName.font = {
    size: 18,
    bold: true,
    name: "DejaVu",
    family: 2,
  };
  rowCategoryName.height = 80;
  rowCategoryName.alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(
    workSheet.rowCount,
    1,
    workSheet.rowCount,
    lastColumnNumber
  );
  workSheet.addRow([""]);
};

const getPriceListProductGroupName = (workSheet, name, lastColumnNumber) => {
  const newRowName = workSheet.addRow([`\t${name}`]);
  newRowName.font = {
    size: 14,
    bold: true,
    name: "DejaVu",
    family: 2,
  };
  newRowName.height = 50;
  newRowName.alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(
    workSheet.rowCount,
    1,
    workSheet.rowCount,
    lastColumnNumber - 4
  );
  workSheet.getCell(workSheet.rowCount, 1).border = greyBorder;
};

const getPriceListProductLocation = (
  workSheet,
  locationType,
  lastColumnNumber
) => {
  workSheet.getCell(
    workSheet.rowCount,
    lastColumnNumber - 3
  ).value = locationType;
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).font = {
    size: 11,
    bold: false,
  };
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  workSheet.getCell(
    workSheet.rowCount,
    lastColumnNumber - 3
  ).border = greyBorder;
  workSheet.mergeCells(
    workSheet.rowCount,
    lastColumnNumber - 3,
    workSheet.rowCount,
    lastColumnNumber - 2
  );
};

const getPriceListProductLinkButton = (
  workSheet,
  linkAddress,
  lastColumnNumber
) => {
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).value = {
    text: "Смотреть на сайте",
    hyperlink: linkAddress ?? "https://www.osfix.ru",
    tooltip: "Смотреть на сайте",
  };
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE30235" },
  };
  workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).font = {
    size: 12,
    bold: false,
    color: {
      argb: "FFFFFFFF",
    },
  };
  workSheet.mergeCells(
    workSheet.rowCount,
    lastColumnNumber - 1,
    workSheet.rowCount,
    lastColumnNumber
  );
};

const getPriceListProductGroupHeader = (workSheet, item, lastColumnNumber) => {
  getPriceListProductGroupName(workSheet, item.name, lastColumnNumber); // adding product group name
  getPriceListProductLocation(workSheet, item.locationType, lastColumnNumber); // adding location type
  getPriceListProductLinkButton(workSheet, item.linkAddress, lastColumnNumber); // adding link button
};

const getPriceListProductDescription = (
  workSheet,
  description,
  lastColumnNumber
) => {
  const newRowDescription = workSheet.addRow([description]);
  newRowDescription.font = {
    size: 10,
    color: {
      argb: "FF666666",
    },
  };
  newRowDescription.height = 35;
  newRowDescription.alignment = {
    vertical: "middle",
    wrapText: true,
  };
  workSheet.mergeCells(
    workSheet.rowCount,
    1,
    workSheet.rowCount,
    lastColumnNumber
  );
};

const priceListProductsAddImage = (
  workBook,
  workSheet,
  groupImg,
  imageIndex
) => {
  const img = workBook.addImage({
    base64: groupImg,
    extension: "jpeg",
  });
  workSheet.addImage(img, {
    tl: { col: imageIndex, row: workSheet.rowCount - 1 },
    br: { col: ++imageIndex, row: workSheet.rowCount },
    editAs: "absolute",
  });
};

const getPriceListProductTopImages = (
  workSheet,
  workBook,
  item,
  lastColumnNumber
) => {
  const imagesRow = workSheet.addRow([""]);
  imagesRow.height = 120;
  let imageIndex = 0;
  workSheet.mergeCells(
    workSheet.rowCount,
    lastColumnNumber - 1,
    workSheet.rowCount,
    lastColumnNumber
  );
  if (item.groupImg1 !== "") {
    priceListProductsAddImage(workBook, workSheet, item.groupImg1, imageIndex);
  }
  if (item.groupImg2 !== "") {
    priceListProductsAddImage(workBook, workSheet, item.groupImg2, imageIndex);
  }
  if (item.groupImg3 !== "") {
    priceListProductsAddImage(workBook, workSheet, item.groupImg3, imageIndex);
  }
  if (item.groupImg4 !== "") {
    priceListProductsAddImage(workBook, workSheet, item.groupImg4, imageIndex);
  }
};

export async function getPriceListPdfExcel(
  categories = [],
  priceList = [],
  optionalCols = []
) {
  let workBook = new Excel.Workbook();
  workBook.creator = "Osfix";
  workBook.created = new Date();
  const workSheet = workBook.addWorksheet("Каталог продукции");
  const lastColumnNumber = 7 + optionalCols.length;
  const rospatentTempImg = await getDataUri("assets/rospatent.png");
  workSheet.columns = getPriceListDefaultColumns(); // default columns
  await getPriceListHeader(workSheet, workBook, lastColumnNumber); // company header
  Promise.all(
    categories.map((category) => {
      const filteredData = filterPriceListItems(priceList);
      //adding category name
      if (filteredData.length > 0) {
        getPriceListCategoryName(workSheet, category.name, lastColumnNumber);
      }
      return filteredData.map((item) => {
        getPriceListProductGroupHeader(workSheet, item, lastColumnNumber);
        getPriceListProductDescription(
          workSheet,
          item.description,
          lastColumnNumber
        ); // adding product group description

        const isProprietary =
          item.proprietaryItemText1 !== undefined ||
          item.proprietaryItemText2 !== undefined;
        //adding 4 group images
        if (
          item.groupImg1 !== "" ||
          item.groupImg2 !== "" ||
          item.groupImg3 !== "" ||
          item.groupImg4 !== "" ||
          isProprietary
        ) {
          getPriceListProductTopImages(
            workSheet,
            workBook,
            item,
            lastColumnNumber
          );
        }

        //adding patent data rospatentTempImg
        if (isProprietary) {
          const rospatentImg = workBook.addImage({
            base64: rospatentTempImg,
            extension: "png",
          });
          workSheet.addImage(rospatentImg, {
            tl: {
              col: lastColumnNumber - 2 + 0.6,
              row: workSheet.rowCount - 1 + 0.3,
            },
            ext: { width: 125, height: 80 },
          });
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).value =
            item.proprietaryItemText1 !== undefined
              ? item.proprietaryItemText1 + "\n"
              : item.proprietaryItemText2 + "\n";
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).font = {
            size: 12,
          };
          workSheet.getCell(
            workSheet.rowCount,
            lastColumnNumber - 1
          ).alignment = {
            vertical: "bottom",
            horizontal: "center",
            wrapText: true,
          };
        }

        //adding products
        const fakeTableHeaderRow = workSheet.addRow([
          "",
          "",
          "",
          "",
          "Стоимость 1 шт., ₽",
        ]);
        fakeTableHeaderRow.font = {
          italic: true,
          // name: 'DejaVu',
          // family: 2,
        };
        fakeTableHeaderRow.height = 20;
        workSheet.getCell(workSheet.rowCount, 5).border = greyBorder;
        workSheet.mergeCells(
          workSheet.rowCount,
          5,
          workSheet.rowCount,
          lastColumnNumber
        );

        const tableHeaderRow = workSheet.addRow([
          "Артикул",
          "Название",
          "",
          "Ед. изм.",
          item.retailName,
          item.firstPriceName,
          item.secondPriceName,
          ...optionalCols.map((column) =>
            column.property === "partnerPrice"
              ? item.partnerName
              : column.property === "dealerPrice"
              ? item.dealerName
              : column.property === "distributorPrice" && item.distributorName
          ),
        ]);
        for (let i = 1; i <= lastColumnNumber; i++) {
          workSheet.getCell(workSheet.rowCount, i).border = greyBorder;
        }
        workSheet.mergeCells(workSheet.rowCount, 2, workSheet.rowCount, 3);
        tableHeaderRow.font = {
          color: {
            argb: "FF111111",
          },
        };
        tableHeaderRow.height = 30;
        item.products.map((product) => {
          const productRow = workSheet.addRow([
            product.number,
            product.name,
            "",
            product.units,
            product.retailPrice,
            product.firstPrice,
            product.secondPrice,
            ...optionalCols.map((column) =>
              product[column.property] !== undefined
                ? product[column.property] !== "" &&
                  !Number.isNaN(product[column.property]) &&
                  product[column.property] !== 0
                  ? product[column.property]
                  : " "
                : " "
            ),
          ]);
          productRow.height = 25;
          for (let i = 1; i <= lastColumnNumber; i++) {
            workSheet.getCell(workSheet.rowCount, i).border = greyBorder;
          }
          return workSheet.mergeCells(
            workSheet.rowCount,
            2,
            workSheet.rowCount,
            3
          );
        });

        //adding infoText
        workSheet.addRow([""]);
        const rowInfoText = workSheet.addRow([item.infoText]);
        rowInfoText.font = {
          size: 11,
          italic: true,
          color: {
            argb: "FF000000",
          },
        };
        workSheet.getCell(workSheet.rowCount, 1).border = {
          right: { style: "medium", color: { argb: "FFFF1B5F" } },
        };
        workSheet.getCell(workSheet.rowCount, 1).alignment = {
          vertical: "top",
          horizontal: "left",
          wrapText: true,
          indent: 1,
        };
        workSheet.mergeCells(
          workSheet.rowCount,
          1,
          workSheet.rowCount,
          lastColumnNumber
        );

        rowInfoText.height =
          (item.infoText.split(" ").length > 17 + optionalCols.length
            ? item.infoText.split(" ").length / (17 + optionalCols.length)
            : 1.5) * 22;

        const spaceBetweenRow = workSheet.addRow([""]);
        spaceBetweenRow.height = 50;
      });
    })
  ).then(async () => {
    const buffer = await workBook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Osfix_Прайс-лист.xlsx");
  });
}
