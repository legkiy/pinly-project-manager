import { Paper } from '@mui/material';

interface Props {
  title: React.ReactNode;
}

const Column = ({ title }: Props) => {

  return (
    <Paper
      sx={{
        p: 1,
      }}
    >
      {title}
    </Paper>
  );
};
export default Column;
