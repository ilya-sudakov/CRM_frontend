import React, { useEffect, useState, Suspense } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import plusImg from '../../../../../../../assets/sidemenu/plus_icon.svg';
import './LEMZ.scss';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import PageLoading from '../PageLoading/PageLoading.jsx';
import { WorkshopLEMZ, Storage } from '../lazyImports.jsx';

const LEMZ = (props) => {
    return (
        <div className="rigging">
            <div className="rigging__header">
                <div className="rigging__title">ЛЭМЗ</div>
                <div className="rigging__menu">
                    <Link to="/lemz/workshop-lemz" className={props.location.pathname.includes('/lemz/workshop-lemz') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Очередь производства
                            <Link to="/lemz/workshop-lemz/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                    <Link to="/workshop-lemz" className={props.location.pathname.includes('/lemz/workshop-lemz') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Склад
                            <Link to="/workshop-lemz/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                </div>
            </div>
            <div className="rigging__content">
                <Suspense fallback={PageLoading}>
                    <Switch>
                        <PrivateRoute
                            exact path="/lemz/workshop-lemz"
                            component={WorkshopLEMZ}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <PrivateRoute
                            exact path="/lemz/workshop-storage"
                            component={Storage}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    )
}

export default LEMZ;