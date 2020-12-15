import React from "react";
import editSVG from "../../../../../../../../assets/tableview/edit.svg";
import deleteSVG from "../../../../../../../../assets/tableview/delete.svg";
import starSVG from "../../../../../../../../assets/tableview/star.svg";
import starBorderedSVG from "../../../../../../../../assets/tableview/star_border.svg";
import phoneSVG from "../../../../../../../../assets/tableview/phone.svg";
import calendarSVG from "../../../../../../../../assets/tableview/calendar.svg";
import LockSVG from "../../../../../../../../assets/tableview/bx-lock-alt.svg";
import eyeSVG from "../../../../../../../../assets/tableview/eye-invisible-outlined.svg";
import { formatDateString } from "../../../../utils/functions.jsx";
import { sortClients } from "./functions.js";
import PlaceholderLoading from "../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const ClientsList = ({
  isLoading,
  itemsPerPage,
  clients,
  searchQuery,
  sortOrder,
  deleteItem,
  type,
  userContext,
  setCloseWindow,
  setSelectedItem,
  setShowWindow,
  setCurForm,
  editItemFunction,
  setClients,
}) => {
  return (
    <div className="main-window__list">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Название</span>
        <span>Сайт</span>
        <span>Контакты</span>
        <span>Комментарий</span>
        <span>Дата след. контакта</span>
        <div className="main-window__actions">Действие</div>
      </div>
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="main-window__list-item"
          minHeight="60px"
          items={itemsPerPage}
        />
      ) : (
        sortClients(clients, searchQuery, sortOrder).map((item, index) => (
          <ListItem
            index={index}
            item={item}
            userContext={userContext}
            editItemFunction={editItemFunction}
            setClients={setClients}
            setCloseWindow={setCloseWindow}
            setSelectedItem={setSelectedItem}
            setShowWindow={setShowWindow}
            setCurForm={setCurForm}
            deleteItem={deleteItem}
            type={type}
            clients={clients}
          />
        ))
      )}
    </div>
  );
};

export default ClientsList;

const ListItem = ({
  item,
  userContext,
  editItemFunction,
  setClients,
  setCloseWindow,
  setSelectedItem,
  setShowWindow,
  setCurForm,
  deleteItem,
  type,
  clients,
  index,
}) => {
  const handleFavouriteClick = (item, clients) => {
    let temp = clients;
    //   console.log(item);
    let newClient = Object.assign({
      type: item.type,
      categoryId: item.category.id,
      check: item.check,
      clientType: item.clientType,
      comment: item.comment,
      manager: item.manager,
      name: item.name,
      nextDateContact: new Date(item.nextDateContact).getTime() / 1000,
      price: item.price,
      site: item.site,
      storageAddress: item.storageAddress,
      workCondition: item.workCondition,
      favorite: !item.favorite,
    });
    editItemFunction(newClient, item.id)
      .then(() => {
        temp.splice(index, 1, {
          ...item,
          favorite: !item.favorite,
        });
        //   loadData(item.categoryName, item.clientType);
        setClients([...temp]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHideClient = (item, clients) => {
    let temp = clients;
    //   console.log(item);
    let newClient = Object.assign({
      type: item.type,
      categoryId: item.category.id,
      check: item.check,
      clientType: item.clientType,
      comment: item.comment,
      manager: item.manager,
      name: item.name,
      nextDateContact: new Date(item.nextDateContact).getTime() / 1000,
      price: item.price,
      site: item.site,
      storageAddress: item.storageAddress,
      workCondition: item.workCondition,
      favorite: !item.favorite,
      isClosed: true,
    });
    editItemFunction(newClient, item.id)
      .then(() => {
        temp.splice(index, 1, {
          ...item,
          isClosed: true,
        });
        //   loadData(item.categoryName, item.clientType);
        setClients([...temp]);
        alert("Клиент успешно скрыт");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-window__list-item" key={index}>
      <span>
        <div className="main-window__mobile-text">Название: </div>
        {item.name}
      </span>
      <span>
        <div className="main-window__mobile-text">Сайт: </div>
        {/* {item.site} */}
        <a
          className="main-window__link"
          title={item.site}
          href={
            item.site.split("//").length > 1
              ? item.site
              : "https://" + item.site
          }
          target="_blank"
        >
          {item.site.split("//").length > 1
            ? item.site.split("//")[1]
            : item.site}
        </a>
      </span>
      <span>
        <div className="main-window__mobile-text">Контактное лицо: </div>
        {item.contacts?.length > 0
          ? (item.contacts[0].name !== "" ? item.contacts[0].name + ", " : "") +
            item.contacts[0].phoneNumber
          : "Не указаны контакт. данные"}
      </span>
      <span title={item.comment}>
        <div className="main-window__mobile-text">Комментарий: </div>
        {item.comment}
      </span>
      <span>
        <div className="main-window__mobile-text">Дата след. контакта: </div>
        {/* {formatDateString(item.nextDateContact)} */}
        {new Date(item.nextDateContact) < new Date() ? (
          <div className="main-window__reminder">
            <div>!</div>
            <div>{formatDateString(item.nextDateContact)}</div>
          </div>
        ) : (
          formatDateString(item.nextDateContact)
        )}
      </span>
      <div className="main-window__actions">
        {/* <div className="main-window__mobile-text">Действия:</div> */}
        {userContext.userHasAccess(["ROLE_ADMIN"]) && (
          <div
            className="main-window__action"
            title="Добавить в избранных клиентов"
            onClick={() => handleFavouriteClick(item, clients)}
          >
            <img
              className="main-window__img"
              src={item.favorite ? starSVG : starBorderedSVG}
            />
          </div>
        )}
        {userContext.userHasAccess(["ROLE_ADMIN"]) && (
          <div
            className="main-window__action"
            title="Скрыть клиента"
            onClick={() => handleHideClient(item, clients)}
          >
            <img className="main-window__img" src={eyeSVG} />
          </div>
        )}
        <div
          className="main-window__action"
          title="Совершить действие"
          onClick={() => {
            setCloseWindow(false);
            setSelectedItem(item);
            setShowWindow(true);
            setCurForm("workHistory");
          }}
        >
          <img className="main-window__img" src={phoneSVG} />
        </div>
        <div
          className="main-window__action"
          title="Дата следующего контакта"
          onClick={() => {
            setCloseWindow(false);
            setSelectedItem(item);
            setShowWindow(true);
            setCurForm("nextContactDate");
          }}
        >
          <img className="main-window__img" src={calendarSVG} />
        </div>
        <a
          className="main-window__action"
          title="Редактирование клиента"
          href={`/${type}/edit/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="main-window__img" src={editSVG} />
        </a>
        {userContext.userHasAccess(["ROLE_ADMIN"]) && (
          <div
            className="main-window__action"
            title="Удаление клиента"
            onClick={() => {
              deleteItem(item.id, index);
            }}
          >
            <img className="main-window__img" src={deleteSVG} />
          </div>
        )}
      </div>
    </div>
  );
};
