import { Card, CardProps, styled } from '@mui/material';
import { forwardRef, memo } from 'react';
import Link from '../Link';

const StyledCard = styled(Card)(({ active }: { active?: 'hover' | 'false' | 'true' }) => ({
  position: 'relative',
  transition: 'all 0.3s',
  ':hover':
    active === 'hover'
      ? {
          transform: 'scale(1.02)',
        }
      : {},
  transform: active === 'true' ? 'scale(1.02)' : '',
}));

interface Props extends CardProps {
  to?: string;
  children: React.ReactNode;
  active?: 'hover' | boolean;
}

const ScalingCard = forwardRef<HTMLDivElement, Props>(({ to, children, active = 'hover', ...cardProps }, ref) => {
  let normalizedActive: 'hover' | 'false' | 'true';
  if (typeof active === 'boolean') {
    normalizedActive = active ? 'true' : 'false';
  } else {
    normalizedActive = active;
  }
  const content = (
    <StyledCard {...cardProps} ref={ref} active={normalizedActive}>
      {children}
    </StyledCard>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
});
export default memo(ScalingCard);
