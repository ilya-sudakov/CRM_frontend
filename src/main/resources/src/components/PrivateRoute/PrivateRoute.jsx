import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            // (localStorage.getItem("accessToken") !== "" && localStorage.getItem("accessToken") !== null) ? (
            (localStorage.getItem("refreshToken")) ? (
                console.log('rendering component'),
                <Component {...rest} {...props} />
            ) : (
                    console.log('rendering login'),
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute;