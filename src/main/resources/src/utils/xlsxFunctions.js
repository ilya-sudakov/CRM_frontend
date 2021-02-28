import XLSX2 from "xlsx";
import Excel from "exceljs";
import FileSaver from "file-saver";
import { sortByField } from "./sorting/sorting.js";
import { getEmployeesByWorkshop } from "./RequestsAPI/Employees.jsx";
import { getWorkReportByEmployee } from "./RequestsAPI/WorkManaging/WorkControl.jsx";
import { getEmployeeNameText } from "./functions.jsx";

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

const getReportTableColumnXLSX = (name, width = 5) => {
  return {
    key: name,
    width: width,
    style: {
      font: { size: 12 },
      alignment: { vertical: "middle" },
    },
  };
};

const reportTableDefaultColumnds = [
  getReportTableColumnXLSX("name", 45),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined),
  getReportTableColumnXLSX(undefined, 10),
];

const defaultBorder = {
  top: { style: "thin", color: { argb: "00000000" } },
  left: { style: "thin", color: { argb: "00000000" } },
  bottom: { style: "thin", color: { argb: "00000000" } },
  right: { style: "thin", color: { argb: "00000000" } },
};

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const monthsNew = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const getDatesForReportTable = (curDate) => {
  const dates = [[""], [""]];
  for (
    let i = 1;
    i <
    new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate() + 1;
    i++
  )
    if (i < 16) dates[0].push(i);
    else dates[1].push(i);
  return dates;
};

const getDateTitle = (workSheet, curDate, type = "first") => {
  const dateTitleRow = workSheet.addRow([
    `${type === "first" ? "1/2" : "2/2"} ${
      monthsNew[curDate.getMonth()]
    }.${curDate.getFullYear()}`,
  ]);
  workSheet.getCell(workSheet.rowCount, 1).border = defaultBorder;
  workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18);
  dateTitleRow.font = { bold: true, size: 18 };
  dateTitleRow.alignment = { vertical: "middle", horizontal: "center" };
  dateTitleRow.height = 50;
};

const getDatesHeaderList = (workSheet, dates) => {
  const array = getRemainingDaysSpaces(dates);
  workSheet.addRow([...dates, ...array, "Сумма"]);
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = defaultBorder;
    if (i >= 2 && i <= 17) {
      workSheet.getCell(workSheet.rowCount, i).border = {
        right: { style: "hair", color: { argb: "00000000" } },
        bottom: { style: "thin", color: { argb: "00000000" } },
      };
    }
  }
};

const filterWorksList = (employeesWorksList, workshop) => {
  return employeesWorksList.filter(
    (employee) =>
      employee.employee.workshop === workshop &&
      (employee.employee.relevance !== "Уволен" ||
        employee.days.reduce((prev, cur) => {
          if (cur.hours !== null || cur.day !== null) return prev + 1;
          return prev;
        }, 0) > 0)
  );
};

const getWorkshopNameRow = (workSheet, workshop) => {
  const titleRow = workSheet.addRow([workshop]);
  workSheet.getCell(workSheet.rowCount, 1).border = defaultBorder;
  workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18);
  titleRow.font = { size: 14, bold: true };
  titleRow.alignment = { vertical: "middle", horizontal: "center" };
  titleRow.height = 30;
};

const sortWorksByEmployee = (data) => {
  return data.sort((a, b) => {
    if (a.employee.lastName < b.employee.lastName) {
      return -1;
    }
    if (a.employee.lastName > b.employee.lastName) {
      return 1;
    }
    return 0;
  });
};

const getRemainingDaysSpaces = (dates) => {
  let array = [""];
  if (15 - (dates.length - 1) > 0) {
    array = Array(15 - (dates.length - 2)).fill("");
  }
  return array;
};

const getEmployeeWorkRow = (workSheet, item, index, dates) => {
  let employeeInfo = [[getEmployeeNameText(item.employee)]];
  let sum = 0;
  dates.map((date) => {
    let check = null;
    item.days.map((workDay) => {
      if (workDay.day === date) {
        check = workDay.hours;
        sum += check;
      }
    });
    if (date === "") return;
    if (check === null) {
      return employeeInfo[0].push("");
    }
    return employeeInfo[0].push(check);
  });
  const array = getRemainingDaysSpaces(dates);
  workSheet.addRow([...employeeInfo[0], ...array, sum]);
  return getEmployeeWorkRowBorders(workSheet, index);
};

const getEmployeeWorkRowBorders = (workSheet, index) => {
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: index % 2 === 0 ? "FFFEFF99" : "FFFFFFFF",
      },
    };
  }
  workSheet.getCell(workSheet.rowCount, 1).border = {
    right: { style: "thin", color: { argb: "00000000" } },
  };
  for (let i = 2; i <= 17; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      right: { style: "hair", color: { argb: "00000000" } },
    };
  }
  return (workSheet.getCell(workSheet.rowCount, 18).border = defaultBorder);
};

const createBorders = (workSheet) => {
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      bottom: { style: "thin", color: { argb: "00000000" } },
    };
    if (i >= 2 && i <= 17) {
      workSheet.getCell(workSheet.rowCount, i).border = {
        right: { style: "hair", color: { argb: "00000000" } },
        bottom: { style: "thin", color: { argb: "00000000" } },
      };
    }
  }
  workSheet.getCell(workSheet.rowCount, 1).border = {
    right: { style: "thin", color: { argb: "00000000" } },
    bottom: { style: "thin", color: { argb: "00000000" } },
  };
  workSheet.getCell(workSheet.rowCount, 18).border = {
    right: { style: "thin", color: { argb: "00000000" } },
    bottom: { style: "thin", color: { argb: "00000000" } },
    left: { style: "thin", color: { argb: "00000000" } },
  };
};

const getHalfMonthList = (
  filteredWorkshops,
  employeesWorksList,
  workSheet,
  curDate,
  type = "first"
) => {
  const dates = getDatesForReportTable(curDate);
  const arrayIndex = type === "first" ? 0 : 1;
  getDateTitle(workSheet, curDate, type); // adding date header
  getDatesHeaderList(workSheet, dates[arrayIndex]); // adding dates
  filteredWorkshops.map((workshop) => {
    const filteredWorksList = filterWorksList(employeesWorksList, workshop);
    if (filteredWorksList.length > 0) {
      getWorkshopNameRow(workSheet, workshop);
    }
    return sortWorksByEmployee(filteredWorksList).map((item, index) =>
      getEmployeeWorkRow(workSheet, item, index, dates[arrayIndex])
    );
  });
  createBorders(workSheet);
  const temp = workSheet.addRow([""]);
  temp.height = 50;
};

const loadEmployeeWorkData = async (filteredWorkshops, curDate) => {
  let employeesList = [];
  let employeesWorksList = [];
  await Promise.all(
    filteredWorkshops.map((workshop) =>
      getEmployeesByWorkshop({
        workshop: workshop,
      })
        .then((res) => res.json())
        .then((employees) => employeesList.push(...employees))
    )
  ).then(() =>
    Promise.all(
      employeesList.map((item) =>
        getWorkReportByEmployee(
          item.id,
          curDate.getMonth() + 1,
          curDate.getFullYear()
        )
          .then((res) => res.json())
          .then((res) => employeesWorksList.push(res))
      )
    )
  );
  return { employeesWorksList };
};

export async function exportReportTableExcel(
  curDate = new Date(),
  filteredWorkshops = []
) {
  let workBook = new Excel.Workbook();
  const workSheet = workBook.addWorksheet(months[curDate.getMonth()]);
  workSheet.columns = reportTableDefaultColumnds;
  const { employeesWorksList } = await loadEmployeeWorkData(
    filteredWorkshops,
    curDate
  );
  const defaultParams = [
    filteredWorkshops,
    employeesWorksList,
    workSheet,
    curDate,
  ];
  getHalfMonthList(...defaultParams, "first");
  getHalfMonthList(...defaultParams, "second");
  saveExcelFile(
    workBook,
    `Табель-${months[curDate.getMonth()]}_${curDate.getFullYear()}`
  );
}
