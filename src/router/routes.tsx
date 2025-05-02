import Clients from '@/pages/Clients/Clients';
import ClientsForm from '@/pages/Clients/ClientsForm';
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
    {
        path: '/clients/add',
        element: <ClientsForm />,
        layout: 'default',

    },

];

export { routes };
