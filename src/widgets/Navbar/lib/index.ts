import WindowRounded from '@mui/icons-material/WindowRounded';
import { routerService } from '@/shared/lib';

export const NAV_ITEMS_LIST = [
  {
    titleKey: 'projectsList',
    link: routerService.projects.root,
    icon: WindowRounded,
  },
];

export { closedMixin, openedMixin } from './mixins';
