import font from "pdfmake/build/vfs_fonts.js";
import pdfMake from "pdfmake";
import { formatDateString, getEmployeeNameText } from "./functions.jsx";
import { sortByField } from "./sorting/sorting.js";

export const defaultStylesPDF = {
  header: {
    fontSize: 20,
    bold: true,
  },
  title: {
    fontSize: 22,
    bold: true,
  },
  subheader: {
    fontSize: 16,
  },
  regularText: {
    fontSize: 11,
    alignment: "left",
  },
  tableHeader: {
    fontSize: 12,
    bold: true,
    alignment: "left",
  },
};

export const createPDF = (data) => {
  pdfMake.vfs = font.pdfMake.vfs;
  return pdfMake.createPdf(data).print();
};

const getInputElementTextPDF = (title, value) => {
  return {
    text: [
      {
        text: `\n${title}: \n`,
        style: "regularText",
        fontSize: 12,
      },
      {
        text: `${value}\n\n`,
        style: "subheader",
      },
    ],
  };
};

export const getTransportationListPdfText = (transportation) => {
  const transportationList = [];
  let transportationInfo = [];
  transportation.map((item) => {
    return transportationInfo.push([
      { text: formatDateString(item.date), style: "regularText" },
      { text: item.cargo, style: "regularText" },
      { text: item.quantity, style: "regularText" },
      { text: item.sender, style: "regularText" },
      { text: item.recipient, style: "regularText" },
      { text: item.driver, style: "regularText" },
    ]);
  });
  transportationList.push({
    table: {
      widths: [60, 140, 40, 80, 80, "*"],
      body: [
        [
          { text: "Дата", style: "tableHeader" },
          { text: "Товар", style: "tableHeader" },
          { text: "Кол-во", style: "tableHeader" },
          { text: "Откуда", style: "tableHeader" },
          { text: "Куда", style: "tableHeader" },
          { text: "Водитель", style: "tableHeader" },
        ],
        ...transportationInfo,
      ],
    },
  });
  var dd = {
    info: {
      title: "Реестр транспортировок",
    },
    content: [
      {
        text: "Реестр транспортировок\n",
        alignment: "center",
        style: "title",
        margin: [0, 0, 0, 10],
      },
      ...transportationList,
    ],
    styles: defaultStylesPDF,
  };
  pdfMake.vfs = font.pdfMake.vfs;
  return dd;
};

export const getRequestPdfText = (
  date,
  requestProducts,
  codeWord,
  workshopName,
  itemId
) => {
  let productsArr = sortByField(requestProducts, {
    fieldName: "name",
    direction: "asc",
  }).map((item) => {
    return [item.name, item.quantity, item.packaging, "", ""];
  });
  var dd = {
    info: {
      title: "Очередь производства №" + itemId,
    },
    content: [
      {
        text: "Очередь производства  №" + itemId + "\n",
        alignment: "center",
        style: "header",
      },
      workshopName
        ? getInputElementTextPDF("Подразделение", workshopName)
        : "\n",
      getInputElementTextPDF("Дата", formatDateString(date)),
      {
        text: "Продукция: ",
        style: "regularText",
        fontSize: 12,
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          widths: ["*", 70, 70, 70, 70],
          body: [
            [
              { text: "Название", style: "tableHeader" },
              { text: "Кол-во", style: "tableHeader" },
              { text: "Фасовка", style: "tableHeader" },
              { text: "", style: "tableHeader" },
              { text: "", style: "tableHeader" },
            ],
            ...productsArr,
          ],
        },
      },
      "\n",
      getInputElementTextPDF("Кодовое слово", codeWord),
    ],
    styles: defaultStylesPDF,
  };
  createPDF(dd);
};

const sortRequestProducts = (data) => {
  return data.sort((a, b) => {
    if (
      a[0].localeCompare(b[0], undefined, {
        numeric: true,
      }) < 0
    ) {
      return -1;
    }
    if (
      a[0].localeCompare(b[0], undefined, {
        numeric: true,
      }) > 0
    ) {
      return 1;
    }
    return 0;
  });
};

export const getProductsFromRequestsListPdfText = (products, workshopName) => {
  const formatProducts = (products) => [
    {
      table: {
        margin: [0, 5, 0, 5],
        widths: ["*", 100, 80, 80],
        body: [
          [
            { text: "Название", style: "tableHeader" },
            { text: "Кол-во", style: "tableHeader" },
            { text: "", style: "tableHeader" },
            { text: "", style: "tableHeader" },
          ],
          ...sortRequestProducts(Object.entries(products)).map((product) => {
            return [product[0], product[1], "", ""];
          }),
        ],
      },
    },
  ];
  const dd = {
    info: {
      title: "Очередь производства - список",
    },
    content: [
      {
        text: "Очередь производства - список\n",
        alignment: "center",
        style: "title",
      },
      workshopName
        ? getInputElementTextPDF("Подразделение", workshopName)
        : "\n",
      sortRequestProducts(Object.entries(products)).map((category) => {
        if (Object.values(category[1]).length > 0) {
          return [
            {
              text: [
                {
                  text: `${category[0]} \n`,
                  fontSize: 12,
                  style: "regularText",
                  margin: [5, 5, 5, 5],
                },
              ],
            },
            ...formatProducts(category[1]),
            "\n",
          ];
        }
      }),
    ],
    styles: defaultStylesPDF,
  };
  createPDF(dd);
};

export const getEmployeesListPdfText = (employees, workshops) => {
  const employeesList = [];
  workshops.map((workshop) => {
    employeesList.push(getInputElementTextPDF("Подразделение", workshop));
    let employeeInfo = [];
    employees.map((employee) => {
      if (
        (workshop === employee.workshop && employee.relevance !== "Уволен") ||
        (workshop === "Уволенные" && employee.relevance === "Уволен")
      ) {
        employeeInfo.push([
          getEmployeeNameText(employee),
          formatDateString(employee.yearOfBirth),
          employee.citizenship,
          employee.position,
          "",
        ]);
      }
    });
    employeesList.push({
      table: {
        widths: ["*", 70, 80, 120, 100],
        body: [
          [
            { text: "ФИО", style: "tableHeader" },
            { text: "Дата рождения", style: "tableHeader" },
            { text: "Гражданство", style: "tableHeader" },
            { text: "Должность", style: "tableHeader" },
            { text: "", style: "tableHeader" },
          ],
          ...employeeInfo,
        ],
      },
    });
  });
  var dd = {
    info: {
      title: "Список сотрудников",
    },
    content: [
      {
        text: "Список сотрудников\n",
        alignment: "center",
        style: "title",
      },
      ...employeesList,
    ],
    styles: defaultStylesPDF,
  };
  pdfMake.vfs = font.pdfMake.vfs;
  return dd;
};

export const getEmployeesByWorkshopListPdfText = (employees, workshop) => {
  const employeesList = [];
  let employeeInfo = [];
  employees.map((item) => {
    employeeInfo.push([
      getEmployeeNameText(employee),
      formatDateString(item.yearOfBirth),
      item.citizenship,
      item.position,
      "",
    ]);
  });
  employeesList.push({
    table: {
      widths: ["*", 70, 80, 120, 100],
      body: [
        [
          { text: "ФИО", style: "tableHeader" },
          { text: "Дата рождения", style: "tableHeader" },
          { text: "Гражданство", style: "tableHeader" },
          { text: "Должность", style: "tableHeader" },
          { text: "", style: "tableHeader" },
        ],
        ...employeeInfo,
      ],
    },
  });
  var dd = {
    info: {
      title: "Список сотрудников - " + workshop,
    },
    content: [
      {
        text: "Список сотрудников " + workshop + "\n\n",
        alignment: "center",
        style: "title",
      },
      ...employeesList,
    ],
    styles: defaultStylesPDF,
  };
  pdfMake.vfs = font.pdfMake.vfs;
  return dd;
};
