import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import WindowRoundedIcon from '@mui/icons-material/WindowRounded';

const Navbar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <Link to={routerService.main.root} underline="none" color="textPrimary">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WindowRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Список проектов" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};
export default Navbar;
