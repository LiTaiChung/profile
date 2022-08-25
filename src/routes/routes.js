import Layout from 'layout';
import Page403 from 'pages/403';
import Page404 from 'pages/404';
import Home from 'pages/Home';

const routes = [
    {
        path: '/403',
        element: <Page403 />,
    },
    {
        path: '/404',
        element: <Page404 />,
    },
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },

            {
                path: '/news',
                element: <Home />,
                children: [
                    {
                        path: 'topic',
                        element: <Home />,
                    },
                    {
                        path: ':newId',
                        element: <Home />,
                    },
                ]
            },
        ],
    }
];

export default routes;