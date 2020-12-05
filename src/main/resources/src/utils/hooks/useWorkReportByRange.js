import { useEffect, useState } from "react";
import { formatDateString } from "../functions.jsx";
import { getRecordedWorkByDateRange } from "../RequestsAPI/WorkManaging/WorkControl.jsx";

const useWorkReportByRange = (week) => {
  const [workData, setWorkData] = useState([]);
  const [curWeek, setCurWeek] = useState(week);
  const [isLoadingWorkData, setIsLoadingWorkData] = useState(true);

  const loadData = async (signal) => {
    setIsLoadingWorkData(true);
    return await getRecordedWorkByDateRange(
      week[0].getDate(),
      week[0].getMonth() + 1,
      week[week.length - 1].getDate(),
      week[week.length - 1].getMonth() + 1,
      signal
    )
      .then((res) => res.json())
      .then((res) => {
        setWorkData([...res]);
        setIsLoadingWorkData(false);
        return;
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingWorkData(false);
        return;
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (formatDateString(curWeek[0]) === formatDateString(week[0])) return;

    if (formatDateString(curWeek[0]) !== formatDateString(week[0])) {
      setCurWeek(week);
      loadData();
    }
  }, [week, curWeek]);

  return [workData, isLoadingWorkData];
};

export default useWorkReportByRange;
