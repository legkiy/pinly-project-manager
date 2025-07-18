import { Card, CardProps, styled } from '@mui/material';
import { memo } from 'react';
import Link from '../Link';

const StyledCard = styled(Card)(() => ({
  position: 'relative',
  transition: 'transform 0.3s',
  ':hover': {
    transform: 'scale(1.02)',
  },
}));

interface Props extends CardProps {
  to?: string;
  children: React.ReactNode;
}

const ScalingCard = ({ to, children, ...cardProps }: Props) => {
  const content = <StyledCard {...cardProps}>{children}</StyledCard>;

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};
export default memo(ScalingCard);
