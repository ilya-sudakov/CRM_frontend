import { useState, useEffect } from 'react';
import './SelectClientCategory.scss';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import TableView from '../TableView.jsx';
import {
  getClientCategories,
  getSupplierCategories,
} from 'API/Clients/Categories.js';
import SelectFromButton from 'Utils/Form/SelectFromButton/SelectFromButton.jsx';

const SelectClientCategory = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clientTypes = {
    clients: {
      name: 'клиент',
      getCategoriesFunction: () => getClientCategories(),
    },
    suppliers: {
      name: 'поставщик',
      getCategoriesFunction: () => getSupplierCategories(),
    },
  };

  const filterSearchQuery = (data) => {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  useEffect(() => {
    categories.length === 0 && loadCategories();
  }, []);

  const loadCategories = () => {
    setIsLoading(true);
    clientTypes[props.type]
      .getCategoriesFunction()
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  };

  const clickCategory = ({ id, name }) => {
    setId(id);
    setFullName(name);
    props.handleCategoryChange(id, name);
    setShowWindow(!showWindow);
  };

  return (
    <div className="select-client-category">
      <div className="select-client-category__input">
        <div className="select-client-category__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readOnly && (
            <SelectFromButton
              text="Выбрать категорию"
              onClick={() => setShowWindow(!showWindow)}
            />
          )}
          <div className={'select-client-category__input_field'}>
            {(id !== 0 || props.defaultValue) && (
              <div className="select-client-category__searchbar">
                <input
                  type="text"
                  className={
                    props.error === true
                      ? 'select-client-category__input select-client-category__input--error'
                      : 'select-client-category__input'
                  }
                  defaultValue={
                    props.defaultValue ? props.defaultValue : fullName
                  }
                  disabled
                  placeholder="Выберите категорию, нажав на кнопку 'Выбрать категорию'"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {props.error === true && (
        <div
          className="select-client-category__error"
          onClick={
            props.setErrorsArr
              ? () =>
                  props.setErrorsArr({
                    ...props.errorsArr,
                    [props.name]: false,
                  })
              : null
          }
        >
          Поле не заполнено!
        </div>
      )}
      <FormWindow
        title={`Выбор категории ${clientTypes[props.type].name}а`}
        content={
          <>
            <SearchBar
              fullSize
              setSearchQuery={setSearchQuery}
              placeholder="Введите запрос для поиска..."
            />
            <TableView
              data={filterSearchQuery(categories)}
              searchQuery={searchQuery}
              onSelect={clickCategory}
              isLoading={isLoading}
            />
          </>
        }
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
    </div>
  );
};

export default SelectClientCategory;
