import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';

interface Props {
  projectId: string;
}
const OpenNotesDrawer = ({ projectId }: Props) => {
  return <Link to={routerService.projects.notes(projectId)}>notes</Link>;
};

export default OpenNotesDrawer;
