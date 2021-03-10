import asyncLoad from './asyncLoad';

const routes = [
    {
        path: '/',
        exact: true,
        component: asyncLoad(() => import('@pages/generator'))
    },
    {
        path: '/renderer',
        component: asyncLoad(() => import('@pages/renderer/antd'))
    }
];

export default routes;