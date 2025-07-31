import { Box, Drawer } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProjectIdNotesPage = () => {
  console.log('asdasd');

  const navigate = useNavigate();

  // Закрытие при клике вне
  const handleClose = () => {
    navigate(-1); // Возврат к /projects/:id
  };

  // Чтобы избежать мигания на SSR/первом рендере
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Drawer anchor="bottom" open keepMounted={false} onClose={handleClose}>
      <Box p={2} height="40vh">
        {/* Контент drawer */}
        Детали проекта
      </Box>
    </Drawer>
  );
};

export default ProjectIdNotesPage;
