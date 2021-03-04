import { getEmployees } from 'Utils/RequestsAPI/Employees.jsx';

export const loadEmployees = async (
  signal,
  setIsLoading,
  setEmployees,
  setWorkTimeInputs,
  worktimeInputs,
  workshops,
) => {
  setIsLoading(true);
  return await getEmployees(signal)
    .then((res) => res.json())
    .then((res) => {
      setEmployees(res);
      let newWorkshopEmployees = {};
      return Promise.all(
        Object.entries(workshops).map((workshop) => {
          let filteredEmployees = {};
          res
            .filter(
              (item) =>
                item.workshop === workshop[0] && item.relevance !== 'Уволен',
            )
            .map((employee) => {
              // console.log(employee)
              return (filteredEmployees = {
                ...filteredEmployees,
                [employee.id]: {
                  isMinimized: false,
                  employee: employee,
                  works: [
                    //uncomment to get one work as a default
                    // {
                    //   isOld: false,
                    //   product: [],
                    //   draft: [],
                    //   workName: '',
                    //   workType: '',
                    //   workId: null,
                    //   hours: 0,
                    //   comment: '',
                    // },
                  ],
                  originalWorks: [],
                  totalHours: 0,
                },
              });
            });
          return (newWorkshopEmployees = {
            ...newWorkshopEmployees,
            [workshop[1]]: filteredEmployees,
          });
        }),
      ).then(() => {
        setWorkTimeInputs({
          ...worktimeInputs,
          ...newWorkshopEmployees,
        });
        return newWorkshopEmployees;
      });
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
      return setIsLoading(false);
    });
};
