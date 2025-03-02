import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const GrabbingItem = ({ children }: Props) => {
  return (
    <Box
      sx={{
        cursor: 'grabbing',
      }}
    >
      {children}
    </Box>
  );
};
export default GrabbingItem;
