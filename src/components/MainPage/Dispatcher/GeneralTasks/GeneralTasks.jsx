import { useContext, useEffect, useState } from 'react';
import './GeneralTasks.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import { getMainTasks, deleteMainTask } from 'API/tasks';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import UserContext from '../../../../App.js';
import useSort from 'Utils/hooks/useSort/useSort';
import {
  filterCompletedTasks,
  filterSearchQuery,
  filterTasksUsers,
} from './functions';
import { useTitleHeader } from 'Utils/hooks';
import Table from 'Components/Table/Table.jsx';
import { formatDateString } from 'Utils/functions.jsx';
import { editTaskStatus } from 'API/tasks';

const GeneralTasks = (props) => {
  const userContext = useContext(UserContext);
  const [generalTasks, setGeneralTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    return filteredUsers.filter(
      (task) =>
        props.userHasAccess(['ROLE_ADMIN']) ||
        props.userData.username === task.responsible,
    );
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

  const handleConditionChange = (value, { id }) => {
    editTaskStatus(
      {
        condition: value,
      },
      id,
    )
      .then(() => {
        loadTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      text: 'Дата постановки',
      value: 'dateCreated',
      width: '12%',
      maxWidth: '100px',
      formatFn: ({ dateCreated }) => formatDateString(dateCreated),
    },
    {
      text: 'Описание',
      value: 'description',
      width: '30%',
    },
    {
      text: 'Ответственный',
      value: 'responsible',
      width: '15%',
    },
    {
      text: 'Дата контроля',
      value: 'dateControl',
      width: '12%',
      maxWidth: '120px',
      badge: {
        type: 'error',
        isVisibleFn: (date) => new Date(date) < new Date(),
      },
      formatFn: ({ dateControl }) => formatDateString(dateControl),
    },
    {
      text: 'Состояние',
      value: 'status',
      width: '20%',
    },
    {
      text: 'Статус',
      value: 'condition',
      width: '15%',
      maxWidth: '120px',
      status: {
        onChange: (value, item) => handleConditionChange(value, item),
        options: [
          { text: 'Материалы', type: 'materials' },
          { text: 'Выполнено', type: 'completed' },
          { text: 'В процессе', type: 'in-process' },
          { text: 'Отложено', type: 'delayed' },
          { text: 'Проблема', type: 'problem' },
        ],
      },
    },
  ];

  const actions = (item, index) => [
    {
      elementType: 'edit',
      title: 'Редактирование задачи',
      link: `/dispatcher/general-tasks/edit/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'delete',
      title: 'Удаление задачи',
      onClick: () => deleteItem(item.id, index),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];

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
        <Table
          columns={columns}
          data={sortedData}
          loading={{ isLoading }}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default GeneralTasks;
