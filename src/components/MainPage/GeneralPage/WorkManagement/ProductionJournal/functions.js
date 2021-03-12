import {
  formatDateStringNoYear,
  addSpaceDelimiter,
  // getEmployeeNameText,
} from 'Utils/functions.jsx';
import { createPDF, defaultStylesPDF } from 'Utils/pdfFunctions.js';
import { sortByField } from 'Utils/sorting/sorting.js';
import { defaultJournalWorkshops } from './objects.js';

export const updateData = (worksList, selectedWork, newData) => {
  const temp = worksList;
  temp.splice(worksList.indexOf(selectedWork), 1, newData);
  return temp;
};

const getProductListText = (products) => {
  return products
    .map(
      (product) =>
        `${product.name} - ${addSpaceDelimiter(product.quantity)} шт\n`,
    )
    .join('');
};

const getDaysWorkText = (workItem) => {
  let workText = workItem.works.map((work) => {
    const productText = getProductListText(work.product);
    const draftText = getProductListText(work.draft);
    return [
      `${work.workName} - ${work.hours} ч\n`,
      { text: productText, fontSize: 9, color: '#666' },
      { text: draftText, fontSize: 9, color: '#666' },
      work.comment && {
        text: `Комментарий: ${work.comment}`,
        fontSize: 9,
        color: '#999',
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
        employee?.relevance !== 'Уволен' &&
        employee?.workshop !== 'Уволенные',
    ),
    {
      fieldName: 'lastName',
      direction: 'asc',
    },
  );
  return filteredEmployees;
};

const getWorkshopList = (
  employees,
  workshop,
  curDate,
  todaysWork,
  yesterdaysWork,
) => {
  const prevDay = new Date(new Date(curDate).setDate(curDate.getDate() - 1));
  const filteredEmployees = sortEmployees(employees, workshop);
  if (filteredEmployees.length === 0) return null;
  let listItems = [],
    index = 0;
  filteredEmployees.map((employee) => {
    const yesterdaysWorks = yesterdaysWork[workshop.engName][employee.id];
    const todaysWorks = todaysWork[workshop.engName][employee.id];
    if (
      (todaysWorks?.works?.length === 0 &&
        yesterdaysWorks?.works?.length === 0) ||
      !todaysWorks ||
      !yesterdaysWorks
    )
      return;
    const defaultStyle = {
      style: 'regularText',
      fontSize: 10,
      color: '#444',
      fillColor: index % 2 === 0 ? '#fff' : '#eee',
      border: [false, false, false, true],
      borderColor: ['#bbb', '#bbb', '#bbb', '#bbb'],
    };
    listItems.push([
      {
        text: `${employee.lastName} ${employee.name} ${employee.middleName[0]}.`,
        ...defaultStyle,
      },
      {
        stack: getDaysWorkText(yesterdaysWorks),
        ...defaultStyle,
      },
      {
        stack: getDaysWorkText(todaysWorks),
        ...defaultStyle,
      },
    ]);
    index++;
  });
  const listHeaderStyles = {
    style: 'tableHeader',
    border: [false, false, false, true],
    borderColor: ['#bbb', '#bbb', '#bbb', '#bbb'],
  };
  const list = [
    {
      text: `${workshop.name}\n`,
      style: 'subheader',
      fontSize: 12,
      color: '#333',
      margin: [0, 15, 0, 5],
    },
    {
      table: {
        widths: [120, '*', '*'],
        headerRows: 1,
        body: [
          [
            {
              text: 'ФИО сотрудника',
              ...listHeaderStyles,
            },
            {
              text: formatDateStringNoYear(prevDay),
              ...listHeaderStyles,
            },
            {
              text: formatDateStringNoYear(curDate),
              ...listHeaderStyles,
            },
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
  curDate,
) => {
  const list = [];
  Object.values(defaultJournalWorkshops).map((workshop) => {
    list.push(
      getWorkshopList(employees, workshop, curDate, todaysWork, yesterdaysWork),
    );
  });
  const data = {
    info: {
      title: 'Дневник производства',
    },
    content: [
      {
        text: 'Дневник производства\n',
        style: 'title',
        margin: [0, 0, 0, 0],
      },
      ...list,
    ],
    styles: defaultStylesPDF,
  };
  createPDF(data);
};
