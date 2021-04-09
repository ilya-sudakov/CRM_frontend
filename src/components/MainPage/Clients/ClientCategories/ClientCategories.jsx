import { useState, useEffect } from 'react';
import './ClientCategories.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import {
  getClientCategories,
  deleteClientCategory,
  addClientCategory,
  editClientCategory,
  getSupplierCategories,
} from 'API/Clients/Categories.js';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import NewClientCategory from './NewClientCategory/NewClientCategory.jsx';
import EditClientCategory from './EditClientCategory/EditClientCategory.jsx';
import FloatingButton from 'Utils/MainWindow/FloatingButton/FloatingButton.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { sortByField } from 'Utils/sorting/sorting';
import TableView from './TableView.jsx';

const ClientCategories = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWindow, setShowWindow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [curForm, setCurForm] = useState('new');
  const [editCategory, setEditCategory] = useState(null);

  const clientTypes = {
    clients: {
      name: 'клиент',
      getCategoriesFunction: () => getClientCategories(),
      addCategoryFunction: (newCategory) =>
        addClientCategory({ ...newCategory, type: null }),
      editCategoryFunction: (newCategory, id) =>
        editClientCategory(newCategory, id),
      deleteCategoryFunction: (id) => deleteClientCategory(id),
      visibility: ['ROLE_ADMIN', 'ROLE_MANAGER'],
    },
    suppliers: {
      name: 'поставщик',
      getCategoriesFunction: () => getSupplierCategories(),
      addCategoryFunction: (newCategory) =>
        addClientCategory({ ...newCategory, type: 'supplier' }),
      editCategoryFunction: (newCategory, id) =>
        editClientCategory(newCategory, id),
      deleteCategoryFunction: (id) => deleteClientCategory(id),
      visibility: ['ROLE_ADMIN'],
    },
  };

  useEffect(() => {
    loadData();
  }, [props.type]);

  const loadData = () => {
    clientTypes[props.type]
      .getCategoriesFunction()
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
        setIsLoading(false);
      });
  };

  const deleteItem = (id) => {
    clientTypes[props.type]
      .deleteCategoryFunction(id)
      .then(() => {
        loadData();
      })
      .catch((error) => {
        alert(
          'Ошибка при удалении записи! Убедитесь что в категории нет клиентов',
        );
        console.log(error);
      });
  };

  return (
    <div className="client-categories">
      <div className="main-window">
        <FloatingButton
          onClick={() => {
            setCurForm('new');
            setShowWindow(!showWindow);
          }}
          visibility={clientTypes[props.type].visibility}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>{`Категории ${clientTypes[props.type].name}ов`}</span>
            {props.userHasAccess(clientTypes[props.type].visibility) && (
              <div
                className="main-window__button"
                onClick={() => {
                  setCurForm('new');
                  setShowWindow(!showWindow);
                }}
              >
                Создать категорию
              </div>
            )}
          </div>
        </div>
        <FormWindow
          title={
            curForm === 'new'
              ? 'Создание категории'
              : 'Редактирование категории'
          }
          content={
            <>
              {curForm === 'new' ? (
                <NewClientCategory
                  onSubmit={loadData}
                  showWindow={showWindow}
                  addCategory={clientTypes[props.type].addCategoryFunction}
                  setShowWindow={setShowWindow}
                />
              ) : (
                <EditClientCategory
                  onSubmit={loadData}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  category={editCategory}
                  editCategory={clientTypes[props.type].editCategoryFunction}
                />
              )}
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <SearchBar
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel itemsCount={`Всего: ${categories.length} записей`} />
        <TableView
          data={sortByField(
            categories.filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            }),
            { fieldName: 'name', direction: 'asc' },
          )}
          isLoading={isLoading}
          onEdit={(item) => {
            setEditCategory(item);
            setCurForm('edit');
            setShowWindow(!showWindow);
          }}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default ClientCategories;
