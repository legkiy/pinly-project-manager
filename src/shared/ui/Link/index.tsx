import { NavLink } from 'react-router';
import { Link as MuiLink, LinkProps } from '@mui/material';
import { memo } from 'react';

interface Props extends Omit<LinkProps, 'href'> {
  to: string;
}
const Link = (props: Props) => {
  return (
    <MuiLink {...props} component={NavLink} to={props.to}>
      {props.children}
    </MuiLink>
  );
};
export default memo(Link);
