import React from "react";

import HomeImg from "../../../../../../assets/sidemenu/home.inline.svg";
import ClientImg from "../../../../../../assets/sidemenu/client.inline.svg";
import SupplierIcon from "../../../../../../assets/sidemenu/supplier_icon.inline.svg";
import PriceListImg from "../../../../../../assets/sidemenu/price.inline.svg";
import PlayListImg from "../../../../../../assets/sidemenu/list-ul.inline.svg";
import MoreImg from "../../../../../../assets/sidemenu/more.inline.svg";
import WrenchImg from "../../../../../../assets/sidemenu/wrench.inline.svg";
import TasksImg from "../../../../../../assets/sidemenu/round-task-alt.inline.svg";
import EmployeesImg from "../../../../../../assets/sidemenu/employee.inline.svg";
import TruckImg from "../../../../../../assets/sidemenu/truck.inline.svg";
import FactoryIcon from "../../../../../../assets/sidemenu/factory.inline.svg";
import BoxImg from "../../../../../../assets/sidemenu/product.inline.svg";
import FeedbackImg from "../../../../../../assets/sidemenu/feedback.inline.svg";
import ListImg from "../../../../../../assets/sidemenu/list.inline.svg";
import ScrewImg from "../../../../../../assets/sidemenu/screw.inline.svg";

export const getDefaultItems = (userContext) => {
  return [
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
          renderIcon: () => (
            <PlayListImg className="sidemenu__img sidemenu__img--request" />
          ),
          mainRoles: ["ROLE_ADMIN", "ROLE_LEMZ"],
        },
        {
          name: "Очередь инструментального производства",
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
  ];
};

export const sortCategories = (categories) => {
  return categories.sort((a, b) => {
    if (a.name.localeCompare(b.name, undefined, { numeric: true }) < 0) {
      return -1;
    }
    if (a.name.localeCompare(b.name, undefined, { numeric: true }) > 0) {
      return 1;
    }
    return 0;
  });
};
