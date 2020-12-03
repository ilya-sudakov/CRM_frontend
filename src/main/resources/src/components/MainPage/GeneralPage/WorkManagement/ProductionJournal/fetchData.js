import { getWork } from "../../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx";
import { getEmployees } from "../../../../../utils/RequestsAPI/Employees.jsx";
import { getStamp } from "../../../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import { getPressForm } from "../../../../../utils/RequestsAPI/Rigging/PressForm.jsx";
import { getMachine } from "../../../../../utils/RequestsAPI/Rigging/Machine.jsx";
import { getParts } from "../../../../../utils/RequestsAPI/Parts.jsx";

export const loadWorkItems = async (signal, setIsLoading, setWorks) => {
  setIsLoading(true);
  return getWork(signal)
    .then((res) => res.json())
    .then((res) => {
      return setWorks(
        res
          .sort((a, b) => {
            if (a.work < b.work) {
              return -1;
            }
            if (a.work > b.work) {
              return 1;
            }
            return 0;
          })
          .map((work) => {
            return {
              // work.work, work.id, work.typeOfWork
              value: work.id,
              label: work.work,
              typeOfWork: work.typeOfWork,
            };
          })
      );
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

export const loadEmployees = async (
  signal,
  setIsLoading,
  setEmployees,
  setWorkTimeInputs,
  worktimeInputs,
  workshops
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
                item.workshop === workshop[0] && item.relevance !== "Уволен"
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
        })
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
