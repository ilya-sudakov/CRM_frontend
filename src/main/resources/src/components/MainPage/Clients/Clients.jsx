import React, { useState, useEffect } from 'react'
import './Clients.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import '../../../utils/Form/Form.scss'
import viewSVG from '../../../../../../../assets/tableview/view.svg'
import editSVG from '../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../assets/tableview/delete.svg'
import starSVG from '../../../../../../../assets/tableview/star.svg'
import starBorderedSVG from '../../../../../../../assets/tableview/star_border.svg'
import phoneSVG from '../../../../../../../assets/tableview/phone.svg'
import calendarSVG from '../../../../../../../assets/tableview/calendar.svg'
import {
  getClients,
  deleteClient,
  getClientsByCategoryAndType,
  editNextContactDateClient,
  searchClients,
  editClient,
} from '../../../utils/RequestsAPI/Clients.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import { Link } from 'react-router-dom'
import { formatDateString } from '../../../utils/functions.jsx'
import { deleteClientLegalEntity } from '../../../utils/RequestsAPI/Clients/LegalEntity.jsx'
import { deleteClientContact } from '../../../utils/RequestsAPI/Clients/Contacts.jsx'
import {
  deleteClientWorkHistory,
  editClientWorkHistory,
  addClientWorkHistory,
} from '../../../utils/RequestsAPI/Clients/WorkHistory.jsx'
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx'
import InputDate from '../../../utils/Form/InputDate/InputDate.jsx'
import SelectWorkHistory from './SelectWorkHistory/SelectWorkHistory.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'
import { exportClientsEmailsCSV } from '../../../utils/xlsxFunctions.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import { getSuppliersByCategoryAndType } from '../../../utils/RequestsAPI/Clients/Suppliers'
import PlaceholderLoading from '../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const Clients = (props) => {
  const [clients, setClients] = useState([])
  const [curCategory, setCurCategory] = useState('')
  const [curClientType, setCurClientType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState([1])
  const [curPage, setCurPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(0)
  const [itemsActiveCount, setItemsActiveCount] = useState(0)
  const [itemsPotentialCount, setItemsPotentialCount] = useState(0)
  const [itemsProgressCount, setItemsProgressCount] = useState(0)
  const [curForm, setCurForm] = useState('nextContactDate')
  const [showWindow, setShowWindow] = useState(false)
  const [closeWindow, setCloseWindow] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'name',
    name: 'asc',
    nextDateContact: 'asc',
  })

  const deleteItem = (clientId, index) => {
    Promise.all(
      clients[index].legalEntities.map((item) => {
        return clientTypes[props.type].deleteLegalEntityFunction(item.id)
      }),
    )
      .then(() => {
        Promise.all(
          clients[index].contacts.map((item) => {
            return clientTypes[props.type].deleteContactsFunction(item.id)
          }),
        ).then(() => {
          Promise.all(
            clients[index].histories.map((item) => {
              return clientTypes[props.type].deleteWorkHistoryFunction(item.id)
            }),
          ).then(() => {
            clientTypes[props.type].deleteItemFunction(clientId).then(() => {
              let temp = clients
              temp.splice(index, 1)
              setClients([...temp])
              // console.log('deleted successfully');
            })
          })
        })
      })
      .catch((error) => {
        alert('Ошибка при удалении')
        console.log(error)
      })
  }

  const loadClientsTotalByType = (category) => {
    return clientTypes[props.type]
      .loadItemsByCategory(
        {
          categoryName: category,
          clientType: 'Активные',
        },
        1,
        1,
        sortOrder,
      )
      .then((res) => res.json())
      .then((res) => {
        setItemsActiveCount(res.totalElements)
        return clientTypes[props.type]
          .loadItemsByCategory(
            {
              categoryName: category,
              clientType: 'Потенциальные',
            },
            1,
            1,
            sortOrder,
          )
          .then((res) => res.json())
          .then((res) => {
            setItemsPotentialCount(res.totalElements)
            return clientTypes[props.type]
              .loadItemsByCategory(
                {
                  categoryName: category,
                  clientType: 'В разработке',
                },
                1,
                1,
                sortOrder,
              )
              .then((res) => res.json())
              .then((res) => {
                setItemsProgressCount(res.totalElements)
              })
          })
      })
  }

  const loadData = (category, type, signal) => {
    // console.log(category, type);
    setSearchQuery('')
    setIsLoading(true)
    clientTypes[props.type]
      .loadItemsByCategory(
        {
          categoryName: category,
          clientType:
            type === 'active'
              ? 'Активные'
              : type === 'potential'
              ? 'Потенциальные'
              : 'В разработке',
        },
        curPage,
        itemsPerPage,
        sortOrder,
        signal,
      )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setClients(res.content)
        // console.log(Math.ceil(res.totalElements / itemsPerPage));
        if (curPage < 5 && searchQuery === '') {
          // setItemsCount(res.length);
          setItemsCount(res.totalElements)
          let temp = []
          let i = 1
          do {
            temp.push(i)
            i++
          } while (i <= Math.ceil(res.totalElements / itemsPerPage) && i <= 5)
          setPagination(temp)
        }
        setIsLoading(false)
      })
  }

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const clientTypes = {
    clients: {
      name: 'клиент',
      title: 'Клиенты',
      type: null,
      loadItemsByCategory: (
        category,
        curPage,
        itemsPerPage,
        sortOrder,
        signal,
      ) =>
        getClientsByCategoryAndType(
          category,
          curPage,
          itemsPerPage,
          sortOrder,
          signal,
        ),
      editItemFunction: (newClient, id) => editClient(newClient, id),
      deleteItemFunction: (id) => deleteClient(id),
      editWorkHistoryFunction: (newWorkHistory, id) =>
        editClientWorkHistory(newWorkHistory, id),
      editNextContactDateFunction: (date) => editNextContactDateClient(date),
      addWorkHistoryFunction: (newWorkHistory) =>
        addClientWorkHistory(newWorkHistory),
      deleteWorkHistoryFunction: (id) => deleteClientWorkHistory(id),
      deleteContactsFunction: (id) => deleteClientContact(id),
      deleteLegalEntityFunction: (id) => deleteClientLegalEntity(id),
    },
    suppliers: {
      name: 'поставщик',
      title: 'Поставщики',
      type: 'supplier',
      loadItemsByCategory: (
        category,
        curPage,
        itemsPerPage,
        sortOrder,
        signal,
      ) =>
        getSuppliersByCategoryAndType(
          category,
          curPage,
          itemsPerPage,
          sortOrder,
          signal,
        ),
      editItemFunction: (newClient, id) => editClient(newClient, id),
      deleteItemFunction: (id) => deleteClient(id),
      editWorkHistoryFunction: (newWorkHistory, id) =>
        editClientWorkHistory(newWorkHistory, id),
      editNextContactDateFunction: (date) => editNextContactDateClient(date),
      addWorkHistoryFunction: (newWorkHistory) =>
        addClientWorkHistory(newWorkHistory),
      deleteWorkHistoryFunction: (id) => deleteClientWorkHistory(id),
      deleteContactsFunction: (id) => deleteClientContact(id),
      deleteLegalEntityFunction: (id) => deleteClientLegalEntity(id),
    },
  }

  const getEmailsExcel = () => {
    setIsLoading(true)
    let totalClients = 1
    let clients = []
    getClients(1)
      .then((res) => res.json())
      .then((res) => {
        totalClients = res.totalElements
        return getClients(totalClients)
      })
      .then((res) => res.json())
      .then((res) => {
        clients = res.content
        console.log(clients)
        exportClientsEmailsCSV(clients)
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    document.title = clientTypes[props.type].title
    const abortController = new AbortController()
    // console.log(curPage);
    const curCategoryTemp = props.location.pathname
      .split('/category/')[1]
      .split('/')[0]
    const curClientTypeTemp = props.location.pathname
      .split('/category/')[1]
      .split('/')[1]
    if (
      curCategoryTemp !== curCategory ||
      curClientTypeTemp !== curClientType
    ) {
      setCurPage(1)
    }
    setCurCategory(curCategoryTemp)
    setCurClientType(curClientTypeTemp)
    if (searchQuery === '') {
      loadClientsTotalByType(curCategoryTemp)
      loadData(curCategoryTemp, curClientTypeTemp, abortController.signal)
    }
    return function cancel() {
      abortController.abort()
    }
  }, [props.location, curPage, sortOrder, itemsPerPage, props.type])

  return (
    <div className="clients">
      <div className="main-window">
        <FloatingPlus
          linkTo={'/' + props.type + '/new'}
          visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>{curCategory}</span>
            <Button
              text="Выгрузить эл. почты"
              isLoading={isLoading}
              className="main-window__button main-window__button--inverted"
              inverted
              onClick={getEmailsExcel}
            />
          </div>
          <div className="main-window__menu">
            <Link
              to={'/' + props.type + '/category/' + curCategory + '/active'}
              className={
                props.location.pathname.includes('active') === true
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
            >
              <div>
                Активные
                <span className="main-window__menu-item-amount">
                  {itemsActiveCount}
                </span>
              </div>
            </Link>
            <Link
              to={'/' + props.type + '/category/' + curCategory + '/potential'}
              className={
                props.location.pathname.includes('potential') === true
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
            >
              <div>
                Потенциальные
                <span className="main-window__menu-item-amount">
                  {itemsPotentialCount}
                </span>
              </div>
            </Link>
            <Link
              to={
                '/' + props.type + '/category/' + curCategory + '/in-progress'
              }
              className={
                props.location.pathname.includes('in-progress') === true
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
            >
              <div>
                В разработке
                <span className="main-window__menu-item-amount">
                  {itemsProgressCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <SearchBar
          // title="Поиск по клиентам"
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onButtonClick={(query) => {
            setIsLoading(true)
            // console.log(query);
            if (query === '') {
              loadData(curCategory, curClientType)
            } else {
              searchClients({
                name: query,
                type: clientTypes[props.type].type,
              })
                .then((res) => res.json())
                .then((res) => {
                  // console.log(res);
                  setClients(res)
                  setItemsCount(res.length)
                  setPagination([1])
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.log(error)
                  setIsLoading(false)
                })
            }
          }}
        />
        <FormWindow
          title={
            curForm === 'nextContactDate'
              ? 'Дата следующего контакта'
              : 'Запись действия'
          }
          content={
            <React.Fragment>
              {curForm === 'nextContactDate' ? (
                <EditNextContactDate
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  loadData={loadData}
                  editNextContactDate={
                    clientTypes[props.type].editNextContactDateFunction
                  }
                />
              ) : (
                <EditWorkHistory
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  userHasAccess={props.userHasAccess}
                  addWorkHistory={
                    clientTypes[props.type].addWorkHistoryFunction
                  }
                  editWorkHistory={
                    clientTypes[props.type].editWorkHistoryFunction
                  }
                  deleteWorkHistory={
                    clientTypes[props.type].deleteWorkHistoryFunction
                  }
                />
              )}
            </React.Fragment>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <div className="main-window__info-panel">
          <div className="main-window__amount_table">
            Всего: {itemsCount} записей
          </div>
        </div>
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="name asc">По алфавиту (А-Я)</option>
            <option value="name desc">По алфавиту (Я-А)</option>
            <option value="nextDateContact asc">По дате след. контакта</option>
          </select>
        </div>
        <div className="main-window__list">
          {/* <TableLoading isLoading={isLoading} /> */}
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Сайт</span>
            <span>Контакты</span>
            <span>Комментарий</span>
            <span>Дата след. контакта</span>
            <div className="main-window__actions">Действие</div>
          </div>
          {isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="40px"
              items={itemsPerPage}
            />
          )}
          {clients
            //.filter(item => {
            //    return (
            //        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //        item.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //        item.comment.toLowerCase().includes(searchQuery.toLowerCase())
            //    )
            //})
            .sort((a, b) => {
              if (searchQuery !== '') {
                if (sortOrder.curSort === 'nextDateContact') {
                  if (
                    new Date(a[sortOrder.curSort]) <
                    new Date(b[sortOrder.curSort])
                  ) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
                  }
                  if (
                    new Date(a[sortOrder.curSort]) >
                    new Date(b[sortOrder.curSort])
                  ) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
                  }
                  return 0
                } else {
                  if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
                  }
                  if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
                  }
                  return 0
                }
              }
            })
            .map((item, index) => {
              return (
                <div className="main-window__list-item">
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
                        item.site.split('//').length > 1
                          ? item.site
                          : 'http://' + item.site
                      }
                      target="_blank"
                    >
                      {item.site.split('//').length > 1
                        ? item.site.split('//')[1]
                        : item.site}
                    </a>
                  </span>
                  <span>
                    <div className="main-window__mobile-text">
                      Контактное лицо:{' '}
                    </div>
                    {item.contacts?.length > 0
                      ? (item.contacts[0].name !== ''
                          ? item.contacts[0].name + ', '
                          : '') + item.contacts[0].phoneNumber
                      : 'Не указаны контакт. данные'}
                  </span>
                  <span title={item.comment}>
                    <div className="main-window__mobile-text">
                      Комментарий:{' '}
                    </div>
                    {item.comment}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">
                      Дата след. контакта:{' '}
                    </div>
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
                    {props.userHasAccess(['ROLE_ADMIN']) && (
                      <div
                        className="main-window__action"
                        title="Добавить в избранных клиентов"
                        onClick={() => {
                          let temp = clients
                          //   console.log(item);
                          let newClient = Object.assign({
                            type: item.type,
                            categoryId: item.category.id,
                            check: item.check,
                            clientType: item.clientType,
                            comment: item.comment,
                            manager: item.manager,
                            name: item.name,
                            nextDateContact:
                              new Date(item.nextDateContact).getTime() / 1000,
                            price: item.price,
                            site: item.site,
                            storageAddress: item.storageAddress,
                            workCondition: item.workCondition,
                            favorite: !item.favorite,
                          })
                          clientTypes[props.type]
                            .editItemFunction(newClient, item.id)
                            .then(() => {
                              temp.splice(index, 1, {
                                ...item,
                                favorite: !item.favorite,
                              })
                              //   loadData(item.categoryName, item.clientType);
                              setClients([...temp])
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        }}
                      >
                        <img
                          className="main-window__img"
                          src={item.favorite ? starSVG : starBorderedSVG}
                        />
                      </div>
                    )}
                    <div
                      className="main-window__action"
                      title="Совершить действие"
                      onClick={() => {
                        setCloseWindow(false)
                        setSelectedItem(item)
                        setShowWindow(true)
                        setCurForm('workHistory')
                      }}
                    >
                      <img className="main-window__img" src={phoneSVG} />
                    </div>
                    <div
                      className="main-window__action"
                      title="Дата следующего контакта"
                      onClick={() => {
                        setCloseWindow(false)
                        setSelectedItem(item)
                        setShowWindow(true)
                        setCurForm('nextContactDate')
                      }}
                    >
                      <img className="main-window__img" src={calendarSVG} />
                    </div>
                    <div
                      className="main-window__action"
                      title="Просмотр клиента"
                      onClick={() => {
                        props.history.push(`/${props.type}/view/${item.id}`)
                      }}
                    >
                      <img className="main-window__img" src={viewSVG} />
                    </div>
                    <div
                      className="main-window__action"
                      title="Редактирование клиента"
                      onClick={() => {
                        props.history.push(`/${props.type}/edit/${item.id}`)
                      }}
                    >
                      <img className="main-window__img" src={editSVG} />
                    </div>
                    {props.userHasAccess(['ROLE_ADMIN']) && (
                      <div
                        className="main-window__action"
                        title="Удаление клиента"
                        onClick={() => {
                          deleteItem(item.id, index)
                        }}
                      >
                        <img className="main-window__img" src={deleteSVG} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="main-window__pagination">
          <div className="main-window__sort-panel">
            <span>Кол-во элем. на странице: </span>
            <select
              value={itemsPerPage}
              onChange={(event) => {
                const value = event.target.value
                setItemsPerPage(value)
              }}
            >
              <option>20</option>
              <option>15</option>
              <option>10</option>
            </select>
          </div>
          <div
            className="main-window__page-number main-window__page-number--skip"
            onClick={() => {
              if (curPage > 1) {
                const item = curPage - 1
                setCurPage(item)
                if (Math.floor(itemsCount / itemsPerPage) > 5) {
                  if (pagination.indexOf(item) === 0 && item !== 1) {
                    let temp = []
                    for (
                      let i = pagination[0] - 1;
                      i <= Math.floor(itemsCount / itemsPerPage) &&
                      i <= pagination[pagination.length - 1] - 1;
                      i++
                    ) {
                      temp.push(i)
                    }
                    return setPagination(temp)
                  }
                  if (
                    pagination.indexOf(item) === pagination.length - 1 &&
                    item !== Math.floor(itemsCount / itemsPerPage)
                  ) {
                    let temp = []
                    for (
                      let i = pagination[0] + 1;
                      i <= Math.floor(itemsCount / itemsPerPage) &&
                      i <= pagination[pagination.length - 1] + 1;
                      i++
                    ) {
                      temp.push(i)
                    }
                    return setPagination(temp)
                  }
                }
              }
            }}
          >
            Пред
          </div>
          {curPage >= 5 && searchQuery === '' && (
            <React.Fragment>
              <div
                className="main-window__page-number"
                onClick={() => {
                  const item = 1
                  setCurPage(item)
                  if (Math.floor(itemsCount / itemsPerPage) > 5) {
                    if (pagination.indexOf(item) === 0 && item !== 1) {
                      let temp = []
                      for (
                        let i = pagination[0] - 1;
                        i <= Math.floor(itemsCount / itemsPerPage) &&
                        i <= pagination[pagination.length - 1] - 1;
                        i++
                      ) {
                        temp.push(i)
                      }
                      return setPagination(temp)
                    }
                    if (
                      pagination.indexOf(item) === pagination.length - 1 &&
                      item !== Math.floor(itemsCount / itemsPerPage)
                    ) {
                      let temp = []
                      for (
                        let i = pagination[0] + 1;
                        i <= Math.floor(itemsCount / itemsPerPage) &&
                        i <= pagination[pagination.length - 1] + 1;
                        i++
                      ) {
                        temp.push(i)
                      }
                      return setPagination(temp)
                    }
                  }
                }}
              >
                1
              </div>
              <span>...</span>
            </React.Fragment>
          )}
          {pagination.map((item, index) => {
            return (
              <div
                className={
                  curPage == item
                    ? 'main-window__page-number main-window__page-number--active'
                    : 'main-window__page-number'
                }
                onClick={() => {
                  setCurPage(item)
                  if (Math.floor(itemsCount / itemsPerPage) > 5) {
                    if (pagination.indexOf(item) === 0 && item !== 1) {
                      let temp = []
                      for (
                        let i = pagination[0] - 1;
                        i <= Math.floor(itemsCount / itemsPerPage) &&
                        i <= pagination[pagination.length - 1] - 1;
                        i++
                      ) {
                        temp.push(i)
                      }
                      return setPagination(temp)
                    }
                    if (
                      pagination.indexOf(item) === pagination.length - 1 &&
                      item !== Math.ceil(itemsCount / itemsPerPage)
                    ) {
                      let temp = []
                      for (
                        let i = pagination[0] + 1;
                        i <= Math.ceil(itemsCount / itemsPerPage) &&
                        i <= pagination[pagination.length - 1] + 1;
                        i++
                      ) {
                        temp.push(i)
                      }
                      return setPagination(temp)
                    }
                  }
                }}
              >
                {item}
                <div className="main-window__mobile-text">
                  из {Math.ceil(itemsCount / itemsPerPage)}
                </div>
              </div>
            )
          })}
          {curPage <= Math.ceil(itemsCount / itemsPerPage) - 2 &&
            Math.ceil(itemsCount / itemsPerPage) > 5 &&
            pagination.find(
              (item) => item === Math.ceil(itemsCount / itemsPerPage),
            ) === undefined &&
            searchQuery === '' && (
              <React.Fragment>
                <span>...</span>
                {/* {console.log(pagination.find(item => item === Math.ceil(itemsCount / itemsPerPage)))} */}
                <div
                  className="main-window__page-number"
                  onClick={() => {
                    const item = Math.ceil(itemsCount / itemsPerPage)
                    setCurPage(item)
                    console.log(item)
                    if (Math.ceil(itemsCount / itemsPerPage) > 5) {
                      let temp = []
                      for (
                        let i = item - 5;
                        i <= Math.ceil(itemsCount / itemsPerPage);
                        i++
                      ) {
                        temp.push(i)
                      }
                      return setPagination(temp)
                    }
                  }}
                >
                  {Math.ceil(itemsCount / itemsPerPage)}
                </div>
              </React.Fragment>
            )}
          <div
            className="main-window__page-number main-window__page-number--skip"
            onClick={() => {
              if (curPage < Math.ceil(itemsCount / itemsPerPage)) {
                const item = curPage + 1
                setCurPage(item)
                if (Math.ceil(itemsCount / itemsPerPage) >= 5) {
                  if (pagination.indexOf(item) === 0 && item !== 1) {
                    let temp = []
                    for (
                      let i = pagination[0] - 1;
                      i <= Math.ceil(itemsCount / itemsPerPage) &&
                      i <= pagination[pagination.length - 1] - 1;
                      i++
                    ) {
                      temp.push(i)
                    }
                    return setPagination(temp)
                  }
                  if (
                    pagination.indexOf(item) === pagination.length - 1 &&
                    item !== Math.ceil(itemsCount / itemsPerPage)
                  ) {
                    let temp = []
                    for (
                      let i = pagination[0] + 1;
                      i <= Math.ceil(itemsCount / itemsPerPage) &&
                      i <= pagination[pagination.length - 1] + 1;
                      i++
                    ) {
                      temp.push(i)
                    }
                    return setPagination(temp)
                  }
                }
              }
            }}
          >
            След
          </div>
        </div>
      </div>
    </div>
  )
}
export default Clients

const EditNextContactDate = (props) => {
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    props
      .editNextContactDate({
        nextDateContact: new Date(date).getTime() / 1000,
        id: props.selectedItem.id,
      })
      .then(() => {
        setIsLoading(false)
        props.loadData(
          props.selectedItem.category.name,
          props.selectedItem.clientType === 'Активные'
            ? 'active'
            : props.selectedItem.clientType === 'Потенциальные'
            ? 'potential'
            : 'in-progress',
        )
        props.setCloseWindow(!props.closeWindow)
      })
  }

  useEffect(() => {
    if (
      props.selectedItem.nextDateContact &&
      props.setShowWindow &&
      props.closeWindow === true
    ) {
      props.setShowWindow(false)
    } else {
      setDate(props.selectedItem.nextDateContact)
    }
  }, [props.selectedItem, props.closeWindow])

  return (
    <div className="main-form">
      <form className="main-form__form">
        <InputDate
          inputName="Дата след. контакта"
          name="nextContactDate"
          selected={Date.parse(date)}
          handleDateChange={(value) => {
            setDate(value)
          }}
        />
        <div className="main-form__buttons">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => {
              props.setCloseWindow(!props.closeWindow)
            }}
            value="Закрыть"
          />
          <Button
            text="Изменить дату"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

const EditWorkHistory = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [workHistory, setWorkHistory] = useState([])
  const [workHistoryNew, setWorkHistoryNew] = useState([])
  const [clientId, setClientId] = useState(0)

  const handleSubmit = () => {
    setIsLoading(true)
    //PUT if edited, POST if item is new
    const itemsArr = workHistoryNew.map((selected) => {
      let edited = false
      workHistory.map((item) => {
        if (item.id === selected.id) {
          edited = true
          return
        }
      })
      return edited === true
        ? props.editWorkHistory(
            {
              date: selected.date,
              action: selected.action,
              result: selected.result,
              comment: selected.comment,
              clientId: clientId,
            },
            selected.id,
          )
        : props.addWorkHistory({
            date: selected.date,
            action: selected.action,
            result: selected.result,
            comment: selected.comment,
            clientId: clientId,
          })
    })
    Promise.all(itemsArr).then(() => {
      //DELETE items removed by user
      const itemsArr = workHistory.map((item) => {
        let deleted = true
        workHistoryNew.map((selected) => {
          if (selected.id === item.id) {
            deleted = false
            return
          }
        })
        return deleted === true && props.deleteWorkHistory(item.id)
      })
      Promise.all(itemsArr).then(() => {
        setIsLoading(false)
        props.setCloseWindow(!props.closeWindow)
      })
    })
  }

  useEffect(() => {
    if (
      props.selectedItem &&
      props.setShowWindow &&
      props.closeWindow === true
    ) {
      props.setShowWindow(false)
    } else {
      setClientId(props.selectedItem.id)
      setWorkHistory(props.selectedItem.histories)
      setWorkHistoryNew(props.selectedItem.histories)
    }
  }, [props.selectedItem, props.closeWindow])

  return (
    <div className="main-form">
      <form className="main-form__form">
        <div className="main-form__item">
          <SelectWorkHistory
            defaultValue={workHistory}
            userHasAccess={props.userHasAccess}
            handleWorkHistoryChange={(value) => {
              setWorkHistoryNew(value)
            }}
          />
        </div>
        <div className="main-form__buttons">
          <input
            className="main-form__submit main-form__submit--inverted"
            type="submit"
            onClick={() => {
              props.setCloseWindow(!props.closeWindow)
            }}
            value="Закрыть"
          />
          <Button
            text="Сохранить"
            isLoading={isLoading}
            className="main-form__submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}
