import { Outlet } from 'react-router';
import { Navbar } from '@/widgets';
import { Container } from '@mui/material';

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutWithNavbar;
