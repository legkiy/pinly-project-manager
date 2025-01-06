import { Box, Card, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import { Project } from '../model';
import { memo } from 'react';
import { routerService } from '@/shared/lib';
import { Link } from '@/shared/ui';

interface Props extends Project {
  height: number;
  width: number;
}

const ProjectCard = (project: Props) => {
  return (
    <Link to={routerService.project.slug(project.id)} underline="none">
      <Card
        elevation={0}
        sx={{
          height: project.height,
          width: project.width,
          cursor: 'pointer',
          ':hover': {
            scale: 1.02,
          },
        }}
      >
        <Grid2 container>
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
              sx={{ width: 150, height: project.height }}
              src="src/widgets/ProjectsList/example.png"
              alt={`${project.name} image`}
            />
          </Grid2>
        </Grid2>
      </Card>
    </Link>
  );
};
export default memo(ProjectCard);
