/** ScriptuccinoJS - fadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import applyTransition from 'applyTransition.js';

/* TODO: Handle elements that are display: none */
const fadeIn = (element, ...otherArgs) => {
  if (!element) {
    return console && console.warn( 'ScriptuccinoJS - fadeIn not supplied an element to fade in!' );
  }
  const completeFn = (typeof otherArgs[0] === 'function' && otherArgs[0] || undefined);
  const settings = (typeof otherArgs[0] === 'object' && otherArgs[0] || (typeof otherArgs[1] === 'object' && otherArgs[1]) || undefined);
  const config = {};

  settings && typeof settings === 'object' && Object.assign(config, settings);
  config.property = 'opacity';

  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 1) {
    applyTransition(element, config, { 'opacity' : '1' }, completeFn);
  }
};
export default fadeIn;
