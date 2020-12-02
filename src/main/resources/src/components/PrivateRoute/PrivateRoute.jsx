import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import NotAllowedPage from '../MainPage/NotAllowedPage/NotAllowedPage.jsx'
import PropTypes from 'prop-types'
import UserContext from '../../App.js'

const PrivateRoute = ({
  component: Component = <></>,
  allowedRoles = undefined,
  ...rest
}) => {
  const userContext = useContext(UserContext)

  const userIsAllowed =
    userContext.userHasAccess(allowedRoles) && userContext.isAuthorized

  //Если пользователь не авторизован и у него нет токена доступа, то редирект на /login,
  //иначе - рендер передаваемого компонента
  return (
    <Route
      {...rest}
      render={(props) => {
        //if no cached token
        if (localStorage.getItem('refreshToken') === null)
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )

        //if there is no visibility restrictions or user is allowed to view component
        if (allowedRoles === undefined || userIsAllowed)
          return (
            <Component
              {...rest}
              {...props}
              userData={userContext.userData}
              userHasAccess={userContext.userHasAccess}
            />
          )

        //dont display anything while userdata isnt loaded
        if (userContext.userData.username === '') return null

        //if user isnt allowed - display not allowed info page
        if (!userIsAllowed) return <NotAllowedPage />
      }}
    />
  )
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  allowedRoles: PropTypes.array,
}
