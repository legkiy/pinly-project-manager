import { Link as RouterLink } from 'react-router';
import { LinkProps, Link as MuiLink } from '@mui/material';
import { memo } from 'react';

interface Props extends Omit<LinkProps, 'href'> {
  to: string;
}
const Link = (props: Props) => {
  return (
    <MuiLink underline="none" {...props} component={RouterLink} to={props.to}>
      {props.children}
    </MuiLink>
  );
};
export default memo(Link);
