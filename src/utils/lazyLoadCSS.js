/** ScriptuccinoJS - lazyLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenPageLoaded from './../events/page/whenPageLoaded.js';
import XHR from './XHR.js';

const lazyLoadCSS = (
  function () {
    if (self.document) {
      return (uri, callback) => {
        if (typeof uri === 'string' || Array.isArray(uri)) {
          whenPageLoaded(() => {
            Array.isArray(uri)
              ?
              uri.forEach(
                (i) => XHR(
                  {
                    uri: i,
                    response_type: 'text',
                    successFn: (rules) => {
                      const stylesheet = document.createElement('style');
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
                )
              )
              : XHR(
                {
                  uri,
                  response_type: 'text',
                  successFn: (rules) => {
                    const stylesheet = document.createElement('style');
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
