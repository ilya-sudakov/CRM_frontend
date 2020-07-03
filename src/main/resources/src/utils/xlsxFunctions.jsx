import XLSX2 from 'xlsx'
import Excel from 'exceljs'
import noImgPlaceholder from '../../../../../assets/priceList/no_img.png'
import FileSaver from 'file-saver'

export const exportClientsEmailsCSV = (clients) => {
  let index = 0
  let dataWS = null
  Promise.all(
    clients
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      .map((client, clientIndex) => {
        client.contacts.map((contactData) => {
          if (index === 0) {
            dataWS = XLSX2.utils.aoa_to_sheet([
              [client.name, client.site, contactData.name, contactData.email],
            ])
          } else {
            dataWS = XLSX2.utils.sheet_add_aoa(
              dataWS,
              [[client.name, client.site, contactData.name, contactData.email]],
              { origin: 'A' + index },
            )
          }
          index++
        })
        //   dataWS = XLSX2.utils.aoa_to_sheet([[]])
        //   dataWS = XLSX2.utils.sheet_add_aoa(dataWS, [dates[0]], { origin: 'A3' })
        //   dataWS = XLSX2.utils.sheet_add_aoa(dataWS, [])
      }),
  ).then(() => {
    var wscols = [
      { width: 30 }, // first column
      { width: 20 }, // first column
      { width: 30 }, // first column
      { width: 40 }, // first column
    ]
    //Новая ширина столбцов
    dataWS['!cols'] = wscols
    let wb = XLSX2.utils.book_new() //Создание новой workbook
    XLSX2.utils.book_append_sheet(wb, dataWS, 'Почты')
    var wboutput = XLSX2.write(wb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    })
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    FileSaver.saveAs(
      new Blob([s2ab(wboutput)], { type: '' }),
      'ЭлПочты_SendPulse.xlsx',
    )
  })
}

/**
 * Select a range of cells
 * @param  {string}   startCell - Range start cell (top-left)
 * @param  {string}   endCell   - Range end cell (bottom-right)
 * @return {Object[]}           - Selected cells
 */
export const selectCellRange = (sheet, startCell, endCell) => {
  const [endCellColumn, endRow] = endCell.split(':', 2)
  const [startCellColumn, startRow] = startCell.split(':', 2)

  let endColumn = sheet.getColumn(endCellColumn)
  let startColumn = sheet.getColumn(startCellColumn)

  if (!endColumn) throw new Error('End column not found')
  if (!startColumn) throw new Error('Start column not found')

  // endColumn = endColumn._number
  // startColumn = startColumn._number

  const cells = []
  for (let y = startRow; y <= endRow; y++) {
    const row = sheet.getRow(y)

    for (let x = startColumn; x <= endColumn; x++) {
      cells.push(row.getCell(x))
    }
  }

  return cells
}

export async function exportPriceListToXLSX(
  categories,
  priceList,
  optionalCols,
  locationTypes,
  disclaimer,
  titlePage,
) {
  let workBook = new Excel.Workbook()
  const workSheet = workBook.addWorksheet('Каталог продукции')
  console.log(categories, priceList, optionalCols, locationTypes, disclaimer)
  workSheet.columns = [
    {
      // key: 'number',
      width: 30,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'number',
      width: 30,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'name',
      width: 30,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'units',
      width: 30,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group1',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group2',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group3',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group4',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group5',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group6',
      width: 12,
      style: {
        font: { size: 11, color: { argb: 'FF333333' } },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
  ]

  Promise.all(
    categories.map((category) => {
      const rowCategoryName = workSheet.addRow([category.name])
      rowCategoryName.font = {
        size: 18,
        bold: true,
      }
      rowCategoryName.height = 80
      rowCategoryName.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      }
      // rowCategoryName.fill = {
      //   bgColor: {
      //     argb: '999999ff',
      //   },
      // }
      workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 7)
      return priceList
        .filter((item) => item.category === category.name)
        .map((item) => {
          //adding product group name
          const newRowName = workSheet.addRow(['\t' + item.name])
          newRowName.font = {
            size: 14,
            bold: true,
          }
          newRowName.height = 50
          newRowName.alignment = {
            wrapText: true,
            horizontal: 'left',
            // vertical: 'top',
            vertical: 'middle',
            indent: 2,
          }
          workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 2)
          workSheet.getCell(workSheet.rowCount, 3).value = item.locationType
          workSheet.getCell(workSheet.rowCount, 3).font = {
            size: 11,
            bold: false,
          }
          workSheet.getCell(workSheet.rowCount, 3).alignment = {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true,
          }

          //adding product group description
          const newRowDescription = workSheet.addRow([item.description])
          newRowDescription.font = {
            size: 10,
            color: {
              argb: 'FF777777',
            },
          }
          newRowDescription.height = 30
          newRowDescription.alignment = {
            vertical: 'middle',
            wrapText: true,
            // horizontal: 'center',
          }
          workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 7)

          //adding 4 group images
          const imagesRow = workSheet.addRow([''])
          imagesRow.height = 120
          // workSheet.getCell(workSheet.rowCount, 1)
          // add image to workbook by base64
          if (item.groupImg1 !== '') {
            const groupImg1 = workBook.addImage({
              base64: item.groupImg1,
              extension: 'jpeg',
            })
            workSheet.addImage(
              groupImg1,
              'A' + workSheet.rowCount + ':A' + workSheet.rowCount,
            )
          }

          if (item.groupImg2 !== '') {
            const groupImg2 = workBook.addImage({
              base64: item.groupImg2,
              extension: 'jpeg',
            })
            workSheet.addImage(
              groupImg2,
              'B' + workSheet.rowCount + ':B' + workSheet.rowCount,
            )
          }

          if (item.groupImg3 !== '') {
            const groupImg3 = workBook.addImage({
              base64: item.groupImg3,
              extension: 'jpeg',
            })
            workSheet.addImage(
              groupImg3,
              'C' + workSheet.rowCount + ':C' + workSheet.rowCount,
            )
          }
          if (item.groupImg4 !== '') {
            const groupImg4 = workBook.addImage({
              base64: item.groupImg4,
              extension: 'jpeg',
            })
            workSheet.addImage(
              groupImg4,
              'D' + workSheet.rowCount + ':D' + workSheet.rowCount,
            )
          }

          //adding products
          workSheet.addRow([''])
          const tableHeaderRow = workSheet.addRow([
            'Артикул',
            'Название',
            '',
            'Ед. изм.',
            item.retailName,
            item.firstPriceName,
            item.secondPriceName,
            ...optionalCols.map((column) =>
              column.property === 'partnerPrice'
                ? item.partnerName
                : column.property === 'dealerPrice'
                ? item.dealerName
                : column.property === 'distributorPrice' &&
                  item.distributorName,
            ),
          ])
          workSheet.mergeCells(workSheet.rowCount, 2, workSheet.rowCount, 3)
          tableHeaderRow.font = {
            color: {
              argb: 'FF111111',
            },
          }
          tableHeaderRow.height = 30
          item.products.map((product) => {
            workSheet.addRow([
              product.number,
              product.name,
              '',
              product.units,
              product.retailPrice,
              product.firstPrice,
              product.secondPrice,
              ...optionalCols.map((column) =>
                product[column.property] !== undefined
                  ? product[column.property] !== '' &&
                    !Number.isNaN(product[column.property]) &&
                    product[column.property] !== 0
                    ? product[column.property]
                    : ' '
                  : ' ',
              ),
            ])
            return workSheet.mergeCells(
              workSheet.rowCount,
              2,
              workSheet.rowCount,
              3,
            )
          })
          workSheet.addRow([''])
        })
    }),
  ).then(async () => {
    const buffer = await workBook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), 'каталог_продукции.xlsx')
  })

  // workSheet.columns = [
  //   {
  //     key: 'name',
  //     width: 45,
  //     style: {
  //       font: { size: 12 },
  //       alignment: { vertical: 'middle' },
  //     },
  //   },
  //   {
  //     width: 5,
  //     style: {
  //       font: { size: 12 },
  //       alignment: { vertical: 'middle', horizontal: 'center' },
  //     },
  //   },
  // ]
}
