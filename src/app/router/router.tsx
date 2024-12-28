import { RouteObject, createHashRouter } from 'react-router';
import HomePage from '@/pages/home';
import SettingsPage from '@/pages/settings';

const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <HomePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];

const router = createHashRouter(routes, {});

export default router;
