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

export const getMonthDates = (curDate) => {
  const date =
    new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate() + 1;
  //Получаем массив с датами месяца
  let dates = [];
  for (let i = 1; i < date; i++) dates.push(i);

  return dates;
};
