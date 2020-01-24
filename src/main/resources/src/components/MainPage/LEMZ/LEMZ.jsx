import React, { Suspense } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import plusImg from '../../../../../../../assets/sidemenu/plus_icon.svg';
import './LEMZ.scss';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import PageLoading from '../PageLoading/PageLoading.jsx';
import { WorkshopLEMZ, Storage, ViewRequestLEMZ, EditRequestLEMZ, NewRequestLEMZ, NewStorage, EditStorage } from '../lazyImports.jsx';

const LEMZ = (props) => {
    return (
        <div className="requests">
            <div className="requests__header">
                <div className="requests__title">Цех ЛЭМЗ</div>
                <div className="requests__menu">
                    <Link to="/lemz/workshop-lemz" className={props.location.pathname.includes('/lemz/workshop-lemz') === true
                        ? "requests__item--active requests__item"
                        : "requests__item"}>
                        Очередь производства
                            <Link to="/lemz/workshop-lemz/new" className="requests__addButton">
                            <img className="requests__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                    <Link to="/lemz/workshop-storage" className={props.location.pathname.includes('/lemz/workshop-storage') === true
                        ? "requests__item--active requests__item"
                        : "requests__item"}>
                        Склад
                            <Link to="/lemz/workshop-storage/new" className="requests__addButton">
                            <img className="requests__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                </div>
            </div>
            <div className="requests__content">
                <Suspense fallback={<PageLoading />}>
                    <Switch>
                        <PrivateRoute
                            exact path="/lemz/workshop-lemz"
                            component={WorkshopLEMZ}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', "ROLE_LEMZ"]}
                        />
                        <Route path="/lemz/workshop-lemz/view/" component={ViewRequestLEMZ} />
                        <PrivateRoute
                            exact path="/lemz/workshop-lemz/new"
                            component={NewRequestLEMZ}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEMZ"]}
                        />
                        <PrivateRoute
                            path="/lemz/workshop-lemz/edit/"
                            component={EditRequestLEMZ}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEMZ"]}
                        />
                        <PrivateRoute
                            exact path="/lemz/workshop-storage"
                            component={Storage}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', "ROLE_LEMZ"]}
                        />

                        <PrivateRoute
                            exact path="/lemz/workshop-storage/new"
                            component={NewStorage}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEMZ"]}
                        />
                        <PrivateRoute
                            path="/lemz/workshop-storage/edit/"
                            component={EditStorage}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_LEMZ"]}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    )
}

export default LEMZ;