import HomeImg from '../../../assets/sidemenu/home.inline.svg';
import ClientImg from '../../../assets/sidemenu/client.inline.svg';
import SupplierIcon from '../../../assets/sidemenu/supplier_icon.inline.svg';
import PriceListImg from '../../../assets/sidemenu/price.inline.svg';
import PlayListImg from '../../../assets/sidemenu/list-ul.inline.svg';
import MoreImg from '../../../assets/sidemenu/more.inline.svg';
import WrenchImg from '../../../assets/sidemenu/wrench.inline.svg';
import TasksImg from '../../../assets/sidemenu/round-task-alt.inline.svg';
import EmployeesImg from '../../../assets/sidemenu/employee.inline.svg';
import TruckImg from '../../../assets/sidemenu/truck.inline.svg';
import BoxImg from '../../../assets/sidemenu/product.inline.svg';
import FeedbackImg from '../../../assets/sidemenu/feedback.inline.svg';
import ListImg from '../../../assets/sidemenu/list.inline.svg';
import ScrewImg from '../../../assets/sidemenu/screw.inline.svg';
import FactoryIcon from '../../../assets/sidemenu/factory.inline.svg';

const allRoles = [
  'ROLE_ADMIN',
  'ROLE_DISPATCHER',
  'ROLE_MANAGER',
  'ROLE_WORKSHOP',
  'ROLE_ENGINEER',
];

export const mainPage = {
  pathname: '/',
  mainRoles: allRoles,
  addButtonRoles: allRoles,
  addButtonName: 'Учесть рабочее время',
  linkTo: '/',
  addButtonLinkTo: '/work-management/record-time',
  name: 'Главная',
  renderIcon: function () {
    <HomeImg className="sidemenu__img" />;
  },
};

export const generalTasks = {
  pathname: '/dispatcher/general-tasks',
  name: 'Основные задачи',
  mainRoles: allRoles,
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить задачу',
  renderIcon: function () {
    <TasksImg width="20" className="sidemenu__img" />;
  },
};

export const clients = {
  pathname: '/clients',
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonName: 'Добавить клиента',
  addButtonLinkTo: '/clients/new',
  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  name: 'Клиенты',
  renderIcon: function () {
    <ClientImg className="sidemenu__img" />;
  },
  dropdownMenu: [],
};

export const suppliers = {
  pathname: '/suppliers',
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonName: 'Добавить поставщика',
  addButtonLinkTo: '/suppliers/new',
  mainRoles: allRoles,
  name: 'Поставщики',
  renderIcon: function () {
    <SupplierIcon className="sidemenu__img" />;
  },
  dropdownMenu: [],
};

export const workManagement = {
  pathname: '/work-management',
  addButtonLinkTo: '/work-management/record-time',
  mainRoles: allRoles,
  addButtonRoles: allRoles,
  addButtonName: 'Учесть рабочее время',
};

export const requests = {
  pathname: '/requests',
  linkTo: '/requests/open',
  name: 'Заявки',
  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonName: 'Добавить заявку',
  renderIcon: function () {
    <PlayListImg className="sidemenu__img sidemenu__img--request" />;
  },
};

export const products = {
  pathname: '/products',
  name: 'Продукция',
  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonName: 'Добавить продукцию',
  renderIcon: function () {
    <BoxImg className="sidemenu__img sidemenu__img--product" />;
  },
};

export const priceList = {
  pathname: '/price-list',
  name: 'Каталог продукции',
  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  renderIcon: function () {
    <PriceListImg className="sidemenu__img sidemenu__img--price" />;
  },
};

export const workshopLEMZ = {
  pathname: '/lemz/workshop-lemz',
  mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  addButtonName: 'Добавить план производства',
};

export const reportTable = {
  pathname: '/report-table',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER'],
  addButtonName: 'Учесть рабочее время',
  addButtonLinkTo: '/work-management/record-time',
};

export const workshopLigosvkiy = {
  pathname: '/ligovskiy/',
  linkTo: '/rigging-list',
  mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY', 'ROLE_DISPATCHER'],
  name: 'ЦехЛиговский',
  renderIcon: function () {
    <FactoryIcon className="sidemenu__img sidemenu__img--factory" />;
  },
  iconClassName: 'sidemenu__img',
  dropdownMenu: [
    {
      name: 'Очередь инструментального производства',
      pathname: '/rigging-list',
      link: '/rigging-list',
      renderIcon: function () {
        <ListImg className="sidemenu__img" />;
      },
      mainRoles: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY'],
    },
  ],
};

export const workshopLepsari = {
  pathname: '/lepsari/workshop-lepsari',
  mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  addButtonName: 'Добавить план производства',
};

export const lepsariDropdown = [
  {
    name: 'Очередь производства',
    pathname: '/lepsari/workshop-lepsari',
    link: '/lepsari/workshop-lepsari',
    renderIcon: function () {
      <PlayListImg className="sidemenu__img sidemenu__img--request" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  },
  {
    name: 'Очередь инструментального производства',
    pathname: '/rigging-list',
    link: '/rigging-list',
    renderIcon: function () {
      <ListImg className="sidemenu__img" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  },
  {
    name: 'Склад',
    pathname: '/lepsari/workshop-storage',
    link: '/lepsari/workshop-storage',
    renderIcon: function () {
      <BoxImg className="sidemenu__img sidemenu__img--product" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  },
  {
    name: 'Комплектация цеха',
    pathname: '/lepsari/workshop-orders',
    link: '/lepsari/workshop-orders',
    renderIcon: function () {
      <ScrewImg className="sidemenu__img" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
  },
];

export const lemzDropdown = [
  {
    name: 'Очередь производства',
    pathname: '/lemz/workshop-lemz',
    link: '/lemz/workshop-lemz',
    renderIcon: function () {
      <PlayListImg className="sidemenu__img sidemenu__img--request" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  },
  {
    name: 'Очередь инструментального производства',
    pathname: '/rigging-list',
    link: '/rigging-list',
    renderIcon: function () {
      <ListImg className="sidemenu__img" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  },
  {
    name: 'Склад',
    pathname: '/lemz/workshop-storage',
    link: '/lemz/workshop-storage',
    renderIcon: function () {
      <BoxImg className="sidemenu__img sidemenu__img--product" />;
    },
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  },
  {
    name: 'Комплектация цеха',
    pathname: '/lemz/workshop-orders',
    link: '/lemz/workshop-orders',
    mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
    renderIcon: function () {
      <ScrewImg className="sidemenu__img" />;
    },
  },
];

export const storageLemz = {
  pathname: '/lemz/workshop-storage',
  mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEMZ'],
  addButtonName: 'Добавить деталь',
};

export const storageLepsari = {
  pathname: '/lepsari/workshop-storage',
  mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI'],
  addButtonName: 'Добавить деталь',
};

export const rigging = {
  pathname: '/dispatcher/rigging/',
  linkTo: '/dispatcher/rigging/stamp',
  mainRoles: [
    'ROLE_ADMIN',
    'ROLE_DISPATCHER',
    'ROLE_ENGINEER',
    'ROLE_WORKSHOP',
  ],
  name: 'Оснастка',
  renderIcon: function () {
    <WrenchImg className="sidemenu__img" />;
  },
};

export const stamp = {
  pathname: '/dispatcher/rigging/stamp',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить штамп',
};

export const machine = {
  pathname: '/dispatcher/rigging/machine',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить станок',
};

export const pressForm = {
  pathname: '/dispatcher/rigging/press-form',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить пресс-форму',
};

export const parts = {
  pathname: '/dispatcher/rigging/parts',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить запчасть',
};

export const users = {
  pathname: '/profile/users',
  mainRoles: ['ROLE_ADMIN'],
  addButtonRoles: ['ROLE_ADMIN'],
  addButtonName: 'Добавить пользователя',
};

export const ltdList = {
  pathname: '/ltd-list',
  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  addButtonName: 'Добавить ООО',
};

export const employees = {
  pathname: '/dispatcher/employees',
  name: 'Сотрудники',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить сотрудника',
  renderIcon: function () {
    <EmployeesImg className="sidemenu__img sidemenu__img--employees" />;
  },
};

export const transportation = {
  pathname: '/dispatcher/transportation',
  name: 'Реестр транспортировок',
  mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
  addButtonName: 'Добавить запись',
  renderIcon: function () {
    <TruckImg className="sidemenu__img sidemenu__img--truck" />;
  },
};

export const feedback = {
  pathname: '/feedback',
  name: 'Сообщить об ошибке',
  mainRoles: allRoles,
  addButtonRoles: allRoles,
  addButtonName: 'Оставить сообщение',
  renderIcon: function () {
    <FeedbackImg className="sidemenu__img" />;
  },
};

export const etcetera = {
  pathname: '/etcetera',
  name: 'Остальное',
  mainRoles: allRoles,
  renderIcon: function () {
    <MoreImg className="sidemenu__img" />;
  },
};

export const packaging = {
  pathname: '/packaging',
  mainRoles: ['ROLE_ADMIN'],
  addButtonRoles: ['ROLE_ADMIN'],
  addButtonName: 'Создать упаковку',
};
