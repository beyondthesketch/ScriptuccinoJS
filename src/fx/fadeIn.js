/** ScriptuccinoJS - fadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import applyTransition from './applyTransition.js';

/* TODO: Handle elements that are display: none */
const fadeIn = (element, completeFn, settings) => {
  const config = { property: 'opacity' };

  if (!element) {
    return console && console.warn( 'ScriptuccinoJS - fadeIn not supplied an element to fade in!' );
  }

  if (settings && typeof settings === 'object') {
    if (Object.assign == 'function') {
      Object.assign(config, settings);
    }
    else {
      for (let i in settings) {
        if (settings.hasOwnProperty(i)) {
          config[i] = settings[i];
        }
      }
    }
  }

  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 1) {
    applyTransition(element, config, { 'opacity' : '1' }, completeFn);
  }
};
export default fadeIn;
