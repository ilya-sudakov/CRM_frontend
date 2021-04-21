import { useEffect, useState } from 'react';
import CheckBox from 'Components/Form/CheckBox/CheckBox.jsx';
import { getUsers } from 'API/users';

const UsersVisibility = (props) => {
  const [users, setUsers] = useState(props.defaultValue || {});
  const [allChecked, setAllChecked] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers()
      .then((res) => res.json())
      .then((res) => {
        let newUsers = {};
        res
          .filter(
            (user) =>
              user.roles.find(
                (role) =>
                  role.name === 'ROLE_ADMIN' || role.name === 'ROLE_MANAGER',
              ) !== undefined,
          )
          .map((user) => {
            return (newUsers = {
              ...newUsers,
              [user.id]: {
                ...user,
                selected: true,
              },
            });
          });
        props.handleInputChange(newUsers);
        return setUsers({ ...newUsers });
      });
  };

  return (
    <div className="main-form__item">
      <div className="main-form__input_name">Видимость для пользователей</div>
      {props.userContext.userHasAccess(['ROLE_ADMIN']) ? (
        <div className="main-form__input_field">
          <CheckBox
            text="Выбрать всех"
            checked={allChecked}
            onChange={(value) => {
              setAllChecked(value);
              let newUsers = {};
              Object.entries(users).map((user) => {
                console.log(user);
                return (newUsers = {
                  ...newUsers,
                  [user[0]]: {
                    ...user[1],
                    selected:
                      user[1].username === props.userContext.userData.username
                        ? true
                        : value,
                  },
                });
              });
              props.handleInputChange(newUsers);
              setUsers({ ...newUsers });
            }}
          />
        </div>
      ) : null}
      {Object.entries(users).map((user) => (
        <div className="main-form__input_field" key={user[1].id}>
          <CheckBox
            text={user[1].username}
            checked={user[1].selected}
            disabled={user[1].username === props.userContext.userData.username}
            onChange={(value) => {
              setUsers((prev) => {
                return {
                  ...prev,
                  [user[1].id]: {
                    ...user[1],
                    selected: value,
                  },
                };
              });
              props.handleInputChange({
                ...users,
                [user[1].id]: {
                  ...user[1],
                  selected: value,
                },
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UsersVisibility;
