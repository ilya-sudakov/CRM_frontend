import React, { useEffect, useState, Suspense } from "react";
import { RiggingWorkshop } from "../../lazyImports.jsx";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute.jsx";
import { Route, Switch, Link } from "react-router-dom";
import PlusImg from "../../../../../assets/sidemenu/plus.inline.svg";
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
    pressForm: {},
    machine: {},
    parts: {},
  });

  const getMenuItem = (itemName, title) => {
    return {
      pageName: `/dispatcher/rigging/${itemName}`,
      link: `/dispatcher/rigging/${itemName}`,
      isActive: props.location.pathname.includes(itemName),
      pageTitle: (
        <>
          {title}
          <Link
            to={`/dispatcher/rigging/${itemName}/new`}
            className="main-window__addButton"
          >
            <PlusImg className="main-window__img" alt="" />
          </Link>
        </>
      ),
    };
  };

  const { titleHeader } = useTitleHeader(
    "Оснастка",
    [
      getMenuItem("stamp", "Штамп"),
      getMenuItem("machine", "Станок"),
      getMenuItem("press-form", "Пресс-форма"),
      getMenuItem("parts", "Запчасти"),
    ],
    "/dispatcher/rigging/stamp"
  );

  useEffect(() => {}, [cachedItems]);

  const getRiggingPage = (itemName, type) => {
    return (
      <PrivateRoute
        exact
        path={`/dispatcher/rigging/${itemName}`}
        component={RiggingWorkshop}
        cachedItems={cachedItems[type]}
        type={type}
        setCachedItems={(items) =>
          setCachedItems((cachedItems) => ({
            ...cachedItems,
            [type]: { ...items },
          }))
        }
        allowedRoles={[
          "ROLE_ADMIN",
          "ROLE_DISPATCHER",
          "ROLE_ENGINEER",
          "ROLE_WORKSHOP",
        ]}
      />
    );
  };

  const stampPage = getRiggingPage("stamp", "stamp");
  const machinePage = getRiggingPage("machine", "machine");
  const pressFormPage = getRiggingPage("press-form", "pressForm");
  const partsPage = getRiggingPage("parts", "parts");

  return (
    <div className="rigging">
      <div className="main-window">
        {titleHeader}
        <div className="main-window__content">
          <Suspense fallback={<PageLoading />}>
            <Switch>
              {stampPage}
              {machinePage}
              {pressFormPage}
              {partsPage}
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
