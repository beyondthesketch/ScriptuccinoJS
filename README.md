# ScriptuccinoJS

Simple set of JavaScript function and utility modules for easily performing some common tasks.

## Installation

NPM package:

```shell

npm install --save @beyondthesketch/scriptuccinojs

```

## Manual Install

Alternatively, if you are not using NPM, you can download the modules or library.

Simply save the modules folder and/or the scriptuccino.js file somewhere on your server and reference them as you would any other script.

## Usage

Build the assets with:

```shell

npm run build

```

### ES Modules


Import the modules you need into your javascript:

Use static `import`:

```javascript

import whenPageLoaded from '/js/scriptuccino/events/page/whenPageLoaded.js';

const myFoo = () => alert('foo');

whenPageLoaded(myFoo);

```

Using dynamic `import`:

```javascript

const myFoo = () => alert('foo');

import('/js/scriptuccino/events/page/whenPageLoaded.js')
  .then(
    (module) => module.whenPageLoaded(myFoo)
  );

```

Using dynamic import with `await`:

```javascript

const myFoo = () => alert('foo');

const module = await import('/js/scriptuccino/events/page/whenPageLoaded.js');

module.whenPageLoaded(myFoo);

```

### ES5 Library

Copy the `scriptuccino.js` file to a location on your server. E.g. `/js/`.

Add the library to your webpage, preferably at the bottom of the body - but above your own scripts (external or inline):

```html

<body>
  <h1>Foo</h1>
  <p>Lorem ipsum dolor sit amet...</p>

  <script src="/js/scriptuccino.js"></script>
  <script src="/js/your.own.script.js"></script>
</body>

```

In your own scripts, use the `SCRIPTUCCINO` global object to access the ScriptuccinoJS modules and use the functions you need:

```javascript

const myFoo = () => alert('foo');

SCRIPTUCCINO.events.whenPageLoaded(myFoo);

```

## API

### Modules

ScriptuccinoJS is organised into the following modules, each containing a number of utilities. If using ScriptuccinoJS as ES2015/ES modules you can import them from any of the files they are documented as being exported from below. If using the ES5 library, you can access them from the `SCRIPTUCCINO` global/namespace object as described.

#### events

Utilities and functions for performing operations related to events, such as page load.

**whenPageLoaded( fn: Function )**

Queue the supplied function for execution once the page is loaded (executes immediately if page is already loaded).

*ES module*

exported as named by:
`events/index.js`

exported as default by:
`events/page/whenPageLoaded.js`

*ES5 library*

`SCRIPTUCCINO.events.whenPageLoaded`


**whenPageReady( fn: Function )**

Queue the supplied function for execution once the DOM is ready (executes immediately if the DOM is already ready).

*ES module*

exported as named by:
`events/index.js`

exported as default by:
`events/page/whenPageReady.js`

*ES5 library*

`SCRIPTUCCINO.events.whenPageReady`


**whenScrollEnds( fn: Function )**

Run the supplied function when the window scrolling comes to a stop. The scroll detection is debounced to 250 milliseconds.

*ES module*

exported as named by:
`events/index.js`

exported as default by:
`events/scroll/whenScrollEnds.js`

*ES5 library*

`SCRIPTUCCINO.events.whenScrollEnds`


#### utils

Tools for doing common things with a little more ease.


**elementScrolledAboveFold( elements: Element | NodeList, fn: Function )**
*uses: whenScrollEnds*

Call the supplied function when the window is scrolled so that the specified element or elements are above the page fold.

The callback function `fn` receives a single argument which is the element that has settled above the fold.

*ES module*

exported as named by:
`utils/index.js`

exported as default by:
`utils/elementScrolledAboveFold.js`

*ES5 library*

`SCRIPTUCCINO.utils.elementScrolledAboveFold`


**XHR( config: Object )**

AJAX (or XMLHttpRequest as it is officially named) is AWESOME! But it's a little fiddly to setup. Use this util to quickly configure and optionally send them.

*ES module*

exported as named by:
`utils/index.js`

exported as default by:
`utils/XHR.js`

*ES5 library*

`SCRIPTUCCINO.utils.XHR`


**lazyLoadCSS( uri: string [, callbackFn: Function] )**
*uses: XHR, whenPageLoaded*

Download (asynchronously with AJAX) and apply a stylesheet to the page, and optionally execute a callback function, only once the page has loaded.

*ES module*

exported as named by:
`utils/index.js`

exported as default by:
`utils/lazyLoadCSS.js`

*ES5 library*

`SCRIPTUCCINO.utils.lazyLoadCSS`


**parallelLoadCSS( uri: string [, callbackFn: Function] )**
*uses: XHR, whenPageReady*

Download (asynchronously with AJAX) and apply a stylesheet to the page, and optionally execute a callback function, when the DOM is ready. Useful for deferred load of CSS on larger pages with longer load times.

*ES module*

exported as named by:
`utils/index.js`

exported as default by:
`utils/parallelLoadCSS.js`

*ES5 library*

`SCRIPTUCCINO.utils.parallelLoadCSS`

#### fx

Programmatically apply CSS transitions. Great for throw-away transitions, prototyping or quickly applying complex effects without having to figure out the CSS.


**applyTransition( element: HTMLElement, settings: Object|Array, styles: Object [, completeFn: Function] )**

Define and apply CSS transition to an HTML element, and optionally perform a callback function when the transition is complete.

*ES module*

exported as named by:
`fx/index.js`

exported as default by:
`fx/applyTransition.js`

*ES5 library*

`SCRIPTUCCINO.fx.applyTransition`


**fadeIn( element: HTMLElement [, completeFn: Function, settings: Object] )**
*uses: applyTransition*

Apply a fade-in transition to an HTML element. Optionally perform a callback when complete and define optional settings for the transition.

*ES module*

exported as named by:
`fx/index.js`

exported as default by:
`fx/fadeIn.js`

*ES5 library*

`SCRIPTUCCINO.fx.fadeIn`


**fadeOut( element: HTMLElement [, completeFn: Function, settings: Object] )**
*uses: applyTransition*

Apply a fade-out transition to an HTML element. Optionally perform a callback when complete and define optional settings for the transition.

*ES module*

exported as named by:
`fx/index.js`

exported as default by:
`fx/fadeOut.js`

*ES5 library*

`SCRIPTUCCINO.fx.fadeOut`


**fadeTo( element: HTMLElement, opacity: number [, completeFn: Function, settings: Object] )**
*uses: applyTransition*

Apply a fade transition to the specified opacity on an HTML element. Optionally perform a callback when complete and define optional settings for the transition.

*ES module*

exported as named by:
`fx/index.js`

exported as default by:
`fx/fadeTo.js`

*ES5 library*

`SCRIPTUCCINO.fx.fadeTo`
