# XHR Config Object options

**uri: string** _url of file or api_

**method: string** _The HTTP method to use,_

**data: object** _used with POST requests to submit data to the API/server_

**cached: boolean**  _Allow a cached response - only used for GET requests_

**completeFn: function** _callback function run on complete - whether successful or not_

**successFn: function** _callback function to run on successful response_

**errorFn: function** _callback function to run when an error/failure occurs_

**openedFn: function** _callback function to run when the request is opened_

**loadingFn: function** _callback function to run when the request enters the loading state_

**abortFn: function** _callback function to run when the request is aborted_

**timeoutFn: function** _callback function to run if the request times out_

**endFn: function** _callback function to run when the loadend event is fired_

**timeoutLimit: number** _an integer of milliseconds to wait before time out_

**responseType: string** _a string of the desired response type_

**setHeaders: object** _an object of headers to be set on the XHR_

**send: boolean** _default true - send the request immediately_

**withCredentials: boolean**
