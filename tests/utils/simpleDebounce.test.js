import './../../src/utils/simpleDebounce.js';
import simpleDebounce from './../../src/utils/simpleDebounce.js';

const mock = {
    bar() {
        return null;
    }
};
const mockFn = jest.spyOn(mock, 'bar');

afterAll(() => {
    mockFn.mockRestore();
    jest.clearAllTimers();
});

test('Calls the supplied function the expected number of times for the wait value supplied', () => {
    jest.useFakeTimers();

    const obj = document.createElement('div');
    const customEvent = new CustomEvent('foo');

    obj.addEventListener(
        'foo',
        simpleDebounce(
            mockFn,
            250
        )
    );

    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(100);
    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(200);
    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(249);
    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(100);
    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(100);
    obj.dispatchEvent(customEvent);
    jest.advanceTimersByTime(252);
    obj.dispatchEvent(customEvent);

    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(2);
});