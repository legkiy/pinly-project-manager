import { CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { memo } from 'react';
import { RemoveCircleRounded } from '@mui/icons-material';
import { routerService } from '@/shared/lib';
import { ScalingCard } from '@/shared/ui';
import { Project } from '../model';
import { useProjectStore } from '../lib';

interface Props extends Project {}

const ProjectCard = (project: Props) => {
  const deleteProject = useProjectStore((s) => s.deleteProject);
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    deleteProject(project.id);
  };

  return (
    <ScalingCard
      to={routerService.projects.id(project.id)}
      elevation={3}
      sx={{
        aspectRatio: 21 / 9,
      }}
    >
      <Grid container height="100%">
        <Grid
          size={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                textWrap: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 4, // Количество строк перед обрезанием
              }}
            >
              {project.description}
              Описание проекта
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleRemove}>
              <RemoveCircleRounded />
            </IconButton>
          </CardActions>
        </Grid>
        <Grid size={5}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', bgcolor: 'divider' }}
            src="/img/placeholder.avif"
            alt={`${project.title} image`}
          />
        </Grid>
      </Grid>
    </ScalingCard>
  );
};
export default memo(ProjectCard);
