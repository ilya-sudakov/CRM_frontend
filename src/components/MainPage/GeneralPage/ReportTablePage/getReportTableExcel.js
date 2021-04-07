import Excel from 'exceljs';
import { getEmployeesByWorkshop } from 'Utils/RequestsAPI/employees';
import { getWorkReportByEmployee } from 'Utils/RequestsAPI/WorkManaging/work_control';
import { getEmployeeNameText } from 'Utils/functions.jsx';
import { months } from 'Utils/dataObjects.js';
import { saveExcelFile } from 'Utils/xlsxFunctions.js';
import { sortEmployees } from './functions.js';

const getReportTableColumnXLSX = (name, width = 5) => {
  return {
    key: name,
    width: width,
    style: {
      font: { size: 12 },
      alignment: { vertical: 'middle' },
    },
  };
};
const thinBorder = { style: 'thin', color: { argb: '00000000' } };

const reportTableDefaultColumnds = [
  getReportTableColumnXLSX('name', 45),
  ...Array(16).fill(getReportTableColumnXLSX(undefined)),
  getReportTableColumnXLSX(undefined, 10),
];

const defaultBorder = {
  top: thinBorder,
  left: thinBorder,
  bottom: thinBorder,
  right: thinBorder,
};

const getDatesForReportTable = (curDate) => {
  const dates = [[''], ['']];
  const lastDate =
    new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate() + 1;
  for (let i = 1; i < lastDate; i++)
    if (i < 16) dates[0].push(i);
    else dates[1].push(i);
  return dates;
};

const getDateTitle = (workSheet, curDate, type = 'first') => {
  const dateTitleRow = workSheet.addRow([
    `${type === 'first' ? '1/2' : '2/2'} ${
      months[curDate.getMonth()]
    }.${curDate.getFullYear()}`,
  ]);
  workSheet.getCell(workSheet.rowCount, 1).border = defaultBorder;
  workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18);
  dateTitleRow.font = { bold: true, size: 18 };
  dateTitleRow.alignment = { vertical: 'middle', horizontal: 'center' };
  dateTitleRow.height = 50;
};

const fillBorderInBetween = (workSheet, i) => {
  if (i >= 2 && i <= 17) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      right: { style: 'hair', color: { argb: '00000000' } },
      bottom: thinBorder,
    };
  }
};

const getDatesHeaderList = (workSheet, dates) => {
  const array = getRemainingDaysSpaces(dates);
  workSheet.addRow([...dates, ...array, 'Сумма']);
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = defaultBorder;
    fillBorderInBetween(workSheet, i);
  }
};

const filterWorksList = (employeesWorksList, workshop) => {
  return employeesWorksList.filter(
    (employee) =>
      employee.employee.workshop === workshop &&
      (employee.employee.relevance !== 'Уволен' ||
        employee.days.reduce((prev, cur) => {
          if (cur.hours !== null || cur.day !== null) return prev + 1;
          return prev;
        }, 0) > 0),
  );
};

const getWorkshopNameRow = (workSheet, workshop) => {
  const titleRow = workSheet.addRow([workshop]);
  workSheet.getCell(workSheet.rowCount, 1).border = defaultBorder;
  workSheet.mergeCells(workSheet.rowCount, 1, workSheet.rowCount, 18);
  titleRow.font = { size: 14, bold: true };
  titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
  titleRow.height = 30;
};

const getRemainingDaysSpaces = (dates) => {
  if (dates.length > 16) return [];
  let array = [''];
  if (15 - (dates.length - 1) > 0) {
    array = Array(15 - (dates.length - 2)).fill('');
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
    if (date === '') return;
    if (check === null) {
      return employeeInfo[0].push('');
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
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: index % 2 === 0 ? 'FFFEFF99' : 'FFFFFFFF',
      },
    };
  }
  workSheet.getCell(workSheet.rowCount, 1).border = {
    right: thinBorder,
  };
  for (let i = 2; i <= 17; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      right: { style: 'hair', color: { argb: '00000000' } },
    };
  }
  return (workSheet.getCell(workSheet.rowCount, 18).border = defaultBorder);
};

const createBorders = (workSheet) => {
  for (let i = 1; i <= 18; i++) {
    workSheet.getCell(workSheet.rowCount, i).border = {
      bottom: thinBorder,
    };
    fillBorderInBetween(workSheet, i);
  }
  workSheet.getCell(workSheet.rowCount, 1).border = {
    right: thinBorder,
    bottom: thinBorder,
  };
  workSheet.getCell(workSheet.rowCount, 18).border = {
    right: thinBorder,
    bottom: thinBorder,
    left: thinBorder,
  };
};

const getHalfMonthList = (
  filteredWorkshops,
  employeesWorksList,
  workSheet,
  curDate,
  type = 'first',
) => {
  const dates = getDatesForReportTable(curDate);
  const arrayIndex = type === 'first' ? 0 : 1;
  getDateTitle(workSheet, curDate, type); // adding date header
  getDatesHeaderList(workSheet, dates[arrayIndex]); // adding dates
  filteredWorkshops.map((workshop) => {
    const filteredWorksList = filterWorksList(employeesWorksList, workshop);
    if (filteredWorksList.length > 0) {
      getWorkshopNameRow(workSheet, workshop);
    }
    return sortEmployees(filteredWorksList).map((item, index) =>
      getEmployeeWorkRow(workSheet, item, index, dates[arrayIndex]),
    );
  });
  createBorders(workSheet);
  const temp = workSheet.addRow(['']);
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
        .then((employees) => employeesList.push(...employees)),
    ),
  ).then(() =>
    Promise.all(
      employeesList.map((item) =>
        getWorkReportByEmployee(
          item.id,
          curDate.getMonth() + 1,
          curDate.getFullYear(),
        )
          .then((res) => res.json())
          .then((res) => employeesWorksList.push(res)),
      ),
    ),
  );
  return { employeesWorksList };
};

export async function getReportTableExcel(
  curDate = new Date(),
  filteredWorkshops = [],
) {
  let workBook = new Excel.Workbook();
  const workSheet = workBook.addWorksheet(months[curDate.getMonth()]);
  workSheet.columns = reportTableDefaultColumnds;
  const { employeesWorksList } = await loadEmployeeWorkData(
    filteredWorkshops,
    curDate,
  );
  const defaultParams = [
    filteredWorkshops,
    employeesWorksList,
    workSheet,
    curDate,
  ];
  getHalfMonthList(...defaultParams, 'first');
  getHalfMonthList(...defaultParams, 'second');
  saveExcelFile(
    workBook,
    `Табель-${months[curDate.getMonth()]}_${curDate.getFullYear()}`,
  );
}
