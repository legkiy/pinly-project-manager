import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';
import { Navbar } from '@/widgets';

const drawerWidth = 230;

const LayoutWithNavbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar width={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh', overflowX: 'hidden' }}>
        <Stack gap={2} height="100%">
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
};

export default LayoutWithNavbar;
