import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
const MainPage = lazy(() => import('Components/MainPage/MainPage.jsx')); //lazy-загрузка компонента MainPage
import LoginPage from 'Components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute.jsx';
import { refreshToken } from 'API/authorization';
import PageLoading from 'Components/MainPage/PageLoading/PageLoading.jsx';
import { messaging } from './init-fcm.js';
import {
  QueryClient,
  QueryClientProvider,
  // useQuery
} from 'react-query';
const UserContext = React.createContext();

const queryClient = new QueryClient();

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [expiredIn, setExpiredIn] = useState(new Date());
  const [user, setUser] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    roles: [],
    id: 0,
  });
  const [newNotifications, setNewNotifications] = useState(0);
  const [lastNotification, setLastNotification] = useState({
    body: '',
    description: '',
    img: null,
    link: '/',
    visible: false,
  });

  const setUserData = (isAuthorized, data) => {
    setIsAuthorized(isAuthorized);
    setUser(data?.user);
    setExpiredIn(data?.expiredIn);
  };

  const userHasAccess = (rolesNeeded = []) => {
    let check = false;
    user.roles.map((item) => {
      for (let i = 0; i < rolesNeeded.length; i++) {
        if (rolesNeeded[i] === item.name) {
          check = true;
          break;
        }
      }
    });
    return check;
  };

  useEffect(() => {
    if (localStorage.getItem('refreshToken') && !isAuthorized) {
      refreshAccessToken();
    }
    initFirebase();
  }, []);

  const handleExpiredToken = (expiredIn = new Date()) => {
    const curDateMS = new Date().getTime();
    const expiredInDateMS = new Date(expiredIn * 1000).getTime();

    if (expiredInDateMS > curDateMS) {
      const timeDifference = expiredInDateMS - curDateMS;
      return setTimeout(() => {
        console.log('refreshing old token');
        return refreshAccessToken();
      }, timeDifference);
    }

    console.log('refreshing old token');
    return refreshAccessToken();
  };

  const refreshAccessToken = () => {
    const refreshTokenObject = Object.assign({
      refreshToken: localStorage.getItem('refreshToken'),
    });
    return refreshToken(refreshTokenObject)
      .then((res) => res.json())
      .then((response) => {
        setUserData(true, response);
        handleExpiredToken(response.expiredIn);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return;
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
        return;
      });
  };

  //Инициализация Firebase
  const initFirebase = () => {
    // !FIREBASE
    if (messaging !== null) {
      messaging
        .requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          console.log('token: ' + token);
          return;
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify.', err);
        });

      navigator.serviceWorker.addEventListener('message', (message) => {
        console.log(message.data['firebase-messaging-msg-data'].data);
        setNewNotifications(newNotifications + 1);
        setLastNotification({
          ...message.data['firebase-messaging-msg-data'].data,
          visible: true,
        });
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <LoginPage
              isAuthorized={isAuthorized}
              setUserData={setUserData}
              {...props}
            />
          )}
        />
        {/* Отображение компонента загрузки страницы, пока грузятся внутренние компоненты */}
        <Suspense fallback={<PageLoading />}>
          <UserContext.Provider
            value={{
              userData: user,
              isAuthorized,
              expiredIn,
              userHasAccess,
              newNotifications,
              lastNotification,
              setLastNotification,
            }}
          >
            <PrivateRoute path="/" component={MainPage} />
          </UserContext.Provider>
        </Suspense>
      </Switch>
    </QueryClientProvider>
  );
};

export default UserContext;
