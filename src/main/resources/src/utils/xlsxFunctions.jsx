import XLSX2 from 'xlsx'
import Excel from 'exceljs'
// import category1Img from '../../../../../assets/priceList/крепеж_для_деревянных_досок_excel.png'
// import category2Img from '../../../../../assets/priceList/крепеж_для_дпк_досок_excel.png'
// import category3Img from '../../../../../assets/priceList/крепежные_элементы_excel.png'
// import categoryImg from '../../../../../assets/priceList/default_category_excel.png'
import FileSaver from 'file-saver'
import { getDataUri } from './functions.jsx'

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
  workBook.creator = 'Osfix'
  workBook.created = new Date()
  const tempImg = await getDataUri('assets/osfix_logo.png')
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

  //adding company header
  let temp = workSheet.addRow([''])
  workSheet.getCell(1, 1).value = {
    text: 'ООО «ОСФИКС»',
    hyperlink: 'https://www.osfix.ru',
    tooltip: 'Перейти на сайт www.osfix.ru',
  }
  workSheet.getCell(1, 1).font = {
    bold: true,
  }
  temp.alignment = {
    horizontal: 'left',
    vertical: 'middle',
  }
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(2, 1).value = {
    text: 'Лиговский пр., 52, Санкт-Петербург, 191040',
    hyperlink: 'https://yandex.ru/maps/-/CKUrY0Ih',
    tooltip: 'Открыть Яндекс.Карту',
  }
  temp.alignment = {
    horizontal: 'left',
    vertical: 'middle',
  }
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(2, 1).value = {
    text: 'www.osfix.ru',
    hyperlink: 'https://www.osfix.ru',
    tooltip: 'Открыть сайт',
  }
  temp.alignment = {
    horizontal: 'left',
    vertical: 'middle',
  }
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(3, 1).value = {
    text: 'info@osfix.ru',
    hyperlink: 'mailto:info@osfix.ru',
    tooltip: 'Написать',
  }
  temp.alignment = {
    horizontal: 'left',
    vertical: 'middle',
  }
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(4, 1).value = {
    text: '+7 (812) 449-10-09',
    hyperlink: 'tel:+78124491009',
    tooltip: 'Позвонить',
  }
  temp.alignment = {
    horizontal: 'left',
    vertical: 'middle',
  }
  temp.height = 25

  //adding logo assets/osfix_logo.png
  const logoImg = workBook.addImage({
    base64: tempImg,
    extension: 'jpeg',
  })
  workSheet.addImage(logoImg, {
    tl: { col: 5 + optionalCols.length, row: 0.5 },
    br: { col: 7 + optionalCols.length, row: 3.8 },
    // editAs: 'absolute',
  })
  for (let i = 1; i <= 7 + optionalCols.length; i++) {
    workSheet.getCell(workSheet.rowCount - 1, i).border = {
      bottom: { style: 'medium', color: { argb: 'FFFF1B5F' } },
    }
  }

  Promise.all(
    categories.map((category) => {
      if (
        priceList.filter((item) => item.category === category.name).length > 0
      ) {
        //adding category name
        const rowCategoryName = workSheet.addRow([category.name])
        // const tempImg = await getDataUri(
        //   category.img.split('.png')[0] + '_excel.png',
        // )
        // const categoryImg = workBook.addImage({
        //   base64: tempImg,
        //   extension: 'png',
        // })
        // workSheet.addImage(categoryImg, {
        //   tl: { col: 0, row: workSheet.rowCount - 1 },
        //   br: { col: 7, row: workSheet.rowCount },
        //   editAs: 'absolute',
        // })
        // workSheet.getCell(workSheet.rowCount, 1).fill = {
        //   type: 'pattern',
        //   pattern: 'solid',
        //   bgColor: {
        //     argb: 'FFFFFFFF',
        //   },
        //   fgColor: {
        //     argb: '00FF1B5F',
        //   },
        // }
        workSheet.getCell(workSheet.rowCount, 1).border = {
          left: { style: 'medium', color: { argb: 'FF666666' } },
          top: { style: 'medium', color: { argb: 'FF666666' } },
          right: { style: 'medium', color: { argb: 'FF666666' } },
          bottom: { style: 'medium', color: { argb: 'FF666666' } },
        }
        rowCategoryName.font = {
          size: 18,
          bold: true,
        }
        rowCategoryName.height = 80
        rowCategoryName.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        }
        workSheet.mergeCells(
          workSheet.rowCount,
          1,
          workSheet.rowCount,
          7 + optionalCols.length,
        )
        workSheet.addRow([''])
      }
      return priceList
        .filter((item) => item.category === category.name)
        .map((item) => {
          //adding product group name
          const newRowName = workSheet.addRow(['\t' + item.name])
          newRowName.font = {
            size: 14,
            bold: true,
          }
          // workSheet.getCell(workSheet.rowCount, 1).value = {
          //   text: '\t' + item.name,
          //   hyperlink: item.linkAddress !== undefined ? item.linkAddress : '',
          //   tooltip: 'Перейти на сайт www.osfix.ru',
          // }
          newRowName.height = 50
          newRowName.alignment = {
            wrapText: true,
            horizontal: 'left',
            // vertical: 'top',
            vertical: 'middle',
            indent: 2,
          }
          workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 2)

          //adding location type
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

          //adding link button
          workSheet.getCell(workSheet.rowCount, 4).value = {
            text: 'Смотреть на сайте',
            hyperlink:
              item.linkAddress !== undefined
                ? item.linkAddress
                : 'https://www.osfix.ru',
            tooltip: 'Смотреть на сайте',
          }
          workSheet.getCell(workSheet.rowCount, 4).alignment = {
            horizontal: 'center',
            vertical: 'middle',
          }
          workSheet.getCell(workSheet.rowCount, 4).fill = {
            type: 'pattern',
            pattern: 'solid',
            bgColor: {
              // argb: 'FFFFFFFF',
            },
            fgColor: { argb: 'FFE30235' },
          }
          workSheet.getCell(workSheet.rowCount, 4).font = {
            size: 12,
            bold: false,
            color: {
              argb: 'FFFFFFFF',
            },
          }

          //adding product group description
          const newRowDescription = workSheet.addRow([item.description])
          newRowDescription.font = {
            size: 10,
            color: {
              argb: 'FF777777',
            },
          }
          newRowDescription.height = 35
          newRowDescription.alignment = {
            vertical: 'middle',
            wrapText: true,
            // horizontal: 'center',
          }
          workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 3)

          //adding 4 group images

          if (
            item.groupImg1 !== '' ||
            item.groupImg2 !== '' ||
            item.groupImg3 !== '' ||
            item.groupImg4 !== ''
          ) {
            const imagesRow = workSheet.addRow([''])
            imagesRow.height = 120

            let imageIndex = 0

            // add image to workbook by base64
            if (item.groupImg1 !== '') {
              const groupImg1 = workBook.addImage({
                base64: item.groupImg1,
                extension: 'jpeg',
              })
              workSheet.addImage(groupImg1, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: 'absolute',
              })
            }

            if (item.groupImg2 !== '') {
              const groupImg2 = workBook.addImage({
                base64: item.groupImg2,
                extension: 'jpeg',
              })
              workSheet.addImage(groupImg2, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: 'absolute',
              })
            }

            if (item.groupImg3 !== '') {
              const groupImg3 = workBook.addImage({
                base64: item.groupImg3,
                extension: 'jpeg',
              })
              workSheet.addImage(groupImg3, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: 'absolute',
              })
            }
            if (item.groupImg4 !== '') {
              const groupImg4 = workBook.addImage({
                base64: item.groupImg4,
                extension: 'jpeg',
              })
              workSheet.addImage(groupImg4, {
                tl: { col: imageIndex, row: workSheet.rowCount - 1 },
                br: { col: ++imageIndex, row: workSheet.rowCount },
                editAs: 'absolute',
              })
            }
          }

          //adding products
          workSheet.addRow([''])
          const fakeTableHeaderRow = workSheet.addRow([
            '',
            '',
            '',
            '',
            'Стоимость 1 шт., ₽',
          ])
          fakeTableHeaderRow.font = {
            italic: true,
          }
          workSheet.getCell(workSheet.rowCount, 5).border = {
            left: { style: 'medium', color: { argb: 'FF666666' } },
            top: { style: 'medium', color: { argb: 'FF666666' } },
            right: { style: 'medium', color: { argb: 'FF666666' } },
            bottom: { style: 'medium', color: { argb: 'FF666666' } },
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            5,
            workSheet.rowCount,
            7 + optionalCols.length,
          )

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
          for (let i = 1; i <= 7 + optionalCols.length; i++) {
            workSheet.getCell(workSheet.rowCount, i).border = {
              left: { style: 'medium', color: { argb: 'FF666666' } },
              top: { style: 'medium', color: { argb: 'FF666666' } },
              right: { style: 'medium', color: { argb: 'FF666666' } },
              bottom: { style: 'medium', color: { argb: 'FF666666' } },
            }
          }
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
            for (let i = 1; i <= 7 + optionalCols.length; i++) {
              workSheet.getCell(workSheet.rowCount, i).border = {
                left: { style: 'medium', color: { argb: 'FF666666' } },
                top: { style: 'medium', color: { argb: 'FF666666' } },
                right: { style: 'medium', color: { argb: 'FF666666' } },
                bottom: { style: 'medium', color: { argb: 'FF666666' } },
              }
            }
            return workSheet.mergeCells(
              workSheet.rowCount,
              2,
              workSheet.rowCount,
              3,
            )
          })

          //adding infoText
          workSheet.addRow([''])
          const rowInfoText = workSheet.addRow([item.infoText])
          rowInfoText.font = {
            size: 11,
            italic: true,
            color: {
              argb: 'FF000000',
            },
          }
          workSheet.getCell(workSheet.rowCount, 1).border = {
            right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
          }
          workSheet.getCell(workSheet.rowCount, 1).alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
          }
          workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 3)
          rowInfoText.height =
            (item.infoText.split(' ').length > 10
              ? item.infoText.split(' ').length / 10
              : 1.5) * 22

          const spaceBetweenRow = workSheet.addRow([''])
          spaceBetweenRow.height = 50
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
