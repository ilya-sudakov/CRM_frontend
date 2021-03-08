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
    case 'current':
      curDate = new Date(date);
      break;
    default:
      curDate = new Date(
        new Date(date).setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000),
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

export const getPreviousYearDates = (date, value) => {
  let today = date;
  let startDate;
  let endDate;

  switch (value) {
    case 'current':
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
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
      ) &&
      request.status === 'Завершено'
    ) {
      return true;
    }
    return false;
  });
};
