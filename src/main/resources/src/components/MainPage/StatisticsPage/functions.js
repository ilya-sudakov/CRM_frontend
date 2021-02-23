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

export const getPreviousWeekDays = (date, value) => {
  let week = [];
  let curDate = new Date();

  switch (value) {
    case "current":
      curDate = new Date(date);
      break;
    default:
      curDate = new Date(
        new Date(date).setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      break;
  }

  for (let i = 1; i <= 7; i++) {
    const first = curDate.getDate() - curDate.getDay() + i;
    const day = new Date(curDate.setDate(first));
    week.push(day);
  }

  // console.log(curDate, week)
  const startDate = week[0];
  const endDate = week[6];
  return { startDate, endDate, week };
};

export const getPreviousQuarterDates = (date, value) => {
  let today = date;
  const quarter = Math.floor(today.getMonth() / 3);
  let startDate;
  let endDate;

  switch (value) {
    case "current":
      startDate = new Date(today.getFullYear(), quarter * 3, 1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
      break;
    default:
      startDate = new Date(today.getFullYear(), quarter * 3 - 3, 1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
      break;
  }

  return {
    startDate,
    endDate,
  };
};

export const getPreviousYearDates = (date, value) => {
  let today = date;
  let startDate;
  let endDate;

  switch (value) {
    case "current":
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(startDate.getFullYear() + 1, 0, 0);
      break;
    default:
      startDate = new Date(today.getFullYear() - 1, 0, 1);
      endDate = new Date(startDate.getFullYear() + 1, 0, 0);
      break;
  }

  return {
    startDate,
    endDate,
  };
};

export const checkRequestsForSelectedMonth = (requests, selectedDate) => {
  return requests.filter((request) => {
    const date = new Date(request.date);
    if (
      checkIfDateIsInRange(
        date,
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
      ) &&
      request.status === "Завершено"
    ) {
      return true;
    }
    return false;
  });
};
