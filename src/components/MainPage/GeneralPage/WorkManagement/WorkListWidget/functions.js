export const sortEmployeesObject = (employees) => {
  return employees.sort((a, b) => {
    if (a[1].lastName < b[1].lastName) {
      return -1;
    }
    if (a[1].lastName > b[1].lastName) {
      return 1;
    }
    return 0;
  });
};

export const filterEmployeesObject = (employees, workshop) => {
  return employees.filter((employee) => {
    const item = employee[1];
    if (item.workshop === workshop.name) return true;
  });
};
