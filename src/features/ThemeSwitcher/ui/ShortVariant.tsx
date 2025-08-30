import { Button, ButtonGroup } from '@mui/material';
import { ThemeMode, themsOptionsList } from '../model';

interface Props {
  onClick: (theme: ThemeMode) => void;
  currentMode: ThemeMode;
}

const ShortVariant = ({ currentMode, onClick }: Props) => {
  return (
    <ButtonGroup>
      {themsOptionsList.map((el) => (
        <Button
          key={el.option}
          onClick={() => onClick(el.option)}
          variant={currentMode === el.option ? 'contained' : 'outlined'}
        >
          <el.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ShortVariant;
