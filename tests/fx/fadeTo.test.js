jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import fadeTo from './../../src/fx/fadeTo.js';

afterEach(() => {
    jest.clearAllMocks();
});

test('Returns undefined if no DOM element is supplied for the effect', () => {
    const result = fadeTo(undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    global.console.warn = jest.fn();
    fadeTo(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Returns undefined if opacity value is not supplied', () => {
    const result = fadeTo(undefined, undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if opacity value is not supplied', () => {
    global.console.warn = jest.fn();
    fadeTo(undefined, undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Returns undefined if opacity value is not a number', () => {
    const domElement = document.createElement('div');
    const result = fadeTo(domElement, '1');

    expect(result).toBeUndefined();
});

test('Calls console.warn if opacity value is not a number', () => {
    const domElement = document.createElement('div');
    global.console.warn = jest.fn();
    fadeTo(domElement, '1');

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Calls applyTransition with correct arguments if the elements opacity is not the target value and no callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    global.console.warn = jest.fn();
    fadeTo(domElement, 50);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0.5' }, undefined);
});

test('Calls applyTransition with correct arguments if the elements opacity is not the target value and a callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeTo(domElement, 50, callback);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0.5' }, callback);
});

test('Does not call applyTransition if the target is the target value', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = '0.5';
    global.console.warn = jest.fn();
    fadeTo(domElement, 50);

    expect(applyTransition).not.toHaveBeenCalled();
});