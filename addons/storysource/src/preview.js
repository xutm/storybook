import addons from '@storybook/addons';
import { EVENT_ID } from './events';

function getLocation(context, locationsMap) {
  return locationsMap[`${context.kind}@${context.story}`] || locationsMap[`@${context.story}`];
}

function setStorySource(context, source, locationsMap, dependenciesMap) {
  const channel = addons.getChannel();
  const currentLocation = getLocation(context, locationsMap);

  channel.emit(EVENT_ID, {
    source,
    currentLocation,
    locationsMap,
    dependenciesMap,
  });
}

export function withStorySource(source, locationsMap = {}, dependenciesMap = {}) {
  return (story, context) => {
    setStorySource(context, source, locationsMap, dependenciesMap);
    return story();
  };
}
