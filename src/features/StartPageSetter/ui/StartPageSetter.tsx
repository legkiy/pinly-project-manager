import { Text } from '@/shared/ui';
import { Project } from '@/widgets/ProjectsList/model';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface Props {
  projects: Project[];
}

const StartPageSetter = ({ projects }: Props) => {
  const [defaultPage, setDefaultPage] = useState<string>('/');
  const handleChange = (event: SelectChangeEvent) => {
    setDefaultPage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>
        <Text mess="settings.pageWhenOpened" />
      </InputLabel>
      <Select onChange={handleChange} label={<Text mess="settings.pageWhenOpened" />} value={defaultPage}>
        <MenuItem value="/">
          <Text mess="projectsList" />
        </MenuItem>
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default StartPageSetter;
