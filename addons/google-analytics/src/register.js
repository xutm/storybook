import addons from '@storybook/addons';
import global from 'global';
import ReactGA from 'react-ga';

addons.register('storybook/google-analytics', api => {
  ReactGA.initialize(global.STORYBOOK_GA_ID);

  api.onStory((kind, story) => {
    let path = global.window.location.pathname;

    if (path === '/') {
      path = '';
    }

    ReactGA.pageview(`${path}/${kind}/${story}`);
  });
});
