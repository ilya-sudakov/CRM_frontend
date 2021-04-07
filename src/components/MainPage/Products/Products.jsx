import { useEffect, useState } from 'react';
import './Products.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import { deleteProduct } from 'Utils/RequestsAPI/Products/products';
import { deleteCategory } from 'Utils/RequestsAPI/Products/Categories.js';
import { deletePackagingFromProduct } from 'Utils/RequestsAPI/Products/packaging.js';
import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';
import TableViewCategory from './CategoryManagement/TableView/TableViewCategory.jsx';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import useProductsList from 'Utils/hooks/useProductsList/useProductsList.js';
import useSort from 'Utils/hooks/useSort/useSort';

const Products = (props) => {
  const { products, categories, isProductsLoading } = useProductsList();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryCategory, setSearchQueryCategory] = useState('');
  const [showWindow, setShowWindow] = useState(false);

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        item.weight.toString().includes(query) ||
        (item.comment !== null && item.comment.toLowerCase().includes(query))
      );
    });
  };

  const { sortPanel, sortedData } = useSort(
    filterSearchQuery(products),
    {
      ignoreURL: true,
      sortOrder: {
        curSort: 'name',
        name: 'asc',
      },
      sortOptions: [
        { value: 'name asc', text: 'По алфавиту (А-Я)' },
        { value: 'name desc', text: 'По алфавиту (Я-А)' },
        { value: 'weight desc', text: 'По весу' },
      ],
    },
    [products],
  );

  useEffect(() => {
    document.title = 'Продукция';
  }, []);

  const deleteItem = (event) => {
    const id = event.target.dataset.id;
    return deletePackagingFromProduct(id).then(() => {
      return deleteProduct(id);
    });
  };

  const deleteItemCategory = (event) => {
    const id = event.target.dataset.id;
    deleteCategory(id);
  };

  return (
    <div className="products">
      <div className="main-window">
        <FloatingPlus
          linkTo="/products/new"
          visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>Продукция</span>
            {props.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_MANAGER',
              'ROLE_ENGINEER',
            ]) && (
              <div
                className="main-window__button"
                onClick={() => setShowWindow(!showWindow)}
              >
                Категории
              </div>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                className="main-window__button"
                onClick={() => props.history.push('/packaging')}
              >
                Упаковки
              </div>
            )}
          </div>
        </div>
        <FormWindow
          title="Категории продукции"
          content={
            <>
              <FloatingPlus
                linkTo="/products/category/new"
                visibility={['ROLE_ADMIN']}
              />
              <SearchBar
                fullSize
                placeholder="Введите название категории для поиска..."
                setSearchQuery={setSearchQueryCategory}
              />
              <TableViewCategory
                data={categories}
                searchQuery={searchQueryCategory}
                userHasAccess={props.userHasAccess}
                deleteItem={deleteItemCategory}
              />
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <SearchBar
          fullSize
          // title="Поиск продукции"
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={sortPanel}
          itemsCount={`Всего: ${products.length} записей`}
        />
        <TableView
          products={sortedData}
          categories={categories}
          searchQuery={searchQuery}
          isLoading={isProductsLoading}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default Products;
