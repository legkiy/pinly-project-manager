import { Link, Text } from '@/shared/ui';
import { Box, Button, Drawer, IconButton, List, ListItem, useTheme } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { closedMixin, NAV_ITEMS_LIST, openedMixin } from '../lib';

interface Props {
  width: number;
}

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
          <Link to={item.link} underline="none" color="textPrimary" key={item.link}>
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
                {open ? <Text mess={item.titleKey} /> : <item.icon />}
              </Button>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};
export default Navbar;
