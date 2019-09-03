import elementComesIntoViewport from './../../src/utils/elementComesIntoViewport.js';

const consoleWarnSpy = jest.spyOn(global.console, 'warn');
const arrayPushSpy = jest.spyOn(Array.prototype, 'push');

global.IntersectionObserver = () => (
    {
        observe: () => null
    }
);

afterAll(() => {
    consoleWarnSpy.mockRestore();
    arrayPushSpy.mockRestore();
});

test('Calls console.warn if not called with an HTMLElement or NodeList', () => {
    elementComesIntoViewport('foo');

    expect(consoleWarnSpy).toHaveBeenCalledWith('elementComesIntoViewport not supplied with a DOM element');
});

test('Returns null if not called with an HTMLElement or NodeList', () => {
    expect(elementComesIntoViewport('foo')).toBeNull();
});

test('Calls console.warn if not called with a function to run', () => {
    const mockElement = global.document.createElement('div');
    elementComesIntoViewport(mockElement, undefined);

    expect(consoleWarnSpy).toHaveBeenCalledWith('elementComesIntoViewport not supplied a function');
});

test('Does not return null if called with an html element and a function to run', () => {
    const mockElement = global.document.createElement('div');
    
    expect(
        elementComesIntoViewport(mockElement, () => null)
    ).not.toBeNull();
});

test('Does not return null if called with an node list and a function to run', () => {
    const mockElement = global.document.querySelectorAll('.foo');
    
    expect(
        elementComesIntoViewport(mockElement, () => null)
    ).not.toBeNull();
});

test('Does not call array.push with the expected object', () => {
    const mockElement = global.document.createElement('div');
    const mockFunction = () => null;

    elementComesIntoViewport(mockElement, mockFunction);

    expect(arrayPushSpy).not.toHaveBeenCalledWith(
        {
            element: mockElement,
            done: false,
            fn: mockFunction,
            get position() {
                return this.element.getBoundingClientRect().top - self.innerHeight;
            }
        }
    );
});
