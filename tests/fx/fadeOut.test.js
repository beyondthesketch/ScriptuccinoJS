jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import fadeOut from './../../src/fx/fadeOut.js';

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

test('Returns undefined if no DOM element is supplied for the effect', () => {
    const result = fadeOut(undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    global.console.warn = jest.fn();
    fadeOut(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - fadeOut not supplied an element to fade out!');
});

test('Calls applyTransition with correct arguments if the elements opacity is not 0 and no callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    global.console.warn = jest.fn();
    fadeOut(domElement);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0' }, undefined);
});

test('Calls applyTransition with correct arguments if the elements opacity is not 0 and a callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeOut(domElement, callback);

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0' }, callback);
});

test('Calls applyTransition with the expected arguments if callback and settings are provided', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeOut(domElement, callback, {
        duration: 3000,
        curve: 'ease-in-out'
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity', curve: 'ease-in-out', duration: 3000 }, { opacity: '0' }, callback);
});

test('Calls applyTransition with the expected arguments if settings are provided without a callback', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    global.console.warn = jest.fn();
    fadeOut(domElement, {
        duration: 3000,
        curve: 'ease-in-out'
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity', curve: 'ease-in-out', duration: 3000 }, { opacity: '0' }, undefined);
});

test('Calls applyTransition with correct arguments even if settings are provided with a different transition property', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = 1;
    const callback = () => {};
    global.console.warn = jest.fn();
    fadeOut(domElement, callback, {
        property: 'color',
    });

    expect(applyTransition).toHaveBeenCalledWith(domElement, { property: 'opacity' }, { opacity: '0' }, callback);
});

test('Does not call applyTransition if the target opacity is 0', () => {
    const domElement = document.createElement('div');
    domElement.style.opacity = '0';
    global.console.warn = jest.fn();
    fadeOut(domElement);

    expect(applyTransition).not.toHaveBeenCalled();
});