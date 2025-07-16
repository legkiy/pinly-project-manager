import { Text } from '@/shared/ui';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useStartPageSetter } from '../lib';
import { routerService } from '@/shared/lib';
import { Project } from '@/entities/Project';

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
      <Select onChange={handleChange} label={<Text mess="settings.pageWhenOpened" text />} value={startPage}>
        <MenuItem value="/">
          <Text mess="project.list" />
        </MenuItem>
        {projects.map((project) => (
          <MenuItem key={project.id} value={routerService.projects.id(project.id)}>
            {project.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default StartPageSetter;
