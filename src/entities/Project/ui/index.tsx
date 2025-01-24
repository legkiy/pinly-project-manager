import { Box, Card, CardActions, CardContent, CardMedia, Grid2, IconButton, Typography } from '@mui/material';
import { memo } from 'react';
import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';
import { RemoveCircleRounded } from '@mui/icons-material';
import { Project } from '../model';
import useProjectStore from '../lib';

interface Props extends Project {
  height: number;
  width: number;
}

const ProjectCard = (project: Props) => {
  const { removeProject } = useProjectStore();

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    removeProject(project.id);
  };

  return (
    <Link to={routerService.project.slug(project.id)} underline="none">
      <Card
        elevation={0}
        sx={{
          aspectRatio: 16 / 9,
          cursor: 'pointer',
          ':hover': {
            scale: 1.02,
          },
        }}
      >
        <Grid2 container height="100%">
          <Grid2 size={8}>
            <CardContent>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    textWrap: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.name}
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
              </Box>
            </CardContent>
          </Grid2>
          <Grid2 size={4}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: '100%', bgcolor: 'divider' }}
              src="/img/placeholder.avif"
              alt={`${project.name} image`}
            />
          </Grid2>
          <CardActions>
            <IconButton onClick={handleRemove}>
              <RemoveCircleRounded />
            </IconButton>
          </CardActions>
        </Grid2>
      </Card>
    </Link>
  );
};
export default memo(ProjectCard);
