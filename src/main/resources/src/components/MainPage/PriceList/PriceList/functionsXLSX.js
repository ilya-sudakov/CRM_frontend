import Excel from "exceljs";
import { getDataUri } from "../../../../utils/functions.jsx";

export async function exportPriceListToXLSXMini(
  categories = [],
  priceList = [],
  optionalCols = []
) {
  let workBook = new Excel.Workbook();
  workBook.creator = "Osfix";
  workBook.created = new Date();
  const tempImg = await getDataUri("assets/osfix_logo.png");
  const contactsImg = await getDataUri("assets/contacts_excel.png");
  const workSheet = workBook.addWorksheet("Каталог продукции");
  workSheet.columns = [
    {
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "number",
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "name",
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "units",
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group1",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group2",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group3",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group4",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group5",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
    {
      key: "group6",
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: "FF333333" },
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      },
    },
  ];

  const lastColumnNumber = 7 + optionalCols.length;

  //adding company header
  let temp = workSheet.addRow([""]);
  workSheet.getCell(1, 3).value = {
    text: "ООО «ОСФИКС»",
    hyperlink: "https://www.osfix.ru",
    tooltip: "Перейти на сайт www.osfix.ru",
  };
  workSheet.getCell(1, 3).font = {
    size: 16,
    bold: true,
    name: "DejaVu",
    family: 2,
  };
  temp.alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4);
  temp.height = 25;
  temp = workSheet.addRow([""]);
  workSheet.getCell(2, 3).value = {
    text: "Лиговский пр., 52, Санкт-Петербург, 191040",
    hyperlink: "https://yandex.ru/maps/-/CKUrY0Ih",
    tooltip: "Открыть Яндекс.Карту",
  };
  workSheet.getCell(2, 3).font = {
    name: "DejaVu",
    family: 2,
  };
  workSheet.getCell(2, 3).alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4);
  temp.height = 25;

  temp = workSheet.addRow([""]);
  workSheet.getCell(3, 3).value = "info@osfix.ru, +7 (812) 449-10-09";
  temp.alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  temp.font = {
    name: "DejaVu",
    family: 2,
  };
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4);
  temp.height = 25;

  temp = workSheet.addRow([""]);
  workSheet.getCell(4, 3).value = {
    text: "www.osfix.ru",
    hyperlink: "https://www.osfix.ru",
    tooltip: "Открыть сайт",
  };
  workSheet.getCell(4, 3).font = {
    size: 14,
    name: "DejaVu",
    family: 2,
  };
  workSheet.getCell(4, 3).alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4);
  temp.height = 25;

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

  //border-bottom
  for (let i = 1; i <= lastColumnNumber; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      bottom: { style: "medium", color: { argb: "FFFF1B5F" } },
    };
  }

  //border-right
  for (let i = 1; i <= workSheet.rowCount; i++) {
    workSheet.getCell(i, lastColumnNumber).border = {
      ...workSheet.getCell(i, lastColumnNumber).border,
      right: { style: "medium", color: { argb: "FFFF1B5F" } },
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

  temp = workSheet.addRow([""]);
  temp.height = 25;

  Promise.all(
    categories.map((category) => {
      return priceList
        .filter((item) => item.category === category.name)
        .map((item) => {
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
          const spaceBetweenRow = workSheet.addRow([""]);
          spaceBetweenRow.height = 30;
        });
    })
  ).then(async () => {
    const buffer = await workBook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Osfix_Прайс-лист.xlsx");
  });
}
