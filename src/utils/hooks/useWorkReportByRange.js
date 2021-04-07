import { useEffect, useState } from 'react';
import { formatDateString } from '../functions.jsx';
import { getRecordedWorkByDateRange } from '../RequestsAPI/WorkManaging/work_control';

const useWorkReportByRange = (datesList) => {
  const [workData, setWorkData] = useState([]);
  const [curDatesList, setCurDateList] = useState(datesList);
  const [isLoadingWorkData, setIsLoadingWorkData] = useState(true);

  const loadData = async (signal) => {
    setIsLoadingWorkData(true);
    return await getRecordedWorkByDateRange(
      datesList[0].getDate(),
      datesList[0].getMonth() + 1,
      datesList[0].getFullYear(),
      datesList[datesList.length - 1].getDate(),
      datesList[datesList.length - 1].getMonth() + 1,
      datesList[datesList.length - 1].getFullYear(),
      signal,
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
    if (formatDateString(curDatesList[0]) === formatDateString(datesList[0]))
      return;

    if (formatDateString(curDatesList[0]) !== formatDateString(datesList[0])) {
      setCurDateList(datesList);
      loadData();
    }
  }, [datesList, curDatesList]);

  return [workData, isLoadingWorkData];
};

export default useWorkReportByRange;
