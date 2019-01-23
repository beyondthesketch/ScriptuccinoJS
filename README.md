# ScriptuccinoJS

Simple set of JavaScript function and utility modules for easily performing some common tasks.

## Usage

Build the assets with:

```shell

npm run build

```

### ES Modules

Copy the contents of `modules/` directory to a location on your server. E.g. `/js/scriptuccino/`.

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

In your own scripts, access the ScriptuccinoJS modules and use the functions you need:

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


#### utils

Tools for doing common things with a little more ease.


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