import { useEffect, useState } from 'react';
import useQuery from '../useQuery.js';
import { sortByField } from '../../sorting/sorting.js';

const useSort = (
  data = [],
  props = {
    //default values
    ignoreURL: false,
  },
  changableParams = [],
) => {
  const { query, pushParamToURL } = useQuery();
  const [sortedData, setSortedData] = useState(data);
  const sortParamInURL = query.get('sort')
    ? {
        curSort: query.get('sort').split(',')[0],
        date: query.get('sort').split(',')[1],
      }
    : null;

  const defaultSort = {
    curSort: 'date',
    date: 'desc',
  };

  const [sortOrder, setSortOrder] = useState(
    props.sortOrder ??
      (props.ignoreURL ? defaultSort : sortParamInURL ?? defaultSort),
  );

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0];
    const order = event.target.value.split(' ')[1];
    pushParamToURL('sort', `${name},${order}`, props.ignoreURL);
    setSortOrder({
      curSort: name,
      [name]: order,
    });
  };

  const defaultOptions = [
    { value: 'date desc', text: 'По дате (убыв.)' },
    { value: 'date asc', text: 'По дате (возр.)' },
  ];

  const sortPanel = (
    <div className="main-window__sort-panel">
      <select
        className="main-window__select"
        onChange={changeSortOrder}
        value={`${sortOrder.curSort} ${sortOrder[sortOrder.curSort]}`}
      >
        {(props.sortOptions ?? defaultOptions).map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );

  useEffect(() => {
    const newData = sortByField(data, {
      fieldName: sortOrder.curSort,
      direction: sortOrder[sortOrder.curSort],
    });
    setSortedData([...newData]);
  }, [...changableParams, sortOrder]);

  return {
    sortedData,
    sortOrder,
    setSortOrder,
    sortPanel,
    changeSortOrder,
  };
};

export default useSort;
