import Layout from 'layout';
import Page403 from 'pages/403';
import Page404 from 'pages/404';
import Home from 'pages/Home';
import News from 'pages/News/topic'

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
                children: [
                    {
                        path: 'topic',
                        element: <News />,
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