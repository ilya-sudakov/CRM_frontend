import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import plusIcon from 'Assets/tableview/add_item.png';
import plusContIcon from 'Assets/tableview/add_cont.png';
import './TableView.scss';
import ImgLoader from 'Utils/TableView/ImgLoader/ImgLoader.jsx';
import 'Utils/MainWindow/MainWindow.scss';

import viewSVG from 'Assets/tableview/view.svg';
import editSVG from 'Assets/tableview/edit.svg';
import deleteSVG from 'Assets/tableview/delete.svg';
import {
  addSpaceDelimiter,
  changeVisibilityOfListItem,
} from 'Utils/functions.jsx';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsVisible, setProductsVisible] = useState([]);

  const isProductsHidden = (index) => {
    index = Number.parseInt(index);
    let check = true;
    productsVisible.map((element) => {
      if (element.id === index) {
        check = element.hidden;
      }
    });
    return check;
  };

  useEffect(() => {
    let temp = [];
    props.categories.map((element, index) =>
      temp.push({
        id: element.id,
        hidden: true,
      }),
    );
    setProductsVisible([...temp]);
    props.closeWindow && props.setShowWindow(false);
    props.categories.length > 0 && setIsLoading(false);
  }, [props.categories, props.closeWindow]);

  return (
    <div className="tableview_products">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Категория</span>
          <div className="main-window__actions">Действия</div>
        </div>
        {props.categories.map((category, category_id) => (
          <>
            <div
              className="main-window__list-item"
              onClick={() => {
                setProductsVisible([
                  ...changeVisibilityOfListItem(productsVisible, category.id),
                ]);
              }}
            >
              <span>
                <div className="main-window__mobile-text">Категория:</div>
                <span>{category.category}</span>
                <span className="tableview_products__items-count">
                  {`${
                    props.products.filter(
                      (product) => product.category === category.category,
                    ).length
                  }`}
                </span>
              </span>
              <div className="main-window__actions">
                {props.userHasAccess &&
                  props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                    <div
                      className="main-window__action"
                      title="Редактирование категории"
                      onClick={() => {
                        props.history.push(
                          '/products/category/edit/' + category.id,
                        );
                      }}
                    >
                      <img className="main-window__img" src={editSVG} />
                    </div>
                  )}
                {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && (
                  <div className="main-window__action" onClick={null}>
                    <img className="main-window__img" src={deleteSVG} />
                  </div>
                )}
              </div>
            </div>
            {/* Dropdown list */}
            <div
              className={
                isProductsHidden(category.id)
                  ? 'main-window__list-options main-window__list-options--hidden'
                  : 'main-window__list-options'
              }
            >
              <div className="main-window__list">
                <div className="main-window__list-item main-window__list-item--header">
                  <span>Фото</span>
                  <span>Название</span>
                  <span>Вес</span>
                  <span>Место производства</span>
                  <span>Комментарий</span>
                  <div className="main-window__actions">Действия</div>
                </div>
                {isLoading && (
                  <PlaceholderLoading
                    itemClassName="main-window__list-item"
                    minHeight="35px"
                    items={8}
                  />
                )}
                {props.products.map(
                  (product, product_id) =>
                    product.category === category.category && (
                      <div key={product_id} className="main-window__list-item">
                        <span>
                          <div className="main-window__mobile-text">Фото:</div>
                          <ImgLoader
                            imgSrc={product.photo}
                            noPhotoTemplate
                            imgClass="tableview_products__product_img"
                          />
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Название:
                          </div>
                          {product.name}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">Вес:</div>
                          {addSpaceDelimiter(product.weight)}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Место производства:
                          </div>
                          {product.productionLocation}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Комментарий:
                          </div>
                          {product.comment}
                        </span>
                        <div className="main-window__actions">
                          <div
                            className="main-window__action"
                            title="Просмотр продукции"
                            onClick={() => {
                              return props.history.push(
                                '/products/view/' + product.id,
                              );
                            }}
                          >
                            <img className="main-window__img" src={viewSVG} />
                          </div>
                          {props.userHasAccess &&
                            props.userHasAccess([
                              'ROLE_ADMIN',
                              'ROLE_MANAGER',
                            ]) && (
                              <div
                                className="main-window__action"
                                title="Редактирование продукции"
                                onClick={() => {
                                  return props.history.push(
                                    '/products/edit/' + product.id,
                                  );
                                }}
                              >
                                <img
                                  className="main-window__img"
                                  src={editSVG}
                                />
                              </div>
                            )}
                          {props.userHasAccess &&
                            props.userHasAccess(['ROLE_ADMIN']) && (
                              <div
                                className="main-window__action"
                                title="Удаление продукции"
                                onClick={props.deleteItem}
                              >
                                <img
                                  className="main-window__img"
                                  data-id={product.id}
                                  src={deleteSVG}
                                />
                              </div>
                            )}
                          {props.selectProduct && (
                            <div className="main-window__action main-window__action--row">
                              <div
                                data-id={product.id}
                                title="Выбрать и продолжить"
                                className="main-window__action main-window__action--continue"
                                onClick={() => {
                                  props.selectProduct(
                                    product.id,
                                    product.name,
                                    product.id,
                                  );
                                }}
                              >
                                <img
                                  className="main-window__img"
                                  src={plusContIcon}
                                  alt=""
                                />
                              </div>
                              <div
                                data-id={product.id}
                                title="Выбрать и закрыть"
                                className="main-window__action main-window__action--close"
                                onClick={() => {
                                  props.selectProduct(
                                    product.id,
                                    product.name,
                                    product.id,
                                  );
                                  props.setCloseWindow(!props.closeWindow);
                                }}
                              >
                                <img
                                  className="main-window__img"
                                  src={plusIcon}
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default withRouter(TableView);
