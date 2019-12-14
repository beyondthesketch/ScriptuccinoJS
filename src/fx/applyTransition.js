/** ScriptuccinoJS - applyTransition | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
const vendors = [
  'webkit',
  'moz',
  'o',
  'ms'
];

const transitionendProp = (function () {
  if (self.document) {
    let prop = 'transitionend';

    if ('ontransitionend' in document.body) {
      return prop;
    }
    else {

      for (let i = vendors.length; i--;) {
        if (('on' + vendors[i] + 'transitionend') in document.body) {
          prop = vendors[i] + prop;
          break;
        }
      }

      if (!prop) {
        console && console.error('Transition: transitionend is not supported by this browser');
      }
    }

    return prop;
  }
  else {
    console && console.warn('ScriptuccinoJS: transitions not supported on this environment');
    return undefined;
  }
}());

export const transitionProperty = (function () {
  if (self.document) {
    if ('transition' in document.body.style) {
      return 'transition';
    }
    else {
      let prop;

      for (let i = vendors.length; i--;) {
        if ((vendors[i] + 'Transition') in document.body.style) {
          prop = (vendors[i] + 'Transition');
          break;
        }
      }

      return prop;
    }
  }
  else {
    console && console.warn('ScriptuccinoJS: transitions not supported on this environment');
    return undefined;
  }
}());

const applyTransition = (function () {
  if (self.document && transitionProperty) {
    return (element, settings, styles, completeFn) => {
      const elm = element;
      const transitionProp = transitionProperty;
      let longestTransition;

      if (typeof settings === 'object') {
        if (Array.isArray(settings)) {
          /* multiple transitions defined... */
          let rule = [];

          const reversed = settings.map((x) => x).reverse();
          const longest = Math.max(...(settings.map( (conf) => conf.duration)));

          for (let i = 0; i < reversed.length; i++) {
            if (reversed[i].duration === longest) {
              longestTransition = reversed[i];
              break;
            }
          }

          for (let i = settings.length; i--;) {
            rule.push( settings[i].property + (settings[i].duration ? ' ' + settings[i].duration + 'ms' : ' 500ms') + (settings[i].curve ? ' ' + settings[i].curve : ' ease') + (settings[i].delay ? ' ' + settings[i].delay : '') );
          }

          elm.style[transitionProp] = rule.join(', ');
        }
        else {
          /* single transition defined */
          elm.style[transitionProp] =
            settings.property
            + (settings.duration ? ' ' + settings.duration + 'ms' : ' 500ms')
            + (settings.curve ? ' ' + settings.curve : ' ease')
            + (settings.delay ? ' ' + settings.delay + 'ms' : '');
        }

        /* apply the new style rules provided */
        for (let r in styles) {
          if (styles.hasOwnProperty(r)) {
            elm.style[r] = styles[r];
          }
        }

        /* add a listener for transitionend to the DOM elm with a named function */
        elm.addEventListener(transitionendProp, function transitionendCallback(event) {

          /* Check the target is the element and the property is the same as the supplied property */
          if (
            event.target === elm
            && (
              event.propertyName === (!!longestTransition ? longestTransition.property : settings.property)
            )
          ) {
            elm.style.removeProperty(transitionProp);

            elm.removeEventListener(transitionendProp, transitionendCallback);

            if (completeFn && typeof completeFn === 'function') {
              completeFn.call(elm);
            }
          }
        }, false);
      }

    };
  }
  else {
    return () => console && console.warn('applyTransition unavailable in this environment');
  }
}());

export default applyTransition;
