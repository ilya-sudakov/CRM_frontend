import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Clients from './Clients/Clients.jsx';
import SideMenu from '../SideMenu/SideMenu.jsx';
import './MainPage.scss';

class MainPage extends React.Component {
    render() {
        return (
            <div className="main_page">
                <Header />
                <div className="main_page__content">
                    <SideMenu />
                    <Switch>
                        {/* <Clients /> */}
                        <Route path="/clients" component={Clients} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default MainPage;