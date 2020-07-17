import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import plusImg from '../../../../../../assets/sidemenu/plus.png';
import plusImg from '../../../../../../assets/sidemenu/plus.svg'
import homeImg from '../../../../../../assets/sidemenu/home.svg'
import tasksImg from '../../../../../../assets/sidemenu/tasks.svg'
import employeesImg from '../../../../../../assets/sidemenu/employee.svg'
import wrenchImg from '../../../../../../assets/sidemenu/wrench.svg'
import truckImg from '../../../../../../assets/sidemenu/truck.svg'
import priceListImg from '../../../../../../assets/sidemenu/price.svg'
import clientImg from '../../../../../../assets/sidemenu/client.svg'
import contractImg from '../../../../../../assets/sidemenu/contract.svg'
import listImg from '../../../../../../assets/sidemenu/list.svg'
import boxImg from '../../../../../../assets/sidemenu/box.svg'
import screwImg from '../../../../../../assets/sidemenu/screw.svg'
import feedbackImg from '../../../../../../assets/sidemenu/feedback.svg'
import moreImg from '../../../../../../assets/sidemenu/more.svg'
import playListImg from '../../../../../../assets/sidemenu/play_list.svg'
import factoryIcon from '../../../../../../assets/sidemenu/factory.svg'
import supplierIcon from '../../../../../../assets/sidemenu/supplier_icon.svg'
import './SideMenu.scss'
import { getClientCategories } from '../../utils/RequestsAPI/Clients/Categories.jsx'

const SideMenu = (props) => {
  const [curPath, setCurPath] = useState('/')
  const [sidemenuItems, setSidemenuItems] = useState([
    {
      pathname: '/',
      mainRoles: [
        'ROLE_ADMIN',
        'ROLE_MANAGER',
        'ROLE_WORKSHOP',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
      ],
      addButtonRoles: [
        'ROLE_ADMIN',
        'ROLE_MANAGER',
        'ROLE_DISPATCHER',
        'ROLE_LEMZ',
        'ROLE_LEPSARI',
        'ROLE_LIGOVSKIY',
        'ROLE_ENGINEER',
      ],
      addButtonName: 'Учесть рабочее время',
      linkTo: '/',
      addButtonLinkTo: '/work-management/record-time/new',
      name: 'Главная',
      icon: homeImg,
    },
    {
      pathname: '/clients',
      linkTo: props.location.pathname,
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addButtonName: 'Добавить клиента',
      addButtonLinkTo: '/clients/new',
      mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      name: 'Клиенты',
      icon: clientImg,
      dropdownMenu: [],
    },
    {
      pathname: '/suppliers',
      linkTo: props.location.pathname,
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addButtonName: 'Добавить поставщика',
      addButtonLinkTo: '/suppliers/new',
      mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      name: 'Поставщики',
      icon: supplierIcon,
      dropdownMenu: [],
    },
    {
      pathname: '/work-management',
      addButtonLinkTo: '/work-management/record-time/new',
      mainRoles: [
        'ROLE_ADMIN',
        'ROLE_MANAGER',
        'ROLE_DISPATCHER',
        'ROLE_LEMZ',
        'ROLE_LEPSARI',
        'ROLE_LIGOVSKIY',
        'ROLE_ENGINEER',
      ],
      addButtonRoles: [
        'ROLE_ADMIN',
        'ROLE_MANAGER',
        'ROLE_DISPATCHER',
        'ROLE_LEMZ',
        'ROLE_LEPSARI',
        'ROLE_LIGOVSKIY',
        'ROLE_ENGINEER',
      ],
      addButtonName: 'Учесть рабочее время',
    },
    // {
    //     pathname: "/contracts",
    //     mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
    //     name: "Договоры",
    //     icon: contractImg,
    //     iconClassName: 'sidemenu__img--bigger'
    // },
    {
      pathname: '/requests',
      name: 'Заявки',
      mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addButtonName: 'Добавить заявку',
      icon: playListImg,
    },
    {
      pathname: '/products',
      name: 'Продукция',
      mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      addButtonName: 'Добавить продукцию',
      icon: boxImg,
      iconClassName: 'sidemenu__img--bigger',
    },
    {
      pathname: '/price-list',
      name: 'Каталог продукции',
      mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      icon: priceListImg,
    },
    {
      pathname: '/lemz/',
      linkTo: props.userHasAccess(['ROLE_DISPATCHER'])
        ? '/lemz/workshop-orders'
        : '/lemz/workshop-lemz',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
      name: 'ЦехЛЭМЗ',
      icon: factoryIcon,
      iconClassName: 'sidemenu__img--bigger',
      dropdownMenu: [
        {
          name: 'Очередь производства',
          pathname: '/lemz/workshop-lemz',
          link: '/lemz/workshop-lemz',
          icon: playListImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
        },
        {
          name: 'Очередь инструментального производства',
          pathname: '/dispatcher/rigging/parts',
          link: '/dispatcher/rigging/parts',
          icon: listImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
        },
        {
          name: 'Склад',
          pathname: '/lemz/workshop-storage',
          link: '/lemz/workshop-storage',
          icon: boxImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
        },
        {
          name: 'Комплектация цеха',
          pathname: '/lemz/workshop-orders',
          link: '/lemz/workshop-orders',
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
          icon: screwImg,
        },
      ],
    },
    {
      pathname: '/lemz/workshop-lemz',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
      addButtonName: 'Добавить план производства',
    },
    {
      pathname: '/lepsari/',
      linkTo: props.userHasAccess(['ROLE_DISPATCHER'])
        ? '/lepsari/workshop-orders'
        : '/lepsari/workshop-lepsari',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
      name: 'ЦехЛепсари',
      icon: factoryIcon,
      iconClassName: 'sidemenu__img--bigger',
      dropdownMenu: [
        {
          name: 'Очередь производства',
          pathname: '/lepsari/workshop-lepsari',
          link: '/lepsari/workshop-lepsari',
          icon: playListImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
        },
        {
          name: 'Очередь инструментального производства',
          pathname: '/dispatcher/rigging/parts',
          link: '/dispatcher/rigging/parts',
          icon: listImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
        },
        {
          name: 'Склад',
          pathname: '/lepsari/workshop-storage',
          link: '/lepsari/workshop-storage',
          icon: boxImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
        },
        {
          name: 'Комплектация цеха',
          pathname: '/lepsari/workshop-orders',
          link: '/lepsari/workshop-orders',
          icon: screwImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
        },
      ],
    },
    {
      pathname: '/ligovskiy/',
      // linkTo: props.userHasAccess(['ROLE_DISPATCHER'])
      //   ? '/ligovskiy/orders'
      //   : '/ligovskiy/workshop',
      linkTo: '/dispatcher/rigging/parts',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY', 'ROLE_DISPATCHER'],
      name: 'ЦехЛиговский',
      icon: factoryIcon,
      iconClassName: 'sidemenu__img--bigger',
      dropdownMenu: [
        // {
        //   name: 'Очередь производства',
        //   pathname: '/ligovskiy/workshop',
        //   link: '/ligovskiy/workshop',
        //   icon: listImg,
        //   mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'],
        // },
        {
          name: 'Очередь инструментального производства',
          pathname: '/dispatcher/rigging/parts',
          link: '/dispatcher/rigging/parts',
          icon: listImg,
          mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'],
        },
        // {
        //   name: 'Склад',
        //   pathname: '/ligovskiy/storage',
        //   link: '/ligovskiy/storage',
        //   icon: boxImg,
        //   mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'],
        // },
        // {
        //   name: 'Комплектация цеха',
        //   pathname: '/ligovskiy/orders',
        //   link: '/ligovskiy/orders',
        //   icon: screwImg,
        //   mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY', 'ROLE_DISPATCHER'],
        // },
      ],
    },
    {
      pathname: '/lepsari/workshop-lepsari',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
      addButtonName: 'Добавить план производства',
    },
    {
      pathname: '/lemz/workshop-storage',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
      addButtonName: 'Добавить деталь',
    },
    {
      pathname: '/lepsari/workshop-storage',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
      addButtonName: 'Добавить деталь',
    },
    {
      pathname: '/dispatcher/rigging/',
      linkTo: '/dispatcher/rigging/stamp',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      name: 'Оснастка',
      icon: wrenchImg,
      // iconClassName: 'sidemenu__img--bigger'
    },
    {
      pathname: '/dispatcher/rigging/stamp',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить штамп',
    },
    {
      pathname: '/dispatcher/rigging/machine',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить станок',
    },
    {
      pathname: '/dispatcher/rigging/press-form',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить пресс-форму',
    },
    {
      pathname: '/dispatcher/rigging/parts',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить запчасть',
    },
    {
      pathname: '/profile/users',
      mainRoles: ['ROLE_ADMIN'],
      addButtonRoles: ['ROLE_ADMIN'],
      addButtonName: 'Добавить пользователя',
    },
    {
      pathname: '/dispatcher/general-tasks',
      name: 'Основные задачи',
      mainRoles: [
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_MANAGER',
        'ROLE_WORKSHOP',
      ],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить задачу',
      icon: tasksImg,
      iconClassName: 'sidemenu__img--bigger',
    },
    {
      pathname: '/dispatcher/employees',
      name: 'Сотрудники',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить сотрудника',
      icon: employeesImg,
      iconClassName: 'sidemenu__img--bigger',
    },
    {
      pathname: '/dispatcher/transportation',
      name: 'Реестр транспортировок',
      mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
      addButtonName: 'Добавить запись',
      icon: truckImg,
    },
    // {
    //   pathname: '/work-list',
    //   name: 'Список работ',
    //   mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
    //   addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
    //   addButtonName: 'Добавить работу',
    //   icon: listImg,
    // },
    {
      pathname: '/feedback',
      name: 'Обратная связь',
      mainRoles: [
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_MANAGER',
        'ROLE_WORKSHOP',
      ],
      addButtonRoles: [
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_MANAGER',
        'ROLE_WORKSHOP',
      ],
      addButtonName: 'Оставить сообщение',
      icon: feedbackImg,
    },
    {
      pathname: '/etcetera',
      name: 'Разное',
      mainRoles: [
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_MANAGER',
        'ROLE_ENGINEER',
      ],
      icon: moreImg,
    },
    {
      pathname: '/packaging',
      mainRoles: ['ROLE_ADMIN'],
      addButtonRoles: ['ROLE_ADMIN'],
      addButtonName: 'Создать упаковку',
    },
  ])

  useEffect(() => {
    async function loadClientCategories() {
      getClientCategories()
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          let temp = sidemenuItems
          temp.splice(1, 1, {
            ...temp[1],
            linkTo: `/clients/category/${res[res.length - 1].name}/active`,
            dropdownMenu: [
              {
                name: 'Создать клиента',
                pathname: '/clients/new',
                link: '/clients/new',
                icon: plusImg,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              {
                name: 'Управление категориями',
                pathname: '/clients/categories',
                link: '/clients/categories',
                icon: contractImg,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              ...res
                .sort((a, b) => {
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) <
                    0
                  ) {
                    return -1
                  }
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) >
                    0
                  ) {
                    return 1
                  }
                  return 0
                })
                .map((item) => {
                  return {
                    name: item.name,
                    pathname: '/clients/category/' + item.name + '/',
                    mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
                    link: '/clients/category/' + item.name + '/active',
                  }
                }),
            ],
            // linkTo: props.location.pathname,
          })
          setSidemenuItems([...temp])
          return temp
        })
    }

    async function loadSuppliersCategories(temp) {
      getClientCategories()
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          let temp = sidemenuItems
          temp.splice(2, 1, {
            ...temp[2],
            linkTo: `/suppliers/category/${res[res.length - 1].name}/active`,
            dropdownMenu: [
              {
                name: 'Создать поставщика',
                pathname: '/suppliers/new',
                link: '/suppliers/new',
                icon: plusImg,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              {
                name: 'Управление категориями',
                pathname: '/suppliers/categories',
                link: '/suppliers/categories',
                icon: contractImg,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              ...res
                .sort((a, b) => {
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) <
                    0
                  ) {
                    return -1
                  }
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) >
                    0
                  ) {
                    return 1
                  }
                  return 0
                })
                .map((item) => {
                  return {
                    name: item.name,
                    pathname: '/suppliers/category/' + item.name + '/',
                    mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
                    link: '/suppliers/category/' + item.name + '/active',
                  }
                }),
            ],
            // linkTo: props.location.pathname,
          })
          setSidemenuItems([...temp])
          return temp
        })
    }

    if (sidemenuItems[1].dropdownMenu.length === 0) {
      loadClientCategories() //client categories are loaded
        .then((temp) => {
          loadSuppliersCategories(temp) //suppliers categories are loaded
        })
    }
  }, [props.location.pathname])

  return (
    <div className={props.hidden ? 'sidemenu sidemenu--hidden' : 'sidemenu'}>
      <div className="sidemenu__add-buttons">
        {sidemenuItems.map((item) => {
          return (
            <Link
              className={
                item.addButtonName &&
                props.userHasAccess(item.addButtonRoles) &&
                props.location.pathname.includes(item.pathname) &&
                item.pathname !== '/'
                  ? 'sidemenu__item--add'
                  : props.location.pathname.length === 1 &&
                    props.location.pathname.includes(item.pathname)
                  ? 'sidemenu__item--add'
                  : 'sidemenu__item--add sidemenu__item--hidden'
              }
              onClick={() => {
                if (
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) < 1220 &&
                  item.dropdownMenu === undefined
                ) {
                  props.setSideMenu(!props.hidden)
                }
              }}
              to={
                item.addButtonLinkTo
                  ? item.addButtonLinkTo
                  : item.pathname + '/new'
              }
            >
              <span>{item.addButtonName}</span>
            </Link>
          )
        })}
      </div>
      {sidemenuItems.map((item) => {
        return (
          props.userHasAccess(item.mainRoles) &&
          item.name && (
            <div
              className={
                props.location.pathname.includes(item.pathname) &&
                item.pathname !== '/'
                  ? 'sidemenu__item sidemenu__item--active'
                  : props.location.pathname.length === 1 &&
                    props.location.pathname.includes(item.pathname)
                  ? 'sidemenu__item sidemenu__item--active'
                  : 'sidemenu__item'
              }
            >
              <Link
                className="sidemenu__link"
                onClick={() => {
                  if (
                    (window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth) < 1220 &&
                    item.dropdownMenu === undefined
                  ) {
                    props.setSideMenu(!props.hidden)
                  }
                }}
                to={item.linkTo ? item.linkTo : item.pathname}
              >
                {item.icon && (
                  <img
                    className={
                      item.iconClassName
                        ? 'sidemenu__img sidemenu__img--icon ' +
                          item.iconClassName
                        : 'sidemenu__img sidemenu__img--icon'
                    }
                    src={item.icon}
                    alt=""
                  />
                )}
                {item.name}
              </Link>
              {item.addButtonName &&
                item.pathname !== '/' &&
                props.userHasAccess(item.addButtonRoles) && (
                  <Link
                    to={item.pathname + '/new'}
                    onClick={() => {
                      if (
                        (window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth) < 1220
                      ) {
                        props.setSideMenu(!props.hidden)
                      }
                    }}
                    className="sidemenu__addButton"
                  >
                    <img className="sidemenu__img" src={plusImg} />
                  </Link>
                )}
              {item.dropdownMenu && (
                <div className="sidemenu__dropdown-menu">
                  {item.dropdownMenu.map((dropdownMenuItem) => {
                    if (props.userHasAccess(dropdownMenuItem.mainRoles)) {
                      return (
                        <Link
                          className={
                            props.location.pathname.includes(
                              dropdownMenuItem.pathname,
                            ) && dropdownMenuItem.pathname !== '/'
                              ? 'sidemenu__item sidemenu__item--active'
                              : props.location.pathname.length === 1 &&
                                props.location.pathname.includes(
                                  dropdownMenuItem.pathname,
                                )
                              ? 'sidemenu__item sidemenu__item--active'
                              : 'sidemenu__item'
                          }
                          to={dropdownMenuItem.link}
                          onClick={() => {
                            if (
                              (window.innerWidth ||
                                document.documentElement.clientWidth ||
                                document.body.clientWidth) < 1220
                            ) {
                              props.setSideMenu(!props.hidden)
                            }
                          }}
                        >
                          <div className="sidemenu__link">
                            {dropdownMenuItem.icon && (
                              <img
                                className={
                                  dropdownMenuItem.iconClassName
                                    ? 'sidemenu__img ' +
                                      dropdownMenuItem.iconClassName
                                    : 'sidemenu__img'
                                }
                                src={dropdownMenuItem.icon}
                                alt=""
                              />
                            )}
                            {dropdownMenuItem.name}
                          </div>
                        </Link>
                      )
                    }
                  })}
                </div>
              )}
            </div>
          )
        )
      })}
    </div>
  )
}

export default withRouter(SideMenu)
