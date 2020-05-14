import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'
import './variables.scss'
const MainPage = lazy(() => import('./components/MainPage/MainPage.jsx'))
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import { login, refreshToken } from './utils/RequestsAPI/Authorization.jsx'
import PageLoading from './components/MainPage/PageLoading/PageLoading.jsx'

const ROLE_ADMIN = 'ROLE_ADMIN'
const ROLE_MANAGER = 'ROLE_MANAGER'

export const UserContext = React.createContext()

class App extends React.Component {
  state = {
    isAuthorized: false,
    userData: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      roles: [],
      id: 0,
    },
  }

  setUserData = (isAuthorized, userData) => {
    this.setState({
      isAuthorized: isAuthorized,
      userData: userData,
    })
  }

  userHasAccess = (roleNeeded) => {
    let check = false
    this.state.userData.roles.map((item) => {
      roleNeeded.map((role) => {
        if (item.name === role) {
          check = true
        }
      })
    })
    return check
  }

  componentDidMount() {
    if (
      localStorage.getItem('refreshToken') &&
      this.state.isAuthorized === false
    ) {
      const refreshTokenObject = Object.assign({
        refreshToken: localStorage.getItem('refreshToken'),
      })
      refreshToken(refreshTokenObject)
        .then((res) => res.json())
        .then((response) => {
          this.setUserData(true, response.user)
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
        })
        .catch((error) => {
          console.log(error)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.reload()
        })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginPage
                isAuthorized={this.state.isAuthorized}
                setUserData={this.setUserData}
                {...props}
              />
            )}
          />
          <Suspense fallback={<PageLoading />}>
            <UserContext.Provider
              value={{
                userData: { ...this.state.userData },
                userHasAccess: this.userHasAccess
              }}
            >
              <PrivateRoute
                path="/"
                isAuthorized={this.state.isAuthorized}
                userData={this.state.userData}
                component={MainPage}
                userHasAccess={this.userHasAccess}
              />
            </UserContext.Provider>
          </Suspense>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
