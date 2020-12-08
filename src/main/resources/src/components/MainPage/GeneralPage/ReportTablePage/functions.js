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
