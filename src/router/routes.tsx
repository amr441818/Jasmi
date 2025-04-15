import MainTable from '@/pages/table/MainTable';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/main',
        element: <MainTable />,
        layout: 'default',
    },

];

export { routes };
