import React, { useEffect, useState } from "react";
import "./Users.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import TableView from "./TableView/TableView.jsx";
import { getUsers, deleteUser } from "../../../../utils/RequestsAPI/Users.jsx";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import useSort from "../../../../utils/hooks/useSort/useSort";

const Users = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sortPanel, sortedData } = useSort(users, {
    ignoreURL: false,
    sortOrder: {
      curSort: "username",
      username: "asc",
    },
    sortOptions: [
      { value: "username asc", text: "По имени (А-Я)" },
      { value: "username desc", text: "По имени (Я-А)" },
    ],
  });
  const [userRoles, setUserRoles] = useState([
    {
      name: "Руководитель",
      role: "ROLE_ADMIN",
      visible: false,
    },
    {
      name: "Инженер",
      role: "ROLE_ENGINEER",
      visible: false,
    },
    {
      name: "Менеджер1",
      role: "ROLE_MANAGER",
      visible: false,
    },
    {
      name: "ЦехЛЭМЗ",
      role: "ROLE_LEMZ",
      visible: false,
    },
    {
      name: "ЦехЛепсари",
      role: "ROLE_LEPSARI",
      visible: false,
    },
    {
      name: "ЦехЛиговский",
      role: "ROLE_LIGOVSKIY",
      visible: false,
    },
    {
      name: "Диспетчер",
      role: "ROLE_DISPATCHER",
      visible: false,
    },
  ]);

  useEffect(() => {
    document.title = "Управление пользователями";
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
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="users-manage">
      <div className="main-window">
        <FloatingPlus linkTo="/profile/users/new" visibility={["ROLE_ADMIN"]} />
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
                      className={
                        (role.visible
                          ? "main-window__button"
                          : "main-window__button main-window__button--inverted") +
                        " main-window__list-item--" +
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
        <TableView
          data={filterUsersByRoles(sortedData)}
          searchQuery={searchQuery}
          deleteItem={deleteItem}
          userHasAccess={props.userHasAccess}
          isLoading={isLoading}
          userRoles={userRoles}
        />
      </div>
    </div>
  );
};

export default Users;
