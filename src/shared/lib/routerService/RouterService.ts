import { createEntityRouteMap } from './createEntityRouteMap';

const routerService = {
  projects: createEntityRouteMap('projects'),
  settings: {
    root: 'settings',
  },
};

export default routerService;
