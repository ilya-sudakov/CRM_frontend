import XLSX2 from 'xlsx'
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
