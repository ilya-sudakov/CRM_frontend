import XLSX2 from "xlsx";
import FileSaver from "file-saver";
import { sortByField } from "./sorting/sorting.js";

export const saveExcelFile = async (workBook, fileName) => {
  const buffer = await workBook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${fileName}.xlsx`);
};

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

const clientColWidths = [
  { width: 30 }, // first column
  { width: 20 }, // first column
  { width: 30 }, // first column
  { width: 40 }, // first column
];

const saveEmailsCSV = (wb, fileName) => {
  var wboutput = XLSX2.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  });
  FileSaver.saveAs(new Blob([s2ab(wboutput)], { type: "" }), fileName);
};

const addClientContacts = (dataWS, client, index) => {
  client.contacts.map((contactData) => {
    const clientRow = [
      [client.name, client.site, contactData.name, contactData.email],
    ];
    if (index === 0) {
      dataWS = XLSX2.utils.aoa_to_sheet(clientRow);
    } else {
      dataWS = XLSX2.utils.sheet_add_aoa(dataWS, clientRow, {
        origin: "A" + index,
      });
    }
    index++;
  });
};

export const exportClientsEmailsCSV = (clients) => {
  let index = 0;
  let dataWS = null;
  Promise.all(
    sortByField(clients, {
      fieldName: "name",
      direction: "asc",
    }).map((client) => addClientContacts(dataWS, client, index))
  ).then(() => {
    dataWS["!cols"] = clientColWidths; //Новая ширина столбцов
    let wb = XLSX2.utils.book_new(); //Создание новой workbook
    XLSX2.utils.book_append_sheet(wb, dataWS, "Почты");
    saveEmailsCSV(wb, "ЭлПочты_SendPulse.xlsx");
  });
};
