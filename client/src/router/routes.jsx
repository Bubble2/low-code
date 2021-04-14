import asyncLoad from './asyncLoad';

const routes = [
    {
        path: '/',
        exact: true,
        component: asyncLoad(() => import('@pages/custom-config'))
    },
    {
        path: '/renderer',
        component: asyncLoad(() => import('@pages/demo'))
    }
];

export default routes;