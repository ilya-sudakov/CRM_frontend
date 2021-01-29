import React, { useEffect, useState } from "react";

const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  curPage,
  setCurPage,
  itemsCount,
}) => {
  const [paginationList, setPaginationList] = useState([1]);

  useEffect(() => {}, [curPage]);

  useEffect(() => {
    //initialize pagination list
    let temp = [];
    let i = 1;
    do {
      temp.push(i);
      i++;
    } while (i <= Math.ceil(itemsCount / itemsPerPage) && i <= 5);
    setPaginationList(temp);
  }, [itemsCount]);

  const handlePrevPageClick = () => {
    if (curPage <= 1) return;
    const item = curPage - 1;
    const lastPage = Math.floor(itemsCount / itemsPerPage);
    setCurPage(item);
    if (lastPage <= 5) return;
    if (paginationList.indexOf(item) === 0 && item !== 1) {
      let temp = [];
      for (
        let i = paginationList[0] - 1;
        i <= lastPage && i <= paginationList[paginationList.length - 1] - 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
    if (
      paginationList.indexOf(item) === paginationList.length - 1 &&
      item !== lastPage
    ) {
      let temp = [];
      for (
        let i = paginationList[0] + 1;
        i <= lastPage && i <= paginationList[paginationList.length - 1] + 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
  };

  const handleInBetweenPageClick = (item) => {
    setCurPage(item);
    const lastPage = Math.floor(itemsCount / itemsPerPage);
    if (lastPage <= 5) return;
    if (paginationList.indexOf(item) === 0 && item !== 1) {
      let temp = [];
      for (
        let i = paginationList[0] - 1;
        i <= Math.floor(itemsCount / itemsPerPage) &&
        i <= paginationList[paginationList.length - 1] - 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
    if (
      paginationList.indexOf(item) === paginationList.length - 1 &&
      item !== Math.ceil(itemsCount / itemsPerPage)
    ) {
      let temp = [];
      for (
        let i = paginationList[0] + 1;
        i <= Math.ceil(itemsCount / itemsPerPage) &&
        i <= paginationList[paginationList.length - 1] + 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
  };

  const handleLastPageClick = () => {
    const item = Math.ceil(itemsCount / itemsPerPage);
    setCurPage(item);
    if (item <= 5) return;
    let temp = [];
    for (let i = item - 5; i <= item; i++) {
      temp.push(i);
    }
    return setPaginationList(temp);
  };

  const handleNextPageClick = () => {
    const maxPage = Math.ceil(itemsCount / itemsPerPage);
    if (curPage >= maxPage) return;
    const item = curPage + 1;
    setCurPage(item);
    if (maxPage < 5) return;
    if (paginationList.indexOf(item) === 0 && item !== 1) {
      let temp = [];
      for (
        let i = paginationList[0] - 1;
        i <= maxPage && i <= paginationList[paginationList.length - 1] - 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
    if (
      paginationList.indexOf(item) === paginationList.length - 1 &&
      item !== maxPage
    ) {
      let temp = [];
      for (
        let i = paginationList[0] + 1;
        i <= maxPage && i <= paginationList[paginationList.length - 1] + 1;
        i++
      ) {
        temp.push(i);
      }
      return setPaginationList(temp);
    }
  };

  const handleFirstPageClick = () => {
    const item = 1;
    const lastPage = Math.floor(itemsCount / itemsPerPage);
    setCurPage(item);
    if (lastPage <= 5) return;
    let temp = [];
    for (let i = item; i <= lastPage && i <= 5; i++) {
      temp.push(i);
    }
    setPaginationList(temp);
  };

  const isNextPageButtonVisible =
    curPage <= Math.ceil(itemsCount / itemsPerPage) - 2 &&
    Math.ceil(itemsCount / itemsPerPage) > 5 &&
    paginationList.find(
      (item) => item === Math.ceil(itemsCount / itemsPerPage)
    ) === undefined;

  return (
    <div className="main-window__pagination main-window__pagination--full">
      <ItemsPerPage
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      <div
        className="main-window__page-number main-window__page-number--skip"
        onClick={handlePrevPageClick}
      >
        Пред
      </div>

      {curPage >= 5 && (
        <>
          <div
            className="main-window__page-number"
            onClick={handleFirstPageClick}
          >
            1
          </div>
          <span>...</span>
        </>
      )}
      {paginationList.map((item) => {
        return (
          <div
            className={
              curPage == item
                ? "main-window__page-number main-window__page-number--active"
                : "main-window__page-number"
            }
            onClick={() => handleInBetweenPageClick(item)}
          >
            {item}
            <div className="main-window__mobile-text">
              из {Math.ceil(itemsCount / itemsPerPage)}
            </div>
          </div>
        );
      })}
      {isNextPageButtonVisible && (
        <>
          <span>...</span>
          <div
            className="main-window__page-number"
            onClick={handleLastPageClick}
          >
            {Math.ceil(itemsCount / itemsPerPage)}
          </div>
        </>
      )}
      <div
        className="main-window__page-number main-window__page-number--skip"
        onClick={handleNextPageClick}
      >
        След
      </div>
    </div>
  );
};

export default Pagination;

const ItemsPerPage = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="main-window__sort-panel">
      <span>Кол-во элем. на странице: </span>
      <select
        value={itemsPerPage}
        onChange={({ target }) => setItemsPerPage(target.value)}
      >
        <option>20</option>
        <option>15</option>
        <option>10</option>
      </select>
    </div>
  );
};
