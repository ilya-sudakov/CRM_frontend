export const sortEmployees = (employees) => {
  return employees.sort((a, b) => {
    a = a[1];
    b = b[1];
    if (a.employee.lastName < b.employee.lastName) {
      return -1;
    }
    if (a.employee.lastName > b.employee.lastName) {
      return 1;
    }
    return 0;
  });
};

export const areWorkshopItemsMinimized = (workshopItems) => {
  return Object.values(workshopItems)[0]?.isMinimized;
}; 

export const combineOriginalAndNewWorks = (
  works,
  employees,
  setIsLoading,
  workshops,
  setWorkTimeInputs,
  worktimeInputs
) => {
  setIsLoading(true);
  let newWorkshops = {};
  Object.entries(workshops).map((workshop) => {
    let newWorkshopValues = {};
    const curWorkshopEmployees = Object.entries(employees[workshop[1]]);
    curWorkshopEmployees.map((employee) => {
      // console.log(employee[0])
      if (works[employee[0]] !== undefined) {
        return (newWorkshopValues = {
          ...newWorkshopValues,
          [employee[0]]: {
            ...employee[1],
            originalWorks: works[employee[0]].works,
            works: works[employee[0]].works,
          },
        });
      }
      return (newWorkshopValues = {
        ...newWorkshopValues,
        [employee[0]]: {
          ...employee[1],
          works: employees[workshop[1]][employee[0]].works,
        },
      });
    });
    return (newWorkshops = {
      ...newWorkshops,
      [workshop[1]]: newWorkshopValues,
    });
  });
  setIsLoading(false);
  return setWorkTimeInputs({
    ...worktimeInputs,
    ...newWorkshops,
  });
};

export const combineWorksForSamePeople = (
  works,
  setEmployeesMap,
  setIsLoading
) => {
  // let newEmployeesWorkMap = [];
  let newEmployeesMap = {};
  return Promise.all(
    works.map((work) => {
      const { id } = work.employee;
      const workList = {
        workId: work.workList.id,
        workType: work.workList.typeOfWork,
        workName: work.workList.work,
      };
      if (newEmployeesMap[id] !== undefined) {
        return (newEmployeesMap = Object.assign({
          ...newEmployeesMap,
          [id]: {
            ...newEmployeesMap[id],
            works: [
              ...newEmployeesMap[id].works,
              {
                ...work,
                ...workList,
                isOld: true,
                product: work.workControlProduct.map((product) => {
                  return {
                    ...product,
                    name: product.product.name,
                    status: product.product.status,
                  };
                }),
                draft: work.partsWorks,
              },
            ],
          },
        }));
      } else {
        return (newEmployeesMap = Object.assign({
          ...newEmployeesMap,
          [id]: {
            employee: work.employee,
            works: [
              {
                ...work,
                ...workList,
                isOld: true,
                product: work.workControlProduct.map((product) => {
                  return {
                    ...product,
                    name: product.product.name,
                    status: product.product.status,
                  };
                }),
                draft: work.partsWorks,
              },
            ],
          },
        }));
      }
    })
  )
    .then(() => {
      setEmployeesMap(newEmployeesMap);
      return newEmployeesMap;
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};
