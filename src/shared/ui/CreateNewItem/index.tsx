import { Box, Button, Stack, SxProps, Theme } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Text from '../Text';
import ScalingCard from '../ScalingCard';
import Link from '../Link';

interface Props {
  titleKey: string | string[];
  to?: string;
  onClick?: () => void;
  variant?: 'zone' | 'button';
  sx?: SxProps<Theme>;
}

const CreateNewItem = ({ titleKey, to, variant = 'zone', onClick, sx }: Props) => {
  if (variant === 'button') {
    const btn = (
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={
          <AddCircleOutlineRoundedIcon
            sx={{
              width: 26,
              height: 26,
            }}
          />
        }
        sx={sx}
      >
        <Text mess={titleKey} variant="subtitle1" fontWeight={700} />
      </Button>
    );
    return to ? <Link to={to}>{btn}</Link> : btn;
  }
  return (
    <ScalingCard
      to={to}
      sx={{
        height: '100%',
        width: '100%',
        p: 1,
        cursor: 'pointer',
        ...sx,
      }}
      onClick={onClick}
    >
      <Stack
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          display: 'flex',
          borderStyle: 'dashed',
          borderColor: 'action.disabled',
          borderRadius: 0.8,
          borderWidth: 4,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            borderStyle: 'solid',
            borderColor: 'action.disabled',
            borderRadius: 1,
            borderWidth: 4,
          }}
        >
          <AddRoundedIcon sx={{ width: 60, height: 60 }} color="disabled" />
        </Box>
        <Text mess={titleKey} variant="subtitle1" color="textDisabled" fontWeight={700} />
      </Stack>
    </ScalingCard>
  );
};
export default CreateNewItem;
