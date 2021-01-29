import { useEffect, useState } from "react";

const usePagination = (
  loadFunction,
  changableParams = [],
  type = "dynamic"
) => {
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [itemsCount, setItemsCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState({
    curSort: "date",
    date: "desc",
  });

  useEffect(() => {
    if (!loadFunction) return;
    const fetchData = async () => {
      setIsLoading(true);
      return loadFunction()
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          const { content, totalElements } = res;
          setItemsCount(totalElements);
          setData(content);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };

    const filterStaticData = () => {
      const filteredData = loadFunction();
      setData(filteredData);
    };

    switch (type) {
      case "dynamic":
        fetchData();
      case "static":
        filterStaticData();
      case "default":
        filterStaticData();
    }
  }, [...changableParams, itemsPerPage, curPage, sortOrder]);

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
  };
};

export default usePagination;
