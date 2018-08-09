import styled from 'react-emotion';
import { Link } from '../router/router';

export const NavBar = styled('nav')(({ theme }) => ({
  width: 50,
  minWidth: 50,
  height: '100%',
  background: theme.navFill,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
}));

export const NavBarHead = styled('header')(({ theme }) => theme);
export const NavPrimary = styled(Link)({
  background: 'rgba(0,0,0,0.15)',
  width: '100%',
  minHeight: 10,
  margin: '10px 0',
  padding: 10,
  boxSizing: 'border-box',
  display: 'block',
  color: 'inherit',
});
export const NavSecondary = styled(Link)({
  background: 'rgba(0,0,0,0.25)',
  width: '100%',
  minHeight: 10,
  margin: 0,
  padding: 10,
  boxSizing: 'border-box',
  display: 'block',
  color: 'inherit',
});

export const Other = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  boxSizing: 'border-box',
});
