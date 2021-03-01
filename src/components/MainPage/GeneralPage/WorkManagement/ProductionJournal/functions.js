import {
  formatDateStringNoYear,
  getEmployeeNameText,
} from "../../../../../utils/functions.jsx";
import {
  createPDF,
  defaultStylesPDF,
} from "../../../../../utils/pdfFunctions.js";
import { sortByField } from "../../../../../utils/sorting/sorting.js";
import { defaultJournalWorkshops } from "./objects.js";

export const updateData = (worksList, selectedWork, newData) => {
  const temp = worksList;
  temp.splice(worksList.indexOf(selectedWork), 1, newData);
  return temp;
};

const getProductListText = (products) => {
  return products
    .map((product) => `${product.name} - ${product.quantity} шт\n`)
    .join("");
};

const getDaysWorkText = (workItem) => {
  let workText = workItem.works.map((work) => {
    const productText = getProductListText(work.product);
    const draftText = getProductListText(work.draft);
    return [
      `${work.workName} - ${work.hours} ч\n`,
      { text: productText, fontSize: 10, color: "#666" },
      { text: draftText, fontSize: 10, color: "#666" },
      work.comment && {
        text: `Комментарий: ${work.comment}`,
        fontSize: 10,
        color: "#999",
        italics: true,
      },
    ];
  });
  return workText;
};

const sortEmployees = (employees, workshop) => {
  const filteredEmployees = sortByField(
    employees.filter(
      (employee) =>
        employee.workshop === workshop.name &&
        employee?.relevance !== "Уволен" &&
        employee?.workshop !== "Уволенные"
    ),
    {
      fieldName: "lastName",
      direction: "asc",
    }
  );
  return filteredEmployees;
};

const getWorkshopList = (
  employees,
  workshop,
  curDate,
  todaysWork,
  yesterdaysWork
) => {
  const prevDay = new Date(new Date(curDate).setDate(curDate.getDate() - 1));
  const filteredEmployees = sortEmployees(employees, workshop);
  if (filteredEmployees.length === 0) return null;
  const listItems = filteredEmployees.map((employee) => [
    { text: getEmployeeNameText(employee), style: "regularText", fontSize: 11 },
    {
      stack: getDaysWorkText(yesterdaysWork[workshop.engName][employee.id]),
      style: "regularText",
      fontSize: 11,
    },
    {
      stack: getDaysWorkText(todaysWork[workshop.engName][employee.id]),
      style: "regularText",
      fontSize: 11,
    },
  ]);
  const list = [
    {
      text: `${workshop.name}\n`,
      alignment: "left",
      style: "subheader",
      margin: [0, 15, 0, 5],
    },
    {
      table: {
        widths: [150, "*", "*"],
        body: [
          [
            { text: "ФИО сотрудника", style: "tableHeader" },
            {
              text: formatDateStringNoYear(prevDay),
              style: "tableHeader",
            },
            { text: formatDateStringNoYear(curDate), style: "tableHeader" },
          ],
          ...listItems,
        ],
      },
    },
  ];
  return list;
};

export const createWorkListPDF = (
  employees,
  todaysWork,
  yesterdaysWork,
  curDate
) => { 
  const list = [];
  Object.values(defaultJournalWorkshops).map((workshop) => {
    list.push(
      getWorkshopList(employees, workshop, curDate, todaysWork, yesterdaysWork)
    );
  });
  const data = {
    info: {
      title: "Дневник производства",
    },
    content: [
      {
        text: "Дневник производства\n",
        alignment: "center",
        style: "title",
        margin: [0, 0, 0, 10],
      },
      ...list,
    ],
    styles: defaultStylesPDF,
  };
  createPDF(data);
};
