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

export const getAllEmployees = (works) => {
  let newEmployees = {};
  works.map((work) => {
    if (newEmployees[work.employee.id] === undefined) {
      return (newEmployees = Object.assign({
        ...newEmployees,
        [work.employee.id]: work.employee,
      }));
    }
  });
  return newEmployees;
};
