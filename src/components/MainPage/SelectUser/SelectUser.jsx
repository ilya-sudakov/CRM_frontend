import { useState, useEffect, useCallback } from 'react';
import './SelectUser.scss';
import { getUsers } from 'Utils/RequestsAPI/users';

const SelectUser = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const search = () => {
    let searchFilter = options.filter((item) => {
      const temp = props.filteredRoles
        ? item.roles.reduce((prevRole, curRole) => {
            let check = false;
            props.filteredRoles.map((filteredRole) => {
              // console.log(filteredRole, curRole.name);
              if (filteredRole === curRole.name) {
                check = true;
                return;
              }
            });
            return check;
          }, false)
        : true;
      return (
        temp && item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    return searchFilter;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setSelectedUser(value);
    props.onChange(value);
  };

  const clickOnInput = () => {
    if (!showOptions && search().length != 0) {
      setShowOptions(true);
    } else {
      search().length != 0 && setShowOptions(false);
    }
  };

  const clickOnOption = (name, id) => {
    clickOnInput();
    setSelectedUser(name);
    props.onChange(name, id);
  };

  const pressEscKey = useCallback((event) => {
    if (event.keyCode === 27 && showOptions) {
      setShowOptions(!showOptions);
    }
  }, []);

  useEffect(() => {
    options.length === 0 &&
      getUsers()
        .then((res) => res.json())
        .then((res) => {
          setOptions(res);
        })
        .catch(() => {
          !props.defaultValue && setSelectedUser(props.userData.username);
        });
    if (props.defaultValue) {
      setSelectedUser(props.defaultValue);
    }
    document.addEventListener('keydown', pressEscKey, false);
    return () => {
      document.removeEventListener('keydown', pressEscKey, false);
    };
  }, [props.defaultValue]);

  return (
    <div className="select_user">
      {search().length != 0 && (
        <div
          className={
            showOptions
              ? 'select_user__overlay'
              : 'select_user__overlay select_user__overlay--hidden'
          }
          onClick={() => setShowOptions(!showOptions)}
        ></div>
      )}
      <input
        type="text"
        className="select_user__input"
        onChange={handleInputChange}
        onClick={!props.readOnly ? clickOnInput : null}
        value={!props.readOnly ? selectedUser : props.defaultValue}
        placeholder={props.searchPlaceholder}
        readOnly={props.readOnly || options.length === 0}
      />
      {options && (
        <div
          className={
            showOptions
              ? 'select_user__options'
              : 'select_user__options select_user__options--hidden'
          }
        >
          {search().map((item) => (
            <div
              key={item.id}
              className="select_user__option_item"
              onClick={() => clickOnOption(item.username, item.id)}
            >
              {item.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectUser;
