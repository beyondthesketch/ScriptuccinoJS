import elementScrolledAboveFold from './../../src/utils/elementScrolledAboveFold.js';

const consoleWarnSpy = jest.spyOn(global.console, 'warn');
const arrayPushSpy = jest.spyOn(Array.prototype, 'push');

afterAll(() => {
    consoleWarnSpy.mockRestore();
    arrayPushSpy.mockRestore();
});

test('Calls console.warn if not called with an HTMLElement or NodeList', () => {
    elementScrolledAboveFold('foo');

    expect(consoleWarnSpy).toHaveBeenCalledWith('elementScrolledAboveFold not supplied with a DOM element');
});

test('Returns null if not called with an HTMLElement or NodeList', () => {
    expect(elementScrolledAboveFold('foo')).toBeNull();
});

test('Calls console.warn if not called with a function to run', () => {
    const mockElement = global.document.createElement('div');
    elementScrolledAboveFold(mockElement, undefined);

    expect(consoleWarnSpy).toHaveBeenCalledWith('elementScrolledAboveFold not supplied a function');
});

test('Does not return null if called with an html element and a function to run', () => {
    const mockElement = global.document.createElement('div');
    
    expect(
        elementScrolledAboveFold(mockElement, () => null)
    ).not.toBeNull();
});

test('Does not return null if called with an node list and a function to run', () => {
    const mockElement = global.document.querySelectorAll('.foo');
    
    expect(
        elementScrolledAboveFold(mockElement, () => null)
    ).not.toBeNull();
});

test('Calls array.push with the expected object', () => {
    const mockElement = global.document.createElement('div');
    const mockFunction = () => null;

    elementScrolledAboveFold(mockElement, mockFunction);

    expect(arrayPushSpy).toHaveBeenCalledWith(
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
