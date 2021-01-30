import React from "react";
import { useEffect, useState } from "react";
import Pagination from "../MainWindow/Pagination/Pagination.jsx";
import useQuery from "./useQuery.js";

const usePagination = (
  loadFunction,
  changableParams = [],
  type = "dynamic",
  props = {} //default values
) => {
  const { query } = useQuery();
  const [curPage, setCurPage] = useState(
    Number.parseInt(query.get("page") ?? 1)
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number.parseInt(query.get("size") ?? props.size ?? 20)
  );
  const [itemsCount, setItemsCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(
    props.sortOrder ?? {
      curSort: "date",
      date: "desc",
    }
  );

  useEffect(() => {
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

    const filterStaticData = async () => {
      const filteredData = loadFunction();
      setData(filteredData);
    };
    
    if (!loadFunction || loadFunction === null) return;
    switch (type) {
      case "dynamic":
        fetchData();
        break;
      case "static":
        filterStaticData();
        break;
      case "default":
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
