import React from 'react'

const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  curPage,
  setCurPage,
  itemsCount,
  pagination,
  setPagination,
  searchQuery,
}) => {
  return (
    <div className="main-window__pagination">
      <ItemsPerPage
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      <div
        className="main-window__page-number main-window__page-number--skip"
        onClick={() => {
          if (curPage > 1) {
            const item = curPage - 1
            const lastPage = Math.floor(itemsCount / itemsPerPage)
            setCurPage(item)
            if (lastPage > 5) {
              if (pagination.indexOf(item) === 0 && item !== 1) {
                let temp = []
                for (
                  let i = pagination[0] - 1;
                  i <= lastPage &&
                  i <= pagination[pagination.length - 1] - 1;
                  i++
                ) {
                  temp.push(i)
                }
                return setPagination(temp)
              }
              if (
                pagination.indexOf(item) === pagination.length - 1 &&
                item !== lastPage
              ) {
                let temp = []
                for (
                  let i = pagination[0] + 1;
                  i <= lastPage &&
                  i <= pagination[pagination.length - 1] + 1;
                  i++
                ) {
                  temp.push(i)
                }
                return setPagination(temp)
              }
            }
          }
        }}
      >
        Пред
      </div>
      {curPage >= 5 && searchQuery === '' && (
        <>
          <div
            className="main-window__page-number"
            onClick={() => {
              const item = 1
              const lastPage = Math.floor(itemsCount / itemsPerPage)
              setCurPage(item)
              if (lastPage > 5) {
                if (pagination.indexOf(item) === 0 && item !== 1) {
                  let temp = []
                  for (
                    let i = pagination[0] - 1;
                    i <= lastPage && i <= pagination[pagination.length - 1] - 1;
                    i++
                  ) {
                    temp.push(i)
                  }
                  return setPagination(temp)
                }
                if (
                  pagination.indexOf(item) === pagination.length - 1 &&
                  item !== lastPage
                ) {
                  let temp = []
                  for (
                    let i = pagination[0] + 1;
                    i <= lastPage && i <= pagination[pagination.length - 1] + 1;
                    i++
                  ) {
                    temp.push(i)
                  }
                  return setPagination(temp)
                }
              }
            }}
          >
            1
          </div>
          <span>...</span>
        </>
      )}
      {pagination.map((item) => {
        return (
          <div
            className={
              curPage == item
                ? 'main-window__page-number main-window__page-number--active'
                : 'main-window__page-number'
            }
            onClick={() => {
              setCurPage(item)
              if (Math.floor(itemsCount / itemsPerPage) > 5) {
                if (pagination.indexOf(item) === 0 && item !== 1) {
                  let temp = []
                  for (
                    let i = pagination[0] - 1;
                    i <= Math.floor(itemsCount / itemsPerPage) &&
                    i <= pagination[pagination.length - 1] - 1;
                    i++
                  ) {
                    temp.push(i)
                  }
                  return setPagination(temp)
                }
                if (
                  pagination.indexOf(item) === pagination.length - 1 &&
                  item !== Math.ceil(itemsCount / itemsPerPage)
                ) {
                  let temp = []
                  for (
                    let i = pagination[0] + 1;
                    i <= Math.ceil(itemsCount / itemsPerPage) &&
                    i <= pagination[pagination.length - 1] + 1;
                    i++
                  ) {
                    temp.push(i)
                  }
                  return setPagination(temp)
                }
              }
            }}
          >
            {item}
            <div className="main-window__mobile-text">
              из {Math.ceil(itemsCount / itemsPerPage)}
            </div>
          </div>
        )
      })}
      {curPage <= Math.ceil(itemsCount / itemsPerPage) - 2 &&
        Math.ceil(itemsCount / itemsPerPage) > 5 &&
        pagination.find(
          (item) => item === Math.ceil(itemsCount / itemsPerPage),
        ) === undefined &&
        searchQuery === '' && (
          <>
            <span>...</span>
            <div
              className="main-window__page-number"
              onClick={() => {
                const item = Math.ceil(itemsCount / itemsPerPage)
                setCurPage(item)
                // console.log(item)
                if (item > 5) {
                  let temp = []
                  for (let i = item - 5; i <= item; i++) {
                    temp.push(i)
                  }
                  return setPagination(temp)
                }
              }}
            >
              {item}
            </div>
          </>
        )}
      <div
        className="main-window__page-number main-window__page-number--skip"
        onClick={() => {
          const maxPage = Math.ceil(itemsCount / itemsPerPage)

          if (curPage < maxPage) {
            const item = curPage + 1
            setCurPage(item)
            if (maxPage >= 5) {
              if (pagination.indexOf(item) === 0 && item !== 1) {
                let temp = []
                for (
                  let i = pagination[0] - 1;
                  i <= maxPage && i <= pagination[pagination.length - 1] - 1;
                  i++
                ) {
                  temp.push(i)
                }
                return setPagination(temp)
              }
              if (
                pagination.indexOf(item) === pagination.length - 1 &&
                item !== maxPage
              ) {
                let temp = []
                for (
                  let i = pagination[0] + 1;
                  i <= maxPage && i <= pagination[pagination.length - 1] + 1;
                  i++
                ) {
                  temp.push(i)
                }
                return setPagination(temp)
              }
            }
          }
        }}
      >
        След
      </div>
    </div>
  )
}

export default Pagination

const ItemsPerPage = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="main-window__sort-panel">
      <span>Кол-во элем. на странице: </span>
      <select
        value={itemsPerPage}
        onChange={(event) => {
          const value = event.target.value
          setItemsPerPage(value)
        }}
      >
        <option>20</option>
        <option>15</option>
        <option>10</option>
      </select>
    </div>
  )
}
