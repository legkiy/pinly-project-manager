import { RouteObject, createHashRouter } from 'react-router';
import * as Pages from '@/pages';
import { LayoutWithNavbar } from '@/widgets';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';

const routes: RouteObject[] = [
  {
    element: <ErrorDisplay />,
    children: [
      {
        index: true,
        path: '/',
        element: <Pages.Main />,
      },
      {
        path: '/project',
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
