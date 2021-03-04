import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import './variables.scss';
const MainPage = lazy(() => import('./components/MainPage/MainPage.jsx')); //lazy-загрузка компонента MainPage
import LoginPage from './components/Authorization/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { refreshToken } from './utils/RequestsAPI/Authorization.js';
import PageLoading from './components/MainPage/PageLoading/PageLoading.jsx';
const UserContext = React.createContext();
import { AppIcon__128 } from '../assets/app_icon__128.png';
import { AppIcon__144 } from '../assets/app_icon__144.png';
import { messaging } from './init-fcm.js';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [expiredIn, setExpiredIn] = useState(new Date());
  const [user, setUser] = useState({
    //Данные пользователя
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

  //Обновление данных пользователя
  const setUserData = (isAuthorized, data) => {
    setIsAuthorized(isAuthorized);
    setUser(data?.user);
    setExpiredIn(data?.expiredIn);
  };

  //Метод для проверки на принадлежность пользователя
  //к одной из ролей из переданного массива ролей
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
    //Проверка на наличие в localStorage браузера токена,
    //запрос на его обновление при отсутствии
    if (localStorage.getItem('refreshToken') && !isAuthorized)
      refreshOldToken();

    initFirebase();
  }, []);

  //Обработка токена
  const refreshExpiredToken = (expiredIn = new Date()) => {
    const curDateMS = new Date().getTime();
    const expiredInDateMS = new Date(expiredIn * 1000).getTime();

    if (expiredInDateMS > curDateMS) {
      const timeDifference = expiredInDateMS - curDateMS;
      return setTimeout(() => {
        console.log('refreshing old token');
        return refreshOldToken();
      }, timeDifference);
    }

    if (expiredInDateMS <= curDateMS) {
      console.log('refreshing old token');
      return refreshOldToken();
    }
  };

  //Обновление токена доступа
  const refreshOldToken = () => {
    const refreshTokenObject = Object.assign({
      refreshToken: localStorage.getItem('refreshToken'),
    });
    return refreshToken(refreshTokenObject)
      .then((res) => res.json())
      .then((response) => {
        //Сохраняем данные пользователя
        setUserData(true, response);
        //Функция обработки токена, если он устареет
        refreshExpiredToken(response.expiredIn);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return;
      })
      .catch((error) => {
        //При ошибке очищаем localStorage
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
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default UserContext;
