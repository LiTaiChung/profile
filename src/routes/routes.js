import Page403 from 'pages/403';
import Page404 from 'pages/404';
import Home from 'pages/Home';

const routes = [
    {
        path: '/403',
        exact: true,
        auth: true,
        component: Page403,
        wrapperHeader: false,
    },
    {
        path: '/404',
        exact: true,
        auth: true,
        component: Page404,
        wrapperHeader: false,
    },
    {
        path: '/',
        exact: true,
        auth: true,
        component: Home,
        wrapperHeader: false,
    },
    {
        path: '/news',
        exact: true,
        auth: false,
        component: Home,
        routes: [
            {
                path: '/topic',
                exact: true,
                auth: false,
                component: Home,
            },
        ]
    },
]

export default routes;