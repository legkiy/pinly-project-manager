import { Box, Card, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import { Project } from '../model';
import { memo } from 'react';

interface Props extends Project {
  height: number;
  width: number;
}

const ProjectCard = (project: Props) => {
  return (
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
                {project.description}sadjkasbdjklasbhdljkh ljkasjkl djlhashbgdl jhasdjh bsajkhbd jshadvjhasd asdasd
                asdasd asdasd adasd sad asf aeswddfg weaf weaf awefaw e
              </Typography>
            </Box>
          </CardContent>
        </Grid2>
        <Grid2 size={4}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: project.height }}
            src="src/widgets/ProjectsList/example2.png"
            alt={`${project.title} image`}
          />
        </Grid2>
      </Grid2>
    </Card>
  );
};
export default memo(ProjectCard);
