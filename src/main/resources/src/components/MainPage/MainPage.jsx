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

class MainPage extends React.Component {
    state = {
        sidemenu_hidden: false,
    }

    setSideMenu = (sidemenu_hidden) => {
        this.setState({
            sidemenu_hidden: sidemenu_hidden
        })
    }

    render() {
        return (
            <div className="main_page">
                <Header 
                    userData={this.props.userData}
                    sideMenu={this.state.sidemenu_hidden}
                    setSideMenu={this.setSideMenu}
                />
                <div className="main_page__content">
                    <SideMenu 
                        hidden={this.state.sidemenu_hidden}
                    />
                    <div className="main_page__activity_panel">
                        <Switch>
                            <Route exact path="/" component={GeneralPage} />
                            <Route exact path="/clients" component={Clients} />
                            <Route exact path="/clients/new" component={newClient} />
                            <Route exact path="/contracts" component={Contracts} />
                            <Route exact path="/requests" component={Requests} />
                            <Route exact path="/requests/new" component={NewRequest} />
                            <Route path="/requests/edit/" component={EditRequest} />
                            <Route path="/requests/view/" component={ViewRequest} />
                            <Route exact path="/products" component={Products} />
                            <Route exact path="/products/new" component={NewProduct} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;