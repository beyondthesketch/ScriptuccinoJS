/** ScriptuccinoJS - parallelLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenPageReady from './../events/page/whenPageReady.js';

const parallelLoadCSS = (
  function () {
    if (self.document) {
      return (uri, callback) => {
        if (typeof uri === 'string') {
          whenPageReady(() => {
            const req = new XMLHttpRequest();

            req.open('GET', uri, true);

            req.responseType = 'text';

            req.onreadystatechange = function () {
              if (this.readyState === this.HEADERS_RECEIVED) {
                const contentType = req.getResponseHeader('Content-Type');

                if (contentType.split(';')[0] !== 'text/css') {
                  console && console.warn('parallelLoadCSS: supplied url was not for a css file');
                  req.abort();
                }
              }
            };

            req.onload = () => {
              const stylesheet = document.createElement('style');
              stylesheet.textContent = req.responseText || req.response;

              !!document.head
                ?
                document.head.appendChild(stylesheet)
                :
                document.body.appendChild(stylesheet);

              if (callback && typeof callback === 'function') {
                callback();
              }
            };

            req.send();
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
