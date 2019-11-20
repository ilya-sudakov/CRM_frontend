import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
import MainPage from './components/MainPage/MainPage.jsx';
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { login, refreshToken } from './utils/utilsAPI.jsx';

class App extends React.Component {
  state = {
    isAuthorized: false,
    userData: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      id: 0
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
    // if (localStorage.getItem("accessToken")) {
    //   const loginRequest = Object.assign({
    //     username: localStorage.getItem("username"),
    //     password: null
    //   });
    //   login(loginRequest)
    //     .then(res => res.json())
    //     .then(response => {
    //       this.setUserData(response.user);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    // }
    const loginRequest = Object.assign({
      username: localStorage.getItem("username"),
      password: null
    });
    if (localStorage.getItem("refreshToken") && this.state.isAuthorized === false) {
      // console.log("app.refresh");
      const refreshTokenObject = Object.assign({
        refreshToken: localStorage.getItem("refreshToken")
      })
      refreshToken(refreshTokenObject)
        .then(res => res.json())
        .then((response) => {
          // console.log(response);
          this.setUserData(true, response.user);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          // login(loginRequest)
          //   .then(res => res.json())
          //   .then(response => {
          //     this.setUserData(true, response.user);
          //     localStorage.setItem("accessToken", response.accessToken);
          //     localStorage.setItem("refreshToken", response.refreshToken);
          //   })
        })
        .catch((error) => {
          console.log(error);
          // console.log(this.state);
          // this.props.history.push("/login");
        })
    }
    // else {
    //   login(loginRequest)
    //     .then(res => res.json())
    //     .then(response => {
    //       this.setUserData(true, response.user);
    //       localStorage.setItem("accessToken", response.accessToken);
    //       localStorage.setItem("refreshToken", response.refreshToken);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
    //   this.setUserData(true, {
    //     email: localStorage.getItem("email"),
    //     username: 'Иван Иванов'
    //   });
    // }
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