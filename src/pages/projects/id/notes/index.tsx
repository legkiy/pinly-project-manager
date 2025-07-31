import { Box, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ProjectIdNotesPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false); // сначала закрыть с анимацией
    setTimeout(() => navigate(-1), 200); // потом перейти назад после анимации
  };

  useEffect(() => {
    const timeout = setTimeout(() => setOpen(true), 10); // следующий tick
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose} keepMounted>
      <Box p={2} height="50vh" sx={{ backgroundColor: 'white' }}>
        Drawer контент
      </Box>
    </Drawer>
  );
};

export default ProjectIdNotesPage;
