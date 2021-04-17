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

export const getRequestQuantityStats = (requests, currDate, prevData) => {
  let curMonthQuantity = 0;
  let prevMonthQuantity = 0;
  //check prev period
  let temp = requests.filter((request) => {
    const date = new Date(request.date);
    if (checkIfDateIsInRange(date, prevData.startDate, prevData.endDate)) {
      prevMonthQuantity++;
      return false;
    }
    return true;
  });
  //check cur period
  const filteredRequests = temp.filter((request) => {
    const date = new Date(request.date);
    if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
      curMonthQuantity++;
      return true;
    }
    return false;
  });

  return [prevMonthQuantity, curMonthQuantity, filteredRequests];
};

export const getRequestIncomeStats = (requests, currDate, prevData) => {
  let curMonthIncome = 0;
  let prevMonthIncome = 0;
  //check prev period
  let temp = requests.filter((request) => {
    const date = new Date(request.shippingDate);
    if (
      request.status === 'Завершено' &&
      checkIfDateIsInRange(date, prevData.startDate, prevData.endDate)
    ) {
      prevMonthIncome += Number.parseFloat(request.sum);
      return false;
    }
    return true;
  });
  //check cur period
  const filteredRequests = temp.filter((request) => {
    const date = new Date(request.shippingDate);
    if (
      request.status === 'Завершено' &&
      checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)
    ) {
      curMonthIncome += Number.parseFloat(request.sum);
      return true;
    }
    return false;
  });

  return [prevMonthIncome, curMonthIncome, filteredRequests];
};

export const getDifferenceInPercentages = (prevData, curData) => {
  return (
    Math.ceil(
      ((curData - prevData) / (prevData === 0 ? 1 : prevData)) * 100 * 100,
    ) / 100
  );
};
