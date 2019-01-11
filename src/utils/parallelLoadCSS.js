/** ScriptuccinoJS - parallelLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {whenPageReady} from './../events/index.js';
import {XHR} from './index.js';

const parallelLoadCSS = (
  function () {
    if (self.document) {
      return (uri, callback) => {
        if (typeof uri === 'string') {
          const stylesheet = document.createElement('style');
          stylesheet.setAttribute('rel', 'stylesheet');

          whenPageReady(() => {
            XHR(
              {
                uri,
                response_type: 'text',
                successFn: (rules) => {
                  stylesheet.textContent = rules;
                  !!document.head
                    ?
                    document.head.appendChild(stylesheet)
                    :
                    document.body.appendChild(stylesheet);

                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                },
              }
            );
          });
        }
        else {
          console && console.warn('parallelLoadCSS: No CSS file url supplied');
        }
      }
    }
    else {
      return () => console && console.warn('parallelLoadCSS unavailable in this environment');
    }
  }()
);
export default parallelLoadCSS;
