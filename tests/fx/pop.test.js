jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import pop from './../../src/fx/pop.js';

jest.useFakeTimers();

afterEach(() => {
    jest.clearAllMocks();
});

test('Returns undefined if no DOM element is supplied for the effect', () => {
    const result = pop(undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    global.console.warn = jest.fn();
    pop(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - pop not supplied an element!');
});

test('Calls applyTransition with correct arguments if the element is supplied and no scale or callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();

    pop(domElement);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        {
            property: 'transform',
            duration: 250,
            curve: 'cubic-bezier(1, -0.38, 0, 2)'
        },
        { transform: 'matrix(1, 0, 0, 1, 0, 0)' },
        undefined
    );
});

test('Calls applyTransition with correct arguments if the element is supplied and the target scale value is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();
    pop(domElement, 2);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        {
            property: 'transform',
            duration: 250,
            curve: 'cubic-bezier(1, -0.38, 0, 2)'
        },
        { transform: 'matrix(2, 0, 0, 2, 0, 0)' },
        undefined
    );
});

test('Calls applyTransition with correct arguments if the element is supplied and the target scale value and a callback is supplied', () => {
    const domElement = document.createElement('div');
    const callback = () => jest.fn();
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();
    pop(domElement, 2, callback);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        {
            property: 'transform',
            duration: 250,
            curve: 'cubic-bezier(1, -0.38, 0, 2)'
        },
        { transform: 'matrix(2, 0, 0, 2, 0, 0)' },
        callback
    );
});

test('Does not affect any existing transforms', () => {
    const domElement = document.createElement('div');
    const callback = () => jest.fn();
    domElement.style.transform = 'matrix(1, 0.5888, 0.78292, 1, 0, 0)';
    global.console.warn = jest.fn();
    pop(domElement, 2, callback);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        {
            property: 'transform',
            duration: 250,
            curve: 'cubic-bezier(1, -0.38, 0, 2)'
        },
        { transform: 'matrix(2, 0.5888, 0.78292, 2, 0, 0)' },
        callback
    );
});
