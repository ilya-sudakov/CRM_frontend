import { useEffect, useState } from 'react';
import { getStamp } from '../RequestsAPI/rigging';
import { sortByField } from '../sorting/sorting.js';

const useDraftsList = () => {
  const [drafts, setDrafts] = useState([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(true);

  const loadData = (signal) => {
    setIsLoadingDrafts(true);
    let newDrafts = [];
    getStamp(signal)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.stampParts.map((stamp) => {
            return newDrafts.push({
              ...stamp,
              value: stamp.id,
              label: `${stamp.number}, ${stamp.name}`,
              type: 'Stamp',
            });
          });
        });
        return setDrafts([
          ...sortByField(newDrafts, {
            fieldName: 'name',
            direction: 'asc',
          }),
        ]);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingDrafts(false);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadData(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { drafts, isLoadingDrafts };
};

export default useDraftsList;
