import { useContext, useEffect, useState } from 'react';
import './Users.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import { getUsers, deleteUser } from 'Utils/RequestsAPI/users';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import useSort from 'Utils/hooks/useSort/useSort';
import Table from 'Components/Table/Table.jsx';
import UserContext from 'Components/../App';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserContext);
  const { sortPanel, sortedData } = useSort(
    users,
    {
      ignoreURL: false,
      sortOrder: {
        curSort: 'username',
        username: 'asc',
      },
      sortOptions: [
        { value: 'username asc', text: 'По имени (А-Я)' },
        { value: 'username desc', text: 'По имени (Я-А)' },
      ],
    },
    [users],
  );
  const [userRoles, setUserRoles] = useState([
    {
      name: 'Руководитель',
      role: 'ROLE_ADMIN',
      visible: false,
    },
    {
      name: 'Инженер',
      role: 'ROLE_ENGINEER',
      visible: false,
    },
    {
      name: 'Менеджер1',
      role: 'ROLE_MANAGER',
      visible: false,
    },
    {
      name: 'ЦехЛЭМЗ',
      role: 'ROLE_LEMZ',
      visible: false,
    },
    {
      name: 'ЦехЛепсари',
      role: 'ROLE_LEPSARI',
      visible: false,
    },
    {
      name: 'ЦехЛиговский',
      role: 'ROLE_LIGOVSKIY',
      visible: false,
    },
    {
      name: 'Диспетчер',
      role: 'ROLE_DISPATCHER',
      visible: false,
    },
  ]);

  useEffect(() => {
    document.title = 'Управление пользователями';
    let abortController = new AbortController();
    loadUsers(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const deleteItem = (id) => {
    deleteUser(id).then(() => loadUsers());
  };

  const loadUsers = (signal) => {
    setIsLoading(true);
    getUsers(signal)
      .then((res) => res.json())
      .then((response) => {
        setUsers(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const filterSearchQuery = (data) => {
    return data.filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filterUsersByRoles = (data) => {
    return filterSearchQuery(data).filter((item) => {
      let check = false;
      let noActiveRoles = true;
      userRoles.map((role) => {
        userRoles.map((role) => {
          if (role.visible) {
            noActiveRoles = false;
          }
        });
        if (
          noActiveRoles === true ||
          (role.visible &&
            item.roles.find((roleTemp) => roleTemp.name === role.role) !==
              undefined)
        ) {
          check = true;
          return;
        }
      });
      return check;
    });
  };

  const roles = {
    ROLE_ADMIN: 'Руководитель',
    ROLE_MANAGER: 'Менеджер',
    ROLE_DISPATCHER: 'Диспетчер',
    ROLE_LEMZ: 'ЦехЛЭМЗ',
    ROLE_LEPSARI: 'ЦехЛепсари',
    ROLE_LIGOSVKIY: 'ЦехЛиговский',
    ROLE_ENGINEER: 'Инженер1',
  };

  const formatUserRole = (_roles) => {
    const role = _roles.find((item) => item.name)?.name;
    return roles[role];
  };

  const columns = [
    { text: 'Имя пользователя', value: 'username' },
    { text: 'Эл. почта', value: 'email' },
    {
      text: 'Роль',
      value: 'roles',
      formatFn: formatUserRole,
    },
  ];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактировать пользователя',
      link: `/profile/users/edit/${item.id}`,
    },
    {
      elementType: 'delete',
      title: 'Удаление пользователя',
      onClick: () => deleteItem(item.id),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];

  return (
    <div className="users-manage">
      <div className="main-window">
        <FloatingPlus linkTo="/profile/users/new" visibility={['ROLE_ADMIN']} />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Управление пользователями</div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите имя пользователя для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          itemsCount={`Всего: ${users.length} записей`}
          sorting={sortPanel}
          content={
            <div className="main-window__info-panel">
              <div className="main-window__filter-pick">
                <div>Фильтр по ролям: </div>
                {userRoles.map((role, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        (role.visible
                          ? 'main-window__button'
                          : 'main-window__button main-window__button--inverted') +
                        ' main-window__list-item--' +
                        role.className
                      }
                      onClick={() => {
                        let temp = userRoles.map((role) => {
                          return {
                            ...role,
                            visible: false,
                          };
                        });
                        temp.splice(index, 1, {
                          ...role,
                          visible: !role.visible,
                        });
                        setUserRoles([...temp]);
                      }}
                    >
                      {role.name}
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />
        <Table
          columns={columns}
          data={filterUsersByRoles(sortedData)}
          loading={{ isLoading }}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default Users;
