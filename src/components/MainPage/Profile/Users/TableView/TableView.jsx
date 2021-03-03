import React from "react";
import { Link } from "react-router-dom";
import editSVG from "../../../../../../assets/tableview/edit.svg";
import deleteSVG from "../../../../../../assets/tableview/delete.svg";
import "./TableView.scss";
import PlaceholderLoading from "../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = (props) => {
  const roles = {
    ROLE_ADMIN: "Руководитель",
    ROLE_MANAGER: "Менеджер",
    ROLE_DISPATCHER: "Диспетчер",
    ROLE_LEMZ: "ЦехЛЭМЗ",
    ROLE_LEPSARI: "ЦехЛепсари",
    ROLE_LIGOSVKIY: "ЦехЛиговский",
    ROLE_ENGINEER: "Инженер1",
  };
  return (
    <div className="tableview_users">
      <div className="main-window">
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Имя пользователя</span>
            <span>Эл. почта</span>
            <span>Роль</span>
            <div className="main-window__actions">Действия</div>
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
                    !item.name ? null : roles[item.name]
                  )}
                </span>
                <div className="main-window__actions">
                  <Link
                    className="main-window__action"
                    to={"/profile/users/edit/" + user.id}
                    title="Редактировать пользователя"
                  >
                    <img className="main-window__img" src={editSVG} />
                  </Link>
                  {props.userHasAccess(["ROLE_ADMIN"]) && (
                    <div
                      className="main-window__action"
                      onClick={() => {
                        props.deleteItem(user.id);
                      }}
                      title="Удалить пользователя"
                    >
                      <img className="main-window__img" src={deleteSVG} />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TableView;
