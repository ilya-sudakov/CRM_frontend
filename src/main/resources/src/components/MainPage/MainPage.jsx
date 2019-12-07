import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MainPage.scss';
import Header from '../Header/Header.jsx';
import Clients from './Clients/Clients.jsx';
import SideMenu from '../SideMenu/SideMenu.jsx';
import Contracts from './Contracts/Contracts.jsx';
import Requests from './Requests/Requests.jsx';
import NewRequest from './Requests/NewRequest/NewRequest.jsx';
import GeneralPage from './GeneralPage/GeneralPage.jsx';
import newClient from './Clients/NewClient/NewClient.jsx';
import Products from './Products/Products.jsx';
import NewProduct from './Products/NewProduct/NewProduct.jsx';
import EditRequest from './Requests/EditRequest/EditRequest.jsx';
import ViewRequest from './Requests/ViewRequest/ViewRequest.jsx';
import Users from './Profile/Users/Users.jsx';
import PageNotFound from './PageNotFound/PageNotFound.jsx';
import EditUser from './Profile/Users/EditUser/EditUser.jsx';
import NewUser from './Profile/Users/NewUser/NewUser.jsx';
import ViewProduct from './Products/ViewProduct/ViewProduct.jsx';
import EditProduct from './Products/EditProduct/EditProduct.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import WorkshopLEMZ from './WorkshopLEMZ/WorkshopLEMZ.jsx';
import NewRequestLEMZ from './WorkshopLEMZ/NewRequestLEMZ/NewRequestLEMZ.jsx';
import ViewRequestLEMZ from './WorkshopLEMZ/ViewRequestLEMZ/ViewRequestLEMZ.jsx';
import EditRequestLEMZ from './WorkshopLEMZ/EditRequestLEMZ/EditRequestLEMZ.jsx';

class MainPage extends React.Component {
    state = {
        sidemenu_hidden: false,
    }

    setSideMenu = (sidemenu_hidden) => {
        this.setState({
            sidemenu_hidden: sidemenu_hidden
        })
    }

    clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("main_page__overlay")[0];
        overlay.classList.contains("main_page__overlay--hidden")
            ? overlay.classList.remove("main_page__overlay--hidden")
            : overlay.classList.add("main_page__overlay--hidden");
    }

    render() {
        return (
            <div className="main_page">
                <Header
                    userData={this.props.userData}
                    sideMenu={this.state.sidemenu_hidden}
                    setSideMenu={this.setSideMenu}
                    clickOverlay={this.clickOverlay}
                    userHasAccess={this.props.userHasAccess}
                />
                <div className="main_page__content">
                    <SideMenu
                        userHasAccess={this.props.userHasAccess}
                        hidden={this.state.sidemenu_hidden}
                    />
                    <div className="main_page__activity_panel">
                        <Switch>
                            <Route exact path="/" component={GeneralPage} />
                            {/* <Route exact path="/profile/users" component={Users} /> */}
                            {/* <Route exact path="/profile/users/new" component={NewUser} /> */}
                            {/* <Route path="/profile/users/edit/" component={EditUser} /> */}
                            <PrivateRoute
                                exact path="/profile/users/new"
                                component={NewUser}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN"]}
                            />
                            <PrivateRoute
                                exact path="/profile/users"
                                component={Users}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN"]}
                            />
                            <PrivateRoute
                                path="/profile/users/edit/"
                                component={EditUser}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN"]}
                            />
                            <Route exact path="/clients" component={Clients} />
                            <Route exact path="/clients/new" component={newClient} />
                            <Route exact path="/contracts" component={Contracts} />
                            <Route exact path="/requests" render={(props) =>
                                <Requests
                                    userHasAccess={this.props.userHasAccess}
                                />
                            } />
                            <Route path="/requests/view/" component={ViewRequest} />
                            {/* <Route exact path="/requests/new" component={NewRequest} /> */}
                            {/* <Route path="/requests/edit/" component={EditRequest} /> */}
                            <PrivateRoute
                                exact path="/requests/new"
                                component={NewRequest}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <PrivateRoute
                                path="/requests/edit/"
                                component={EditRequest}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <Route exact path="/products" render={
                                (props) => <Products
                                    userHasAccess={this.props.userHasAccess}
                                />}
                            />
                            <Route path="/products/view/" component={ViewProduct} />
                            {/* <Route path="/products/edit/" component={EditProduct} /> */}
                            {/* <Route exact path="/products/new" component={NewProduct} /> */}
                            <PrivateRoute
                                path="/products/edit/"
                                component={EditProduct}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <PrivateRoute
                                exact path="/products/new"
                                component={NewProduct}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <Route exact path="/workshop-lemz" render={
                                (props) => <WorkshopLEMZ
                                    userHasAccess={this.props.userHasAccess}
                                />
                            } />
                            <Route path="/workshop-lemz/view/" component={ViewRequestLEMZ} />
                            <PrivateRoute
                                exact path="/workshop-lemz/new"
                                component={NewRequestLEMZ}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <PrivateRoute
                                path="/workshop-lemz/edit/"
                                component={EditRequestLEMZ}
                                userHasAccess={this.props.userHasAccess}
                                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                            />
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;