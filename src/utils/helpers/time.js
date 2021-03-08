export const getPreviousQuarterDates = (date, value) => {
  let today = date;
  const quarter = Math.floor(today.getMonth() / 3);
  let startDate;
  let endDate;

  switch (value) {
    case 'current':
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

export const getPreviousMonthDates = (date, value) => {
  let today = date;
  const month = today.getMonth();
  let startDate;
  let endDate;

  switch (value) {
    case 'current':
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

export const getDaysArray = (start, end) => {
  let arr = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
