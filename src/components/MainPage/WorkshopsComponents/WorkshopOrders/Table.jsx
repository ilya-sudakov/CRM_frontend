import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import {
  formatDateString,
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx';

import editSVG from '../../../../../assets/tableview/edit.svg';
import TableActions from '../../../../utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from '../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx';

const Tableview = ({
  data,
  isLoading,
  statuses,
  deleteItem,
  userHasAccess,
  link,
}) => {
  return (
    <div className="main-window__list main-window__list--full">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Дата создания</span>
        <span>Название</span>
        <span>Продукция</span>
        <span>Комплектация</span>
        <span>Статус</span>
        <span>Дата поставки</span>
        <div className="main-window__table-actions"></div>
      </div>
      {isLoading && (
        <PlaceholderLoading
          itemClassName="main-window__list-item"
          minHeight="35px"
          items={3}
        />
      )}
      {data.map((order) => {
        return (
          <div
            className={
              'main-window__list-item main-window__list-item--' + order.status
            }
          >
            <span>
              <div className="main-window__mobile-text">Дата создания: </div>
              {formatDateString(order.date)}
            </span>
            <span>
              <div className="main-window__mobile-text">Название: </div>
              {order.name}
            </span>
            <span>
              <div className="main-window__mobile-text">Продукция: </div>
              <div className="main-window__list-col">
                {order.products.map((product) => {
                  return (
                    <div className="workshop-orders__products">
                      <div>{product.name}</div>
                      <div> ({addSpaceDelimiter(product.quantity)} шт.)</div>
                    </div>
                  );
                })}
              </div>
            </span>
            <span>
              <div className="main-window__mobile-text">Назначение: </div>
              {order.assembly}
            </span>
            <span className={'main-window__list-item--' + order.status}>
              <div className="main-window__mobile-text">Статус: </div>
              {statuses.find((item) => item.className === order.status)?.name}
            </span>
            <span>
              <div className="main-window__mobile-text">Дата поставки: </div>
              {new Date(order.deliverBy) < new Date() &&
              order.status !== 'completed' ? (
                <div className="main-window__reminder">
                  <div>!</div>
                  <div>{formatDateString(order.deliverBy)}</div>
                </div>
              ) : (
                formatDateString(order.deliverBy)
              )}
            </span>
            <TableActions
              actionsList={[
                {
                  link: `${link}/edit/${order.id}`,
                  imgSrc: editSVG,
                  title: 'Редактирование заказа',
                },
                {
                  customElement: (
                    <DeleteItemAction
                      title="Удаление заказа"
                      onClick={() => deleteItem(order)}
                    />
                  ),
                  isRendered: userHasAccess(['ROLE_ADMIN']),
                },
              ]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tableview;
