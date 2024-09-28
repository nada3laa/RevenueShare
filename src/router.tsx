import { createBrowserRouter } from 'react-router-dom';

import { DashboardShell } from './components';
import ProtectedRoute from './components/ProtectedRoute/index';
import { ComparePage, DashboardPage, LoginPage, SalesPage, ShopDetailsPage, ShopsPage } from './pages';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <DashboardShell />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <DashboardPage />,
            },
            {
                path: 'sales',
                element: <SalesPage />,
            },
            {
                path: 'compare',
                element: <ComparePage />,
            },
            {
                path: 'shops',
                element: <ShopsPage />,
            },
            {
                path: 'shops/:id',
                element: <ShopDetailsPage />,
            },
        ],
    },
]);

export default router;
