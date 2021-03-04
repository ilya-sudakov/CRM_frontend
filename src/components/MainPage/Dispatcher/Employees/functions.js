import {
  formatDateString,
  getEmployeeNameText,
} from 'Utils/functions.jsx';
import {
  createPDF,
  getPDFTitleObject,
  getInputElementTextPDF,
  defaultStylesPDF,
} from 'Utils/pdfFunctions.js';

export const filterEmployeesBySearchQuery = (data, searchQuery) => {
  const query = searchQuery.toLowerCase();
  return data.filter((item) => {
    if (item.name === null) return false;
    const isFound =
      item.lastName.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.middleName.toLowerCase().includes(query) ||
      item.id.toString().includes(query) ||
      (item.yearOfBirth && item.yearOfBirth.toString().includes(query)) ||
      (item.dateOfBirth && item.dateOfBirth.toString().includes(query)) ||
      item.citizenship.toLowerCase().includes(query) ||
      item.workshop.toLowerCase().includes(query) ||
      item.position.toLowerCase().includes(query) ||
      item.comment.toLowerCase().includes(query) ||
      item.relevance.toLowerCase().includes(query);
    return isFound;
  });
};

const getEmployeesTablePDF = (employeeInfo) => {
  return {
    table: {
      widths: ['*', 70, 80, 120, 100],
      body: [
        [
          { text: 'ФИО', style: 'tableHeader' },
          { text: 'Дата рождения', style: 'tableHeader' },
          { text: 'Гражданство', style: 'tableHeader' },
          { text: 'Должность', style: 'tableHeader' },
          { text: '', style: 'tableHeader' },
        ],
        ...employeeInfo,
      ],
    },
  };
};

export const getEmployeesByWorkshopListPdfText = (employees = [], workshop) => {
  let employeesList = [],
    employeeInfo = [];
  employees.map((item) => {
    employeeInfo.push([
      getEmployeeNameText(item),
      formatDateString(item.yearOfBirth),
      item.citizenship,
      item.position,
      '',
    ]);
  });
  employeesList.push(getEmployeesTablePDF(employeeInfo));
  const dd = {
    info: {
      title: `Список сотрудников - ${workshop}`,
    },
    content: [
      getPDFTitleObject(`Список сотрудников ${workshop}\n`),
      ...employeesList,
    ],
    styles: defaultStylesPDF,
  };
  createPDF(dd);
};

export const getEmployeesListPdfText = (employees, workshops) => {
  const employeesList = [];
  workshops.map((workshop) => {
    employeesList.push(getInputElementTextPDF('Подразделение', workshop));
    let employeeInfo = [];
    employees.map((employee) => {
      if (
        (workshop === employee.workshop && employee.relevance !== 'Уволен') ||
        (workshop === 'Уволенные' && employee.relevance === 'Уволен')
      ) {
        employeeInfo.push([
          getEmployeeNameText(employee),
          formatDateString(employee.yearOfBirth),
          employee.citizenship,
          employee.position,
          '',
        ]);
      }
    });
    employeesList.push(getEmployeesTablePDF(employeeInfo));
  });
  const dd = {
    info: {
      title: 'Список сотрудников',
    },
    content: [getPDFTitleObject(`Список сотрудников`), ...employeesList],
    styles: defaultStylesPDF,
  };
  createPDF(dd);
};
