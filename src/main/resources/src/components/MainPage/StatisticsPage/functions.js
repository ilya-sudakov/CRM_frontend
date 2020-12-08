export const getDaysArray = (start, end) => {
  let arr = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const sortEmployees = (employees) => {
  return employees.sort((a, b) => {
    if (a.employee.lastName < b.employee.lastName) {
      return -1;
    }
    if (a.employee.lastName > b.employee.lastName) {
      return 1;
    }
    return 0;
  });
};

export const getPreviousMonthDates = (date, value) => {
  let today = date;
  const month = today.getMonth();
  let startDate;
  let endDate;

  switch (value) {
    case "current":
      startDate = new Date(today.getFullYear(), month, 1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      break;
    default:
      startDate = new Date(today.getFullYear(), month - 1, 1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      break;
  }

  return {
    startDate,
    endDate,
  };
};

export const checkIfDateIsInRange = (check, from, to) => {
  var firstDate, lastDate, checkDate;
  firstDate = Date.parse(from);
  lastDate = Date.parse(to);
  checkDate = Date.parse(check);

  if (checkDate <= lastDate && checkDate >= firstDate) {
    return true;
  }
  return false;
};
