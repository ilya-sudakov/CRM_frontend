import { useEffect, useState } from 'react';
import Pagination from 'Components/MainWindow/Pagination/Pagination.jsx';
import useQuery from '../useQuery.js';

const usePagination = (
  loadFunction,
  changableParams = [],
  type = 'static',
  //default values
  props = {
    ignoreURL: false,
  },
) => {
  const { query } = useQuery();
  const [curPage, setCurPage] = useState(
    Number.parseInt(query.get('page') ?? 1),
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number.parseInt(query.get('size') ?? props.size ?? 20),
  );
  const [itemsCount, setItemsCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(
    props.sortOrder ?? {
      curSort: 'date',
      date: 'desc',
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      return loadFunction()
        .then((res) => res.json())
        .then((res) => {
          const { content, totalElements } = res;
          setItemsCount(totalElements);
          setData(content);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };

    const filterStaticData = async () => {
      let filteredData = loadFunction();
      setItemsCount(filteredData.length);
      if (filteredData.length === 0 || filteredData.length <= itemsPerPage) {
        setCurPage(1);
      } else
        setCurPage(
          Number.parseInt(props.ignoreURL ? curPage : query.get('page') ?? 1),
        );
      const firstIndex = (curPage - 1) * itemsPerPage + 1;
      const lastIndex = curPage * itemsPerPage;
      setData(filteredData.slice(firstIndex - 1, lastIndex - 1));
    };

    if (!loadFunction || loadFunction === null) return;
    switch (type) {
      case 'dynamic':
        fetchData();
        break;
      case 'static':
        filterStaticData();
        break;
      default:
        filterStaticData();
        break;
    }
  }, [...changableParams, itemsPerPage, curPage, sortOrder]);

  const pagination = (
    <Pagination
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      curPage={curPage}
      setCurPage={setCurPage}
      itemsCount={itemsCount}
      ignoreURL={props.ignoreURL}
    />
  );

  return {
    isLoading,
    data,
    sortOrder,
    setSortOrder,
    curPage,
    setCurPage,
    itemsPerPage,
    setItemsPerPage,
    itemsCount,
    pagination,
  };
};

export default usePagination;
