/** ScriptuccinoJS - XHR | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
const XHR = (config) => {
    if (typeof config === 'object' && config.uri) {
        const uri =
          config.cached === true
            ?
            config.uri
            :
            (!config.method || config.method === 'GET') && (config.cached === false || !config.cached)
              ?
              config.uri + '?c=' + (new Date()).getTime()
              :
              config.uri;

        const data_request = new XMLHttpRequest();

        if ('onloadstart' in data_request && config.openedFn && typeof config.openedFn === 'function'
        ) {
            data_request.onloadstart = config.openedFn;
        }

        if ('onprogress' in data_request && config.loadingFn && typeof config.loadingFn === 'function'
        ) {
            data_request.onprogress = config.loadingFn;
        }

        if ((
            (config.successFn
            && typeof config.successFn === 'function')
            ||
            (config.completeFn
            && typeof config.completeFn === 'function')
          )
        ) {
            data_request.onload = () => {
              if (config.successFn) {
                if (data_request.status === 200) {
                  config.successFn(
                    'response' in data_request
                      ?
                      data_request.response
                      :
                      responseType === 'text'
                        ?
                        data_request.responseText
                        : data_request.responseXML
  
                  );
                }
              }
              if (config.completeFn) {
                config.completeFn();
              }
            };
        }

        if (
          ('onerror' in data_request)
          && config.errorFn
          && (typeof config.errorFn === 'function')
        ) {
          data_request.onerror = config.errorFn;
        }

        if ('ontimeout' in data_request) {
          data_request.ontimeout =
            config.timeoutFn
            && typeof config.timeoutFn === 'function'
              ?
              config.timeoutFn
              :
              () => console && console.error(
                'xhr: operation timed out - the server did not respond in time'
              );
        }

        if (
          'onabort' in data_request && config.abortFn
          && typeof config.abortFn === 'function'
        ) {
            data_request.onabort = config.abortFn;
        }

        if ('onloadend' in data_request) {
            data_request.onloadend = () => {
              if (
                (data_request.status < 200)
                || (data_request.status > 399)
              ) {
                config.errorFn && (typeof config.errorFn === 'function') && config.errorFn(data_request.status);  // pass status code as argument to allow different errors to be handled
              }
              if (
                config.endFn
                && (typeof config.endFn === 'function')
              ) {
                config.endFn();
              }
            };
        }

        data_request.open((config.method || 'GET'), uri, true);

        data_request.timeout =
          config.timeoutLimit
          && typeof config.timeoutLimit === 'number'
            ?
            config.timeoutLimit
            :
            10000;

        if ( config.responseType ) {
          data_request.responseType = config.responseType.toLowerCase();
        }

        if (config.setHeaders && typeof config.setHeaders === 'object') {
          for (let i in config.setHeaders) {
            if (config.setHeaders.hasOwnProperty(i)) {
              data_request.setRequestHeader(i, config.setHeaders[i] );
            }
          }
        }

        if (config.withCredentials) {
          data_request.withCredentials = true;
        }

        if (!('send' in config) || config.send) {
          data_request.send(
            (
              config.method === 'POST'
              || config.method === 'PATCH'
              || config.method === 'PUT'
            )
            && config.data
            ?
            config.data
            :
            null
          );
        }

        return data_request;
    }
};
export default XHR;
