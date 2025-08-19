import { Box } from '@mui/material';
import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';

interface Props {
  projectId: string;
}

const OpenNotesDrawer = ({ projectId }: Props) => {
  return (
    <Link to={routerService.projects.notes(projectId)}>
      <Box
        sx={{
          height: 130,
          width: 100,
          bgcolor: 'note.main',
          boxShadow: 2,
        }}
      />
    </Link>
  );
};

export default OpenNotesDrawer;
