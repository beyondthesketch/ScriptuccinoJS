/** ScriptuccinoJS - fadeTo | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import applyTransition from './applyTransition.js';

/* TODO: Handle elements that are display: none */
const fadeTo = (element, opacity, completeFn, settings) => {
  const config = { property: 'opacity' };

  if (!opacity || typeof opacity !== 'number') {
    return console && console.warn( 'ScriptuccinoJS - fadeTo not supplied a valid value to fade to!' );
  }

  if (settings && typeof settings === 'object') {
    Object.assign(config, settings);
  }

  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== (opacity/100)) {
    applyTransition(element, config, { 'opacity' : (opacity/100).toString() }, completeFn);
  }
};
export default fadeTo;
