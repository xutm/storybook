import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';

import { normal as defaultTheme } from '../theme';
import Icons from '../icons';
import { NavBar, NavBarHead, NavPrimary, Other } from './navbar';
import { Router, Route } from '../router/router';

import MobileLayout from './mobile';
import DesktopLayout from './desktop';
import SettingsSection from '../settings/page';

export const Root = styled('div')(
  ({ theme }) => ({
    background: theme.mainBackground,
    fontFamily: theme.mainTextFace,
    color: theme.mainTextColor,
    fontSize: theme.mainTextSize,
  }),
  ({ isMobileDevice }) =>
    isMobileDevice
      ? {
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'auto',
        }
      : {
          position: 'fixed',
          display: 'flex',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        }
);

const StoriesPanelInner = styled('div')({
  flexGrow: 1,
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'auto',
});

const primaryList = [
  // {
  //   link: () => (
  //     <NavPrimary key="token" to="/tokens">
  //       T
  //     </NavPrimary>
  //   ),
  //   render: () => <Route key="token" path="/tokens" render={() => <Other>Hello tokens!</Other>} />,
  // },
  // {
  //   link: () => (
  //     <NavPrimary key="docs" to="/docs">
  //       D
  //     </NavPrimary>
  //   ),
  //   render: () => <Route key="docs" path="/docs" render={() => <Other>Hello docs!</Other>} />,
  // },
];

const secondaryList = [SettingsSection];

const Layout = props => {
  const {
    isMobileDevice,
    addonPanel: AddonPanel,
    storiesPanel: StoriesPanel,
    preview: Preview,
    shortcutsHelp: ShortcutsHelp,
    searchBox: SearchBox,
    uiOptions: { name, theme },
  } = props;

  return (
    <Router>
      <ThemeProvider theme={theme || defaultTheme}>
        <Root isMobileDevice={isMobileDevice}>
          <NavBar>
            <div>
              <NavBarHead>{name}</NavBarHead>
              <NavPrimary to="/components">
                <Icons.Component />
              </NavPrimary>
              {primaryList.map(item => item.link())}
            </div>
            <div>{secondaryList.map(item => item.link())}</div>
          </NavBar>
          <Route
            exact
            path="/components"
            render={() => (
              <Other>
                {isMobileDevice ? (
                  <MobileLayout>
                    <StoriesPanelInner>
                      <StoriesPanel />
                    </StoriesPanelInner>
                    <StoriesPanelInner>
                      <Preview />
                    </StoriesPanelInner>
                    <AddonPanel />
                  </MobileLayout>
                ) : (
                  <DesktopLayout {...props} />
                )}
                <SearchBox />
              </Other>
            )}
          />
          {primaryList.map(item => item.render())}
          {secondaryList.map(item => item.render({ shortcuts: <ShortcutsHelp /> }))}
        </Root>
      </ThemeProvider>
    </Router>
  );
};

Layout.propTypes = {
  uiOptions: PropTypes.shape({
    theme: PropTypes.shape({}),
  }).isRequired,
  storiesPanel: PropTypes.func.isRequired,
  preview: PropTypes.func.isRequired,
  addonPanel: PropTypes.func.isRequired,
  shortcutsHelp: PropTypes.func.isRequired,
  searchBox: PropTypes.func.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
};

export default Layout;
