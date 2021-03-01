import React, { Suspense } from "react";
import PrivateRoute from "../../PrivateRoute/PrivateRoute.jsx";
import { Route, Switch, Link } from "react-router-dom";
import PlusImg from "../../../../assets/sidemenu/plus.inline.svg";
import "./Lepsari.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";
import PageLoading from "../PageLoading/PageLoading.jsx";
import {
  WorkshopRequests,
  Storage,
  NewStorage,
  EditStorage,
  EditWorkshopOrder,
  NewWorkshopOrder,
  WorkshopOrders,
  NewRequest,
  EditRequest,
  ShipRequest,
} from "../lazyImports.jsx";
import useTitleHeader from "../../../utils/hooks/uiComponents/useTitleHeader.js";

const Lepsari = (props) => {
  const menuItems = [
    {
      pageName: "/lepsari/workshop-lepsari",
      isActive: props.location.pathname.includes("/lepsari/workshop-lepsari"),
      pageTitle: (
        <>
          Очередь производства
          <Link
            to="/lepsari/workshop-lepsari/new"
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: "/lepsari/workshop-lepsari",
    },
    {
      pageName: "/lepsari/workshop-storage",
      isActive: props.location.pathname.includes("/lepsari/workshop-storage"),
      pageTitle: (
        <>
          Склад
          <Link
            to="/lepsari/workshop-storage/new"
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: "/lepsari/workshop-storage",
    },
    {
      pageName: "/lepsari/workshop-orders",
      isActive: props.location.pathname.includes("/lepsari/workshop-orders"),
      pageTitle: (
        <>
          Комплектация Цеха
          <Link
            to="/lepsari/workshop-orders/new"
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
      link: "/lepsari/workshop-orders",
    },
  ];
  const { titleHeader } = useTitleHeader(
    "Цех Лепсари",
    menuItems,
    "/lepsari/workshop-lepsari"
  );

  return (
    <div className="lepsari">
      <div className="main-window">
        {titleHeader}
        <div className="main-window__content">
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <PrivateRoute
                exact
                path="/lepsari/workshop-lepsari/new"
                component={NewRequest}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-lepsari/edit/"
                component={EditRequest}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-lepsari/"
                component={WorkshopRequests}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-storage"
                component={Storage}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-storage/new"
                component={NewStorage}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-storage/edit/"
                component={EditStorage}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-lepsari/ship/"
                component={ShipRequest}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-orders"
                component={WorkshopOrders}
                type="lepsari"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
                ]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-orders/new"
                component={NewWorkshopOrder}
                type="lepsari"
                allowedRoles={["ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-orders/edit/"
                component={EditWorkshopOrder}
                type="lepsari"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
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

export default Lepsari;
