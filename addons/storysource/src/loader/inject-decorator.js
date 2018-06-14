import fs from 'fs';
import path from 'path';
import defaultOptions from './default-options';

import {
  generateSourceWithDecorators,
  generateStorySource,
  generateAddsMap,
} from './generate-helpers';

function extendOptions(source, comments, filepath, options) {
  return {
    ...defaultOptions,
    ...options,
    source,
    comments,
    filepath,
  };
}

function extractDependencies(dependencies, filepath) {
  const filteredDeps = Array.from(dependencies).filter(dep => dep[0] === '.');

  const map = {};

  filteredDeps.forEach(dep => {
    const dir = path.dirname(filepath);
    const pathToDep = `${path.resolve(dir, dep)}.js`; // todo resolve extension

    if (fs.existsSync(pathToDep)) {
      const content = fs.readFileSync(pathToDep, 'utf8');

      map[pathToDep] = { content, pathToDep, dep };
    }
  });

  return map;
}

function inject(source, decorator, filepath, options = {}) {
  const { changed, source: newSource, comments, dependencies } = generateSourceWithDecorators(
    source,
    decorator,
    options.parser
  );

  if (!changed) {
    return {
      source: newSource,
      addsMap: {},
      dependenciesMap: {},
      changed,
    };
  }

  const storySource = generateStorySource(extendOptions(source, comments, filepath, options));
  const addsMap = generateAddsMap(storySource, options.parser);
  const dependenciesMap = extractDependencies(dependencies, filepath);

  return {
    source: newSource,
    storySource,
    addsMap,
    dependenciesMap,
    changed,
  };
}

export default inject;
