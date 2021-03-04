import FactoryIcon from '../../../assets/sidemenu/factory.inline.svg';

import {
  mainPage,
  generalTasks,
  clients,
  suppliers,
  workManagement,
  requests,
  products,
  priceList,
  lemzDropdown,
  lepsariDropdown,
  workshopLEMZ,
  reportTable,
  workshopLigosvkiy,
  workshopLepsari,
  storageLemz,
  storageLepsari,
  rigging,
  stamp,
  machine,
  pressForm,
  parts,
  users,
  ltdList,
  employees,
  transportation,
  feedback,
  etcetera,
  packaging,
} from './objects.js';

export const getDefaultItems = (userContext) => {
  return [
    mainPage,
    generalTasks,
    clients,
    suppliers,
    workManagement,
    requests,
    products,
    priceList,
    {
      pathname: '/lemz/',
      linkTo: userContext.userHasAccess(['ROLE_DISPATCHER'])
        ? '/lemz/workshop-orders'
        : '/lemz/workshop-lemz',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
      name: 'ЦехЛЭМЗ',
      renderIcon: () => (
        <FactoryIcon className="sidemenu__img sidemenu__img--factory" />
      ),
      iconClassName: 'sidemenu__img',
      dropdownMenu: lemzDropdown,
    },
    workshopLEMZ,
    reportTable,
    {
      pathname: '/lepsari/',
      linkTo: userContext.userHasAccess(['ROLE_DISPATCHER'])
        ? '/lepsari/workshop-orders'
        : '/lepsari/workshop-lepsari',
      mainRoles: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
      name: 'ЦехЛепсари',
      renderIcon: () => (
        <FactoryIcon className="sidemenu__img sidemenu__img--factory" />
      ),
      iconClassName: 'sidemenu__img',
      dropdownMenu: lepsariDropdown,
    },
    workshopLigosvkiy,
    workshopLepsari,
    storageLemz,
    storageLepsari,
    rigging,
    stamp,
    machine,
    pressForm,
    parts,
    users,
    ltdList,
    employees,
    transportation,
    feedback,
    etcetera,
    packaging,
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
