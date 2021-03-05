import { useContext, useEffect, useState } from 'react';
import './GeneralTasks.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { getMainTasks, deleteMainTask } from 'Utils/RequestsAPI/MainTasks.js';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import UserContext from '../../../../App.js';
import useSort from 'Utils/hooks/useSort/useSort';
import {
  filterCompletedTasks,
  filterSearchQuery,
  filterTasksUsers,
} from './functions';
import useTitleHeader from 'Utils/hooks/uiComponents/useTitleHeader';

const GeneralTasks = (props) => {
  const userContext = useContext(UserContext);
  const [generalTasks, setGeneralTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //Статусы задач
  const taskStatuses = [
    {
      name: 'Выполнено',
      className: 'completed',
      visible: false,
    },
    {
      name: 'Отложено',
      className: 'delayed',
      visible: false,
    },
    {
      name: 'Материалы',
      className: 'materials',
      visible: false,
    },
    {
      name: 'В процессе',
      className: 'in-progress',
      visible: false,
    },
    {
      name: 'Проблема',
      className: 'problem',
      visible: false,
    },
  ];
  //Уникальные пользователи
  const [taskUsers, setTaskUsers] = useState({});

  useEffect(() => {
    document.title = 'Основные задачи';
    let abortController = new AbortController();
    loadTasks(abortController.signal);

    return function cancel() {
      abortController.abort();
    };
  }, []);

  //Запрос на получение списка задач
  const loadTasks = (signal) => {
    setIsLoading(true);
    return getMainTasks(signal)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        getUsers(res);
        setGeneralTasks(res);
      })
      .catch((error) => {
        //Обработка ошибок
        setIsLoading(false);
        console.log(error);
      });
  };

  const getUsers = (tasks) => {
    let users = {};
    tasks.map((task) => {
      if (
        users[task.responsible] === undefined &&
        task.responsible !== '' &&
        task.responsible !== null
      ) {
        users = {
          ...users,
          [task.responsible]: false,
        };
      }
    });
    setTaskUsers(users);
  };

  //Удаление задачи
  const deleteItem = (id) => {
    deleteMainTask(id).then(() => loadTasks());
  };

  const filterTasks = (tasks) => {
    const filteredSearch = filterSearchQuery(tasks, searchQuery);
    const filteredCompletedTasks = filterCompletedTasks(
      filteredSearch,
      curPage,
    );
    const filteredUsers = filterTasksUsers(filteredCompletedTasks, taskUsers);
    return filteredUsers;
  };

  const { titleHeader, curPage } = useTitleHeader(
    'Основные задачи',
    [
      {
        pageName: 'В процессе',
        pageTitle: 'В процессе',
      },
      {
        pageName: 'Завершено',
        pageTitle: 'Завершено',
      },
    ],
    'В процессе',
  );

  const { sortPanel, sortedData } = useSort(
    filterTasks(generalTasks),
    {
      ignoreURL: false,
      sortOrder: {
        curSort: 'dateCreated',
        dateCreated: 'asc',
      },
      sortOptions: [
        { value: 'dateCreated asc', text: 'По дате постановки (убыв.)' },
        { value: 'dateCreated desc', text: 'По дате постановки (возр.)' },
        { value: 'dateControl asc', text: 'По дате контроля (убыв.)' },
        { value: 'dateControl desc', text: 'По дате контроля (возр.)' },
      ],
    },
    [generalTasks, curPage, taskUsers, searchQuery],
  );

  const handleFilterUserClick = (user) => {
    return setTaskUsers((taskUsers) => {
      let newUsers = taskUsers;
      Object.entries(taskUsers).map((oldTask) => {
        newUsers = {
          ...newUsers,
          [oldTask[0]]: false,
        };
      });

      return {
        ...newUsers,
        [user[0]]: user[1] ? false : true,
      };
    });
  };

  return (
    <div className="general_tasks">
      <div className="main-window">
        <FloatingPlus
          linkTo="/dispatcher/general-tasks/new"
          visibility={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
        />
        {titleHeader}
        <SearchBar
          placeholder="Введите описание задачи для поиска..."
          setSearchQuery={setSearchQuery}
          fullSize
        />
        <ControlPanel
          itemsCount={`Всего: ${generalTasks.length} записей`}
          sorting={sortPanel}
          content={
            userContext.userHasAccess(['ROLE_ADMIN']) ? (
              <div className="main-window__info-panel">
                <div className="main-window__filter-pick">
                  <div>Фильтр по пользователям: </div>
                  {Object.entries(taskUsers).map((user, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          user[1]
                            ? 'main-window__button'
                            : 'main-window__button main-window__button--inverted'
                        }
                        onClick={() => handleFilterUserClick(user)}
                      >
                        {user[0]}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null
          }
        />
        <TableView
          data={sortedData}
          searchQuery={searchQuery}
          userData={props.userData}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          isLoading={isLoading}
          taskStatuses={taskStatuses}
          loadData={loadTasks}
        />
      </div>
    </div>
  );
};

export default GeneralTasks;
