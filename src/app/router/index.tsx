import { createHashRouter, Navigate, RouteObject } from 'react-router';
import { LayoutWithNavbar } from '@/widgets';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
import { routerService } from '@/shared/lib';
import { ProjectIdPage, ProjectsPage, SettingsPage } from '@/pages';

const routes: RouteObject[] = [
  {
    Component: ErrorDisplay,
    children: [
      {
        path: '/',
        element: <Navigate to={routerService.projects.root} replace />,
      },
      {
        path: '/projects',
        Component: ProjectsPage,
      },
      {
        path: '/projects',
        Component: LayoutWithNavbar,
        children: [
          {
            path: ':id',
            Component: ProjectIdPage,
            children: [
              {
                path: 'notes',
                lazy: async () => {
                  const module = await import('@/pages/projects/id/notes');
                  return {
                    Component: module.default,
                  };
                },
              },
            ],
          },
        ],
      },
      {
        path: '/settings',
        Component: SettingsPage,
      },
    ],
  },
];

const router = createHashRouter(routes, {});

export default router;
