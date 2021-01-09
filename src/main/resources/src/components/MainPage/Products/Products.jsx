import React, { useEffect, useState } from "react";
import "./Products.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import TableView from "./TableView/TableView.jsx";
import { deleteProduct } from "../../../utils/RequestsAPI/Products.js";
import { deleteCategory } from "../../../utils/RequestsAPI/Products/Categories.js";
import { deletePackagingFromProduct } from "../../../utils/RequestsAPI/Products/packaging.js";
import FormWindow from "../../../utils/Form/FormWindow/FormWindow.jsx";
import TableViewCategory from "./CategoryManagement/TableView/TableViewCategory.jsx";
import FloatingPlus from "../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import useProductsList from "../../../utils/hooks/useProductsList/useProductsList.js";

const Products = (props) => {
  const { products, categories, isProductsLoading } = useProductsList();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryCategory, setSearchQueryCategory] = useState("");
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    document.title = "Продукция";
  }, []);

  const deleteItem = (event) => {
    const id = event.target.dataset.id;
    return deletePackagingFromProduct(id).then(() => {
      return deleteProduct(id).then(() => loadCategories());
    });
  };

  const deleteItemCategory = (event) => {
    const id = event.target.dataset.id;
    deleteCategory(id).then(() => loadCategories());
  };

  // * SORTING

  const [sortOrder, setSortOrder] = useState({
    curSort: "name",
    name: "asc",
  });

  const changeSortOrder = (event) => {
    const name = event.target.value.split(" ")[0];
    const order = event.target.value.split(" ")[1];
    setSortOrder({
      curSort: name,
      [name]: order,
    });
  };

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

  const sortProducts = (data) => {
    return data.sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
      }
      return 0;
    });
  };

  return (
    <div className="products">
      <div className="main-window">
        <FloatingPlus
          linkTo="/products/new"
          visibility={["ROLE_ADMIN", "ROLE_MANAGER"]}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>Продукция</span>
            {props.userHasAccess([
              "ROLE_ADMIN",
              "ROLE_MANAGER",
              "ROLE_ENGINEER",
            ]) && (
              <div
                className="main-window__button"
                onClick={() => setShowWindow(!showWindow)}
              >
                Категории
              </div>
            )}
            {props.userHasAccess(["ROLE_ADMIN"]) && (
              <div
                className="main-window__button"
                onClick={() => props.history.push("/packaging")}
              >
                Упаковки
              </div>
            )}
          </div>
        </div>
        <FormWindow
          title="Категории продукции"
          content={
            <React.Fragment>
              <FloatingPlus
                linkTo="/products/category/new"
                visibility={["ROLE_ADMIN"]}
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
            </React.Fragment>
          }
          // headerButton={{
          //   name: 'Создать категорию',
          //   path: '/products/category/new',
          // }}
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
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="name asc">По алфавиту (А-Я)</option>
                <option value="name desc">По алфавиту (Я-А)</option>
                <option value="weight desc">По весу</option>
              </select>
            </div>
          }
          itemsCount={`Всего: ${products.length} записей`}
        />
        <TableView
          products={sortProducts(filterSearchQuery(products))}
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
