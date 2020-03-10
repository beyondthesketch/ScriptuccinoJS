import whenScrollEnds from './../../../src/events/scroll/whenScrollEnds';

const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
const consoleWarnSpy = jest.spyOn(global.console, 'warn');
const arrayPushSpy = jest.spyOn(Array.prototype, 'push');

afterAll(() => {
    addEventListenerSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    arrayPushSpy.mockRestore();
});

test('Calls addEventListener on first run', () => {
    whenScrollEnds(() => null);

    expect(addEventListenerSpy).toHaveBeenCalled();
});

test('Calls addEventListener on first run with the expected arguments', () => {
    whenScrollEnds(() => null);

    expect(addEventListenerSpy.mock.calls[0][0]).toBe('scroll');
    expect(addEventListenerSpy.mock.calls[0][1]).toBeInstanceOf(Function);
    expect(addEventListenerSpy.mock.calls[0][2]).toBe(false);
});

test('Does not call addEventListener on subsequent runs', () => {
    whenScrollEnds(() => null);
    whenScrollEnds(() => null);
    whenScrollEnds(() => null);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
});

test('Calls console.warn if no function is supplied', () => {
    whenScrollEnds('foo');

    expect(consoleWarnSpy).toHaveBeenCalledWith('whenScrollEnds not supplied a function');
});

test('Calls array.push with the supplied function', () => {
    const mockFunction = () => null;
    whenScrollEnds(mockFunction);

    expect(arrayPushSpy).toHaveBeenCalledWith((mockFunction));
});
