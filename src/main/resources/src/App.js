import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
import MainPage from './components/MainPage/MainPage.jsx';
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { login, refreshToken } from './utils/utilsAPI.jsx';

const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_MANAGER = "ROLE_MANAGER";

class App extends React.Component {
  state = {
    isAuthorized: false,
    userData: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      roles: [],
      id: 0
    }
  }

  setUserData = (isAuthorized, userData) => {
    this.setState({
      isAuthorized: isAuthorized,
      userData: userData
    })
  }

  userHasAccess = (roleNeeded) => {
    let check = false;
    this.state.userData.roles.map((item) => {
      roleNeeded.map((role) => {
        if (item.name === role) {
          check = true;
        }
      })
    })
    return check;
  }

  componentDidMount() {
    if (localStorage.getItem("refreshToken") && this.state.isAuthorized === false) {
      const refreshTokenObject = Object.assign({
        refreshToken: localStorage.getItem("refreshToken")
      })
      refreshToken(refreshTokenObject)
        .then(res => res.json())
        .then((response) => {
          this.setUserData(true, response.user);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        })
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
            userHasAccess={this.userHasAccess}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;