/*! ScriptuccinoJS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scriptuccino"] = factory();
	else
		root["scriptuccino"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/events/page/whenPageLoaded.js":
/*!*******************************************!*\
  !*** ./src/events/page/whenPageLoaded.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/** ScriptuccinoJS - whenPageLoaded | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\nvar whenPageLoaded = function () {\n  if (self.document) {\n    self.__SCRIPTUCCINO__ = self.__SCRIPTUCCINO__ || {};\n    var ns = self.__SCRIPTUCCINO__;\n    var load_queue = ns.load_queue || (Object.defineProperty(ns, 'load_queue', {\n      value: []\n    }), ns.load_queue);\n\n    var executeLoadQueue = function executeLoadQueue() {\n      load_queue.forEach(function (fn) {\n        return fn();\n      });\n      load_queue.splice(0);\n    };\n\n    var loadListenerFn = function loadListenerFn() {\n      self.removeEventListener('load', loadListenerFn);\n      executeLoadQueue();\n    };\n\n    var current_readyState = document.readyState;\n\n    if (current_readyState !== 'complete') {\n      self.addEventListener('load', loadListenerFn);\n    } else {\n      executeLoadQueue();\n    }\n\n    return function (fn) {\n      self.document.readyState !== 'complete' ? load_queue.push(fn) : fn();\n    };\n  } else {\n    return function (fn) {\n      return console && console.warn('whenPageLoaded unavailable in this environment');\n    };\n  }\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (whenPageLoaded);\n\n//# sourceURL=webpack://scriptuccino/./src/events/page/whenPageLoaded.js?");

/***/ }),

/***/ "./src/events/page/whenPageReady.js":
/*!******************************************!*\
  !*** ./src/events/page/whenPageReady.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/** ScriptuccinoJS - whenPageReady | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\nvar whenPageReady = function () {\n  if (self.document) {\n    self.__SCRIPTUCCINO__ = self.__SCRIPTUCCINO__ || {};\n    var ns = self.__SCRIPTUCCINO__;\n    var ready_queue = ns.ready_queue || (Object.defineProperty(ns, 'ready_queue', {\n      value: []\n    }), ns.ready_queue);\n\n    var executeReadyQueue = function executeReadyQueue() {\n      ready_queue.forEach(function (fn) {\n        return fn();\n      });\n      ready_queue.splice(0);\n    };\n\n    var readyListenerFn = function readyListenerFn() {\n      if (document.readyState === 'interactive' || document.readyState === 'complete') {\n        document.removeEventListener('readystatechange', readyListenerFn);\n        executeReadyQueue();\n      }\n    };\n\n    var current_readyState = document.readyState;\n\n    if (current_readyState !== 'interactive' || current_readyState !== 'complete') {\n      document.addEventListener('readystatechange', readyListenerFn);\n    } else if (current_readyState === 'interactive' || current_readyState === 'complete') {\n      executeReadyQueue();\n    }\n\n    return function (fn) {\n      // console.log(ready_queue, ns.ready_queue, ns, self);\n      document.readyState === 'interactive' || document.readyState === 'complete' ? fn() : ready_queue.push(fn);\n    };\n  } else {\n    return function (fn) {\n      return console && console.warn('whenPageReady unavailable in this environment');\n    };\n  }\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (whenPageReady);\n\n//# sourceURL=webpack://scriptuccino/./src/events/page/whenPageReady.js?");

/***/ }),

/***/ "./src/events/scroll/whenScrollEnds.js":
/*!*********************************************!*\
  !*** ./src/events/scroll/whenScrollEnds.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var simpleDebounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simpleDebounce.js */ \"./src/utils/simpleDebounce.js\");\n/** ScriptuccinoJS - whenScrollEnds | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n // export function debounce(fn, wait) {\n//     let t;\n//     return function() {\n//         self.clearTimeout(t);\n//         t = self.setTimeout(fn.bind(this, ...arguments), wait);\n//     }\n// }\n\nvar whenScrollEnds = function () {\n  var queue = [];\n\n  var _implementation = function implementation(fn) {\n    self.addEventListener('scroll', Object(simpleDebounce_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n      if (!!queue.length) {\n        queue.forEach(function (queuedFn) {\n          return queuedFn();\n        });\n      }\n    }, 250), false);\n\n    _implementation = function implementation(fFn) {\n      if (fFn instanceof self.Function) {\n        queue.push(fFn);\n      } else {\n        console && console.warn('whenScrollEnds not supplied a function');\n      }\n    };\n\n    _implementation(fn);\n  };\n\n  return function (f) {\n    return _implementation(f);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (whenScrollEnds);\n\n//# sourceURL=webpack://scriptuccino/./src/events/scroll/whenScrollEnds.js?");

/***/ }),

/***/ "./src/fx/applyTransition.js":
/*!***********************************!*\
  !*** ./src/fx/applyTransition.js ***!
  \***********************************/
/*! exports provided: transitionProperty, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transitionProperty\", function() { return transitionProperty; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - applyTransition | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\nvar vendors = ['webkit', 'moz', 'o', 'ms'];\n\nvar transitionendProp = function () {\n  if (self.document) {\n    var prop = 'transitionend';\n\n    if ('ontransitionend' in document.body) {\n      return prop;\n    } else {\n      for (var i = vendors.length; i--;) {\n        if ('on' + vendors[i] + 'transitionend' in document.body) {\n          prop = vendors[i] + prop;\n          break;\n        }\n      }\n\n      if (!prop) {\n        console && console.error('Transition: transitionend is not supported by this browser');\n      }\n    }\n\n    return prop;\n  } else {\n    console && console.warn('ScriptuccinoJS: transitions not supported on this environment');\n    return undefined;\n  }\n}();\n\nvar transitionProperty = function () {\n  if (self.document) {\n    if ('transition' in document.body.style) {\n      return 'transition';\n    } else {\n      var prop;\n\n      for (var i = vendors.length; i--;) {\n        if (vendors[i] + 'Transition' in document.body.style) {\n          prop = vendors[i] + 'Transition';\n          break;\n        }\n      }\n\n      return prop;\n    }\n  } else {\n    console && console.warn('ScriptuccinoJS: transitions not supported on this environment');\n    return undefined;\n  }\n}();\n\nvar applyTransition = function () {\n  if (self.document && transitionProperty) {\n    return function (element, settings, styles, completeFn) {\n      var elm = element;\n      var transitionProp = transitionProperty;\n      var longestTransition;\n\n      if (_typeof(settings) === 'object') {\n        if (Array.isArray(settings)) {\n          /* multiple transitions defined... */\n          var rule = [];\n          var reversed = settings.map(function (x) {\n            return x;\n          }).reverse();\n          var longest = Math.max.apply(Math, _toConsumableArray(settings.map(function (conf) {\n            return conf.duration;\n          })));\n\n          for (var i = 0; i < reversed.length; i++) {\n            if (reversed[i].duration === longest) {\n              longestTransition = reversed[i];\n              break;\n            }\n          }\n\n          for (var _i = settings.length; _i--;) {\n            rule.push(settings[_i].property + (settings[_i].duration ? ' ' + settings[_i].duration + 'ms' : ' 500ms') + (settings[_i].curve ? ' ' + settings[_i].curve : ' ease') + (settings[_i].delay ? ' ' + settings[_i].delay : ''));\n          }\n\n          elm.style[transitionProp] = rule.join(', ');\n        } else {\n          /* single transition defined */\n          elm.style[transitionProp] = settings.property + (settings.duration ? ' ' + settings.duration + 'ms' : ' 500ms') + (settings.curve ? ' ' + settings.curve : ' ease') + (settings.delay ? ' ' + settings.delay + 'ms' : '');\n        }\n        /* apply the new style rules provided */\n\n\n        for (var r in styles) {\n          if (styles.hasOwnProperty(r)) {\n            elm.style[r] = styles[r];\n          }\n        }\n        /* add a listener for transitionend to the DOM elm with a named function */\n\n\n        elm.addEventListener(transitionendProp, function transitionendCallback(event) {\n          /* Check the target is the element and the property is the same as the supplied property */\n          if (event.target === elm && event.propertyName === (!!longestTransition ? longestTransition.property : settings.property)) {\n            elm.style.removeProperty(transitionProp);\n            elm.removeEventListener(transitionendProp, transitionendCallback);\n\n            if (completeFn && typeof completeFn === 'function') {\n              completeFn.call(elm);\n            }\n          }\n        }, false);\n      }\n    };\n  } else {\n    return function () {\n      return console && console.warn('applyTransition unavailable in this environment');\n    };\n  }\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (applyTransition);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/applyTransition.js?");

/***/ }),

/***/ "./src/fx/fadeIn.js":
/*!**************************!*\
  !*** ./src/fx/fadeIn.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - fadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n/* TODO: Handle elements that are display: none */\n\nvar fadeIn = function fadeIn(element, completeFn, settings) {\n  var config = {\n    property: 'opacity'\n  };\n\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - fadeIn not supplied an element to fade in!');\n  }\n\n  if (settings && _typeof(settings) === 'object') {\n    _extends(config, settings);\n  }\n\n  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 1) {\n    Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n      'opacity': '1'\n    }, completeFn);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (fadeIn);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/fadeIn.js?");

/***/ }),

/***/ "./src/fx/fadeOut.js":
/*!***************************!*\
  !*** ./src/fx/fadeOut.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - fadeOut | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n/* TODO: Handle elements that are display: none */\n\nvar fadeOut = function fadeOut(element, completeFn, settings) {\n  var config = {\n    property: 'opacity'\n  };\n\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - fadeOut not supplied an element to fade out!');\n  }\n\n  if (settings && _typeof(settings) === 'object') {\n    _extends(config, settings);\n  }\n\n  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== 0) {\n    Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n      'opacity': '0'\n    }, completeFn);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (fadeOut);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/fadeOut.js?");

/***/ }),

/***/ "./src/fx/fadeTo.js":
/*!**************************!*\
  !*** ./src/fx/fadeTo.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - fadeTo | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n/* TODO: Handle elements that are display: none */\n\nvar fadeTo = function fadeTo(element, opacity, completeFn, settings) {\n  var config = {\n    property: 'opacity'\n  };\n\n  if (!opacity || typeof opacity !== 'number') {\n    return console && console.warn('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');\n  }\n\n  if (settings && _typeof(settings) === 'object') {\n    _extends(config, settings);\n  }\n\n  if (parseFloat(self.getComputedStyle(element).getPropertyValue('opacity')) !== opacity / 100) {\n    Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n      'opacity': (opacity / 100).toString()\n    }, completeFn);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (fadeTo);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/fadeTo.js?");

/***/ }),

/***/ "./src/fx/moveIn.js":
/*!**************************!*\
  !*** ./src/fx/moveIn.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\n/** ScriptuccinoJS - moveIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\nvar matrixRegex = /matrix\\((.+), (.+), (.+), (.+), (.+), (.+)\\)/;\n\nvar moveIn = function moveIn(element, fromDirection, completeFn) {\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - moveIn not supplied an element!');\n  }\n\n  if (!!element.style[applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"transitionProperty\"]]) {\n    return null;\n  }\n\n  var config = {\n    duration: 750,\n    curve: 'ease-out',\n    property: 'transform'\n  };\n  var computedStyles = self.getComputedStyle(element);\n  var currentState = computedStyles.getPropertyValue('transform');\n  var direction = fromDirection && fromDirection.toLowerCase() || 'bottom';\n  var transformValues = currentState.match(matrixRegex);\n  var amount = direction === 'bottom' || direction === 'top' ? (parseInt(computedStyles.getPropertyValue('width'), 10) / 100 * 1000 + (transformValues && parseFloat(transformValues[5]) * (direction === 'bottom' ? 1 : -1) || 0)) * (direction === 'bottom' ? 1 : -1) : (parseInt(computedStyles.getPropertyValue('height'), 10) / 100 * 1000 + (transformValues && parseFloat(transformValues[6]) * (direction === 'right' ? 1 : -1) || 0)) * (direction === 'right' ? 1 : -1);\n\n  if (currentState === 'none' || parseFloat(transformValues[(direction === 'bottom' || direction === 'top') && 6 || 5]) !== 0) {\n    var newState = currentState === 'none' ? \"matrix(1, 0, 0, 1, \".concat(direction === 'left' || direction === 'right' ? amount : 0, \", \").concat(direction === 'bottom' || direction === 'top' ? amount : 0, \")\") : \"matrix(\".concat(transformValues[1], \", \").concat(transformValues[2], \", \").concat(transformValues[3], \", \").concat(transformValues[4], \", \").concat(direction === 'left' || direction === 'right' ? amount : transformValues[6], \", \").concat(direction === 'bottom' || direction === 'top' ? amount : transformValues[5], \")\");\n    element.style.transform = newState;\n    self.setTimeout(function () {\n      return Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n        'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, \"matrix($1, $2, $3, $4, \".concat(transformValues && transformValues[6] || 0, \", \").concat(transformValues && transformValues[5] || 0, \")\"))\n      }, function () {\n        // NOTE: force reflow and recalc - hack necessary for removing extra space created by the translation on certain browsers\n        element.style.opacity = '0.999';\n        self.setTimeout(function () {\n          element.style.opacity = '1';\n        }, 0);\n\n        if (completeFn && typeof completeFn === 'function') {\n          completeFn.call(element);\n        }\n      });\n    }, 0);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (moveIn);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/moveIn.js?");

/***/ }),

/***/ "./src/fx/pop.js":
/*!***********************!*\
  !*** ./src/fx/pop.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\n/** ScriptuccinoJS - pop | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\nvar matrixRegex = /matrix\\((.+), (.+), (.+), (.+), (.+), (.+)\\)/;\n\nvar pop = function pop(element) {\n  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n  var completeFn = arguments.length > 2 ? arguments[2] : undefined;\n\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - pop not supplied an element!');\n  }\n\n  if (!!element.style[applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"transitionProperty\"]]) {\n    return null;\n  }\n\n  var config = {\n    duration: 250,\n    curve: 'cubic-bezier(1, -0.38, 0, 2)',\n    property: 'transform'\n  };\n  var currentState = self.getComputedStyle(element).getPropertyValue('transform');\n\n  if (currentState === 'none' || currentState.match(matrixRegex) && parseFloat(currentState.match(matrixRegex)[1]) !== scale) {\n    /* must set starting scales to 0.01 to work cross browser, starting with 0 doesn't work */\n    var newState = currentState === 'none' ? 'matrix(0.01, 0, 0, 0.01, 0, 0)' : currentState.replace(matrixRegex, 'matrix(0.01, $2, $3, 0.01, $5, $6)');\n    element.style.transform = newState;\n    self.setTimeout(function () {\n      return Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n        'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, \"matrix(\".concat(scale, \", $2, $3, \").concat(scale, \", $5, $6)\"))\n      }, completeFn);\n    }, 0);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pop);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/pop.js?");

/***/ }),

/***/ "./src/fx/shiftFadeIn.js":
/*!*******************************!*\
  !*** ./src/fx/shiftFadeIn.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\n/** ScriptuccinoJS - shiftFadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\nvar matrixRegex = /matrix\\((.+), (.+), (.+), (.+), (.+), (.+)\\)/;\n\nvar shiftFadeIn = function shiftFadeIn(element, fromDirection, completeFn) {\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - shiftFadeIn not supplied an element!');\n  }\n\n  if (!!element.style[applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"transitionProperty\"]]) {\n    return null;\n  }\n\n  var config = [{\n    duration: 750,\n    curve: 'ease-out',\n    property: 'transform'\n  }, {\n    duration: 750,\n    curve: 'ease-out',\n    property: 'opacity'\n  }];\n  var computedStyles = self.getComputedStyle(element);\n  var currentState = computedStyles.getPropertyValue('transform');\n  var direction = fromDirection && fromDirection.toLowerCase() || 'bottom';\n  var transformValues = currentState.match(matrixRegex);\n  var amount = direction === 'bottom' || direction === 'top' ? (parseInt(computedStyles.getPropertyValue('width'), 10) / 100 * 50 + (transformValues && parseFloat(transformValues[5]) * (direction === 'bottom' ? 1 : -1) || 0)) * (direction === 'bottom' ? 1 : -1) : (parseInt(computedStyles.getPropertyValue('height'), 10) / 100 * 50 + (transformValues && parseFloat(transformValues[6]) * (direction === 'right' ? 1 : -1) || 0)) * (direction === 'right' ? 1 : -1);\n\n  if (currentState === 'none' || parseFloat(transformValues[(direction === 'bottom' || direction === 'top') && 6 || 5]) !== 0) {\n    var newState = currentState === 'none' ? \"matrix(1, 0, 0, 1, \".concat(direction === 'left' || direction === 'right' ? amount : 0, \", \").concat(direction === 'bottom' || direction === 'top' ? amount : 0, \")\") : \"matrix(\".concat(transformValues[1], \", \").concat(transformValues[2], \", \").concat(transformValues[3], \", \").concat(transformValues[4], \", \").concat(direction === 'left' || direction === 'right' ? amount : transformValues[5], \", \").concat(direction === 'bottom' || direction === 'top' ? amount : transformValues[6], \")\");\n    element.style.transform = newState;\n    element.style.opacity = '0';\n    self.setTimeout(function () {\n      return Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n        'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, \"matrix($1, $2, $3, $4, \".concat(transformValues && transformValues[5] || 0, \", \").concat(transformValues && transformValues[6] || 0, \")\")),\n        'opacity': '1'\n      }, completeFn);\n    }, 0);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (shiftFadeIn);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/shiftFadeIn.js?");

/***/ }),

/***/ "./src/fx/shiftFadeOut.js":
/*!********************************!*\
  !*** ./src/fx/shiftFadeOut.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\n/** ScriptuccinoJS - shiftFadeOut | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\nvar matrixRegex = /matrix\\((.+), (.+), (.+), (.+), (.+), (.+)\\)/;\n\nvar shiftFadeOut = function shiftFadeOut(element, toDirection, completeFn) {\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - shiftFadeOut not supplied an element!');\n  }\n\n  if (!!element.style[applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"transitionProperty\"]]) {\n    return null;\n  }\n\n  var config = [{\n    duration: 750,\n    curve: 'ease-out',\n    property: 'transform'\n  }, {\n    duration: 750,\n    curve: 'ease-out',\n    property: 'opacity'\n  }];\n  var computedStyles = self.getComputedStyle(element);\n  var currentState = computedStyles.getPropertyValue('transform');\n  var direction = toDirection && toDirection.toLowerCase() || 'bottom';\n  var transformValues = currentState.match(matrixRegex);\n  var amount = direction === 'bottom' || direction === 'top' ? (parseInt(computedStyles.getPropertyValue('width'), 10) / 100 * 50 + (transformValues && parseFloat(transformValues[5]) * (direction === 'bottom' ? -1 : 1) || 0)) * (direction === 'bottom' ? 1 : -1) : (parseInt(computedStyles.getPropertyValue('height'), 10) / 100 * 50 + (transformValues && parseFloat(transformValues[6]) * (direction === 'right' ? -1 : 1) || 0)) * (direction === 'right' ? 1 : -1);\n\n  if (currentState === 'none' || parseFloat(transformValues[(direction === 'bottom' || direction === 'top') && 6 || 5]) !== amount) {\n    var newState = currentState === 'none' ? \"matrix(1, 0, 0, 1, 0, 0)\" : \"matrix(\".concat(transformValues[1], \", \").concat(transformValues[2], \", \").concat(transformValues[3], \", \").concat(transformValues[4], \", \").concat(direction === 'left' || direction === 'right' ? 0 : transformValues[5], \", \").concat(direction === 'bottom' || direction === 'top' ? 0 : transformValues[6], \")\");\n    element.style.transform = newState;\n    element.style.opacity = element.style.opacity || '1';\n    self.setTimeout(function () {\n      return Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n        'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, \"matrix($1, $2, $3, $4, \".concat(direction === 'left' || direction === 'right' ? amount : transformValues && transformValues[5] || 0, \", \").concat(direction === 'top' || direction === 'bottom' ? amount : transformValues && transformValues[6] || 0, \")\")),\n        'opacity': '0'\n      }, completeFn);\n    }, 0);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (shiftFadeOut);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/shiftFadeOut.js?");

/***/ }),

/***/ "./src/fx/slam.js":
/*!************************!*\
  !*** ./src/fx/slam.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var applyTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! applyTransition.js */ \"./src/fx/applyTransition.js\");\n/** ScriptuccinoJS - slam | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\nvar matrixRegex = /matrix\\((.+), (.+), (.+), (.+), (.+), (.+)\\)/;\n\nvar slam = function slam(element) {\n  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n  var completeFn = arguments.length > 2 ? arguments[2] : undefined;\n\n  if (!element) {\n    return console && console.warn('ScriptuccinoJS - slam not supplied an element!');\n  }\n\n  if (!!element.style[applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"transitionProperty\"]]) {\n    return null;\n  }\n\n  var config = [{\n    duration: 250,\n    curve: 'cubic-bezier(0, 0, 1, 0)',\n    property: 'transform'\n  }, {\n    duration: 300,\n    curve: 'ease-in',\n    property: 'opacity'\n  }];\n  var currentState = self.getComputedStyle(element).getPropertyValue('transform');\n\n  if (currentState === 'none' || currentState.match(matrixRegex) && parseFloat(currentState.match(matrixRegex)[1]) !== scale) {\n    var newState = currentState === 'none' ? \"matrix(\".concat(scale * 2, \", 0, 0, \").concat(scale * 2, \", 0, 0)\") : currentState.replace(matrixRegex, \"matrix(\".concat(scale * 2, \", $2, $3, \").concat(scale * 2, \", $5, $6)\"));\n    element.style.transform = newState;\n    element.style.opacity = '0';\n    self.setTimeout(function () {\n      return Object(applyTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, config, {\n        'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, \"matrix(\".concat(scale, \", $2, $3, \").concat(scale, \", $5, $6)\")),\n        'opacity': '1'\n      }, completeFn);\n    }, 0);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (slam);\n\n//# sourceURL=webpack://scriptuccino/./src/fx/slam.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: whenPageLoaded, whenPageReady, whenScrollEnds, XHR, lazyLoadCSS, parallelLoadCSS, elementComesIntoViewport, elementIsAboveFold, elementScrolledAboveFold, simpleDebounce, applyTransition, fadeTo, fadeIn, fadeOut, pop, slam, moveIn, shiftFadeIn, shiftFadeOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _events_page_whenPageLoaded_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/page/whenPageLoaded.js */ \"./src/events/page/whenPageLoaded.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"whenPageLoaded\", function() { return _events_page_whenPageLoaded_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _events_page_whenPageReady_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/page/whenPageReady.js */ \"./src/events/page/whenPageReady.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"whenPageReady\", function() { return _events_page_whenPageReady_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _events_scroll_whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events/scroll/whenScrollEnds.js */ \"./src/events/scroll/whenScrollEnds.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"whenScrollEnds\", function() { return _events_scroll_whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _utils_XHR_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/XHR.js */ \"./src/utils/XHR.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"XHR\", function() { return _utils_XHR_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _utils_lazyLoadCSS_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/lazyLoadCSS.js */ \"./src/utils/lazyLoadCSS.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lazyLoadCSS\", function() { return _utils_lazyLoadCSS_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _utils_parallelLoadCSS_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/parallelLoadCSS.js */ \"./src/utils/parallelLoadCSS.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"parallelLoadCSS\", function() { return _utils_parallelLoadCSS_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _utils_elementComesIntoViewport_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/elementComesIntoViewport.js */ \"./src/utils/elementComesIntoViewport.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"elementComesIntoViewport\", function() { return _utils_elementComesIntoViewport_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _utils_elementIsAboveFold_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/elementIsAboveFold.js */ \"./src/utils/elementIsAboveFold.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"elementIsAboveFold\", function() { return _utils_elementIsAboveFold_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _utils_elementScrolledAboveFold_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/elementScrolledAboveFold.js */ \"./src/utils/elementScrolledAboveFold.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"elementScrolledAboveFold\", function() { return _utils_elementScrolledAboveFold_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _utils_simpleDebounce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/simpleDebounce.js */ \"./src/utils/simpleDebounce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"simpleDebounce\", function() { return _utils_simpleDebounce_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _fx_applyTransition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fx/applyTransition.js */ \"./src/fx/applyTransition.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"applyTransition\", function() { return _fx_applyTransition_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _fx_fadeTo_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fx/fadeTo.js */ \"./src/fx/fadeTo.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fadeTo\", function() { return _fx_fadeTo_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _fx_fadeIn_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fx/fadeIn.js */ \"./src/fx/fadeIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fadeIn\", function() { return _fx_fadeIn_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _fx_fadeOut_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fx/fadeOut.js */ \"./src/fx/fadeOut.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fadeOut\", function() { return _fx_fadeOut_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _fx_pop_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fx/pop.js */ \"./src/fx/pop.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pop\", function() { return _fx_pop_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _fx_slam_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./fx/slam.js */ \"./src/fx/slam.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"slam\", function() { return _fx_slam_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _fx_moveIn_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./fx/moveIn.js */ \"./src/fx/moveIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"moveIn\", function() { return _fx_moveIn_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _fx_shiftFadeIn_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./fx/shiftFadeIn.js */ \"./src/fx/shiftFadeIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"shiftFadeIn\", function() { return _fx_shiftFadeIn_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony import */ var _fx_shiftFadeOut_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./fx/shiftFadeOut.js */ \"./src/fx/shiftFadeOut.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"shiftFadeOut\", function() { return _fx_shiftFadeOut_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://scriptuccino/./src/index.js?");

/***/ }),

/***/ "./src/utils/XHR.js":
/*!**************************!*\
  !*** ./src/utils/XHR.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - XHR | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\nvar XHR = function XHR(config) {\n  if (_typeof(config) === 'object' && config.uri) {\n    var uri = config.cached === true ? config.uri : (!config.method || config.method === 'GET') && (config.cached === false || !config.cached) ? config.uri + '?c=' + new Date().getTime() : config.uri;\n    var data_request = new XMLHttpRequest();\n\n    if ('onloadstart' in data_request && config.openedFn && typeof config.openedFn === 'function') {\n      data_request.onloadstart = config.openedFn;\n    }\n\n    if ('onprogress' in data_request && config.loadingFn && typeof config.loadingFn === 'function') {\n      data_request.onprogress = config.loadingFn;\n    }\n\n    if (config.successFn && typeof config.successFn === 'function' || config.completeFn && typeof config.completeFn === 'function') {\n      data_request.onload = function () {\n        if (config.successFn) {\n          if (data_request.status === 200) {\n            config.successFn('response' in data_request ? data_request.response : responseType === 'text' ? data_request.responseText : data_request.responseXML);\n          }\n        }\n\n        if (config.completeFn) {\n          config.completeFn();\n        }\n      };\n    }\n\n    if ('onerror' in data_request && config.errorFn && typeof config.errorFn === 'function') {\n      data_request.onerror = config.errorFn;\n    }\n\n    if ('ontimeout' in data_request) {\n      data_request.ontimeout = config.timeoutFn && typeof config.timeoutFn === 'function' ? config.timeoutFn : function () {\n        return console && console.error('xhr: operation timed out - the server did not respond in time');\n      };\n    }\n\n    if ('onabort' in data_request && config.abortFn && typeof config.abortFn === 'function') {\n      data_request.onabort = config.abortFn;\n    }\n\n    if ('onloadend' in data_request) {\n      data_request.onloadend = function () {\n        if (data_request.status < 200 || data_request.status > 399) {\n          config.errorFn && typeof config.errorFn === 'function' && config.errorFn(data_request.status); // pass status code as argument to allow different errors to be handled\n        }\n\n        if (config.endFn && typeof config.endFn === 'function') {\n          config.endFn();\n        }\n      };\n    }\n\n    data_request.open(config.method || 'GET', uri, true);\n    data_request.timeout = config.timeoutLimit && typeof config.timeoutLimit === 'number' ? config.timeoutLimit : 10000;\n\n    if (config.responseType) {\n      data_request.responseType = config.responseType.toLowerCase();\n    }\n\n    if (config.setHeaders && _typeof(config.setHeaders) === 'object') {\n      for (var i in config.setHeaders) {\n        if (config.setHeaders.hasOwnProperty(i)) {\n          data_request.setRequestHeader(i, config.setHeaders[i]);\n        }\n      }\n    }\n\n    if (config.withCredentials) {\n      data_request.withCredentials = true;\n    }\n\n    if (!('send' in config) || config.send) {\n      data_request.send((config.method === 'POST' || config.method === 'PATCH' || config.method === 'PUT') && config.data && _typeof(config.data) === 'object' ? config.data : null);\n    }\n\n    return data_request;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (XHR);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/XHR.js?");

/***/ }),

/***/ "./src/utils/elementComesIntoViewport.js":
/*!***********************************************!*\
  !*** ./src/utils/elementComesIntoViewport.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whenScrollEnds.js */ \"./src/events/scroll/whenScrollEnds.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/** ScriptuccinoJS - elementComesIntoViewport | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n // TODO: review intersection ratio\n\nvar elementComesIntoViewport = function () {\n  var _this = this;\n\n  var queue = [];\n\n  var _implementation = function implementation(iElement, iFn) {\n    if (self.IntersectionObserver) {\n      console && console.warn('ScriptuccinoJS: Using working draft implementation of IntersectionObserver - This may cause errors!');\n\n      _implementation = function implementation(elements, fn) {\n        var outFn = typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'function' && (arguments.length <= 2 ? undefined : arguments[2]) || undefined;\n        var options = _typeof(arguments.length <= 2 ? undefined : arguments[2]) === 'object' && (arguments.length <= 2 ? undefined : arguments[2]) || _typeof(arguments.length <= 3 ? undefined : arguments[3]) === 'object' && (arguments.length <= 3 ? undefined : arguments[3]) || undefined;\n        var elementCollection;\n\n        if (elements instanceof self.NodeList) {\n          elementCollection = elements;\n        } else if (elements instanceof self.HTMLElement) {\n          elementCollection = [elements];\n        } else {\n          console && console.warn('elementComesIntoViewport not supplied with a DOM element');\n          return null;\n        }\n\n        if (!(fn instanceof self.Function)) {\n          console && console.warn('elementComesIntoViewport not supplied a function');\n          return null;\n        }\n\n        var observer = new IntersectionObserver(function (entries, observer) {\n          entries.forEach(function (entry) {\n            if (entry.intersectionRatio > 0) {\n              if (fn && fn instanceof Function) {\n                fn.call(_this, entry.target, observer);\n              }\n            } else if (outFn) {\n              outFn.call(_this, entry.target, observer);\n            }\n          });\n        }, options);\n        elementCollection.forEach(function (elm) {\n          return observer.observe(elm);\n        });\n      };\n    } else {\n      Object(whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n        if (!!queue.length) {\n          queue.forEach(function (elm) {\n            if (!elm.done && !elm.inView && elm.position < 1 && elm.position + self.innerHeight > 0) {\n              elm.fn();\n              elm.inView = true;\n            } else if (!elm.done && (elm.inView && elm.element.getBoundingClientRect().top < 0 || elm.inView && elm.element.getBoundingClientRect().top > self.innerHeight)) {\n              elm.outFn();\n              elm.inView = false;\n            }\n          });\n        }\n      });\n\n      _implementation = function implementation(elements, _fn) {\n        var _outFn = typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'function' && (arguments.length <= 2 ? undefined : arguments[2]) || undefined;\n\n        var elementCollection;\n\n        if (elements instanceof self.NodeList) {\n          elementCollection = elements;\n        } else if (elements instanceof self.HTMLElement) {\n          elementCollection = [elements];\n        } else {\n          console && console.warn('elementComesIntoViewport not supplied with a DOM element');\n          return null;\n        }\n\n        elementCollection.forEach(function (element) {\n          queue.push({\n            element: element,\n            done: false,\n            inView: false,\n            fn: function fn() {\n              _fn(this.element, this);\n            },\n            outFn: function outFn() {\n              _outFn(this.element, this);\n            },\n            unobserve: function unobserve(elm) {\n              this.done = true;\n            },\n\n            get position() {\n              return this.element.getBoundingClientRect().top - self.innerHeight;\n            }\n\n          });\n        });\n      };\n    }\n\n    _implementation(iElement, iFn, typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'function' && (arguments.length <= 2 ? undefined : arguments[2]) || undefined, _typeof(arguments.length <= 2 ? undefined : arguments[2]) === 'object' && (arguments.length <= 2 ? undefined : arguments[2]) || _typeof(arguments.length <= 3 ? undefined : arguments[3]) === 'object' && (arguments.length <= 3 ? undefined : arguments[3]) || undefined);\n  };\n\n  return function (elm, f) {\n    for (var _len = arguments.length, arg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      arg[_key - 2] = arguments[_key];\n    }\n\n    return _implementation.apply(void 0, [elm, f].concat(arg));\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (elementComesIntoViewport);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/elementComesIntoViewport.js?");

/***/ }),

/***/ "./src/utils/elementIsAboveFold.js":
/*!*****************************************!*\
  !*** ./src/utils/elementIsAboveFold.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar elementIsAboveFold = function elementIsAboveFold(element) {\n  if (!(element instanceof self.Element)) {\n    console && console.warn('elementIsAboveFold not supplied with a DOM element');\n    return null;\n  }\n\n  return element.getBoundingClientRect().top - self.innerHeight < 1;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (elementIsAboveFold);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/elementIsAboveFold.js?");

/***/ }),

/***/ "./src/utils/elementScrolledAboveFold.js":
/*!***********************************************!*\
  !*** ./src/utils/elementScrolledAboveFold.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whenScrollEnds.js */ \"./src/events/scroll/whenScrollEnds.js\");\n/** ScriptuccinoJS - elementScrolledAboveFold | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n\nvar elementScrolledAboveFold = function () {\n  var _this = this;\n\n  var queue = [];\n\n  var _implementation = function implementation(iElement, iFn) {\n    var executeQueue = function executeQueue() {\n      if (!!queue.length) {\n        queue.forEach(function (elm) {\n          if (!elm.done && elm.position < 1) {\n            elm.fn.call(_this, elm.element);\n            elm.done = true;\n          }\n        });\n      }\n    };\n\n    Object(whenScrollEnds_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(executeQueue);\n\n    _implementation = function implementation(elements, fn) {\n      var elementCollection;\n\n      if (elements instanceof self.NodeList) {\n        elementCollection = elements;\n      } else if (elements instanceof self.Element) {\n        elementCollection = [elements];\n      } else {\n        console && console.warn('elementScrolledAboveFold not supplied with a DOM element');\n        return null;\n      }\n\n      if (!(fn instanceof self.Function)) {\n        console && console.warn('elementScrolledAboveFold not supplied a function');\n        return null;\n      }\n\n      elementCollection.forEach(function (element) {\n        queue.push({\n          element: element,\n          done: false,\n          fn: fn,\n\n          get position() {\n            return this.element.getBoundingClientRect().top - self.innerHeight;\n          }\n\n        });\n      });\n    };\n\n    _implementation(iElement, iFn);\n\n    executeQueue();\n  };\n\n  return function (elm, f) {\n    return _implementation(elm, f);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (elementScrolledAboveFold);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/elementScrolledAboveFold.js?");

/***/ }),

/***/ "./src/utils/lazyLoadCSS.js":
/*!**********************************!*\
  !*** ./src/utils/lazyLoadCSS.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var whenPageLoaded_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whenPageLoaded.js */ \"./src/events/page/whenPageLoaded.js\");\n/** ScriptuccinoJS - lazyLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n\nvar lazyLoadCSS = function () {\n  if (self.document) {\n    return function (uri, callback) {\n      if (typeof uri === 'string') {\n        Object(whenPageLoaded_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n          var req = new XMLHttpRequest();\n          req.responseType = 'text';\n\n          req.onreadystatechange = function () {\n            if (this.readyState === this.HEADERS_RECEIVED) {\n              var contentType = req.getResponseHeader('Content-Type');\n\n              if (contentType.split(';')[0] !== 'text/css') {\n                console && console.warn('lazyLoadCSS: supplied url was not for a css file');\n                req.abort();\n              }\n            }\n          };\n\n          req.onload = function () {\n            var stylesheet = document.createElement('style');\n            stylesheet.textContent = req.responseText || req.response;\n            !!document.head ? document.head.appendChild(stylesheet) : document.body.appendChild(stylesheet);\n\n            if (callback && typeof callback === 'function') {\n              callback();\n            }\n          };\n\n          req.open('GET', uri, true);\n          req.send();\n        });\n      } else {\n        console && console.warn('lazyLoadCSS: No CSS file url supplied');\n      }\n    };\n  } else {\n    return function () {\n      return console && console.warn('lazyLoadCSS unavailable in this environment');\n    };\n  }\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (lazyLoadCSS);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/lazyLoadCSS.js?");

/***/ }),

/***/ "./src/utils/parallelLoadCSS.js":
/*!**************************************!*\
  !*** ./src/utils/parallelLoadCSS.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var whenPageReady_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whenPageReady.js */ \"./src/events/page/whenPageReady.js\");\n/** ScriptuccinoJS - parallelLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\n\n\nvar parallelLoadCSS = function () {\n  if (self.document) {\n    return function (uri, callback) {\n      if (typeof uri === 'string') {\n        Object(whenPageReady_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n          var req = new XMLHttpRequest();\n          req.responseType = 'text';\n\n          req.onreadystatechange = function () {\n            if (this.readyState === this.HEADERS_RECEIVED) {\n              var contentType = req.getResponseHeader('Content-Type');\n\n              if (contentType.split(';')[0] !== 'text/css') {\n                console && console.warn('parallelLoadCSS: supplied url was not for a css file');\n                req.abort();\n              }\n            }\n          };\n\n          req.onload = function () {\n            var stylesheet = document.createElement('style');\n            stylesheet.textContent = req.responseText || req.response;\n            !!document.head ? document.head.appendChild(stylesheet) : document.body.appendChild(stylesheet);\n\n            if (callback && typeof callback === 'function') {\n              callback();\n            }\n          };\n\n          req.open('GET', uri, true);\n          req.send();\n        });\n      } else {\n        console && console.warn('parallelLoadCSS: No CSS file url supplied');\n      }\n    };\n  } else {\n    return function () {\n      return console && console.warn('parallelLoadCSS unavailable in this environment');\n    };\n  }\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (parallelLoadCSS);\n\n//# sourceURL=webpack://scriptuccino/./src/utils/parallelLoadCSS.js?");

/***/ }),

/***/ "./src/utils/simpleDebounce.js":
/*!*************************************!*\
  !*** ./src/utils/simpleDebounce.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return simpleDebounce; });\n/** ScriptuccinoJS - simpleDebounce | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */\nfunction simpleDebounce(fn, wait) {\n  var t;\n  return function () {\n    self.clearTimeout(t);\n    t = self.setTimeout(fn.bind.apply(fn, [this].concat(Array.prototype.slice.call(arguments))), wait);\n  };\n}\n\n//# sourceURL=webpack://scriptuccino/./src/utils/simpleDebounce.js?");

/***/ })

/******/ });
});