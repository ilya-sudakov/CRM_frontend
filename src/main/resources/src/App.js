import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
import MainPage from './components/MainPage/MainPage.jsx';
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

class App extends React.Component {
  state = {
    isAuthorized: false,
    userData: {
      email: '',
      name: ''
    }
    // isAuthorized: true,
    // userData: {
    //   name: 'Илья Судаков',
    //   email: 'ilyasudakov@inbox.ru',
    // }
  }

  setUserData = (isAuthorized, userData) => {
    this.setState({
      isAuthorized: isAuthorized,
      userData: userData
    })
  }

  componentDidMount() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== null) {
      this.setUserData(true, {
        email: localStorage.getItem("email"),
        name: 'Тестовый аккаунт'
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login"
            render={(props) => <LoginPage isAuthorized={this.state.isAuthorized} setUserData={this.setUserData} {...props} />}
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