import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import HomeImg from "../../../../../../assets/sidemenu/home.inline.svg";
import ClientImg from "../../../../../../assets/sidemenu/client.inline.svg";
import SupplierIcon from "../../../../../../assets/sidemenu/supplier_icon.inline.svg";
import PriceListImg from "../../../../../../assets/sidemenu/price.inline.svg";
// import PlayListImg from "../../../../../../assets/sidemenu/play_list.inline.svg";
import PlayListImg from "../../../../../../assets/sidemenu/list-ul.inline.svg";
import PlusImg from "../../../../../../assets/sidemenu/plus.inline.svg";
import MoreImg from "../../../../../../assets/sidemenu/more.inline.svg";
import WrenchImg from "../../../../../../assets/sidemenu/wrench.inline.svg";
import TasksImg from "../../../../../../assets/sidemenu/round-task-alt.inline.svg";
import EmployeesImg from "../../../../../../assets/sidemenu/employee.inline.svg";
import TruckImg from "../../../../../../assets/sidemenu/truck.inline.svg";
import FactoryIcon from "../../../../../../assets/sidemenu/factory.inline.svg";
import BoxImg from "../../../../../../assets/sidemenu/product.inline.svg";
import FeedbackImg from "../../../../../../assets/sidemenu/feedback.inline.svg";
import ContractImg from "../../../../../../assets/sidemenu/contract.inline.svg";
import ListImg from "../../../../../../assets/sidemenu/list.inline.svg";
import ScrewImg from "../../../../../../assets/sidemenu/screw.inline.svg";

import "./SideMenu.scss";
import {
  getClientCategories,
  getSupplierCategories,
} from "../../utils/RequestsAPI/Clients/Categories.js";
import UserContext from "../../App.js";

const SideMenu = (props) => {
  const userContext = useContext(UserContext);
  const [sidemenuItems, setSidemenuItems] = useState([
    {
      pathname: "/",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_MANAGER",
        "ROLE_WORKSHOP",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
      ],
      addButtonRoles: [
        "ROLE_ADMIN",
        "ROLE_MANAGER",
        "ROLE_DISPATCHER",
        "ROLE_LEMZ",
        "ROLE_LEPSARI",
        "ROLE_LIGOVSKIY",
        "ROLE_ENGINEER",
      ],
      addButtonName: "Учесть рабочее время",
      linkTo: "/",
      addButtonLinkTo: "/work-management/record-time/new",
      name: "Главная",
      renderIcon: () => <HomeImg className="sidemenu__img" />,
    },
    {
      pathname: "/dispatcher/general-tasks",
      name: "Основные задачи",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
        "ROLE_MANAGER",
        "ROLE_WORKSHOP",
      ],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить задачу",
      renderIcon: () => <TasksImg width="20" className="sidemenu__img" />,
    },
    {
      pathname: "/clients",
      linkTo: props.location.pathname,
      addButtonRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      addButtonName: "Добавить клиента",
      addButtonLinkTo: "/clients/new",
      mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      name: "Клиенты",
      renderIcon: () => <ClientImg className="sidemenu__img" />,
      dropdownMenu: [],
    },
    {
      pathname: "/suppliers",
      linkTo: props.location.pathname,
      addButtonRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      addButtonName: "Добавить поставщика",
      addButtonLinkTo: "/suppliers/new",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_MANAGER",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
        "ROLE_WORKSHOP",
      ],
      name: "Поставщики",
      renderIcon: () => <SupplierIcon className="sidemenu__img" />,
      dropdownMenu: [],
    },
    {
      pathname: "/work-management",
      addButtonLinkTo: "/work-management/record-time/new",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_MANAGER",
        "ROLE_DISPATCHER",
        "ROLE_LEMZ",
        "ROLE_LEPSARI",
        "ROLE_LIGOVSKIY",
        "ROLE_ENGINEER",
      ],
      addButtonRoles: [
        "ROLE_ADMIN",
        "ROLE_MANAGER",
        "ROLE_DISPATCHER",
        "ROLE_LEMZ",
        "ROLE_LEPSARI",
        "ROLE_LIGOVSKIY",
        "ROLE_ENGINEER",
      ],
      addButtonName: "Учесть рабочее время",
    },
    {
      pathname: "/requests",
      linkTo: "/requests/open",
      name: "Заявки",
      mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      addButtonName: "Добавить заявку",
      renderIcon: () => (
        <PlayListImg className="sidemenu__img sidemenu__img--request" />
      ),
    },
    {
      pathname: "/products",
      name: "Продукция",
      mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_WORKSHOP"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      addButtonName: "Добавить продукцию",
      renderIcon: () => (
        <BoxImg className="sidemenu__img sidemenu__img--product" />
      ),
    },
    {
      pathname: "/price-list",
      name: "Каталог продукции",
      mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      renderIcon: () => (
        <PriceListImg className="sidemenu__img sidemenu__img--price" />
      ),
    },
    {
      pathname: "/lemz/",
      linkTo: userContext.userHasAccess(["ROLE_DISPATCHER"])
        ? "/lemz/workshop-orders"
        : "/lemz/workshop-lemz",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ", "ROLE_DISPATCHER"],
      name: "ЦехЛЭМЗ",
      renderIcon: () => (
        <FactoryIcon className="sidemenu__img sidemenu__img--factory" />
      ),
      iconClassName: "sidemenu__img",
      dropdownMenu: [
        {
          name: "Очередь производства",
          pathname: "/lemz/workshop-lemz",
          link: "/lemz/workshop-lemz",
          // icon: playListImg,
          renderIcon: () => (
            <PlayListImg className="sidemenu__img sidemenu__img--request" />
          ),
          mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
        },
        {
          name: "Очередь инструментального производства",
          // pathname: '/dispatcher/rigging/parts',
          // link: '/dispatcher/rigging/parts',
          pathname: "/rigging-list",
          link: "/rigging-list",
          renderIcon: () => <ListImg className="sidemenu__img" />,
          mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
        },
        {
          name: "Склад",
          pathname: "/lemz/workshop-storage",
          link: "/lemz/workshop-storage",
          renderIcon: () => (
            <BoxImg className="sidemenu__img sidemenu__img--product" />
          ),
          mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
        },
        {
          name: "Комплектация цеха",
          pathname: "/lemz/workshop-orders",
          link: "/lemz/workshop-orders",
          mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ", "ROLE_DISPATCHER"],
          renderIcon: () => <ScrewImg className="sidemenu__img" />,
        },
      ],
    },
    {
      pathname: "/lemz/workshop-lemz",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
      addButtonName: "Добавить план производства",
    },
    {
      pathname: "/report-table",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER"],
      addButtonName: "Учесть рабочее время",
    },
    {
      pathname: "/lepsari/",
      linkTo: userContext.userHasAccess(["ROLE_DISPATCHER"])
        ? "/lepsari/workshop-orders"
        : "/lepsari/workshop-lepsari",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI", "ROLE_DISPATCHER"],
      name: "ЦехЛепсари",
      renderIcon: () => (
        <FactoryIcon className="sidemenu__img sidemenu__img--factory" />
      ),
      iconClassName: "sidemenu__img",
      dropdownMenu: [
        {
          name: "Очередь производства",
          pathname: "/lepsari/workshop-lepsari",
          link: "/lepsari/workshop-lepsari",
          renderIcon: () => (
            <PlayListImg className="sidemenu__img sidemenu__img--request" />
          ),
          mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
        },
        {
          name: "Очередь инструментального производства",
          // pathname: '/dispatcher/rigging/parts',
          // link: '/dispatcher/rigging/parts',
          pathname: "/rigging-list",
          link: "/rigging-list",
          renderIcon: () => <ListImg className="sidemenu__img" />,
          mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
        },
        {
          name: "Склад",
          pathname: "/lepsari/workshop-storage",
          link: "/lepsari/workshop-storage",
          renderIcon: () => (
            <BoxImg className="sidemenu__img sidemenu__img--product" />
          ),
          mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
        },
        {
          name: "Комплектация цеха",
          pathname: "/lepsari/workshop-orders",
          link: "/lepsari/workshop-orders",
          renderIcon: () => <ScrewImg className="sidemenu__img" />,
          mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI", "ROLE_DISPATCHER"],
        },
      ],
    },
    {
      pathname: "/ligovskiy/",
      // linkTo: userContext.userHasAccess(['ROLE_DISPATCHER'])
      //   ? '/ligovskiy/orders'
      //   : '/ligovskiy/workshop',
      // linkTo: '/dispatcher/rigging/parts',
      linkTo: "/rigging-list",
      mainRoles: ["ROLE_ADMIN", "ROLE_LIGOVSKIY", "ROLE_DISPATCHER"],
      name: "ЦехЛиговский",
      renderIcon: () => (
        <FactoryIcon className="sidemenu__img sidemenu__img--factory" />
      ),
      iconClassName: "sidemenu__img",
      dropdownMenu: [
        {
          name: "Очередь инструментального производства",
          // pathname: '/dispatcher/rigging/parts',
          // link: '/dispatcher/rigging/parts',
          pathname: "/rigging-list",
          link: "/rigging-list",
          renderIcon: () => <ListImg className="sidemenu__img" />,
          mainRoles: ["ROLE_ADMIN", "ROLE_LIGOVSKIY"],
        },
      ],
    },
    {
      pathname: "/lepsari/workshop-lepsari",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
      addButtonName: "Добавить план производства",
    },
    {
      pathname: "/lemz/workshop-storage",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
      addButtonName: "Добавить деталь",
    },
    {
      pathname: "/lepsari/workshop-storage",
      mainRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"],
      addButtonName: "Добавить деталь",
    },
    {
      pathname: "/dispatcher/rigging/",
      linkTo: "/dispatcher/rigging/stamp",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
        "ROLE_WORKSHOP",
      ],
      name: "Оснастка",
      renderIcon: () => <WrenchImg className="sidemenu__img" />,
      // iconClassName: 'sidemenu__img--bigger'
    },
    {
      pathname: "/dispatcher/rigging/stamp",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить штамп",
    },
    {
      pathname: "/dispatcher/rigging/machine",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить станок",
    },
    {
      pathname: "/dispatcher/rigging/press-form",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить пресс-форму",
    },
    {
      pathname: "/dispatcher/rigging/parts",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить запчасть",
    },
    {
      pathname: "/profile/users",
      mainRoles: ["ROLE_ADMIN"],
      addButtonRoles: ["ROLE_ADMIN"],
      addButtonName: "Добавить пользователя",
    },
    {
      pathname: "/dispatcher/employees",
      name: "Сотрудники",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить сотрудника",
      renderIcon: () => (
        <EmployeesImg className="sidemenu__img sidemenu__img--employees" />
      ),
    },
    {
      pathname: "/dispatcher/transportation",
      name: "Реестр транспортировок",
      mainRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_ENGINEER"],
      addButtonName: "Добавить запись",
      renderIcon: () => (
        <TruckImg className="sidemenu__img sidemenu__img--truck" />
      ),
    },
    {
      pathname: "/feedback",
      name: "Обратная связь",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
        "ROLE_MANAGER",
        "ROLE_WORKSHOP",
      ],
      addButtonRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_ENGINEER",
        "ROLE_MANAGER",
        "ROLE_WORKSHOP",
      ],
      addButtonName: "Оставить сообщение",
      renderIcon: () => <FeedbackImg className="sidemenu__img" />,
    },
    {
      pathname: "/etcetera",
      name: "Остальное",
      mainRoles: [
        "ROLE_ADMIN",
        "ROLE_DISPATCHER",
        "ROLE_MANAGER",
        "ROLE_WORKSHOP",
        "ROLE_ENGINEER",
      ],
      renderIcon: () => <MoreImg className="sidemenu__img" />,
    },
    {
      pathname: "/packaging",
      mainRoles: ["ROLE_ADMIN"],
      addButtonRoles: ["ROLE_ADMIN"],
      addButtonName: "Создать упаковку",
    },
  ]);

  useEffect(() => {
    async function loadClientCategories() {
      getClientCategories()
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          const clientsIndex = 2;
          let temp = sidemenuItems;
          temp.splice(clientsIndex, 1, {
            ...temp[clientsIndex],
            linkTo: `/clients/${
              res.length > 0
                ? "category/" + res[res.length - 1].name + "/active"
                : "categories"
            }`,
            dropdownMenu: [
              {
                name: "Создать клиента",
                pathname: "/clients/new",
                link: "/clients/new",
                // icon: plusImg,
                renderIcon: () => <PlusImg className="sidemenu__img" />,
                mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
              },
              {
                name: "Управление категориями",
                pathname: "/clients/categories",
                link: "/clients/categories",
                renderIcon: () => <ContractImg className="sidemenu__img" />,
                mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
              },
              ...res
                .sort((a, b) => {
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) <
                    0
                  ) {
                    return -1;
                  }
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) >
                    0
                  ) {
                    return 1;
                  }
                  return 0;
                })
                .map((item) => {
                  return {
                    name: item.name,
                    pathname: "/clients/category/" + item.name + "/",
                    mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
                    link: "/clients/category/" + item.name + "/active",
                  };
                }),
            ],
            // linkTo: props.location.pathname,
          });
          setSidemenuItems([...temp]);
          return temp;
        });
    }

    async function loadSuppliersCategories() {
      getSupplierCategories()
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          const suppliersIndex = 3;
          let temp = sidemenuItems;
          temp.splice(suppliersIndex, 1, {
            ...temp[suppliersIndex],
            linkTo: `/suppliers/${
              res.length > 0
                ? "category/" + res[res.length - 1].name + "/active"
                : "categories"
            }`,
            dropdownMenu: [
              {
                name: "Создать поставщика",
                pathname: "/suppliers/new",
                link: "/suppliers/new",
                renderIcon: () => <PlusImg className="sidemenu__img" />,
                mainRoles: [
                  "ROLE_ADMIN",
                  "ROLE_MANAGER",
                  "ROLE_DISPATCHER",
                  "ROLE_WORKSHOP",
                  "ROLE_ENGINEER",
                ],
              },
              {
                name: "Управление категориями",
                pathname: "/suppliers/categories",
                link: "/suppliers/categories",
                renderIcon: () => <ContractImg className="sidemenu__img" />,
                mainRoles: ["ROLE_ADMIN", "ROLE_MANAGER"],
              },
              ...res
                .sort((a, b) => {
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) <
                    0
                  ) {
                    return -1;
                  }
                  if (
                    a.name.localeCompare(b.name, undefined, { numeric: true }) >
                    0
                  ) {
                    return 1;
                  }
                  return 0;
                })
                .map((item) => {
                  return {
                    name: item.name,
                    pathname: "/suppliers/category/" + item.name + "/",
                    mainRoles: [
                      "ROLE_ADMIN",
                      "ROLE_MANAGER",
                      "ROLE_DISPATCHER",
                      "ROLE_WORKSHOP",
                      "ROLE_ENGINEER",
                    ],
                    link: "/suppliers/category/" + item.name + "/active",
                  };
                }),
            ],
            // linkTo: props.location.pathname,
          });
          setSidemenuItems([...temp]);
          return temp;
        });
    }

    if (sidemenuItems[2].dropdownMenu.length === 0) {
      loadClientCategories() //client categories are loaded
        .then((temp) => {
          loadSuppliersCategories(temp); //suppliers categories are loaded
        });
    }
  }, [props.location.pathname]);

  return (
    <div className={props.hidden ? "sidemenu sidemenu--hidden" : "sidemenu"}>
      <div className="sidemenu__add-buttons">
        {sidemenuItems.map((item) => {
          return (
            <Link
              className={
                item.addButtonName &&
                userContext.userHasAccess(item.addButtonRoles) &&
                props.location.pathname.includes(item.pathname) &&
                item.pathname !== "/"
                  ? "sidemenu__item--add"
                  : props.location.pathname.length === 1 &&
                    props.location.pathname.includes(item.pathname)
                  ? "sidemenu__item--add"
                  : "sidemenu__item--add sidemenu__item--hidden"
              }
              onClick={() => {
                if (
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) <= 1024 &&
                  item.dropdownMenu === undefined
                ) {
                  props.setSideMenu(!props.hidden);
                }
              }}
              to={
                item.addButtonLinkTo
                  ? item.addButtonLinkTo
                  : item.pathname + "/new"
              }
            >
              <span>{item.addButtonName}</span>
            </Link>
          );
        })}
      </div>
      {sidemenuItems.map((item) => {
        return (
          userContext.userHasAccess(item.mainRoles) &&
          item.name && (
            <div
              className={
                props.location.pathname.includes(item.pathname) &&
                item.pathname !== "/"
                  ? "sidemenu__item sidemenu__item--active"
                  : props.location.pathname.length === 1 &&
                    props.location.pathname.includes(item.pathname)
                  ? "sidemenu__item sidemenu__item--active"
                  : "sidemenu__item"
              }
            >
              <Link
                className="sidemenu__link"
                onClick={() => {
                  if (
                    (window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth) <= 1024 &&
                    item.dropdownMenu === undefined
                  ) {
                    props.setSideMenu(!props.hidden);
                  }
                }}
                to={item.linkTo ? item.linkTo : item.pathname}
              >
                {item.renderIcon && item.renderIcon()}
                <span>{item.name}</span>
              </Link>
              {item.addButtonName &&
                item.pathname !== "/" &&
                userContext.userHasAccess(item.addButtonRoles) && (
                  <Link
                    to={item.pathname + "/new"}
                    onClick={() => {
                      if (
                        (window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth) <= 1024
                      ) {
                        props.setSideMenu(!props.hidden);
                      }
                    }}
                    className="sidemenu__addButton"
                  >
                    {/* <img className="sidemenu__img" src={plusImg} /> */}
                    <PlusImg className="sidemenu__img" />
                  </Link>
                )}
              {item.dropdownMenu && (
                <div className="sidemenu__dropdown-menu">
                  {item.dropdownMenu.map((dropdownMenuItem) => {
                    if (userContext.userHasAccess(dropdownMenuItem.mainRoles)) {
                      return (
                        <Link
                          className={
                            props.location.pathname.includes(
                              dropdownMenuItem.pathname
                            ) && dropdownMenuItem.pathname !== "/"
                              ? "sidemenu__item sidemenu__item--active"
                              : props.location.pathname.length === 1 &&
                                props.location.pathname.includes(
                                  dropdownMenuItem.pathname
                                )
                              ? "sidemenu__item sidemenu__item--active"
                              : "sidemenu__item"
                          }
                          to={dropdownMenuItem.link}
                          onClick={() => {
                            if (
                              (window.innerWidth ||
                                document.documentElement.clientWidth ||
                                document.body.clientWidth) <= 1024
                            ) {
                              props.setSideMenu(!props.hidden);
                            }
                          }}
                        >
                          <div className="sidemenu__link">
                            {dropdownMenuItem.renderIcon &&
                              dropdownMenuItem.renderIcon()}
                            {dropdownMenuItem.name}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )
        );
      })}
    </div>
  );
};

export default withRouter(SideMenu);
