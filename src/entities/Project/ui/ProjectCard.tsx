import { CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { routerService } from '@/shared/lib';
import { ScalingCard } from '@/shared/ui';
import { Project } from '../model';
import DeleteProjectModal from './DeleteProjectModal';

interface Props extends Project {}

const ProjectCard = (project: Props) => {
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
            </Typography>
          </CardContent>
          <CardActions>
            <DeleteProjectModal projectId={project.id} projectName={project.title} />
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
