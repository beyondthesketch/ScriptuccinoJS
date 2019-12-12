/** ScriptuccinoJS - fadeOut | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import applyTransition from './applyTransition.js';

/* TODO: Handle elements that are display: none */
const fadeOut = (element, completeFn, settings) => {
  const config = { property: 'opacity' };

  if (!element) {
    return console && console.warn( 'ScriptuccinoJS - fadeOut not supplied an element to fade out!' );
  }

  if (settings && typeof settings === 'object') {
    Object.assign(config, settings);
  }

  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 0) {
    applyTransition(element, config, { 'opacity' : '0' }, completeFn);
  }
};
export default fadeOut;
