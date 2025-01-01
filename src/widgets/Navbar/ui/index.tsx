import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';
import { Button, CSSObject, Drawer, IconButton, List, ListItem, styled, Theme, useTheme } from '@mui/material';
import WindowRounded from '@mui/icons-material/WindowRounded';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Props {
  width: number;
}

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Navbar = ({ width }: Props) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const theme = useTheme();

  const drawerStyle = open
    ? {
        ...openedMixin(theme, width),
        '& .MuiDrawer-paper': openedMixin(theme, width),
      }
    : {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      };

  return (
    <Drawer
      variant="permanent"
      sx={{
        ...drawerStyle,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
      </DrawerHeader>
      <List>
        <Link to={routerService.main.root} underline="none" color="textPrimary">
          <ListItem
            disablePadding
            sx={{
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              startIcon={open ? <WindowRounded /> : null}
              sx={
                open
                  ? {}
                  : {
                      minWidth: 'unset',
                      p: 0.8,
                    }
              }
            >
              {open ? 'Список проектов' : <WindowRounded />}
            </Button>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};
export default Navbar;
