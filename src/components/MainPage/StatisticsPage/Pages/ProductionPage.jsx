import React, { useEffect, useState } from 'react';
import useDraftsList from '../../../../utils/hooks/useDraftsList';
import { getRecordedWorkByDateRange } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import RiggingItemsQuantityForType from '../Graphs/RiggingItemsQuantityForType.jsx';

const ProductionPage = ({ curDate }) => {
  const { drafts, isLoadingDrafts } = useDraftsList();

  const [workData, setWorkData] = useState([]);

  const getDataForTwoWeeks = (signal) => {
    let curMonday = curDate;
    let prevMonday = curDate;

    prevMonday = new Date(
      prevMonday.setDate(
        prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7) - 7,
      ),
    );
    getRecordedWorkByDateRange(
      prevMonday.getDate(),
      prevMonday.getMonth() + 1,
      prevMonday.getFullYear(),
      curMonday.getDate(),
      curMonday.getMonth() + 1,
      curMonday.getFullYear(),
      signal,
    )
      .then((res) => res.json())
      .then((res) => {
        setWorkData([...res]);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    getDataForTwoWeeks(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [curDate]);

  return (
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        {/* <ProductQuantityProduced data={workData} curDate={curDate} />
          <AverageProductQuantityProduced data={workData} curDate={curDate} /> */}
      </div>
      <div className="statistics__row">
        <RiggingItemsQuantityForType data={drafts} />
      </div>
    </div>
  );
};

export default ProductionPage;
