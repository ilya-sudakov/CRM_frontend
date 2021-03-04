import { Link } from 'react-router-dom';
import editSVG from '../../../../../../assets/tableview/edit.svg';
import deleteSVG from '../../../../../../assets/tableview/delete.svg';
import './TableView.scss';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';

const TableView = (props) => {
  const roles = {
    ROLE_ADMIN: 'Руководитель',
    ROLE_MANAGER: 'Менеджер',
    ROLE_DISPATCHER: 'Диспетчер',
    ROLE_LEMZ: 'ЦехЛЭМЗ',
    ROLE_LEPSARI: 'ЦехЛепсари',
    ROLE_LIGOSVKIY: 'ЦехЛиговский',
    ROLE_ENGINEER: 'Инженер1',
  };
  return (
    <div className="tableview_users">
      <div className="main-window">
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Имя пользователя</span>
            <span>Эл. почта</span>
            <span>Роль</span>
            <div className="main-window__table-actions"></div>
          </div>
          {props.isLoading ? (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="30px"
              items={10}
            />
          ) : (
            props.data.map((user) => (
              <div key={user.id} className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">
                    Имя пользователя:
                  </div>
                  {user.username}
                </span>
                <span>
                  <div className="main-window__mobile-text">Эл. почта:</div>
                  {user.email}
                </span>
                <span>
                  <div className="main-window__mobile-text">Роль:</div>
                  {user.roles.map((item) =>
                    !item.name ? null : roles[item.name],
                  )}
                </span>
                <TableActions
                  actionsList={[
                    {
                      link: `/profile/users/edit/${user.id}`,
                      imgSrc: editSVG,
                      title: 'Редактировать пользователя',
                    },
                    {
                      isRendered: props.userHasAccess(['ROLE_ADMIN']),
                      customElement: (
                        <DeleteItemAction
                          onClick={() => props.deleteItem(user.id)}
                          title="Удалить пользователя"
                        />
                      ),
                    },
                  ]}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TableView;
