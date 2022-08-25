import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
    
    return (
        <Route {...rest} render={props => (
            !isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location },
                }}/>
            )
        )} />
    )
}

export default PublicRoute;