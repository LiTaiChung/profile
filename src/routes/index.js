import React from "react";
import routes from './routes';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const GetRoutes = () => {
    return useRoutes(routes);
}

const SetRoutes = () => {
    return (
        <Router>
            <GetRoutes />
        </Router>
    );
}

export default SetRoutes;