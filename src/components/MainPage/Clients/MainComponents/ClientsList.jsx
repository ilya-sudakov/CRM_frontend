import { useContext } from 'react';
import editSVG from 'Assets/tableview/edit.svg';
import starSVG from 'Assets/tableview/star.svg';
import starBorderedSVG from 'Assets/tableview/star_border.svg';
import phoneSVG from 'Assets/tableview/phone.svg';
import calendarSVG from 'Assets/tableview/calendar.svg';
import eyeSVG from 'Assets/tableview/eye-invisible-outlined.svg';
import { formatDateString } from 'Utils/functions.jsx';
import { sortClients } from './functions.js';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import UserContext from '../../../../App.js';
import Table from '../../../Table/Table.jsx';

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

  const getURL = (site) =>
    site && site?.split('//')?.length > 1 ? site : `https://${site}`;
  const formatContacts = (contacts) =>
    contacts?.length > 0
      ? (contacts[0].name !== '' ? `${contacts[0].name}, ` : '') +
        contacts[0].phoneNumber
      : 'Не указаны контакт. данные';

  const columns = [
    { text: 'Название', value: 'name', width: '20%' },
    {
      text: 'Сайт',
      value: 'site',
      link: {
        getURL: getURL,
        isOutside: true,
        newTab: true,
      },
      width: '15%',
    },
    {
      text: 'Контакты',
      value: 'contacts',
      formatFn: formatContacts,
      width: '25%',
    },
    { text: 'Комментарий', value: 'comment', width: '30%' },
    {
      text: 'След. контакт',
      value: 'nextDateContact',
      formatFn: (date) => formatDateString(date),
      width: '10%',
      // maxWidth: '120px',
      badge: {
        isVisibleFn: (date) => new Date(date) < new Date(),
        type: 'error',
      },
    },
  ];

  const handleFavouriteClick = (item, index, clients) => {
    let temp = clients;
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
        setClients([...temp]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHideClient = (item, index, clients) => {
    let temp = clients;
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
        setClients([...temp]);
        alert('Клиент успешно скрыт');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionsList = (item, index) => [
    {
      title: item.favorite
        ? 'Убрать из избранных клиентов'
        : 'Добавить в избранных клиентов',
      onClick: () => handleFavouriteClick(item, index, clients),
      imgSrc: item.favorite ? starSVG : starBorderedSVG,
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
    {
      title: 'Скрыть клиента',
      onClick: () => handleHideClient(item, index, clients),
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
    <Table
      columns={columns}
      data={sortClients(clients, searchQuery, sortOrder)}
      loading={{ isLoading, itemsPerPage }}
      actions={actionsList}
    />
  );
};

export default ClientsList;
