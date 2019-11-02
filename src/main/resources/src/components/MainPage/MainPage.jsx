import React from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Clients from './Clients/Clients.jsx';

class MainPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Clients />
            </React.Fragment>
        );
    }
}

export default MainPage;