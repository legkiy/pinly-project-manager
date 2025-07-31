import { createHashRouter, Navigate, RouteObject } from 'react-router';
import { LayoutWithNavbar } from '@/widgets';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
import { routerService } from '@/shared/lib';
import { ProjectIdPage, ProjectsPage, SettingsPage } from '@/pages';

const routes: RouteObject[] = [
  {
    element: <ErrorDisplay />,
    children: [
      {
        path: '/',
        element: <Navigate to={routerService.projects.root} replace />,
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/projects',
        Component: LayoutWithNavbar,
        children: [
          {
            path: ':id',
            element: <ProjectIdPage />,
          },
        ],
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
];

const router = createHashRouter(routes, {});

export default router;
