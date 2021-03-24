import { useEffect, useState } from 'react';
import { getRequests } from 'Utils/RequestsAPI/Requests.jsx';

const useRequestsData = (shouldExecute = true) => {
  const [requests, setRequests] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  const loadData = () => {
    setIsLoadingRequests(true);
    getRequests()
      .then((res) => res.json())
      .then((res) => {
        setRequests(res);
        setIsLoadingRequests(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingRequests(false);
      });
  };

  useEffect(() => {
    if (!shouldExecute) return;
    const abortController = new AbortController();
    loadData(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return { requests, isLoadingRequests, setRequests };
};

export default useRequestsData;
