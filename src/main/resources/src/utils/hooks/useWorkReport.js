import { useContext, useEffect, useState } from "react";
import UserContext from "../../App.js";
import { loadEmployees } from "../../components/MainPage/GeneralPage/WorkManagement/ProductionJournal/fetchData.js";
import {
  combineOriginalAndNewWorks,
  combineWorksForSamePeople,
} from "../../components/MainPage/GeneralPage/WorkManagement/ProductionJournal/helpers.js";
import { formatDateString } from "../functions.jsx";
import { getRecordedWorkByDay } from "../RequestsAPI/WorkManaging/WorkControl.jsx";

const useWorkReport = (curDay) => {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeesMap, setEmployeesMap] = useState({});
  const [worktimeInputs, setWorkTimeInputs] = useState({
    date: curDay,
    lemz: {},
    lepsari: {},
    ligovskiy: {},
    office: {},
  });

  const isLemz = userContext.userHasAccess(["ROLE_LEMZ"]);
  const ROLE_LEMZ = {
    ЦехЛЭМЗ: "lemz",
  };
  const isLepsari = userContext.userHasAccess(["ROLE_LEPSARI"]);
  const ROLE_LEPSARI = {
    ЦехЛепсари: "lepsari",
  };
  const isLigovskiy = userContext.userHasAccess(["ROLE_LIGOVSKIY"]);
  const ROLE_LIGOVSKIY = {
    ЦехЛиговский: "ligovskiy",
  };
  const isManager = userContext.userHasAccess(["ROLE_MANAGER"]);
  const ROLE_MANAGER = {
    Офис: "office",
  };
  const isAdmin =
    userContext.userHasAccess(["ROLE_ADMIN"]) ||
    userContext.userHasAccess(["ROLE_DISPATCHER"]) ||
    userContext.userHasAccess(["ROLE_ENGINEER"]);
  const ROLE_ADMIN = {
    ЦехЛЭМЗ: "lemz",
    ЦехЛепсари: "lepsari",
    ЦехЛиговский: "ligovskiy",
    Офис: "office",
  };

  const workshops = isAdmin
    ? ROLE_ADMIN
    : isLemz
    ? ROLE_LEMZ
    : isLepsari
    ? ROLE_LEPSARI
    : isLigovskiy
    ? ROLE_LIGOVSKIY
    : isManager
    ? ROLE_MANAGER
    : ROLE_ADMIN;

  const handleFetchData = async (date, signal) => {
    setIsLoading(true);
    let localEmployees = [];
    return loadEmployees(
      signal,
      setIsLoading,
      setEmployees,
      setWorkTimeInputs,
      worktimeInputs,
      workshops
    )
      .then((res) => {
        localEmployees = res;
        return getRecordedWorkByDay(
          date.getMonth() + 1,
          date.getDate(),
          date.getFullYear()
        );
      })
      .then((res) => res.json())
      .then(async (res) => {
        const combinedWorks = await combineWorksForSamePeople(
          res,
          setEmployeesMap,
          setIsLoading
        );
        return combineOriginalAndNewWorks(
          combinedWorks,
          localEmployees,
          setIsLoading,
          workshops,
          setWorkTimeInputs,
          worktimeInputs
        );
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("first render", curDay);
    const abortController = new AbortController();
    handleFetchData(curDay, abortController.signal);
  }, []);

  useEffect(() => {
    if (
      formatDateString(worktimeInputs.date) === formatDateString(curDay) ||
      employees.length === 0 ||
      isLoading
    )
      return;
    const abortController = new AbortController();
    if (formatDateString(worktimeInputs.date) !== formatDateString(curDay)) {
      setWorkTimeInputs({ ...worktimeInputs, date: curDay });
    //   setIsLoading(true);
      let localEmployees = [];
      loadEmployees(
        abortController.signal,
        setIsLoading,
        setEmployees,
        setWorkTimeInputs,
        worktimeInputs,
        workshops
      )
        .then((res) => {
          localEmployees = res;
          return getRecordedWorkByDay(
            curDay.getMonth() + 1,
            curDay.getDate(),
            curDay.getFullYear()
          );
        })
        .then((res) => res.json())
        .then(async (res) => {
          const combinedWorks = await combineWorksForSamePeople(
            res,
            setEmployeesMap,
            setIsLoading
          );
          combineOriginalAndNewWorks(
            combinedWorks,
            localEmployees,
            // setIsLoading,
            () => {},
            workshops,
            setWorkTimeInputs,
            // () => {},
            worktimeInputs
          );
        //   setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
    console.log(
      "date change1",
      curDay,
      worktimeInputs.date,
      formatDateString(worktimeInputs.date) === formatDateString(curDay),
      employees
    );
  }, [curDay, worktimeInputs.date]);

  return { employees, worktimeInputs, setWorkTimeInputs, isLoading };
};

export default useWorkReport;
