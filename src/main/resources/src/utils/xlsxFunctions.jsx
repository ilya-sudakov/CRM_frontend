import XLSX2 from 'xlsx'
import Excel from 'exceljs'
// import category1Img from '../../../../../assets/priceList/крепеж_для_деревянных_досок_excel.png'
// import category2Img from '../../../../../assets/priceList/крепеж_для_дпк_досок_excel.png'
// import category3Img from '../../../../../assets/priceList/крепежные_элементы_excel.png'
// import categoryImg from '../../../../../assets/priceList/default_category_excel.png'
import contactsExcelImg from '../../../../../assets/priceList/contacts_excel.png'
import FileSaver from 'file-saver'
import { getDataUri } from './functions.jsx'
import { getEmployeesByWorkshop } from './RequestsAPI/Employees.jsx'
import { getWorkReportByEmployee } from './RequestsAPI/WorkManaging/WorkControl.jsx'

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
  categories = [],
  priceList = [],
  optionalCols = [],
) {
  let workBook = new Excel.Workbook()
  workBook.creator = 'Osfix'
  workBook.created = new Date()
  const rospatentTempImg = await getDataUri('assets/rospatent.png')
  const tempImg = await getDataUri('assets/osfix_logo.png')
  const contactsImg = await getDataUri('assets/contacts_excel.png')
  const workSheet = workBook.addWorksheet('Каталог продукции')
  // console.log(categories, priceList, optionalCols, locationTypes, disclaimer)
  workSheet.columns = [
    {
      // key: 'number',
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'number',
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'name',
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'units',
      width: 30,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group1',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group2',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group3',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group4',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group5',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
    {
      key: 'group6',
      width: 14,
      style: {
        font: {
          size: 11,
          color: { argb: 'FF333333' },
          // name: 'DejaVu',
          // family: 2,
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      },
    },
  ]

  const lastColumnNumber = 7 + optionalCols.length

  //adding company header
  let temp = workSheet.addRow([''])
  workSheet.getCell(1, 3).value = {
    text: 'ООО «ОСФИКС»',
    hyperlink: 'https://www.osfix.ru',
    tooltip: 'Перейти на сайт www.osfix.ru',
  }
  workSheet.getCell(1, 3).font = {
    size: 16,
    bold: true,
    name: 'DejaVu',
    family: 2,
  }
  // workSheet.getCell(1,3).border = {
  //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // }
  temp.alignment = {
    // horizontal: 'left',
    vertical: 'middle',
    // indent: 2,
    horizontal: 'center',
  }
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4)
  temp.height = 25

  // temp = workSheet.addRow([''])
  // workSheet.getCell(3,3).value = {
  //   text: 'info@osfix.ru',
  //   hyperlink: 'mailto:info@osfix.ru',
  //   tooltip: 'Написать',
  // }
  // // workSheet.getCell(3, 3).border = {
  // //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // // }
  // temp.alignment = {
  //   vertical: 'middle',
  //   // horizontal: 'left',
  //   // indent: 2,
  //   horizontal: 'center',
  // }
  // workSheet.mergeCells(
  //   workSheet.rowCount,
  //  3,
  //   workSheet.rowCount,
  //  4,
  // )
  // temp.height = 25
  temp = workSheet.addRow([''])
  workSheet.getCell(2, 3).value = {
    text: 'Лиговский пр., 52, Санкт-Петербург, 191040',
    hyperlink: 'https://yandex.ru/maps/-/CKUrY0Ih',
    tooltip: 'Открыть Яндекс.Карту',
  }
  // workSheet.getCell(2,3).border = {
  //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // }
  workSheet.getCell(2, 3).font = {
    name: 'DejaVu',
    family: 2,
  }
  workSheet.getCell(2, 3).alignment = {
    vertical: 'middle',
    // horizontal: 'left',
    // indent: 2,
    horizontal: 'center',
  }
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4)
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(3, 3).value = 'info@osfix.ru, +7 (812) 449-10-09'
  temp.alignment = {
    vertical: 'middle',
    // horizontal: 'left',
    // indent: 2,
    horizontal: 'center',
  }
  temp.font = {
    name: 'DejaVu',
    family: 2,
  }
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4)
  temp.height = 25

  temp = workSheet.addRow([''])
  workSheet.getCell(4, 3).value = {
    text: 'www.osfix.ru',
    hyperlink: 'https://www.osfix.ru',
    tooltip: 'Открыть сайт',
  }
  // workSheet.getCell(2, 3).border = {
  //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // }
  workSheet.getCell(4, 3).font = {
    size: 14,
    name: 'DejaVu',
    family: 2,
  }
  workSheet.getCell(4, 3).alignment = {
    vertical: 'middle',
    // horizontal: 'left',
    // indent: 2,
    horizontal: 'center',
  }
  workSheet.mergeCells(workSheet.rowCount, 3, workSheet.rowCount, 4)
  temp.height = 25

  //adding logo assets/osfix_logo.png
  const logoImg = workBook.addImage({
    base64: tempImg,
    extension: 'jpeg',
  })

  workSheet.mergeCells(1, 1, 4, 1)
  workSheet.addImage(logoImg, {
    tl: { col: 0.3, row: 0.4 },
    ext: { width: 180, height: 80 },
    // editAs: 'absolute',
  })

  //border-bottom
  for (let i = 1; i <= lastColumnNumber; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      bottom: { style: 'medium', color: { argb: 'FFFF1B5F' } },
    }
  }

  //border-right
  for (let i = 1; i <= workSheet.rowCount; i++) {
    workSheet.getCell(i, lastColumnNumber).border = {
      ...workSheet.getCell(i, lastColumnNumber).border,
      right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
    }
  }
  // workSheet.getCell(workSheet.rowCount, lastColumnNumber).border = {
  //   bottom: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // }

  //adding contacts icons
  const contactsExcelImg = workBook.addImage({
    base64: contactsImg,
    extension: 'jpeg',
  })
  workSheet.addImage(contactsExcelImg, {
    tl: { col: 2.1, row: 0.3 },
    ext: { width: 17, height: 96 },
    // editAs: 'absolute',
  })

  temp = workSheet.addRow([''])
  temp.height = 25
  // for (let i = 1; i <= 2; i++) {
  //   workSheet.getCell(workSheet.rowCount - 1, i).border = {
  //     bottom: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  //   }
  // }
  // workSheet.getCell(4, 2).border = {
  //   right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  //   bottom: { style: 'medium', color: { argb: 'FFFF1B5F' } },
  // }

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
          name: 'DejaVu',
          family: 2,
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
          lastColumnNumber,
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
            name: 'DejaVu',
            family: 2,
          }
          // workSheet.getCell(workSheet.rowCount, 1).value = {
          //   text: '\t' + item.name,
          //   hyperlink: item.linkAddress !== undefined ? item.linkAddress : '',
          //   tooltip: 'Перейти на сайт www.osfix.ru',
          // }
          newRowName.height = 50
          newRowName.alignment = {
            wrapText: true,
            vertical: 'middle',
            // indent: 2,
            // horizontal: 'left',
            horizontal: 'center',
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            1,
            workSheet.rowCount,
            lastColumnNumber - 4,
          )
          workSheet.getCell(workSheet.rowCount, 1).border = {
            left: { style: 'medium', color: { argb: 'FF666666' } },
            top: { style: 'medium', color: { argb: 'FF666666' } },
            right: { style: 'medium', color: { argb: 'FF666666' } },
            bottom: { style: 'medium', color: { argb: 'FF666666' } },
          }

          //adding location type
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).value =
            item.locationType //.split('/').join('/ ')
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).font = {
            size: 11,
            bold: false,
            // name: 'DejaVu',
            // family: 2,
          }
          workSheet.getCell(
            workSheet.rowCount,
            lastColumnNumber - 3,
          ).alignment = {
            horizontal: 'center',
            vertical: 'middle',
            // wrapText: true,
          }
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 3).border = {
            left: { style: 'medium', color: { argb: 'FF666666' } },
            top: { style: 'medium', color: { argb: 'FF666666' } },
            right: { style: 'medium', color: { argb: 'FF666666' } },
            bottom: { style: 'medium', color: { argb: 'FF666666' } },
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            lastColumnNumber - 3,
            workSheet.rowCount,
            lastColumnNumber - 2,
          )

          //adding link button
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).value = {
            text: 'Смотреть на сайте',
            hyperlink:
              item.linkAddress !== undefined
                ? item.linkAddress
                : 'https://www.osfix.ru',
            tooltip: 'Смотреть на сайте',
          }
          workSheet.getCell(
            workSheet.rowCount,
            lastColumnNumber - 1,
          ).alignment = {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true,
          }
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).fill = {
            type: 'pattern',
            pattern: 'solid',
            bgColor: {
              // argb: 'FFFFFFFF',
            },
            fgColor: { argb: 'FFE30235' },
          }
          workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).font = {
            size: 12,
            bold: false,
            color: {
              argb: 'FFFFFFFF',
            },
            // name: 'DejaVu',
            // family: 2,
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            lastColumnNumber - 1,
            workSheet.rowCount,
            lastColumnNumber,
          )

          //adding product group description
          const newRowDescription = workSheet.addRow([item.description])
          newRowDescription.font = {
            size: 10,
            color: {
              argb: 'FF666666',
            },
            // name: 'DejaVu',
            // family: 2,
          }
          newRowDescription.height = 35
          newRowDescription.alignment = {
            vertical: 'middle',
            wrapText: true,
            // horizontal: 'center',
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            1,
            workSheet.rowCount,
            lastColumnNumber,
          )

          //adding 4 group images

          if (
            item.groupImg1 !== '' ||
            item.groupImg2 !== '' ||
            item.groupImg3 !== '' ||
            item.groupImg4 !== '' ||
            item.proprietaryItemText1 !== undefined ||
            item.proprietaryItemText2 !== undefined
          ) {
            const imagesRow = workSheet.addRow([''])
            imagesRow.height = 120

            let imageIndex = 0

            workSheet.mergeCells(
              workSheet.rowCount,
              lastColumnNumber - 1,
              workSheet.rowCount,
              lastColumnNumber,
            )

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

          //adding patent data rospatentTempImg
          if (
            item.proprietaryItemText1 !== undefined ||
            item.proprietaryItemText2 !== undefined
          ) {
            const rospatentImg = workBook.addImage({
              base64: rospatentTempImg,
              extension: 'png',
            })
            workSheet.addImage(rospatentImg, {
              tl: {
                col: lastColumnNumber - 2 + 0.6,
                row: workSheet.rowCount - 1 + 0.3,
              },
              ext: { width: 125, height: 80 },
            })
            workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).value =
              item.proprietaryItemText1 !== undefined
                ? item.proprietaryItemText1 + '\n'
                : item.proprietaryItemText2 + '\n'
            workSheet.getCell(workSheet.rowCount, lastColumnNumber - 1).font = {
              size: 12,
              // name: 'DejaVu',
              // family: 2,
            }
            workSheet.getCell(
              workSheet.rowCount,
              lastColumnNumber - 1,
            ).alignment = {
              vertical: 'bottom',
              horizontal: 'center',
              wrapText: true,
            }
          }

          //adding products
          // workSheet.addRow([''])
          const fakeTableHeaderRow = workSheet.addRow([
            '',
            '',
            '',
            '',
            'Стоимость 1 шт., ₽',
          ])
          fakeTableHeaderRow.font = {
            italic: true,
            // name: 'DejaVu',
            // family: 2,
          }
          fakeTableHeaderRow.height = 20
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
            lastColumnNumber,
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
          for (let i = 1; i <= lastColumnNumber; i++) {
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
            // name: 'DejaVu',
            // family: 2,
          }
          tableHeaderRow.height = 30
          item.products.map((product) => {
            const productRow = workSheet.addRow([
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
            productRow.height = 25
            for (let i = 1; i <= lastColumnNumber; i++) {
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
            // name: 'DejaVu',
            // family: 2,
          }
          workSheet.getCell(workSheet.rowCount, 1).border = {
            right: { style: 'medium', color: { argb: 'FFFF1B5F' } },
          }
          workSheet.getCell(workSheet.rowCount, 1).alignment = {
            // vertical: 'middle',
            vertical: 'top',
            horizontal: 'left',
            wrapText: true,
            indent: 1,
          }
          workSheet.mergeCells(
            workSheet.rowCount,
            1,
            workSheet.rowCount,
            lastColumnNumber,
          )
          // rowInfoText.height =
          //   (item.infoText.split(' ').length > 9
          //     ? item.infoText.split(' ').length / 9
          // : 1.5) * 22

          rowInfoText.height =
            (item.infoText.split(' ').length > 17 + optionalCols.length
              ? item.infoText.split(' ').length / (17 + optionalCols.length)
              : 1.5) * 22

          const spaceBetweenRow = workSheet.addRow([''])
          spaceBetweenRow.height = 50
        })
    }),
  ).then(async () => {
    const buffer = await workBook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), 'Osfix_Прайс-лист.xlsx')
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

export async function exportReportTableExcel(
  curDate = new Date(),
  filteredWorkshops = [],
) {
  // setIsLoading(true)
  const dates = [[''], ['']]
  for (
    let i = 1;
    i <
    new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate() + 1;
    i++
  )
    if (i < 16) dates[0].push(i)
    else dates[1].push(i)
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  const monthsNew = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
  // console.log(XLSX.version)
  let workBook = new Excel.Workbook()
  const workSheet = workBook.addWorksheet(months[curDate.getMonth()])

  workSheet.columns = [
    {
      key: 'name',
      width: 45,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 5,
      style: {
        font: { size: 12 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
    {
      width: 10,
      style: {
        font: { bold: true, size: 14 },
        alignment: { vertical: 'middle', horizontal: 'center' },
      },
    },
  ]

  //adding date header
  const dateTitleRow = workSheet.addRow([
    '1/2 ' + monthsNew[curDate.getMonth()] + '.' + curDate.getFullYear(),
  ])
  workSheet.getCell(workSheet.rowCount, 1).border = {
    top: { style: 'thin', color: { argb: '00000000' } },
    left: { style: 'thin', color: { argb: '00000000' } },
    bottom: { style: 'thin', color: { argb: '00000000' } },
    right: { style: 'thin', color: { argb: '00000000' } },
  }
  workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
  dateTitleRow.font = { bold: true, size: 18 }
  dateTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }
  dateTitleRow.height = 50

  //adding dates
  workSheet.addRow([...dates[0], '', 'Сумма'])
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      top: { style: 'thin', color: { argb: '00000000' } },
      left: { style: 'thin', color: { argb: '00000000' } },
      bottom: { style: 'thin', color: { argb: '00000000' } },
      right: { style: 'thin', color: { argb: '00000000' } },
    }
    if (i >= 2 && i <= 17) {
      workSheet.getCell(workSheet.rowCount, i).border = {
        right: { style: 'hair', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
      }
    }
  }

  let employeesList = []
  let employeesWorksList = []

  return Promise.all(
    filteredWorkshops.map((workshop) => {
      // console.log(workshop);
      return getEmployeesByWorkshop({
        workshop: workshop,
      })
        .then((employees) => employees.json())
        .then((employees) => {
          return employeesList.push(...employees)
        })
    }),
  )
    .then(() => {
      // console.log(employeesList);
      return Promise.all(
        employeesList.map((item) => {
          return getWorkReportByEmployee(item.id, curDate.getMonth() + 1)
            .then((res) => res.json())
            .then((res) => {
              // console.log(res);
              return employeesWorksList.push(res)
            })
        }),
      )
    })
    .then(() => {
      return Promise.all(
        filteredWorkshops.map((workshop) => {
          if (
            employeesWorksList.filter(
              (employee) =>
                employee.employee.workshop === workshop &&
                employee.employee.relevance !== 'Уволен',
            ).length > 0
          ) {
            const titleRow = workSheet.addRow([workshop])
            workSheet.getCell(workSheet.rowCount, 1).border = {
              top: { style: 'thin', color: { argb: '00000000' } },
              left: { style: 'thin', color: { argb: '00000000' } },
              bottom: { style: 'thin', color: { argb: '00000000' } },
              right: { style: 'thin', color: { argb: '00000000' } },
            }
            workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
            titleRow.font = { size: 14, bold: true }
            titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
            titleRow.height = 30
          }
          return employeesWorksList
            .filter(
              (employee) =>
                employee.employee.workshop === workshop &&
                employee.employee.relevance !== 'Уволен',
            )
            .sort((a, b) => {
              if (a.employee.lastName < b.employee.lastName) {
                return -1
              }
              if (a.employee.lastName > b.employee.lastName) {
                return 1
              }
              return 0
            })
            .map((item, index) => {
              let employeeInfo = [
                [
                  `${item.employee.lastName} ${item.employee.name} ${item.employee.middleName}`,
                ],
              ]
              let sum = 0
              dates[0].map((date, dateIndex) => {
                let check = null
                item.days.map((workDay) => {
                  if (workDay.day === date) {
                    check = workDay.hours
                    sum += check
                  }
                })
                if (date === '') {
                  return
                }
                if (check === null) {
                  return employeeInfo[0].push('')
                } else {
                  return employeeInfo[0].push(check)
                }
              })
              const tempRow = workSheet.addRow([...employeeInfo[0], '', sum])
              for (let i = 1; i <= 18; i++) {
                workSheet.getCell(workSheet.rowCount, i).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: {
                    argb: index % 2 === 0 ? 'FFFEFF99' : 'FFFFFFFF',
                  },
                }
              }
              workSheet.getCell(workSheet.rowCount, 1).border = {
                right: { style: 'thin', color: { argb: '00000000' } },
              }
              for (let i = 2; i <= 17; i++) {
                workSheet.getCell(workSheet.rowCount, i).border = {
                  right: { style: 'hair', color: { argb: '00000000' } },
                }
              }
              return (workSheet.getCell(workSheet.rowCount, 18).border = {
                top: { style: 'thin', color: { argb: '00000000' } },
                left: { style: 'thin', color: { argb: '00000000' } },
                bottom: { style: 'thin', color: { argb: '00000000' } },
                right: { style: 'thin', color: { argb: '00000000' } },
              })
            })
        }),
      )
    })
    .then(() => {
      for (let i = 1; i <= 18; i++) {
        workSheet.getCell(workSheet.rowCount, i).border = {
          bottom: { style: 'thin', color: { argb: '00000000' } },
        }
        if (i >= 2 && i <= 17) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            right: { style: 'hair', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
          }
        }
      }
      workSheet.getCell(workSheet.rowCount, 1).border = {
        right: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
      }
      workSheet.getCell(workSheet.rowCount, 18).border = {
        right: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
      }
      const temp = workSheet.addRow([''])
      temp.height = 50
      const dateTitleRow = workSheet.addRow([
        '2/2 ' + monthsNew[curDate.getMonth()] + '.' + curDate.getFullYear(),
      ])
      workSheet.getCell(workSheet.rowCount, 1).border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      }
      workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
      dateTitleRow.font = { bold: true, size: 18 }
      dateTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }
      dateTitleRow.height = 50

      workSheet.addRow([...dates[1], 'Сумма'])
      for (let i = 1; i <= 18; i++) {
        workSheet.getCell(workSheet.rowCount, i).border = {
          top: { style: 'thin', color: { argb: '00000000' } },
          left: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
          right: { style: 'thin', color: { argb: '00000000' } },
        }
        if (i >= 2 && i <= 17) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            right: { style: 'hair', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
          }
        }
      }
      return Promise.all(
        filteredWorkshops.map((workshop) => {
          if (
            employeesWorksList.filter(
              (employee) =>
                employee.employee.workshop === workshop &&
                employee.employee.relevance !== 'Уволен',
            ).length > 0
          ) {
            const titleRow = workSheet.addRow([workshop])
            workSheet.getCell(workSheet.rowCount, 1).border = {
              top: { style: 'thin', color: { argb: '00000000' } },
              left: { style: 'thin', color: { argb: '00000000' } },
              bottom: { style: 'thin', color: { argb: '00000000' } },
              right: { style: 'thin', color: { argb: '00000000' } },
            }
            workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18)
            titleRow.font = { size: 14, bold: true }
            titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
            titleRow.height = 30
          }
          return employeesWorksList
            .filter((employee) => employee.employee.workshop === workshop)
            .sort((a, b) => {
              if (a.employee.lastName < b.employee.lastName) {
                return -1
              }
              if (a.employee.lastName > b.employee.lastName) {
                return 1
              }
              return 0
            })
            .map((res, index) => {
              // console.log(res);
              let employeeInfo = [
                [
                  `${res.employee.lastName} ${res.employee.name} ${res.employee.middleName}`,
                ],
              ]
              let sum = 0
              dates[1].map((date) => {
                let check = null
                res.days.map((workDay) => {
                  if (workDay.day === date) {
                    check = workDay.hours
                    sum += check
                  }
                })
                if (date === '') {
                  return
                }
                if (check === null) {
                  employeeInfo[0].push('')
                } else {
                  employeeInfo[0].push(check)
                }
              })
              const diff = 16 - (employeeInfo[0].length - 1)
              let diffArray = []
              for (let i = 0; i < diff; i++) {
                diffArray.push('')
              }
              workSheet.addRow([...employeeInfo[0], ...diffArray, sum])
              for (let i = 1; i <= 18; i++) {
                workSheet.getCell(workSheet.rowCount, i).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: {
                    argb: index % 2 === 0 ? 'FFFEFF99' : 'FFFFFFFF',
                  },
                }
              }
              workSheet.getCell(workSheet.rowCount, 1).border = {
                right: { style: 'thin', color: { argb: '00000000' } },
              }
              for (let i = 2; i <= 17; i++) {
                workSheet.getCell(workSheet.rowCount, i).border = {
                  right: { style: 'hair', color: { argb: '00000000' } },
                }
              }
              return (workSheet.getCell(workSheet.rowCount, 18).border = {
                top: { style: 'thin', color: { argb: '00000000' } },
                left: { style: 'thin', color: { argb: '00000000' } },
                bottom: { style: 'thin', color: { argb: '00000000' } },
                right: { style: 'thin', color: { argb: '00000000' } },
              })
            })
        }),
      )
    })
    .then(async () => {
      for (let i = 1; i <= 18; i++) {
        workSheet.getCell(workSheet.rowCount, i).border = {
          bottom: { style: 'thin', color: { argb: '00000000' } },
        }
        if (i >= 2 && i <= 17) {
          workSheet.getCell(workSheet.rowCount, i).border = {
            right: { style: 'hair', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
          }
        }
      }
      workSheet.getCell(workSheet.rowCount, 1).border = {
        right: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
      }
      workSheet.getCell(workSheet.rowCount, 18).border = {
        right: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
      }

      const buffer = await workBook.xlsx.writeBuffer()
      saveAs(
        new Blob([buffer]),
        'Табель-' +
          months[curDate.getMonth()] +
          '_' +
          curDate.getFullYear() +
          '.xlsx',
      )
      // setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      // setIsLoading(false)
    })
}
