/** ScriptuccinoJS - fadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import applyTransition from './applyTransition.js';

/* TODO: Handle elements that are display: none */
const fadeIn = (element, completeFn, settings) => {
  const config = { property: 'opacity' };

  if (!element) {
    return console && console.warn( 'ScriptuccinoJS - fadeIn not supplied an element to fade in!' );
  }

  if (settings && typeof settings === 'object') {
    Object.assign(config, settings);
  }

  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 1) {
    applyTransition(element, config, { 'opacity' : '1' }, completeFn);
  }
};
export default fadeIn;
