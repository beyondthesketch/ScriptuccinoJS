# ScriptuccinoJS

Simple set of JavaScript function and utility modules for easily performing some common tasks.

## Usage

Build the assets with:

```shell

npm run build

```

### ES2015 Modules

Copy the contents of `dist/modules/` directory to a location on your server. E.g. `/js/scriptuccino/`.

Import the modules you need into your javascript:

Use static `import`:

```javascript

import whenPageLoaded from '/js/scriptuccino/events/whenPageLoaded.js';

const myFoo = () => alert('foo');

whenPageLoaded(myFn);

```

Using dynamic `import`:

```javascript

const myFoo = () => alert('foo');

import('/js/scriptuccino/events/whenPageLoaded.js')
  .then(
    (module) => module.whenPageLoaded(myFoo)
  );

```

Using dynamic import with `await`:

```javascript

const myFoo = () => alert('foo');

const module = await import('/js/scriptuccino/events/whenPageLoaded.js');

module.whenPageLoaded(myFoo);

```

### ES5 Library

Copy the `dist/scriptuccino.lib.js` file to a location on your server. E.g. `/js/`.

Add the library to your webpage, preferably at the bottom of the body - but above your own scripts (external or inline):

```html

<body>
  <h1>Foo</h1>
  <p>Lorem ipsum dolor sit amet...</p>

  <script src="/js/scriptuccino.lib.js"></script>
  <script src="/js/your.own.script.js"></script>

</body>

```

In your own scripts, access the ScriptuccinoJS modules and use the functions you need:

```javascript

const myFoo = () => alert('foo');

SCRIPTUCCINO.events.whenPageLoaded(myFoo);

```
