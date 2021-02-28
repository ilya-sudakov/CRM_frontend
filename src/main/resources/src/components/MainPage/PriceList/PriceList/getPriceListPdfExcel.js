import XLSX2 from "xlsx";
import Excel from "exceljs";
import FileSaver from "file-saver";
import { sortByField } from "./../../../../utils/sorting/sorting.js";
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
  const value = {
    text: data.text,
    hyperlink: data.link,
    tooltip: data.tooltip,
  };
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

const getPriceListHeader = async (workSheet, workBook, lastColumnNumber) => {
  const tempImg = await getDataUri("assets/osfix_logo.png");
  const contactsImg = await getDataUri("assets/contacts_excel.png");
  //adding company header
  getPriceListHeaderItem(
    workSheet,
    {
      text: "ООО «ОСФИКС»",
      hyperlink: "https://www.osfix.ru",
      tooltip: "Перейти на сайт www.osfix.ru",
    },
    {
      size: 16,
      bold: true,
    }
  );
  getPriceListHeaderItem(workSheet, {
    text: "Лиговский пр., 52, Санкт-Петербург, 191040",
    hyperlink: "https://yandex.ru/maps/-/CKUrY0Ih",
    tooltip: "Открыть Яндекс.Карту",
  });
  getPriceListHeaderItem(workSheet, {
    text: "info@osfix.ru, +7 (812) 449-10-09",
  });
  getPriceListHeaderItem(
    workSheet,
    {
      text: "www.osfix.ru",
      hyperlink: "https://www.osfix.ru",
      tooltip: "Открыть сайт",
    },
    {
      size: 14,
    }
  );

  //adding logo assets/osfix_logo.png
  const logoImg = workBook.addImage({
    base64: tempImg,
    extension: "jpeg",
  });
  workSheet.mergeCells(1, 1, 4, 1);
  workSheet.addImage(logoImg, {
    tl: { col: 0.3, row: 0.4 },
    ext: { width: 180, height: 80 },
  });

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

  //adding contacts icons
  const contactsExcelImg = workBook.addImage({
    base64: contactsImg,
    extension: "jpeg",
  });
  workSheet.addImage(contactsExcelImg, {
    tl: { col: 2.1, row: 0.3 },
    ext: { width: 22, height: 120 },
  });
  const temp = workSheet.addRow([""]);
  temp.height = 25;
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
  await getPriceListHeader(workSheet, workBook, lastColumnNumber); //company header
  Promise.all(
    categories.map((category) => {
      if (
        priceList.filter((item) => item.category === category.name).length > 0
      ) {
        //adding category name
        const rowCategoryName = workSheet.addRow([category.name]);
        workSheet.getCell(workSheet.rowCount, 1).border = {
          left: { style: "medium", color: { argb: "FF666666" } },
          top: { style: "medium", color: { argb: "FF666666" } },
          right: { style: "medium", color: { argb: "FF666666" } },
          bottom: { style: "medium", color: { argb: "FF666666" } },
        };
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
      }
      return priceList
        .filter((item) => item.category === category.name)
        .map((item) => {
          //adding product group name
          const newRowName = workSheet.addRow(["\t" + item.name]);
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
          workSheet.getCell(workSheet.rowCount, 1).border = {
            left: { style: "medium", color: { argb: "FF666666" } },
            top: { style: "medium", color: { argb: "FF666666" } },
            right: { style: "medium", color: { argb: "FF666666" } },
            bottom: { style: "medium", color: { argb: "FF666666" } },
          };

          //adding location type
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).value =
            item.locationType;
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).font = {
            size: 11,
            bold: false,
          };
          workSheet.getCell(
            workSheet.rowCount,
            lastColumnNumber - 3
          ).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).border = {
            left: { style: "medium", color: { argb: "FF666666" } },
            top: { style: "medium", color: { argb: "FF666666" } },
            right: { style: "medium", color: { argb: "FF666666" } },
            bottom: { style: "medium", color: { argb: "FF666666" } },
          };
          workSheet.mergeCells(
            workSheet.rowCount,
            lastColumnNumber - 3,
            workSheet.rowCount,
            lastColumnNumber - 2
          );

          //adding link button
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).value = {
            text: "Смотреть на сайте",
            hyperlink:
              item.linkAddress !== undefined
                ? item.linkAddress
                : "https://www.osfix.ru",
            tooltip: "Смотреть на сайте",
          };
          workSheet.getCell(
            workSheet.rowCount,
            lastColumnNumber - 1
          ).alignment = {
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

          //adding product group description
          const newRowDescription = workSheet.addRow([item.description]);
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

          //adding 4 group images
          if (
            item.groupImg1 !== "" ||
            item.groupImg2 !== "" ||
            item.groupImg3 !== "" ||
            item.groupImg4 !== "" ||
            item.proprietaryItemText1 !== undefined ||
            item.proprietaryItemText2 !== undefined
          ) {
            const imagesRow = workSheet.addRow([""]);
            imagesRow.height = 120;

            let imageIndex = 0;

            workSheet.mergeCells(
              workSheet.rowCount,
              lastColumnNumber - 1,
              workSheet.rowCount,
              lastColumnNumber
            );

            // add image to workbook by base64
            if (item.groupImg1 !== "") {
              const groupImg1 = workBook.addImage({
                base64: item.groupImg1,
                extension: "jpeg",
              });
              workSheet.addImage(groupImg1, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: "absolute",
              });
            }

            if (item.groupImg2 !== "") {
              const groupImg2 = workBook.addImage({
                base64: item.groupImg2,
                extension: "jpeg",
              });
              workSheet.addImage(groupImg2, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: "absolute",
              });
            }

            if (item.groupImg3 !== "") {
              const groupImg3 = workBook.addImage({
                base64: item.groupImg3,
                extension: "jpeg",
              });
              workSheet.addImage(groupImg3, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: "absolute",
              });
            }
            if (item.groupImg4 !== "") {
              const groupImg4 = workBook.addImage({
                base64: item.groupImg4,
                extension: "jpeg",
              });
              workSheet.addImage(groupImg4, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: "absolute",
              });
            }
          }

          //adding patent data rospatentTempImg
          if (
            item.proprietaryItemText1 !== undefined ||
            item.proprietaryItemText2 !== undefined
          ) {
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
          workSheet.getCell(workSheet.rowCount, 5).border = {
            left: { style: "medium", color: { argb: "FF666666" } },
            top: { style: "medium", color: { argb: "FF666666" } },
            right: { style: "medium", color: { argb: "FF666666" } },
            bottom: { style: "medium", color: { argb: "FF666666" } },
          };
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
            workSheet.getCell(workSheet.rowCount, i).border = {
              left: { style: "medium", color: { argb: "FF666666" } },
              top: { style: "medium", color: { argb: "FF666666" } },
              right: { style: "medium", color: { argb: "FF666666" } },
              bottom: { style: "medium", color: { argb: "FF666666" } },
            };
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
              workSheet.getCell(workSheet.rowCount, i).border = {
                left: { style: "medium", color: { argb: "FF666666" } },
                top: { style: "medium", color: { argb: "FF666666" } },
                right: { style: "medium", color: { argb: "FF666666" } },
                bottom: { style: "medium", color: { argb: "FF666666" } },
              };
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
