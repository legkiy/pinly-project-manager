import { Card, CardProps, styled } from '@mui/material';
import { forwardRef, memo } from 'react';
import Link from '../Link';

const StyledCard = styled(Card)(({ active }: { active: 'hover' | boolean }) => ({
  position: 'relative',
  transition: 'transform 0.3s',
  ':hover':
    active === 'hover'
      ? {
          transform: 'scale(1.02)',
        }
      : {},
  transform: active === true ? 'scale(1.02)' : '',
}));

interface Props extends CardProps {
  to?: string;
  children: React.ReactNode;
  active?: 'hover' | boolean;
}

const ScalingCard = forwardRef<HTMLDivElement, Props>(({ to, children, active = 'hover', ...cardProps }, ref) => {
  const content = (
    <StyledCard {...cardProps} ref={ref} active={active}>
      {children}
    </StyledCard>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
});
export default memo(ScalingCard);
