jest.mock('./../../src/fx/applyTransition.js');
import applyTransition from './../../src/fx/applyTransition';

import slam from './../../src/fx/slam.js';

jest.useFakeTimers();

afterEach(() => {
    jest.clearAllMocks();
});

test('Returns undefined if no DOM element is supplied for the effect', () => {
    const result = slam(undefined);

    expect(result).toBeUndefined();
});

test('Calls console.warn if no DOM element is supplied for the effect', () => {
    global.console.warn = jest.fn();
    slam(undefined);

    expect(console.warn).toHaveBeenCalledWith('ScriptuccinoJS - slam not supplied an element!');
});

test('Returns null if the element has an inline transition property applied - i.e. is transitioning with Scriptuccino or something else', () => {
    const domElement = document.createElement('div');
    domElement.style.transition = 'opacity';
    
    expect(slam(domElement)).toBeNull();
});

test('Calls applyTransition with correct arguments if the element is supplied and no scale or callback is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();

    slam(domElement);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        [
            {
                property: 'transform',
                duration: 250,
                curve: 'cubic-bezier(0, 0, 1, 0)'
            },
            {
                property: 'opacity',
                duration: 300,
                curve: 'ease-in'
            }
        ],
        {
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
            opacity: '1'
        },
        undefined
    );
});

test('Calls applyTransition with correct arguments if the element is supplied and the target scale value is supplied', () => {
    const domElement = document.createElement('div');
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();
    slam(domElement, 2);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        [
            {
                property: 'transform',
                duration: 250,
                curve: 'cubic-bezier(0, 0, 1, 0)'
            },
            {
                property: 'opacity',
                duration: 300,
                curve: 'ease-in'
            }
        ],
        {
            transform: 'matrix(2, 0, 0, 2, 0, 0)',
            opacity: '1'
        },
        undefined
    );
});

test('Calls applyTransition with correct arguments if the element is supplied and the target scale value and a callback is supplied', () => {
    const domElement = document.createElement('div');
    const callback = () => jest.fn();
    domElement.style.transform = 'none';
    global.console.warn = jest.fn();
    slam(domElement, 2, callback);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        [
            {
                property: 'transform',
                duration: 250,
                curve: 'cubic-bezier(0, 0, 1, 0)'
            },
            {
                property: 'opacity',
                duration: 300,
                curve: 'ease-in'
            }
        ],
        {
            transform: 'matrix(2, 0, 0, 2, 0, 0)',
            opacity: '1'
        },
        callback
    );
});

test('Does not affect any existing transforms', () => {
    const domElement = document.createElement('div');
    const callback = () => jest.fn();
    domElement.style.transform = 'matrix(1, 0.5888, 0.78292, 1, 0, 0)';
    global.console.warn = jest.fn();
    slam(domElement, 2, callback);

    jest.runAllTimers();

    expect(applyTransition).toHaveBeenCalledWith(
        domElement,
        [
            {
                property: 'transform',
                duration: 250,
                curve: 'cubic-bezier(0, 0, 1, 0)'
            },
            {
                property: 'opacity',
                duration: 300,
                curve: 'ease-in'
            }
        ],
        {
            transform: 'matrix(2, 0.5888, 0.78292, 2, 0, 0)',
            opacity: '1'
        },
        callback
    );
});
