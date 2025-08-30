import { IconButton, Stack, StackProps } from '@mui/material';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router';

interface Props extends Omit<StackProps, 'title' | 'children'> {
  title?: React.ReactNode;
}

const NavigationBack = ({ title, ...stackProps }: Props) => {
  const navigate = useNavigate();

  const handleOnback = () => {
    navigate(-1);
  };
  return (
    <Stack direction="row" gap={1} alignItems="center" {...stackProps}>
      <IconButton onClick={handleOnback}>
        <KeyboardBackspaceRoundedIcon />
      </IconButton>
      {title}
    </Stack>
  );
};

export default NavigationBack;
