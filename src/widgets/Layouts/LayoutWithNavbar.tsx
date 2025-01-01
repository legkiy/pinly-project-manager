import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Navbar } from '@/widgets';

const drawerWidth = 230;

const LayoutWithNavbar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar width={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWithNavbar;
