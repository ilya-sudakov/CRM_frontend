import React, { useState } from 'react';
import './SelectCategory.scss';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableViewCategory from '../CategoryManagement/TableView/TableViewCategory.jsx';
import useCategoriesList from '../../../../utils/hooks/useProductsList/useProductCategoriesList.js';
import SelectFromButton from '../../../../utils/Form/SelectFromButton/SelectFromButton.jsx';

const SelectCategory = (props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const { categories, isLoadingCategories } = useCategoriesList();
  const [searchQuery, setSearchQuery] = useState('');
  const [id, setId] = useState('');

  const deleteItemCategory = (event) => {
    const id = event.target.dataset.id;
    deleteCategory(id).then(() => loadCategories());
  };

  const clickCategory = (categoryId) => {
    setId(categoryId);
    props.handleCategoryChange(categoryId);
    setShowWindow(!showWindow);
  };

  return (
    <div className="select-category">
      <div className="select-category__input">
        <div className="select-category__input_name main-form__input_name--header">
          {props.inputName + (props.required ? '*' : '')}
          {!props.readOnly && (
            <SelectFromButton
              text="Выбрать категорию"
              onClick={() => setShowWindow(!showWindow)}
            />
          )}
        </div>
        {(props.defaultValue || id) && (
          <div className={'select-category__input_field'}>
            <div className="select-category__searchbar">
              <input
                type="text"
                className={
                  props.error === true
                    ? 'select-category__input select-category__input--error'
                    : 'select-category__input'
                }
                value={props.defaultValue ? props.defaultValue : id}
                placeholder="Выберите категорию, нажав на кнопку 'Выбрать категорию'"
                disabled
              />
            </div>
          </div>
        )}
      </div>
      {props.error === true && (
        <div
          className="select-category__error"
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
        title="Категории продукции"
        content={
          <React.Fragment>
            <SearchBar
              fullSize
              // title="Поиск по категориям"
              setSearchQuery={setSearchQuery}
              placeholder="Введите название категории для поиска..."
            />
            <TableViewCategory
              data={categories}
              searchQuery={searchQuery}
              userHasAccess={props.userHasAccess}
              deleteItem={deleteItemCategory}
              selectCategory={clickCategory}
              setCloseWindow={setCloseWindow}
              closeWindow={closeWindow}
              isLoading={isLoadingCategories}
              setShowWindow={setShowWindow}
            />
          </React.Fragment>
        }
        headerButton={{
          name: 'Создать категорию',
          path: '/products/category/new',
        }}
        showWindow={showWindow}
        setShowWindow={setShowWindow}
      />
    </div>
  );
};

export default SelectCategory;
