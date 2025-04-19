import Clients from '@/pages/Clients';
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
        path: '/clients',
        element: <Clients />,
        layout: 'default',
    },

];

export { routes };
