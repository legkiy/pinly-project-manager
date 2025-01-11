import { Text } from '@/shared/ui';
import { Project } from '@/widgets/ProjectsList/model';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useStartPageSetter } from '../lib';
import { routerService } from '@/shared/lib';

interface Props {
  projects: Project[];
}

const StartPageSetter = ({ projects }: Props) => {
  const { setStartPage, startPage } = useStartPageSetter();

  const handleChange = (event: SelectChangeEvent) => {
    setStartPage(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 200,
      }}
    >
      <InputLabel>
        <Text mess="settings.pageWhenOpened" />
      </InputLabel>
      <Select onChange={handleChange} label={<Text mess="settings.pageWhenOpened" />} value={startPage}>
        <MenuItem value="/">
          <Text mess="projectsList" />
        </MenuItem>
        {projects.map((project) => (
          <MenuItem key={project.id} value={routerService.project.slug(project.id)}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default StartPageSetter;
