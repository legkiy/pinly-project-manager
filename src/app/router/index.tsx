import { Navigate, RouteObject, createHashRouter } from 'react-router';
import * as Pages from '@/pages';
import { LayoutWithNavbar } from '@/widgets';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
import { routerService } from '@/shared/lib';

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
        element: <Pages.Projects />,
      },
      {
        path: '/projects',
        Component: LayoutWithNavbar,
        children: [
          {
            index: true,
            path: ':id',
            element: <Pages.ProjectId />,
          },
        ],
      },
      {
        path: '/settings',
        element: <Pages.Settings />,
      },
    ],
  },
];

const router = createHashRouter(routes, {});

export default router;
