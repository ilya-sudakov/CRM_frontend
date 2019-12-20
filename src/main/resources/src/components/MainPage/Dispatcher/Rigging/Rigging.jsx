import React, { useEffect, useState, Suspense } from 'react';
import { Stamp, Parts, NewPart, EditPart } from '../../lazyImports.jsx';
import PrivateRoute from '../../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import plusImg from '../../../../../../../../assets/sidemenu/plus_icon.svg';
import './Rigging.scss';
import PageNotFound from '../../PageNotFound/PageNotFound.jsx';
import PageLoading from '../../PageLoading/PageLoading.jsx';

const Rigging = (props) => {
    return (
        <div className="rigging">
            <div className="rigging__header">
                <div className="rigging__title">Оснастка</div>
                <div className="rigging__menu">
                    <Link to="/dispatcher/rigging/stamp" className={props.location.pathname.includes('stamp') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Штамп
                            <Link to="/dispatcher/rigging/stamp/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                    <Link to="/dispatcher/rigging/machine" className={props.location.pathname.includes('machine') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Станок
                        <Link to="/dispatcher/rigging/machine/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                    <Link to="/dispatcher/rigging/press-form" className={props.location.pathname.includes('press-form') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Пресс-форма
                        <Link to="/dispatcher/rigging/press-form/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                    <Link to="/dispatcher/rigging/parts" className={props.location.pathname.includes('parts') === true
                        ? "rigging__item--active rigging__item"
                        : "rigging__item"}>
                        Запчасти
                        <Link to="/dispatcher/rigging/parts/new" className="rigging__addButton">
                            <img className="rigging__img" src={plusImg} alt="" />
                        </Link>
                    </Link>
                </div>
            </div>
            <div className="rigging__content">
                <Suspense fallback={PageLoading}>
                    <Switch>
                        <PrivateRoute
                            exact path="/dispatcher/rigging/stamp"
                            component={Stamp}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <PrivateRoute
                            exact path="/dispatcher/rigging/parts"
                            component={Parts}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <PrivateRoute
                            exact path="/dispatcher/rigging/parts/new"
                            component={NewPart}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <PrivateRoute
                            path="/dispatcher/rigging/parts/edit/"
                            component={EditPart}
                            userHasAccess={props.userHasAccess}
                            allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                        />
                        <Route component={PageNotFound}/>
                    </Switch>
                </Suspense>
            </div>
        </div>
    )
}

export default Rigging;