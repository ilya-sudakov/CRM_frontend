import React, { useEffect, useState, Suspense } from "react";
import { RiggingWorkshop } from "../../lazyImports.jsx";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute.jsx";
import { Route, Switch, Link } from "react-router-dom";
import PlusImg from "../../../../../../../../assets/sidemenu/plus.inline.svg";
import "./Rigging.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import PageNotFound from "../../PageNotFound/PageNotFound.jsx";
import PageLoading from "../../PageLoading/PageLoading.jsx";
import NewRig from "./RiggingComponents/Forms/NewRig/NewRig.jsx";
import EditRig from "./RiggingComponents/Forms/EditRig/EditRig.jsx";
import useTitleHeader from "../../../../utils/hooks/uiComponents/useTitleHeader.js";

const Rigging = (props) => {
  const [cachedItems, setCachedItems] = useState({
    stamp: {},
    press: {},
    machine: {},
    parts: {},
  });
  const { titleHeader } = useTitleHeader(
    "Оснастка",
    [
      {
        pageName: "/dispatcher/rigging/stamp",
        link: "/dispatcher/rigging/stamp",
        isActive: props.location.pathname.includes("stamp"),
        pageTitle: (
          <>
            Штамп
            <Link
              to="/dispatcher/rigging/stamp/new"
              className="main-window__addButton"
            >
              <PlusImg className="main-window__img" alt="" />
            </Link>
          </>
        ),
      },
      {
        pageName: "/dispatcher/rigging/machine",
        link: "/dispatcher/rigging/machine",
        isActive: props.location.pathname.includes("machine"),
        pageTitle: (
          <>
            Станок
            <Link
              to="/dispatcher/rigging/machine/new"
              className="main-window__addButton"
            >
              <PlusImg className="main-window__img" alt="" />
            </Link>
          </>
        ),
      },
      {
        pageName: "/dispatcher/rigging/press-form",
        link: "/dispatcher/rigging/press-form",
        isActive: props.location.pathname.includes("press-form"),
        pageTitle: (
          <>
            Пресс-форма
            <Link
              to="/dispatcher/rigging/press-form/new"
              className="main-window__addButton"
            >
              <PlusImg className="main-window__img" alt="" />
            </Link>
          </>
        ),
      },
      {
        pageName: "/dispatcher/rigging/parts",
        link: "/dispatcher/rigging/parts",
        isActive: props.location.pathname.includes("parts"),
        pageTitle: (
          <>
            Запчасти
            <Link
              to="/dispatcher/rigging/parts/new"
              className="main-window__addButton"
            >
              <PlusImg className="main-window__img" alt="" />
            </Link>
          </>
        ),
      },
    ],
    "/dispatcher/rigging/stamp"
  );

  useEffect(() => {}, [cachedItems]);

  return (
    <div className="rigging">
      <div className="main-window">
        {titleHeader}
        <div className="main-window__content">
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <PrivateRoute
                exact
                path="/dispatcher/rigging/stamp"
                component={RiggingWorkshop}
                cachedItems={cachedItems["stamp"]}
                type="stamp"
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
                path="/dispatcher/rigging/stamp/edit/"
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
                component={RiggingWorkshop}
                type="machine"
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
                component={NewRig}
                type="machine"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/machine/edit/"
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
                component={RiggingWorkshop}
                type="pressForm"
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
                component={NewRig}
                type="pressForm"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_ENGINEER",
                ]}
              />
              <PrivateRoute
                path="/dispatcher/rigging/press-form/edit/"
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
                component={RiggingWorkshop}
                type="parts"
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
                component={EditRig}
                type="parts"
                allowedRoles={[
                  "ROLE_ADMIN",
                  "ROLE_DISPATCHER",
                  "ROLE_WORKSHOP",
                  "ROLE_ENGINEER",
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
