import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== null) ? (
                <Component {...rest} {...props} />
            ) : (
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