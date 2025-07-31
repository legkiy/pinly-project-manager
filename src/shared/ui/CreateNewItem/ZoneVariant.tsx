import { Box, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ScalingCard from '../ScalingCard';
import Text from '../Text';
import { IGeneralCreateNewItemProps } from '.';

const ZoneVariant = ({ titleKey, onClick, sx, to }: IGeneralCreateNewItemProps) => {
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

export default ZoneVariant;
