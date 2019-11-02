import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
import MainPage from './components/MainPage/MainPage.jsx';
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

class App extends React.Component {
  state = {
    isAuthorized: true,
    userData: null,
  }

  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" 
            render={(props) => <LoginPage isAuthorized={this.state.isAuthorized} {...props} /> } 
          />
          <PrivateRoute path="/"
            isAuthorized={this.state.isAuthorized}
            userData={this.state.userData}
            component={MainPage}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;