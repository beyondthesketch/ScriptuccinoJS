# *** ALPHA DEVELOPMENT - WIP - NOT SUITABLE FOR PRODUCTION USE ***

## This version is still in VERY early development stages and should not be used for public, production websites or apps

# ScriptuccinoJS

Simple set of JavaScript function and utility modules for easily performing some common tasks.


## Installation

npm package:

```shell

npm install --save @beyondthesketch/scriptuccinojs

```

In browser (via CDN):

```html

<script src="https://unpkg.com/@beyondthesketch/scriptuccinojs@2.0.0-alpha/umd/scriptuccino.js"></script>

```


## Manual Install

If you are not using npm, you can download the modules or library.

Simply save the `esm` modules folder and/or the `umd/scriptuccino.js` file somewhere on your server and reference them as you would any other script.


## Building The Modules & Library

On installation via npm, the production ready ES2015 modules (ES6) and UMD file (ES5) are built automatically. If you need to reduild you can do so with:

```shell

npm run build

```


## Usage


### ES2015 Modules (ES6)

Import the modules you need from the `esm` folder into your javascript (assuming Scriptuccino is installed in a folder named `/scriptuccino/`):

Use static `import`:

```javascript

import whenPageLoaded from 'scriptuccino/esm/whenPageLoaded.js';

const myFoo = () => alert('foo');

whenPageLoaded(myFoo);

```

Using dynamic `import`:

```javascript

const myFoo = () => alert('foo');

import('scriptuccino/esm/whenPageLoaded.js')
  .then(
    (module) => module.whenPageLoaded(myFoo)
  );

```

Using dynamic import with `await`:

```javascript

const myFoo = () => alert('foo');

const module = await import('scriptuccino/esm/whenPageLoaded.js');

module.whenPageLoaded(myFoo);

```

### ES5 Library Using UMD

Copy the `umd/scriptuccino.js` file to a location on your server. E.g. `js/`.

Add the library to your webpage, preferably at the bottom of the body - but above your own scripts (external or inline):

```html

<body>
  <h1>Foo</h1>
  <p>Lorem ipsum dolor sit amet...</p>

  <script src="js/scriptuccino.js"></script>
  <script src="js/your.own.script.js"></script>
</body>

```

In your own scripts, use the `SCRIPTUCCINO` global object to access the ScriptuccinoJS modules and use the functions you need:

```javascript

const myFoo = () => alert('foo');

SCRIPTUCCINO.whenPageLoaded(myFoo);

```

## API

View the [docs](https://beyondthesketch.github.io/ScriptuccinoJS) for details on how to use the functions and utilities.


## Community

Tweet us [@beyondthesketch](https://twitter.com/beyondthesketch)
