import { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import ContractImg from '../../../assets/sidemenu/contract.inline.svg';
import PlusImg from '../../../assets/sidemenu/plus.inline.svg';

import './SideMenu.scss';
import {
  getClientCategories,
  getSupplierCategories,
} from '../../utils/RequestsAPI/Clients/Categories.js';
import UserContext from '../../App.js';
import { getDefaultItems, sortCategories } from './functions';

const SideMenu = (props) => {
  const userContext = useContext(UserContext);
  const [sidemenuItems, setSidemenuItems] = useState(
    getDefaultItems(userContext),
  );

  const isSmallScreen =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) <= 1024;

  useEffect(() => {
    async function loadClientCategories() {
      getClientCategories()
        .then((res) => res.json())
        .then((res) => {
          const clientsIndex = 2;
          let temp = sidemenuItems;
          temp.splice(clientsIndex, 1, {
            ...temp[clientsIndex],
            linkTo: `/clients/${
              res.length > 0
                ? 'category/' + res[res.length - 1].name + '/active'
                : 'categories'
            }`,
            dropdownMenu: [
              {
                name: 'Создать клиента',
                pathname: '/clients/new',
                link: '/clients/new',
                renderIcon: <PlusImg className="sidemenu__img" />,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              {
                name: 'Управление категориями',
                pathname: '/clients/categories',
                link: '/clients/categories',
                renderIcon: <ContractImg className="sidemenu__img" />,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              ...sortCategories(res).map((item) => {
                return {
                  name: item.name,
                  pathname: '/clients/category/' + item.name + '/',
                  mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
                  link: '/clients/category/' + item.name + '/active',
                };
              }),
            ],
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
                ? 'category/' + res[res.length - 1].name + '/active'
                : 'categories'
            }`,
            dropdownMenu: [
              {
                name: 'Создать поставщика',
                pathname: '/suppliers/new',
                link: '/suppliers/new',
                renderIcon: <PlusImg className="sidemenu__img" />,
                mainRoles: [
                  'ROLE_ADMIN',
                  'ROLE_MANAGER',
                  'ROLE_DISPATCHER',
                  'ROLE_WORKSHOP',
                  'ROLE_ENGINEER',
                ],
              },
              {
                name: 'Управление категориями',
                pathname: '/suppliers/categories',
                link: '/suppliers/categories',
                renderIcon: <ContractImg className="sidemenu__img" />,
                mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
              },
              ...sortCategories(res).map((item) => {
                return {
                  name: item.name,
                  pathname: '/suppliers/category/' + item.name + '/',
                  mainRoles: [
                    'ROLE_ADMIN',
                    'ROLE_MANAGER',
                    'ROLE_DISPATCHER',
                    'ROLE_WORKSHOP',
                    'ROLE_ENGINEER',
                  ],
                  link: '/suppliers/category/' + item.name + '/active',
                };
              }),
            ],
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
    <div className={props.hidden ? 'sidemenu sidemenu--hidden' : 'sidemenu'}>
      {/* ADD BUTTONS ON THE TOP */}
      <div className="sidemenu__add-buttons">
        {sidemenuItems.map((item, index) => {
          return (
            <Link
              key={index}
              className={
                item.addButtonName &&
                userContext.userHasAccess(item.addButtonRoles) &&
                props.location.pathname.includes(item.pathname) &&
                item.pathname !== '/'
                  ? 'sidemenu__item--add'
                  : props.location.pathname.length === 1 &&
                    props.location.pathname.includes(item.pathname)
                  ? 'sidemenu__item--add'
                  : 'sidemenu__item--add sidemenu__item--hidden'
              }
              onClick={() =>
                isSmallScreen && item.dropdownMenu === undefined
                  ? props.setSideMenu(!props.hidden)
                  : null
              }
              to={
                item.addButtonLinkTo
                  ? item.addButtonLinkTo
                  : item.pathname + '/new'
              }
            >
              <span>{item.addButtonName}</span>
            </Link>
          );
        })}
      </div>
      {/* LINKS */}
      {sidemenuItems.map((item) => {
        return (
          userContext.userHasAccess(item.mainRoles) &&
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
                onClick={() =>
                  isSmallScreen && item.dropdownMenu === undefined
                    ? props.setSideMenu(!props.hidden)
                    : null
                }
                to={item.linkTo ? item.linkTo : item.pathname}
              >
                {item.renderIcon && item.renderIcon}
                <span>{item.name}</span>
              </Link>
              {item.addButtonName &&
                item.pathname !== '/' &&
                userContext.userHasAccess(item.addButtonRoles) && (
                  <Link
                    to={item.pathname + '/new'}
                    onClick={() =>
                      isSmallScreen ? props.setSideMenu(!props.hidden) : null
                    }
                    className="sidemenu__addButton"
                  >
                    <PlusImg className="sidemenu__img" />
                  </Link>
                )}
              {/* DROPDOWN MENU */}
              {item.dropdownMenu && (
                <div className="sidemenu__dropdown-menu">
                  {item.dropdownMenu.map((dropdownMenuItem) => {
                    if (userContext.userHasAccess(dropdownMenuItem.mainRoles)) {
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
                            if (isSmallScreen) {
                              props.setSideMenu(!props.hidden);
                            }
                          }}
                        >
                          <div className="sidemenu__link">
                            {dropdownMenuItem.renderIcon &&
                              dropdownMenuItem.renderIcon}
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
