import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useDroppable } from '@dnd-kit/core';
import { Stack } from '@mui/material';
import { ScalingCard } from '@/shared/ui';

const TrashContainer = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'trash',
  });

  return (
    <Stack
      sx={{
        mt: 'auto',
        zIndex: -1,
      }}
    >
      <ScalingCard
        ref={setNodeRef}
        active={!!isOver}
        sx={{
          ml: 'auto',
          p: 1,
          bgcolor: isOver ? 'error.light' : 'transparent',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderStyle: 'dashed',
            borderColor: 'error.main',
            borderRadius: 0.6,
            borderWidth: 4,
            px: 6,
          }}
        >
          <DeleteForeverRoundedIcon
            color="error"
            sx={{
              width: 150,
              height: 150,
            }}
          />
        </Stack>
      </ScalingCard>
    </Stack>
  );
};

export default TrashContainer;
