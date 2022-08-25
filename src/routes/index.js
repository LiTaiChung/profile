import React from "react";
import routes from './routes';
import { BrowserRouter as Router, useRoutes, HashRouter } from "react-router-dom";

const GetRoutes = () => {
    return useRoutes(routes);
}

const SetRoutes = () => {
    return (<>
        <HashRouter>
            {/* <Router> */}
                <GetRoutes />
            {/* </Router> */}
        </HashRouter>
    </>);
}

export default SetRoutes;