import React from 'react';
import { storiesOf } from '@storybook/react';

import Layout from './index';

const panelStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  color: 'white',
};

const componentStubs = {
  storiesPanel: () => <div style={{ ...panelStyle, background: '#4abdac' }}>Stories</div>,
  addonPanel: () => <div style={{ ...panelStyle, background: '#fc4a1a' }}>Addon</div>,
  preview: () => <div style={{ ...panelStyle, background: '#f7b733' }}>Preview</div>,
  searchBox: () => <div />,
  shortcutsHelp: () => <div />,
  uiOptions: { theme: {}, name: 'DEMO' },
};

storiesOf('Components|Layout', module)
  .add('default', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: true,
        showAddonPanel: true,
        goFullScreen: false,
        addonPanelInRight: false,
      }}
      isMobileDevice={false}
      {...componentStubs}
    />
  ))
  .add('mobile', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: true,
        showAddonPanel: true,
        goFullScreen: false,
        addonPanelInRight: false,
      }}
      isMobileDevice
      {...componentStubs}
    />
  ))
  .add('full screen', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: false,
        showAddonPanel: false,
        goFullScreen: true,
        addonPanelInRight: false,
      }}
      isMobileDevice={false}
      {...componentStubs}
    />
  ))
  .add('no stories panel', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: false,
        showAddonPanel: true,
        goFullScreen: false,
        addonPanelInRight: false,
      }}
      isMobileDevice={false}
      {...componentStubs}
    />
  ))
  .add('no addon panel', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: true,
        showAddonPanel: false,
        goFullScreen: false,
        addonPanelInRight: false,
      }}
      isMobileDevice={false}
      {...componentStubs}
    />
  ))
  .add('addon panel in right', () => (
    <Layout
      shortcutOptions={{
        showStoriesPanel: true,
        showAddonPanel: true,
        goFullScreen: false,
        addonPanelInRight: true,
      }}
      isMobileDevice={false}
      {...componentStubs}
    />
  ));
