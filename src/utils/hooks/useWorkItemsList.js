import { useEffect, useState } from 'react';
import { getWork } from '../RequestsAPI/WorkManaging/WorkList.jsx';

const useWorkItemsList = () => {
  const [works, setWorks] = useState([]);
  const [isLoadingWorkItems, setIsLoadingWorkItems] = useState(true);

  const loadData = async (signal) => {
    setIsLoadingWorkItems(true);
    return getWork(signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoadingWorkItems(false);
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
            }),
        );
      })
      .catch((error) => {
        setIsLoadingWorkItems(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { works, isLoadingWorkItems };
};

export default useWorkItemsList;
