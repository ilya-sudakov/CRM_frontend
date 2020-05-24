import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import NotAllowedPage from '../MainPage/NotAllowedPage/NotAllowedPage.jsx'

const PrivateRoute = ({
  component: Component,
  isAuthorized,
  userHasAccess,
  allowedRoles,
  userData,
  ...rest
}) => (
  //Если пользователь не авторизован и у него нет токена
  //доступа, то редирект на /login, иначе - рендер
  //передаваемого компонента
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('refreshToken') ? (
        allowedRoles !== undefined ? (
          userHasAccess(allowedRoles) ? (
            <Component
              {...rest}
              {...props}
              userData={userData}
              userHasAccess={userHasAccess}
            />
          ) : (
            <NotAllowedPage />
          )
        ) : (
          <Component
            {...rest}
            {...props}
            userData={userData}
            userHasAccess={userHasAccess}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

export default PrivateRoute
