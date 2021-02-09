import React, { useEffect, useState, Suspense } from "react";
import { Stamp, Parts, Machine, PressForm } from "../../lazyImports.jsx";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute.jsx";
import { Route, Switch, Link } from "react-router-dom";
import PlusImg from "../../../../../../../../assets/sidemenu/plus.inline.svg";
import "./Rigging.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import PageNotFound from "../../PageNotFound/PageNotFound.jsx";
import PageLoading from "../../PageLoading/PageLoading.jsx";
import NewRig from "./RiggingComponents/Forms/NewRig/NewRig.jsx";
import ViewRig from "./RiggingComponents/Forms/ViewRig/ViewRig.jsx";
import EditRig from "./RiggingComponents/Forms/EditRig/EditRig.jsx";

const Rigging = (props) => {
  const [cachedItems, setCachedItems] = useState({
    stamp: {},
    press: {},
    machine: {},
    parts: {},
  });

  useEffect(() => {
    // console.log('cached: ', cachedItems)
  }, [cachedItems]);

  return (
    <div className="rigging">
      <div className="main-window">
        <div
          className={
            props.history.location.pathname.includes("new") ||
            props.history.location.pathname.includes("edit") ||
            props.history.location.pathname.includes("view")
              ? "main-window__header main-window__header--hidden"
              : "main-window__header main-window__header--full"
          }
        >
          <div className="main-window__title">Оснастка</div>
          <div className="main-window__menu">
            <Link
              to="/dispatcher/rigging/stamp"
              className={
                props.location.pathname.includes("stamp") === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Штамп
              <Link
                to="/dispatcher/rigging/stamp/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
            <Link
              to="/dispatcher/rigging/machine"
              className={
                props.location.pathname.includes("machine") === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Станок
              <Link
                to="/dispatcher/rigging/machine/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
            <Link
              to="/dispatcher/rigging/press-form"
              className={
                props.location.pathname.includes("press-form") === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Пресс-форма
              <Link
                to="/dispatcher/rigging/press-form/new"
                className="main-window__addButton"
              >
                <PlusImg className="main-window__img" alt="" />
              </Link>
            </Link>
            <Link
              to="/dispatcher/rigging/parts"
              className={
                props.location.pathname.includes("parts") === true
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
            >
              Запчасти
              <Link
                to="/dispatcher/rigging/parts/new"
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
                path="/dispatcher/rigging/stamp"
                component={Stamp}
                cachedItems={cachedItems["stamp"]}
                setCachedItems={(items) => {
                  setCachedItems((cachedItems) => {
                    return { ...cachedItems, stamp: { ...items } };
                  });
                }}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/stamp/new"
                component={NewRig}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                ]}
                type="stamp"
              />
              <PrivateRoute
                path="/dispatcher/rigging/stamp/view/"
                // component={ViewStamp}
                component={ViewRig}
                type="stamp"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/stamp/edit/"
                // component={EditStamp}
                component={EditRig}
                type="stamp"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/machine"
                component={Machine}
                cachedItems={cachedItems["machine"]}
                setCachedItems={(items) => {
                  setCachedItems((cachedItems) => {
                    return { ...cachedItems, machine: { ...items } };
                  });
                }}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/machine/new"
                // component={NewMachine}
                component={NewRig}
                type="machine"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/machine/view/"
                // component={ViewMachine}
                component={ViewRig}
                type="machine"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/machine/edit/"
                // component={EditMachine}
                component={EditRig}
                type="machine"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/press-form"
                component={PressForm}
                cachedItems={cachedItems["press"]}
                setCachedItems={(items) => {
                  setCachedItems((cachedItems) => {
                    return { ...cachedItems, press: { ...items } };
                  });
                }}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/press-form/new"
                // component={NewPressForm}
                component={NewRig}
                type="pressForm"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/press-form/view/"
                // component={ViewPressForm}
                component={ViewRig}
                type="pressForm"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/press-form/edit/"
                // component={EditPressForm}
                component={EditRig}
                type="pressForm"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/parts"
                component={Parts}
                cachedItems={cachedItems["parts"]}
                setCachedItems={(items) => {
                  setCachedItems((cachedItems) => {
                    return { ...cachedItems, parts: { ...items } };
                  });
                }}
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                exact
                path="/dispatcher/rigging/parts/new"
                // component={NewPart}
                component={NewRig}
                type="parts"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/parts/edit/"
                // component={EditPart}
                component={EditRig}
                type="parts"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_WORKSHOP",
                  "ROLE_ENGINEER",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/parts/view/"
                // component={ViewPart}
                component={ViewRig}
                type="parts"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                  "ROLE_WORKSHOP",
                  "ROLE_WORKSHOP",
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

export default Rigging;
