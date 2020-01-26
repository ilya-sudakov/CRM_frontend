import React, { useEffect, useState, Suspense } from 'react';
import { Stamp, Parts, NewPart, EditPart, Machine, PressForm, NewStamp, ViewStamp, EditStamp, NewMachine, NewPressForm, ViewMachine, EditMachine, ViewPressForm, EditPressForm, EditPartInRigging } from '../../lazyImports.jsx';
import PrivateRoute from '../../../PrivateRoute/PrivateRoute.jsx';
import { Route, Switch, Link } from 'react-router-dom';
import plusImg from '../../../../../../../../assets/sidemenu/plus.png';
import './Rigging.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import PageNotFound from '../../PageNotFound/PageNotFound.jsx';
import PageLoading from '../../PageLoading/PageLoading.jsx';

const Rigging = (props) => {
    return (
        <div className="rigging">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Оснастка</div>
                    <div className="main-window__menu">
                        <Link to="/dispatcher/rigging/stamp" className={props.location.pathname.includes('stamp') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Штамп
                            <Link to="/dispatcher/rigging/stamp/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                        <Link to="/dispatcher/rigging/machine" className={props.location.pathname.includes('machine') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Станок
                        <Link to="/dispatcher/rigging/machine/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                        <Link to="/dispatcher/rigging/press-form" className={props.location.pathname.includes('press-form') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Пресс-форма
                        <Link to="/dispatcher/rigging/press-form/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                        <Link to="/dispatcher/rigging/parts" className={props.location.pathname.includes('parts') === true
                            ? "main-window__item--active main-window__item"
                            : "main-window__item"}>
                            Запчасти
                        <Link to="/dispatcher/rigging/parts/new" className="main-window__addButton">
                                <img className="main-window__img" src={plusImg} alt="" />
                            </Link>
                        </Link>
                    </div>
                </div>
                <div className="main-window__content">
                    <Suspense fallback={<PageLoading />}>
                        <Switch>
                            <PrivateRoute
                                exact path="/dispatcher/rigging/stamp"
                                component={Stamp}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                exact path="/dispatcher/rigging/stamp/new"
                                component={NewStamp}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/stamp/view/"
                                component={ViewStamp}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/stamp/edit/"
                                component={EditStamp}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                exact path="/dispatcher/rigging/machine"
                                component={Machine}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                exact path="/dispatcher/rigging/machine/new"
                                component={NewMachine}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/machine/view/"
                                component={ViewMachine}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/machine/edit/"
                                component={EditMachine}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                exact path="/dispatcher/rigging/press-form"
                                component={PressForm}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                exact path="/dispatcher/rigging/press-form/new"
                                component={NewPressForm}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/press-form/view/"
                                component={ViewPressForm}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <PrivateRoute
                                path="/dispatcher/rigging/press-form/edit/"
                                component={EditPressForm}
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
                            <PrivateRoute
                                path={"/dispatcher/rigging/" + (
                                    props.location.pathname.includes('stamp') && "stamp" ||
                                    props.location.pathname.includes('machine') && "machine" ||
                                    props.location.pathname.includes('press-form') && "press-form"
                                ) + "/edit-part/"}
                                component={EditPartInRigging}
                                userHasAccess={props.userHasAccess}
                                allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']}
                            />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Rigging;