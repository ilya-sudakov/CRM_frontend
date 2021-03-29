import { useState, useEffect, useContext } from 'react';
import './Clients.scss';
import 'Utils/MainWindow/MainWindow.scss';
import 'Utils/Form/Form.scss';
import { searchClients } from 'Utils/RequestsAPI/Clients.jsx';
import { Link } from 'react-router-dom';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import EditWorkHistory from './MainComponents/EditWorkHistory.jsx';
import EditNextContactDate from './MainComponents/EditContactDay.jsx';
import ClientsList from './MainComponents/ClientsList.jsx';
import UserContext from '../../../App.js';
import { changeSortOrder } from 'Utils/functions.jsx';
import { clientTypes } from './MainComponents/objects.js';
import usePagination from 'Utils/hooks/usePagination/usePagination';
import useSearchBar from 'Utils/hooks/useSearchBar';

const Clients = (props) => {
  const [clients, setClients] = useState([]);
  const [curCategory, setCurCategory] = useState('');
  const [curClientType, setCurClientType] = useState('');
  const {
    pagination,
    curPage,
    setCurPage,
    isLoading,
    itemsPerPage,
    sortOrder,
    data,
    setSortOrder,
  } = usePagination(
    curCategory !== '' ? () => loadData(curCategory, curClientType) : null,
    [curClientType, curCategory],
    'dynamic',
    {
      sortOrder: {
        curSort: 'name',
        name: 'asc',
        nextDateContact: 'asc',
      },
      size: 10,
    },
  );
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const [itemsActiveCount, setItemsActiveCount] = useState(0);
  const [itemsPotentialCount, setItemsPotentialCount] = useState(0);
  const [itemsProgressCount, setItemsProgressCount] = useState(0);
  const [curForm, setCurForm] = useState('nextContactDate');
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const userContext = useContext(UserContext);

  const menuItems = [
    {
      link: 'active',
      name: 'Активные',
      count: itemsActiveCount,
    },
    {
      link: 'potential',
      name: 'Потенциальные',
      count: itemsPotentialCount,
    },
    {
      link: 'in-progress',
      name: 'В разработке',
      count: itemsProgressCount,
    },
  ];

  const deleteItem = async (clientId, index) => {
    const client = data.find((item) => item.id === clientId);
    setIsLoadingClients(true);
    return Promise.all(
      client.legalEntities.map((item) =>
        clientTypes[props.type].deleteLegalEntityFunction(item.id),
      ),
    )
      .then(() =>
        Promise.all(
          client.contacts.map((item) =>
            clientTypes[props.type].deleteContactsFunction(item.id),
          ),
        ),
      )
      .then(() =>
        Promise.all(
          client.histories.map((item) =>
            clientTypes[props.type].deleteWorkHistoryFunction(item.id),
          ),
        ),
      )
      .then(() => {
        setIsLoadingClients(false);
        return clientTypes[props.type].deleteItemFunction(clientId).then(() => {
          let temp = clients;
          temp.splice(index, 1);
          setClients([...temp]);
        });
      })
      .catch((error) => {
        setIsLoadingClients(false);
        alert('Ошибка при удалении');
        console.log(error);
      });
  };

  const loadClientsTotalByType = (category) => {
    const clientCategories = [
      {
        clientType: 'Активные',
        setter: (count) => setItemsActiveCount(count),
      },
      {
        clientType: 'Потенциальные',
        setter: (count) => setItemsPotentialCount(count),
      },
      {
        clientType: 'В разработке',
        setter: (count) => setItemsProgressCount(count),
      },
    ];
    return Promise.all(
      clientCategories.map((item) =>
        clientTypes[props.type]
          .loadItemsByCategory(
            {
              categoryName: category,
              clientType: item.clientType,
            },
            1,
            1,
            sortOrder,
          )
          .then((res) => res.json())
          .then((res) => item.setter(res.totalElements)),
      ),
    );
  };

  const loadData = (category, type, signal) => {
    setSearchQuery('');
    return clientTypes[props.type].loadItemsByCategory(
      {
        categoryName: category,
        clientType:
          type === 'active'
            ? 'Активные'
            : type === 'potential'
            ? 'Потенциальные'
            : 'В разработке',
      },
      curPage,
      itemsPerPage,
      sortOrder,
      signal,
    );
  };

  const {
    searchQuery,
    setSearchQuery,
    searchBar,
    selectedOption,
    advanced: advancedOptions,
  } = useSearchBar(
    undefined,
    [],
    (query) => {
      setIsLoadingClients(true);
      if (query === '') {
        setIsLoadingClients(false);
        loadData(curCategory, curClientType);
      } else {
        searchClients(
          {
            name: query,
            city: query,
            type: clientTypes[props.type].type,
            ...(advancedOptions[0].parentCheckbox.value && {
              taxes: advancedOptions[0].childCheckbox.value,
            }),
          },
          [
            selectedOption,
            advancedOptions[0].parentCheckbox.value ? 'taxes' : null,
          ],
        )
          .then((res) => res.json())
          .then((res) => {
            setClients(res);
            setIsLoadingClients(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingClients(false);
          });
      }
    },
    [
      {
        text: 'Везде',
        value: '',
      },
      {
        text: 'Город',
        value: 'city',
      },
    ],
    [
      {
        type: 'groupCheckbox',
        parentCheckbox: { text: 'Поиск по налогообложению', value: false },
        childCheckbox: { text: 'УСН', value: false },
      },
    ],
  );

  const initialLoad = () => {
    const curCategoryTemp = props.location.pathname
      .split('/category/')[1]
      .split('/')[0];
    const curClientTypeTemp = props.location.pathname
      .split('/category/')[1]
      .split('/')[1];
    if (
      curCategory !== '' &&
      curClientTypeTemp !== '' &&
      (curCategoryTemp !== curCategory || curClientTypeTemp !== curClientType)
    )
      setCurPage(1);
    setCurCategory(curCategoryTemp);
    setCurClientType(curClientTypeTemp);
    loadClientsTotalByType(curCategoryTemp);
    return;
  };

  useEffect(() => {
    document.title = clientTypes[props.type].title;
    const abortController = new AbortController();
    initialLoad(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [props.location, props.type]);

  return (
    <div className="clients">
      <div className="main-window">
        <FloatingPlus
          linkTo={'/' + props.type + '/new'}
          visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>{curCategory}</span>
          </div>
          <div className="main-window__menu">
            {menuItems.map((menuItem, index) => (
              <MenuItem
                type={props.type}
                key={index}
                curCategory={curCategory}
                location={props.location}
                item={menuItem}
              />
            ))}
          </div>
        </div>
        {searchBar}
        <FormWindow
          title={
            curForm === 'nextContactDate'
              ? 'Дата следующего контакта'
              : 'Запись действия'
          }
          content={
            <>
              {curForm === 'nextContactDate' ? (
                <EditNextContactDate
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  loadData={loadData}
                  editNextContactDate={
                    clientTypes[props.type].editNextContactDateFunction
                  }
                />
              ) : (
                <EditWorkHistory
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  userHasAccess={userContext.userHasAccess}
                  addWorkHistory={
                    clientTypes[props.type].addWorkHistoryFunction
                  }
                  editWorkHistory={
                    clientTypes[props.type].editWorkHistoryFunction
                  }
                  deleteWorkHistory={
                    clientTypes[props.type].deleteWorkHistoryFunction
                  }
                />
              )}
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select
                onChange={(event) => setSortOrder(changeSortOrder(event))}
              >
                <option value="name asc">По алфавиту (А-Я)</option>
                <option value="name desc">По алфавиту (Я-А)</option>
                <option value="nextDateContact asc">
                  По дате след. контакта
                </option>
              </select>
            </div>
          }
        />
        <ClientsList
          isLoading={isLoadingClients || isLoading}
          itemsPerPage={itemsPerPage}
          clients={searchQuery === '' ? data : clients}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          deleteItem={deleteItem}
          setClients={setClients}
          type={props.type}
          userContext={userContext}
          setCloseWindow={setCloseWindow}
          setSelectedItem={setSelectedItem}
          setShowWindow={setShowWindow}
          setCurForm={setCurForm}
          editItemFunction={clientTypes[props.type].editItemFunction}
        />
        {searchQuery === '' ? pagination : null}
      </div>
    </div>
  );
};
export default Clients;

const MenuItem = ({ type, curCategory, item, location }) => {
  return (
    <Link
      to={`/${type}/category/${curCategory}/${item.link}`}
      className={
        location.pathname.includes(item.link) === true
          ? 'main-window__item--active main-window__item'
          : 'main-window__item'
      }
    >
      <div>
        {item.name}
        <span className="main-window__menu-item-amount">{item.count}</span>
      </div>
    </Link>
  );
};
