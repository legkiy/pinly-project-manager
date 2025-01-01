import { Link, Text } from '@/shared/ui';
import { Box, Button, CSSObject, Drawer, IconButton, List, ListItem, Theme, useTheme } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { NAV_ITEMS_LIST } from '../lib';

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          py: 1,
          pr: 1.5,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
      </Box>
      <List>
        {NAV_ITEMS_LIST.map((item) => (
          <Link to={item.link} underline="none" color="textPrimary">
            <ListItem
              sx={{
                justifyContent: 'center',
                p: 1.6,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={open ? <item.icon /> : null}
                sx={
                  open
                    ? {}
                    : {
                        minWidth: 'unset',
                        p: 0.8,
                      }
                }
              >
                {open ? <Text mess={item.titleKet} /> : <item.icon />}
              </Button>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};
export default Navbar;
