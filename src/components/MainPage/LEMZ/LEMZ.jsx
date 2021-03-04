import React, { Suspense } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import PlusImg from '../../../../assets/sidemenu/plus.inline.svg';
import './LEMZ.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import PageLoading from '../PageLoading/PageLoading.jsx';
import {
  WorkshopRequests,
  Storage,
  NewStorage,
  EditStorage,
  WorkshopOrders,
  NewWorkshopOrder,
  EditWorkshopOrder,
  NewRequest,
  EditRequest,
  ShipRequest,
} from '../lazyImports.jsx';
import useTitleHeader from '../../../utils/hooks/uiComponents/useTitleHeader.js';

const LEMZ = (props) => {
  const menuItems = [
    {
      pageName: '/lemz/workshop-lemz',
      isActive: props.location.pathname.includes('/lemz/workshop-lemz'),
      pageTitle: (
        <>
          Очередь производства
          <Link to="/lemz/workshop-lemz/new" className="main-window__addButton">
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: '/lemz/workshop-lemz',
    },
    {
      pageName: '/lemz/workshop-storage',
      isActive: props.location.pathname.includes('/lemz/workshop-storage'),
      pageTitle: (
        <>
          Склад
          <Link
            to="/lemz/workshop-storage/new"
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: '/lemz/workshop-storage',
    },
    {
      pageName: '/lemz/workshop-orders',
      isActive: props.location.pathname.includes('/lemz/workshop-orders'),
      pageTitle: (
        <>
          Комплектация Цеха
          <Link
            to="/lemz/workshop-orders/new"
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: '/lemz/workshop-orders',
    },
  ];
  const { titleHeader } = useTitleHeader(
    'Цех ЛЭМЗ',
    menuItems,
    '/lemz/workshop-lemz',
  );

  return (
    <div className="lemz">
      <div className="main-window">
        {titleHeader}
        <div className="main-window__content">
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <PrivateRoute
                exact
                path="/lemz/workshop-lemz/new"
                component={NewRequest}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                path="/lemz/workshop-lemz/edit/"
                component={EditRequest}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                path="/lemz/workshop-lemz/ship/"
                component={ShipRequest}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                path="/lemz/workshop-lemz/"
                component={WorkshopRequests}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                exact
                path="/lemz/workshop-storage"
                component={Storage}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                exact
                path="/lemz/workshop-storage/new"
                component={NewStorage}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                path="/lemz/workshop-storage/edit/"
                component={EditStorage}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                exact
                path="/lemz/workshop-orders"
                component={WorkshopOrders}
                type="lemz"
                allowedRoles={[
                  'ROLE_ADMIN',
                  'ROLE_DISPATCHER',
                  'ROLE_ENGINEER',
                  'ROLE_LEMZ',
                ]}
              />
              <PrivateRoute
                exact
                path="/lemz/workshop-orders/new"
                component={NewWorkshopOrder}
                type="lemz"
                allowedRoles={['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_LEMZ']}
              />
              <PrivateRoute
                path="/lemz/workshop-orders/edit/"
                component={EditWorkshopOrder}
                type="lemz"
                allowedRoles={[
                  'ROLE_ADMIN',
                  'ROLE_DISPATCHER',
                  'ROLE_ENGINEER',
                  'ROLE_LEPSARI',
                ]}
              />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LEMZ;
