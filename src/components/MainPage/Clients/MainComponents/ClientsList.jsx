import { useContext, useEffect } from 'react';
import editSVG from 'Assets/tableview/edit.svg';
import starSVG from 'Assets/tableview/star.svg';
import starBorderedSVG from 'Assets/tableview/star_border.svg';
import phoneSVG from 'Assets/tableview/phone.svg';
import calendarSVG from 'Assets/tableview/calendar.svg';
import eyeSVG from 'Assets/tableview/eye-invisible-outlined.svg';
import { formatDateString } from 'Utils/functions.jsx';
import { sortClients } from './functions.js';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import UserContext from '../../../../App.js';

const ClientsList = ({
  isLoading,
  itemsPerPage,
  clients,
  searchQuery,
  sortOrder,
  deleteItem,
  type,
  setCloseWindow,
  setSelectedItem,
  setShowWindow,
  setCurForm,
  editItemFunction,
  setClients,
}) => {
  const userContext = useContext(UserContext);
  console.log(isLoading);

  return (
    <div className="main-window__list main-window__list--full">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Название</span>
        <span>Сайт</span>
        <span>Контакты</span>
        <span>Комментарий</span>
        <span>След. контакт</span>
        <div className="main-window__table-actions"></div>
      </div>
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="main-window__list-item"
          minHeight="50px"
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
        alert('Клиент успешно скрыт');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionsList = [
    {
      title: item.favorite
        ? 'Убрать из избранных клиентов'
        : 'Добавить в избранных клиентов',
      onClick: () => handleFavouriteClick(item, clients),
      imgSrc: item.favorite ? starSVG : starBorderedSVG,
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
    {
      title: 'Скрыть клиента',
      onClick: () => handleHideClient(item, clients),
      imgSrc: eyeSVG,
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
    {
      title: 'Совершить действие',
      onClick: () => {
        setCloseWindow(false);
        setSelectedItem(item);
        setShowWindow(true);
        setCurForm('workHistory');
      },
      imgSrc: phoneSVG,
    },
    {
      title: 'Дата следующего контакта',
      onClick: () => {
        setCloseWindow(false);
        setSelectedItem(item);
        setShowWindow(true);
        setCurForm('nextContactDate');
      },
      imgSrc: calendarSVG,
    },
    {
      title: 'Редактирование клиента',
      link: `/${type}/edit/${item.id}`,
      openInNewTab: true,
      imgSrc: editSVG,
    },
    {
      customElement: (
        <DeleteItemAction
          title="Удаление клиента"
          onClick={() => deleteItem(item.id, index)}
        />
      ),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];

  return (
    <div className="main-window__list-item" key={index}>
      <span>
        <div className="main-window__mobile-text">Название: </div>
        {item.name}
      </span>
      <span>
        <div className="main-window__mobile-text">Сайт: </div>
        <a
          className="main-window__link"
          title={item.site}
          href={
            item.site.split('//').length > 1
              ? item.site
              : 'https://' + item.site
          }
          target="_blank"
        >
          {item.site.split('//').length > 1
            ? item.site.split('//')[1]
            : item.site}
        </a>
      </span>
      <span
        title={
          item.contacts?.length > 0
            ? (item.contacts[0].name !== ''
                ? item.contacts[0].name + ', '
                : '') + item.contacts[0].phoneNumber
            : 'Не указаны контакт. данные'
        }
      >
        <div className="main-window__mobile-text">Контактное лицо: </div>
        {item.contacts?.length > 0
          ? (item.contacts[0].name !== '' ? item.contacts[0].name + ', ' : '') +
            item.contacts[0].phoneNumber
          : 'Не указаны контакт. данные'}
      </span>
      <span title={item.comment}>
        <div className="main-window__mobile-text">Комментарий: </div>
        {item.comment}
      </span>
      <span>
        <div className="main-window__mobile-text">Дата след. контакта: </div>
        {new Date(item.nextDateContact) < new Date() ? (
          <div className="main-window__reminder">
            <div>!</div>
            <div>{formatDateString(item.nextDateContact)}</div>
          </div>
        ) : (
          formatDateString(item.nextDateContact)
        )}
      </span>
      <TableActions actionsList={actionsList} />
    </div>
  );
};
