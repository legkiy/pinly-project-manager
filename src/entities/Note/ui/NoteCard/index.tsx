import { Box } from '@mui/material';
import { memo } from 'react';
import { Note } from '../../model';

interface Props extends Note {}

const NoteCard = ({ title, descriptions }: Props) => {
  return (
    <Box
      sx={({ shadows }) => ({
        bgcolor: '#dac66d',
        width: 270,
        height: 240,
        boxShadow: shadows[4],
        p: 1,
        color: '#000',
      })}
    >
      {title}
      {descriptions}
    </Box>
  );
};

export default memo(NoteCard);
