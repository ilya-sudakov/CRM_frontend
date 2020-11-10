import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'
import './variables.scss'
const MainPage = lazy(() => import('./components/MainPage/MainPage.jsx')) //lazy-загрузка компонента MainPage
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import { login, refreshToken } from './utils/RequestsAPI/Authorization.jsx'
import PageLoading from './components/MainPage/PageLoading/PageLoading.jsx'
export const UserContext = React.createContext()
import { AppIcon__128 } from '../../../../assets/app_icon__128.png'
import { AppIcon__144 } from '../../../../assets/app_icon__144.png'
import { messaging } from './init-fcm.js'

class App extends React.Component {
  state = {
    isAuthorized: false, //Авторизован ли пользователь
    userData: {
      //Данные пользователя
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      roles: [],
      id: 0,
    },
    newNotifications: 0,
    lastNotification: {
      body: '',
      description: '',
      img: null,
      link: '/',
      visible: false,
    },
    setLastNotification: (message) => {
      this.setState({
        lastNotification: {
          ...message,
        },
      })
    },
    setNewNotificationsCount: (newValue) => {
      this.setState({ newNotifications: newValue })
    },
  }

  //Метод для обновления состояния данных пользователя
  setUserData = (isAuthorized, data) => {
    this.setState({
      isAuthorized: isAuthorized,
      userData: data?.user,
      expiredIn: data?.expiredIn,
    })
  }

  //Метод для проверки на принадлежность пользователя
  //к одной из ролей из переданного массива ролей
  userHasAccess = (rolesNeeded) => {
    let check = false
    this.state.userData.roles.map((item) => {
      for (let i = 0; i < rolesNeeded.length; i++) {
        if (rolesNeeded[i] === item.name) {
          check = true
          break
        }
      }
    })
    return check
  }

  componentDidMount() {
    //Проверка на наличие в localStorage браузера токена,
    //запрос на его обновление при отсутствии
    if (
      localStorage.getItem('refreshToken') &&
      this.state.isAuthorized === false
    ) {
      this.refreshOldToken()
    }
    this.initFirebase()
  }

  refreshExpiredToken = (expiredIn = new Date()) => {
    const curDateMS = new Date().getTime()
    const expiredInDateMS = new Date(expiredIn * 1000).getTime()

    if (expiredInDateMS > curDateMS) {
      const timeDifference = expiredInDateMS - curDateMS
      return setTimeout(() => {
        console.log('refreshing old token')
        return this.refreshOldToken()
      }, timeDifference)
    }
    if (expiredInDateMS <= curDateMS) {
      console.log('refreshing old token')
      return this.refreshOldToken()
    }
  }

  refreshOldToken = () => {
    const refreshTokenObject = Object.assign({
      refreshToken: localStorage.getItem('refreshToken'),
    })
    return refreshToken(refreshTokenObject)
      .then((res) => res.json())
      .then((response) => {
        this.setUserData(true, response)
        this.refreshExpiredToken(response.expiredIn)
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

  initFirebase = () => {
    // !FIREBASE
    if (messaging !== null) {
      messaging
        .requestPermission()
        .then(async function () {
          const token = await messaging.getToken()
          console.log('token: ' + token)
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify.', err)
        })
      navigator.serviceWorker.addEventListener('message', (message) => {
        console.log(message.data['firebase-messaging-msg-data'].data)
        this.state.setNewNotificationsCount(this.state.newNotifications + 1)
        this.state.setLastNotification({
          ...message.data['firebase-messaging-msg-data'].data,
          visible: true,
        })
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
          {/* Отображение компонента загрузки страницы, пока грузятся внутренние компоненты */}
          <Suspense fallback={<PageLoading />}>
            <UserContext.Provider
              value={{
                userData: { ...this.state.userData },
                userHasAccess: this.userHasAccess,
                newNotifications: this.state.newNotifications,
                lastNotification: this.state.lastNotification,
                expiredIn: this.state.expiredIn,
                isAuthorized: this.state.isAuthorized,
                setLastNotification: this.state.setLastNotification,
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
