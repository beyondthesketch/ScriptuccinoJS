jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import fadeIn from './../../src/fx/fadeIn.js';

afterEach(() => {
    jest.clearAllMocks();
});

test('Returns undefined if no DOM element is supplied for the effect', () => {
    const result = fadeIn(undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    global.console.warn = jest.fn();
    fadeIn(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeIn not supplied an element to fade in!');
});

test('Calls applyTransition with correct arguments if the elements opacity is not 1 and no callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 0;
    global.console.warn = jest.fn();
    fadeIn(domElement);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '1' }, undefined);
});

test('Calls applyTransition with correct arguments if the elements opacity is not 1 and a callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 0;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeIn(domElement, callback);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '1' }, callback);
});

test('Calls applyTransition with the expected arguments if settings are provided', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 0;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeIn(domElement, callback, {
        duration: 3000,
        curve: 'ease-in-out'
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity', curve: 'ease-in-out', duration: 3000 }, { opacity: '1' }, callback);
});

test('Calls applyTransition with correct arguments even if settings are provided with a different transition property', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 0;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeIn(domElement, callback, {
        property: 'color',
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '1' }, callback);
});

test('Does not call applyTransition if the target opacity is 1', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    global.console.warn = jest.fn();
    fadeIn(domElement);

    expect(applyTransition).not.toHaveBeenCalled();
});