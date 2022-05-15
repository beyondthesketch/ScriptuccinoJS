jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import fadeTo from './../../src/fx/fadeTo.js';

const originalConsoleWarn = console.warn;

beforeAll(() => {
    console.warn = jest.fn();
});

afterAll(() => {
    console.warn = originalConsoleWarn;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Does not call applyTransition if no DOM element is supplied for the effect', () => {
    fadeTo(undefined);

    expect(applyTransition).not.toHaveBeenCalled();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    fadeTo(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Does not call applyTransition if opacity value is not supplied', () => {
    fadeTo(undefined, undefined);

    expect(applyTransition).not.toHaveBeenCalled();
});

test('Calls console.warn if opacity value is not supplied', () => {
    fadeTo(undefined, undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Does not call applyTransition if opacity value is not a number', () => {
    const domElement = document.createElement('div');
    fadeTo(domElement, '1');

    expect(applyTransition).not.toHaveBeenCalled();
});

test('Calls console.warn if opacity value is not a number', () => {
    const domElement = document.createElement('div');
    fadeTo(domElement, '1');

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeTo not supplied a valid value to fade to!');
});

test('Calls applyTransition with correct arguments if the elements opacity is not the target value and no callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    fadeTo(domElement, 50);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0.5' }, undefined);
});

test('Calls applyTransition with correct arguments if the elements opacity is not the target value and a callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    fadeTo(domElement, 50, callback);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0.5' }, callback);
});

test('Calls applyTransition with the expected arguments if settings are provided', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    fadeTo(domElement, 50, callback, {
        duration: 3000,
        curve: 'ease-in-out'
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity', curve: 'ease-in-out', duration: 3000 }, { opacity: '0.5' }, callback);
});

test('Calls applyTransition with correct arguments even if settings are provided with a different transition property', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    fadeTo(domElement, 50, callback, {
        property: 'color',
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0.5' }, callback);
});

test('Does not call applyTransition if the target is the target value', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = '0.5';
    fadeTo(domElement, 50);

    expect(applyTransition).not.toHaveBeenCalled();
});