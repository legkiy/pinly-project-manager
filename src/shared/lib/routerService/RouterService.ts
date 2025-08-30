import { createEntityRouteMap } from './createEntityRouteMap';

const routerService = {
  projects: createEntityRouteMap('projects', (rootPath) => ({
    notes: (projectId) => `/${rootPath}/${projectId}/notes`,
  })),
  settings: {
    root: '/settings',
  },
};

export default routerService;
