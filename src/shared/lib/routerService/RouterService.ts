import { createEntityRouteMap } from './createEntityRouteMap';
import Route from './Route';

class RouterService {
  private static _mainInst = new Route('');
  static main = {
    root: RouterService._mainInst.path,
  };

  private static _projectInst = new Route('project');
  static project = {
    slug: (id: string) => RouterService._projectInst.slug(id).path,
  };

  private static _settingInst = new Route('settings');
  static setttings = {
    root: RouterService._settingInst.path,
  };
}

const routerService = {
  projects: createEntityRouteMap('projects'),
  settings: {
    root: 'settings',
  },
};

export default routerService;
