import { useContext, useEffect, useState } from "react";
import UserContext from "../../App.js";
import { loadEmployees } from "../../components/MainPage/GeneralPage/WorkManagement/ProductionJournal/fetchData.js";
import {
  combineOriginalAndNewWorks,
  combineWorksForSamePeople,
} from "../../components/MainPage/GeneralPage/WorkManagement/ProductionJournal/helpers.js";
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

  useEffect(() => {
    const abortController = new AbortController();
    let employees = [];

    loadEmployees(
      abortController.signal,
      setIsLoading,
      setEmployees,
      setWorkTimeInputs,
      worktimeInputs,
      workshops
    )
      .then((res) => {
        employees = res;
        setIsLoading(true);
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
          employees,
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
  }, []);

  return { worktimeInputs, setWorkTimeInputs, isLoading };
};

export default useWorkReport;
