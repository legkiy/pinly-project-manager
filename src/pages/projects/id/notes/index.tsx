import { useParams } from 'react-router';
import { NotesDrawer } from '@/widgets';

const ProjectIdNotesPage = () => {
  const { projectId } = useParams();

  return <NotesDrawer projectId={projectId || ''} />;
};

export default ProjectIdNotesPage;
