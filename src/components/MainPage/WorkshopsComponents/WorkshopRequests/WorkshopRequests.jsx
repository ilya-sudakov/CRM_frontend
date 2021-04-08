import { useState, useEffect } from 'react';
import './WorkshopRequests.scss';
import 'Utils/MainWindow/MainWindow.scss';
import PrintIcon from 'Assets/print.png';
import TableView from '../TableView/TableView.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import Button from 'Utils/Form/Button/Button.jsx';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import {
  getRequestsByWorkshop,
  transferRequest,
  getRequests,
} from 'API/requests';
import {
  getQuantityOfProductsFromRequests,
  getDatesFromRequests,
} from 'Utils/functions.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { pages, requstsSortOptions } from '../objects.js';
import chevronDown from 'Assets/tableview/chevron-down.svg';
import useSort from 'Utils/hooks/useSort/useSort.js';
import useTitleHeader from 'Utils/hooks/uiComponents/useTitleHeader';
import { sortByField } from 'Utils/sorting/sorting';
import { requestStatuses, workshops } from '../workshopVariables.js';
import {
  copySelectedRequest,
  deleteItem,
  filterRequestsByPage,
  filterRequestsBySearchQuery,
  filterRequestsByStatuses,
  getPageByRequest,
  printRequestsList,
} from '../functions.js';
import useFormWindow from 'Utils/hooks/useFormWindow';

const WorkshopRequests = (props) => {
  const [requests, setRequests] = useState([]);
  const [dates, setDates] = useState([]);
  const [productsQuantities, setProductsQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(props.type === 'requests');
  const [toWorkshop, setToWorkshop] = useState('lemz'); //Название цеха для переноса заявки
  const [requestId, setRequestId] = useState(0);

  const handleTransferRequest = () => {
    setIsLoading(true);
    const request = requests.find((item) => item.id === requestId);
    transferRequest(request.id, toWorkshop)
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
        setShowWindow(false);
        props.history.push(
          `/${toWorkshop}/workshop-${toWorkshop}/${getPageByRequest(request)}#${
            request.id
          }`,
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert('Ошибка при копировании записи');
        setIsLoading(false);
      });
  };

  const { formWindow, showWindow, setShowWindow } = useFormWindow(
    'Перенос заявки в план производства',
    <>
      <div className="main-form">
        <div className="main-form__form">
          <div className="main-form__item">
            <div className="main-form__input_name">Подразделение</div>
            <div className="main-form__input_field">
              <select
                name="workshop"
                onChange={({ target }) => setToWorkshop(target.value)}
              >
                <option value="lemz">ЦехЛЭМЗ</option>
                <option value="lepsari">ЦехЛепсари</option>
              </select>
            </div>
          </div>
          <div className="main-form__buttons main-form__buttons--full">
            <Button
              className="main-form__submit"
              isLoading={isLoading}
              onClick={handleTransferRequest}
              text="Перенести в цех"
            />
          </div>
        </div>
      </div>
    </>,
    [],
  );
  const { sortOrder, sortPanel } = useSort([], {
    ignoreURL: false,
    sortOrder: {
      curSort: 'date',
      date: 'desc',
    },
    sortOptions: requstsSortOptions,
  });
  const [workshopsFilter, setWorkshopsFilter] = useState([
    {
      filter: ['lemz', 'lepsari', null, 'requests'],
      fullName: 'Все',
      visible: true,
    },
    { filter: ['lemz'], fullName: 'ЦехЛЭМЗ', visible: false },
    { filter: ['lepsari'], fullName: 'ЦехЛепсари', visible: false },
    { filter: [null, 'requests'], fullName: 'Не перенесенные', visible: false },
  ]);

  //Перенести заявку
  const transferRequestId = (id) => {
    setRequestId(id);
    setShowWindow(!showWindow);
  };

  useEffect(() => {
    document.title = `Заявки - ${workshops[props.type].fullName}`;
    const abortController = new AbortController();
    loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadRequests = (signal) => {
    setIsLoading(true);
    return (props.type === 'requests'
      ? getRequests(signal)
      : getRequestsByWorkshop(props.type, signal)
    )
      .then((res) => res.json())
      .then((requests) => {
        setRequests(requests);
        setProductsQuantities(getQuantityOfProductsFromRequests(requests));
        setDates(getDatesFromRequests(requests));
        setIsLoading(false);
        return;
      });
  };

  //Статусы заявок
  const [statuses, setStatuses] = useState(
    requestStatuses.map((status) => ({ ...status, visible: false })),
  );

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => item.factory === props.type);
  };

  const filterRequests = (requests) => {
    return filterRequestsBySearchQuery(
      filterRequestsByStatuses(
        filterRequestsByPage(
          props.type === 'requests'
            ? requests
            : filterRequestsByWorkshop(requests),
          pages[curPage].name,
        ),
        statuses,
      ),
      searchQuery,
    );
  };

  const getCategoriesCount = (category) => {
    return filterRequestsByPage(
      props.type === 'requests' ? requests : filterRequestsByWorkshop(requests),
      category,
    ).length;
  };

  const pageNameInURL = props.location.pathname.split(
    `${workshops[props.type].redirectURL}/`,
  )[1];
  const menuItems = [
    {
      pageName: 'open',
      pageTitle: 'Открытые',
      count: getCategoriesCount('Открытые'),
      link: `${workshops[props.type].redirectURL}/open`,
    },
    {
      pageName: 'shipped',
      pageTitle: 'Отгружено',
      count: getCategoriesCount('Отгружено'),
      link: `${workshops[props.type].redirectURL}/shipped`,
    },
    {
      pageName: 'completed',
      pageTitle: 'Завершено',
      link: `${workshops[props.type].redirectURL}/completed`,
    },
  ];
  const { curPage, titleHeader } = useTitleHeader(
    props.type === 'requests' ? 'Заявки' : undefined,
    menuItems,
    pages[pageNameInURL] !== undefined ? pageNameInURL : 'open',
  );

  const handleItemClick = (array, setArray, item, index) => {
    let temp = array.map((item) => {
      return {
        ...item,
        visible: false,
      };
    });
    temp.splice(index, 1, {
      ...item,
      visible: !item.visible,
    });
    setArray([...temp]);
  };

  return (
    <div className="workshop-requests">
      <div className="main-window">
        <FloatingPlus
          onClick={() => setIsMinimized(!isMinimized)}
          iconSrc={chevronDown}
          title="Свернуть заявки"
          visibility={['ROLE_ADMIN', 'ROLE_WORKSHOP']}
          iconStyles={{ transform: isMinimized ? 'rotate(180deg)' : '' }}
        />
        {props.type === 'requests' ? titleHeader : null}
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        {props.type !== 'requests' ? titleHeader : null}
        {props.type === 'requests' && formWindow}
        <ControlPanel
          itemsCount={`Всего: ${requests.length} записей`}
          buttons={
            <Button
              text="Печать списка"
              isLoading={isLoading}
              imgSrc={PrintIcon}
              inverted
              className="main-window__button main-window__button--inverted"
              onClick={() =>
                printRequestsList(
                  setIsLoading,
                  productsQuantities,
                  workshops[props.type].fullName,
                )
              }
            />
          }
          content={
            <>
              <div className="main-window__status-panel">
                <div>Фильтр по статусам: </div>
                {statuses.map((status, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        (status.visible
                          ? 'main-window__button'
                          : 'main-window__button main-window__button--inverted') +
                        ' main-window__list-item--' +
                        status.className
                      }
                      onClick={() =>
                        handleItemClick(statuses, setStatuses, status, index)
                      }
                    >
                      {status.name}
                    </div>
                  );
                })}
              </div>
              {props.type === 'requests' && (
                <div
                  className="main-window__filter-pick"
                  style={{ marginTop: '10px' }}
                >
                  <div>Фильтр по цехам: </div>
                  {workshopsFilter.map((workshop, index) => {
                    return (
                      <div
                        key={index}
                        className={`main-window__button ${
                          workshop.visible
                            ? ''
                            : 'main-window__button--inverted'
                        }`}
                        onClick={() =>
                          handleItemClick(
                            workshopsFilter,
                            setWorkshopsFilter,
                            workshop,
                            index,
                          )
                        }
                      >
                        {workshop.fullName}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          }
          sorting={sortPanel}
        />
        <TableView
          data={filterRequests(requests)}
          workshopName={props.type}
          isLoading={isLoading}
          sortOrder={sortOrder}
          loadData={loadRequests}
          isMinimized={isMinimized}
          dates={sortByField(dates, {
            fieldName: sortOrder.curSort,
            direction: sortOrder[sortOrder.curSort],
          })}
          searchQuery={searchQuery}
          deleteItem={(id) => deleteItem(id, loadRequests)}
          transferRequest={transferRequestId}
          copyRequest={(id) =>
            copySelectedRequest(id, requests, setIsLoading, loadRequests)
          }
        />
      </div>
    </div>
  );
};

export default WorkshopRequests;
