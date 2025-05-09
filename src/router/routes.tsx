import Clients from '@/pages/Clients/Clients';
import ClientsForm from '@/pages/Clients/ClientsForm';
import Properties from '@/pages/properties/Properties';
import PropertiesForm from '@/pages/properties/PropertiesForm';
import MainTable from '@/pages/table/MainTable';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'blank',
    },
    {
        path: '/clients',
        element: <Clients />,
        layout: 'default',

    },
    {
        path: '/clients/:id',
        element: <ClientsForm />,
        layout: 'default',

    },
    {
        path: '/properties',
        element: <Properties />,
        layout: 'default',

    },
    {
        path: '/properties/:id',
        element: <PropertiesForm />,
        layout: 'default',

    },

];

export { routes };
