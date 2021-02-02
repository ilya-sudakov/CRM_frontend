import React, { Suspense } from "react";
import PrivateRoute from "../../PrivateRoute/PrivateRoute.jsx";
import { Route, Switch, Link } from "react-router-dom";
import PlusImg from "../../../../../../../assets/sidemenu/plus.inline.svg";
import "./Lepsari.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";
import PageLoading from "../PageLoading/PageLoading.jsx";
import {
  WorkshopLepsari,
  StorageLepsari,
  NewStorageLepsari,
  EditStorageLepsari,
  EditWorkshopOrderLepsari,
  ViewWorkshopOrderLepsari,
  NewWorkshopOrderLepsari,
  WorkshopOrdersLepsari,
  NewRequest,
  EditRequest,
  ShipRequest,
} from "../lazyImports.jsx";

const Lepsari = (props) => {
  return (
    <div className="requests-lepsari">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Цех Лепсари</div>
          <div className="main-window__menu">
            <Link
              to="/lepsari/workshop-lepsari"
              className={
                props.location.pathname.includes(
                  "/lepsari/workshop-lepsari"
                ) === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Очередь производства
              <Link
                to="/lepsari/workshop-lepsari/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
            <Link
              to="/lepsari/workshop-storage"
              className={
                props.location.pathname.includes(
                  "/lepsari/workshop-storage"
                ) === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Склад
              <Link
                to="/lepsari/workshop-storage/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
            <Link
              to="/lepsari/workshop-orders"
              className={
                props.location.pathname.includes("/lepsari/workshop-orders") ===
                true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Комплектация Цеха
              <Link
                to="/lepsari/workshop-orders/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
          </div>
        </div>
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
                component={WorkshopLepsari}
                userHasAccess={props.userHasAccess}
                allowedRoles={[
                  "ROLE_ADMIN",
                  // 'ROLE_DISPATCHER',
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
                ]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-storage"
                component={StorageLepsari}
                userHasAccess={props.userHasAccess}
                allowedRoles={[
                  "ROLE_ADMIN",
                  // 'ROLE_DISPATCHER',
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
                ]}
              />
              <PrivateRoute
                exact
                path="/lepsari/workshop-storage/new"
                component={NewStorageLepsari}
                userHasAccess={props.userHasAccess}
                userData={props.userData}
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
              />
              <PrivateRoute
                path="/lepsari/workshop-storage/edit/"
                component={EditStorageLepsari}
                userHasAccess={props.userHasAccess}
                userData={props.userData}
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
                component={WorkshopOrdersLepsari}
                userHasAccess={props.userHasAccess}
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
                component={NewWorkshopOrderLepsari}
                userHasAccess={props.userHasAccess}
                // transferState={props.transferState}
                // transferData={props.transferData}
                // setTransferState={props.setTransferState}
                // setTransferData={props.setTransferData}
                allowedRoles={[
                  "ROLE_ADMIN",
                  // 'ROLE_DISPATCHER',
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
                ]}
              />
              <PrivateRoute
                path="/lepsari/workshop-orders/view/"
                component={ViewWorkshopOrderLepsari}
                userHasAccess={props.userHasAccess}
                // transferState={props.transferState}
                // transferData={props.transferData}
                // setTransferState={props.setTransferState}
                // setTransferData={props.setTransferData}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_LEPSARI",
                ]}
              />
              <PrivateRoute
                path="/lepsari/workshop-orders/edit/"
                component={EditWorkshopOrderLepsari}
                userHasAccess={props.userHasAccess}
                // transferState={props.transferState}
                // transferData={props.transferData}
                // setTransferState={props.setTransferState}
                // setTransferData={props.setTransferData}
                allowedRoles={["ROLE_ADMIN", "ROLE_DISPATCHER"]}
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
