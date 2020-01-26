import React, { Suspense } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import plusImg from '../../../../../../../assets/sidemenu/plus.png';
import './Lepsari.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import PageLoading from '../PageLoading/PageLoading.jsx';
import { WorkshopLepsari, NewRequestLepsari, EditRequestLepsari, ViewRequestLepsari, StorageLepsari, NewStorageLepsari, EditStorageLepsari } from '../lazyImports.jsx';

const Lepsari = (props) => {
    return (
        <div className="requests">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Цех Лепсари</div>
                    <div className="main-window__menu">
                        <Link to="/lepsari/workshop-lepsari" className={props.location.pathname.includes('/lepsari/workshop-lepsari') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Очередь производства
                            <Link to="/lepsari/workshop-lepsari/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                        <Link to="/lepsari/workshop-storage" className={props.location.pathname.includes('/lepsari/workshop-storage') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Склад
                            <Link to="/lepsari/workshop-storage/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                    </div>
                </div>
                <div className="main-window__content">
                    <Suspense fallback={<PageLoading />}>
                        <Switch>
                            <PrivateRoute
                                exact path="/lepsari/workshop-lepsari"
                                component={WorkshopLepsari}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', "ROLE_LEPSARI"]}
                            />
                            <Route path="/lepsari/workshop-lepsari/view/" component={ViewRequestLepsari} />
                            <PrivateRoute
                                exact path="/lepsari/workshop-lepsari/new"
                                component={NewRequestLepsari}
                                userHasAccess={props.userHasAccess}
                                userData={props.userData}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
                            />
                            <PrivateRoute
                                path="/lepsari/workshop-lepsari/edit/"
                                component={EditRequestLepsari}
                                userHasAccess={props.userHasAccess}
                                userData={props.userData}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEPSARI"]}
                            />
                            <PrivateRoute
                                exact path="/lepsari/workshop-storage"
                                component={StorageLepsari}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', "ROLE_LEPSARI"]}
                            />
                            <PrivateRoute
                                exact path="/lepsari/workshop-storage/new"
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
                            <Route component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Lepsari;