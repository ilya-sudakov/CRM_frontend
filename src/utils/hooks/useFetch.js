import { useEffect, useState } from 'react';

const useFetch = (loadFunction) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!loadFunction || status === 'fetching' || status === 'fetched') return;
    const fetchData = async () => {
      setStatus('fetching');
      loadFunction()
        .then((res) => res.json())
        .then((res) => {
          setData([...res]);
          // console.log(res)
        })
        .then(() => setStatus('fetched'))
        .catch((error) => {
          console.log(error);
          setStatus('error');
        });
    };

    fetchData();
  }, [loadFunction]);

  return { status, data };
};

export default useFetch;
