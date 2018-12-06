# XHR Config Object options

uri             : {string},		// url of file or api
method          : {string},		// The HTTP method to use,
data            : {object},   // used with POST requests to submit data to the API/server
cached          : {boolean}, 	// Allow a cached response - only used for GET requests
completeFn      : {function},	// callback function run on complete - whether successful or not
successFn       : {function},	// callback function to run on successful response
errorFn         : {function},	// callback function to run when an error/failure occurs
openedFn        : {function},	// callback function to run when the request is opened
loadingFn       : {function},	// callback function to run when the request enters the loading state
abortFn         : {function},	// callback function to run when the request is aborted
timeoutFn       : {function},	// callback function to run if the request times out
endFn           : {function}, // callback function to run when the loadend event is fired
timeoutLimit    : {number},		// an integer of milliseconds to wait before time out
responseType    : {string},		// a string of the desired response type
setHeaders      : {object},		// an object of headers to be set on the XHR
send            : {boolean},  // default true - send the request immediately
withCredentials : {boolean}   
