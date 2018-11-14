const XHR = (config) => {

    /*
    config object design

    {
        uri             : {string},		// url of file or api
        method          : {string},		// 'GET' or 'POST',
        data            : {object},     // used with POST requests to submit data to the API/server
        cached          : {boolean}, 	// Allow a cached response - only used for GET requests
        completeFn      : {function},	// callback function run on complete - whether successful or not
        successFn       : {function},	// callback function to run on successful response
        errorFn         : {function},	// callback function to run when an error/failure occurs
        openedFn        : {function},	// callback function to run when the request is opened
        loadingFn       : {function},	// callback function to run when the request enters the loading state
        abortFn         : {function},	// callback function to run when the request is aborted
        timeoutFn       : {function},	// callback function to run if the request times out
        endFn           : {function},   // callback function to run when the loadend event is fired
        timeoutLimit    : {number},		// an integer of milliseconds to wait before time out
        responseType    : {string},		// a string of the desired response type
        setHeaders      : {object}		// an object of headers to be set on the XHR
        send            : {boolean} // default true - send the request immediately
        withCredentials : {boolean}
    }
    */
    if (typeof config === 'object' && config.uri) {
        const uri =
          config.cached === true
          && config.method === 'GET'
            ?
            config.uri + '?c=' + (new Date()).getTime()
            :
            config.uri;

        const data_request = new XMLHttpRequest();

        if ( config.responseType ) {
          data_request.responseType = config.responseType.toLowerCase();
        }

        data_request.timeout =
          config.timeoutLimit
          && typeof config.timeoutLimit === 'number'
            ?
            config.timeoutLimit
            :
            10000;

        data_request.open((config.method || 'GET'), uri, true);

        if (
          !('onloadstart' in data_request)
          && !('onprogress' in data_request)
          && !('onload' in data_request)
          && !('onerror' in data_request)
        ) {
          console.log('using ready state');
          // does not support event methods - use readystatechange instead
          data_request.onreadystatechange = () => {
            switch (data_request.readyState) {
              case 1:
                config.openedFn
                && typeof config.openedFn === 'function'
                && config.openedFn();
                break;
              case 2:
                config.loadingFn
                && typeof config.loadingFn === 'function'
                && config.loadingFn();
                break;
              case 3:
                config.completeFn
                && typeof config.completeFn === 'function'
                && config.completeFn();
                break;
              case 4:
                if (data_request.status === 200) {
                  config.successFn
                  && typeof config.successFn === 'function'
                  && config.successFn();
                }
                else if (data_request.status !== 200) {
                  config.errorFn
                  && typeof config.errorFn === 'function'
                  config.errorFn();
                }
                break;
            }
          };
        }
        else {
          console.log('using event methods');
          if (config.openedFn && typeof config.openedFn === 'function'
          ) {
              data_request.onloadstart = config.openedFn;
          }

          // attach loading/progress callback
          if (config.loadingFn && typeof config.loadingFn === 'function'
          ) {
              data_request.onprogress = config.loadingFn;
          }

          // attach success and complete callbacks
          if ((
              (config.successFn
              && typeof config.completeFn === 'function')
              ||
              (config.completeFn
              && typeof config.completeFn === 'function')
            )
          ) {
              data_request.onload = () => {
                if (config.successFn) {
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
                if (config.completeFn) {
                  config.completeFn();
                }
              };
          }

          // attach error callback
          if (
            'onerror' in data_request && config.errorFn
            && typeof config.errorFn === 'function'
          ) {
            data_request.onerror = config.errorFn;
          }
        }

        // attach timeout callback
        if ('ontimeout' in data_request) {
          config.timeoutFn && typeof config.timeoutFn === 'function'
            ?
            data_request.ontimeout = config.timeoutFn
            : () => console && console.error(
                    'xhr: operation timed out - the server did not respond in time'
                  );
        }

        // attach abort function
        if (
          'onabort' in data_request && config.abortFn
          && typeof config.abortFn === 'function'
        ) {
            data_request.onabort = config.abortFn;
        }

        // attach loadend callback
        if (
          'onloadend' in data_request && config.endFn
          && typeof config.endFn === 'function'
        ) {
            data_request.onloadend = config.endFn;
        }

        // set headers
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
            && typeof config.data === 'object'
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
