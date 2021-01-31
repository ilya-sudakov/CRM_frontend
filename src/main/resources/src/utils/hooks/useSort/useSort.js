import React from "react";
import { useEffect, useState } from "react";
import useQuery from "../useQuery.js";

const useSort = (
  props = {}, //default values
  changableParams = []
) => {
  const [sortOrder, setSortOrder] = useState(
    props.sortOrder ?? {
      curSort: "date",
      date: "desc",
    }
  );

  const changeSortOrder = (event) => {
    const name = event.target.value.split(" ")[0];
    const order = event.target.value.split(" ")[1];
    return Object.assign({
      curSort: name,
      [name]: order,
    });
  };

  useEffect(() => {}, [...changableParams]);

  const defaultOptions = [
    { value: "date desc", text: "По дате (убыв.)" },
    { value: "date asc", text: "По дате (возр.)" },
  ];

  const sortPanel = (
    <div className="main-window__sort-panel">
      <select className="main-window__select" onChange={changeSortOrder}>
        {(props.sortOptions ?? defaultOptions).map((item) => (
          <option value={item.value}>{item.text}</option>
        ))}
      </select>
    </div>
  );

  return {
    sortOrder,
    setSortOrder,
    sortPanel,
    changeSortOrder,
  };
};

export default useSort;
