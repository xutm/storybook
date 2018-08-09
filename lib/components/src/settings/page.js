import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import SplitPane from 'react-split-pane';
import { Route } from '../router/router';

import SectionLink from '../navigation/sectionLink';
import Icons from '../icons';
import About from './about';
import Shortcuts from './shortcuts';
import { Spaced } from '../grid/grid';
import Heading from '../heading/heading';
import { NavSecondary, Other } from '../layout/navbar';

const StoriesPanelWrapper = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flex: 1,
  padding: theme.layoutMargin,
  background: theme.asideFill,
  justifyContent: 'space-between',
}));

const StoriesPanelInner = styled('div')({
  position: 'relative',
});

const NavList = styled('ul')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.layoutMargin,
  padding: 0,
  display: 'block',
}));

const NavItem = styled('li')(({ theme, active }) => ({
  margin: 0,
  marginLeft: -theme.layoutMargin,
  marginRight: -theme.layoutMargin,
  borderBottom: theme.mainBorder,
  borderLeft: active ? `3px solid ${theme.highlightColor}` : '0 none',
  display: 'flex',
}));

const sections = {
  about: About,
  shortcuts: Shortcuts,
};

const list = Object.keys(sections);

const Nav = ({ active }) => (
  <div>
    <NavList>
      {list.map(i => (
        <NavItem key={i} active={active === i}>
          <SectionLink to={`/settings/${i}`}>{i}</SectionLink>
        </NavItem>
      ))}
    </NavList>
  </div>
);
Nav.propTypes = {
  active: PropTypes.string.isRequired,
};

const SettingsPage = ({ params: { section }, ...rest }) => (
  <SplitPane
    split="vertical"
    allowResize
    minSize={100}
    maxSize={-300}
    defaultSize={250}
    paneStyle={{ display: 'flex' }}
  >
    <StoriesPanelWrapper>
      <StoriesPanelInner>
        <Spaced>
          <Heading>Settings</Heading>
          <Nav active={section} />
        </Spaced>
      </StoriesPanelInner>
      <StoriesPanelInner>... bottom ...</StoriesPanelInner>
    </StoriesPanelWrapper>
    {sections[section](rest)}
  </SplitPane>
);
SettingsPage.propTypes = {
  params: PropTypes.shape({}).isRequired,
};

const RouteRender = ({ shortcuts }) => (
  <Route
    key="settings"
    path="/settings/:section"
    strict={false}
    render={props => (
      <Other>
        <SettingsPage {...props} shortcuts={shortcuts} />
      </Other>
    )}
  />
);
RouteRender.propTypes = {
  shortcuts: PropTypes.shape({}).isRequired,
};

const SettingsSection = {
  link: () => (
    <NavSecondary key="settings" to="/settings/about">
      <Icons.Gear />
    </NavSecondary>
  ),
  render: RouteRender,
};

export { SettingsSection as default };
