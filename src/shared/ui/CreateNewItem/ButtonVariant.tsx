import { Button } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Text from '../Text';
import Link from '../Link';
import { PropsButton } from '.';

const ButtonVariant = ({ titleKey, onClick, sx, to, ...buttonProps }: PropsButton) => {
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
      {...buttonProps}
    >
      <Text mess={titleKey} variant="subtitle1" fontWeight={700} />
    </Button>
  );

  return to ? <Link to={to}>{btn}</Link> : btn;
};

export default ButtonVariant;
