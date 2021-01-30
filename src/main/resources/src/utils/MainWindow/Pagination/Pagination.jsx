import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Pagination = ({
  itemsPerPage = 20,
  setItemsPerPage,
  itemsCount = 0,
  curPage = 1,
  setCurPage,
}) => {
  const [paginationList, setPaginationList] = useState([1]);
  const history = useHistory();
  const lastPage =
    Math.ceil(itemsCount / itemsPerPage) !== 0
      ? Math.ceil(itemsCount / itemsPerPage)
      : 1;

  useEffect(() => {}, [curPage]);

  useEffect(() => {
    //initialize pagination list
    let temp = [];
    let i =
      curPage > 1
        ? (Math.ceil(itemsCount / itemsPerPage) - curPage === 1 ||
            Math.ceil(itemsCount / itemsPerPage) - curPage === 0) &&
          curPage > 4
          ? curPage - 4
          : Math.ceil(itemsCount / itemsPerPage) - curPage > 1 && curPage > 2
          ? curPage - 2
          : curPage - 1
        : curPage;
    let count = 0;
    do {
      temp.push(i);
      i++;
      count++;
    } while (i <= Math.ceil(itemsCount / itemsPerPage) && count <= 4);
    setPaginationList(temp);
  }, [itemsPerPage, itemsCount]);

  const handlePushNewURL = (name, value) => {
    const oldQuery = history.location.search;
    let query = new URLSearchParams(oldQuery);
    query.set(name, value);
    history.push({
      search: `?${query.toString()}`,
    });
  };

  const handlePrevPageClick = () => {
    if (curPage <= 1) return;
    const item = curPage - 1;
    const lastPage = Math.floor(itemsCount / itemsPerPage);
    setCurPage(item);
    handlePushNewURL("page", item);
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
    handlePushNewURL("page", item);
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
    handlePushNewURL("page", item);
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
    handlePushNewURL("page", item);
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
    handlePushNewURL("page", item);
    if (lastPage <= 5) return;
    let temp = [];
    for (let i = item; i <= lastPage && i <= 5; i++) {
      temp.push(i);
    }
    setPaginationList(temp);
  };

  return (
    <div className="main-window__pagination main-window__pagination--full">
      <ItemsPerPage
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        history={history}
      />
      <div
        className="main-window__page-number main-window__page-number--skip"
        onClick={handlePrevPageClick}
      >
        Пред
      </div>
      {paginationList.indexOf(1) === -1 && (
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
      {/* {isNextPageButtonVisible && ( */}
      {paginationList.indexOf(lastPage) === -1 && (
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

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  setItemsPerPage: PropTypes.func,
  curPage: PropTypes.number,
  setCurPage: PropTypes.func,
  itemsCount: PropTypes.number,
};

const ItemsPerPage = ({ itemsPerPage, setItemsPerPage, history }) => {
  const handlePushNewURL = (name, value) => {
    const oldQuery = history.location.search;
    let query = new URLSearchParams(oldQuery);
    query.set(name, value);
    history.push({
      search: `?${query.toString()}`,
    });
  };

  return (
    <div className="main-window__sort-panel">
      <span>Кол-во элем. на странице: </span>
      <select
        value={itemsPerPage}
        onChange={({ target }) => {
          handlePushNewURL("size", target.value);
          setItemsPerPage(target.value);
        }}
      >
        <option>20</option>
        <option>15</option>
        <option>10</option>
      </select>
    </div>
  );
};
