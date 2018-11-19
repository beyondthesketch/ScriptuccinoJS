import {whenPageLoaded} from './../events/index.js';
import {XHR} from './index.js';

const lazyLoadCSS = (
  function () {
    if (self.document) {
      return (uri, callback) => {
        if (typeof uri === 'string') {
          const stylesheet = document.createElement('style');
          stylesheet.setAttribute('rel', 'stylesheet');

          whenPageLoaded(() => {
            XHR(
              {
                uri,
                response_type: 'text',
                successFn: (rules) => {
                  stylesheet.textContent = rules;
                  !!document.head
                  ? document.head.appendChild(stylesheet)
                  : document.body.appendChild(stylesheet);

                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                },
              }
            );
          });
        }
        else {
          console && console.warn('lazyLoadCSS: No CSS file url supplied');
        }
      }
    }
    else {
      return () => console && console.warn('lazyLoadCSS unavailable in this environment');
    }
  }()
);
export default lazyLoadCSS;
