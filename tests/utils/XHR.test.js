// import XHR from './../../src/utils/XHR.js';
const XHR = () => new XMLHttpRequest();
const mockXMLHttpRequest = jest.fn(() => ({
    open: jest.fn(),
    send: jest.fn(),
    onreadystatechange: jest.fn()
}));

const originalXHR = Object.assign(Object.create(null), global.XMLHttpRequest);

afterEach(() => {
    Object.defineProperty(global, 'XMLHttpRequest', {
        value: originalXHR
    });
});

test('Returns a new instance of XMLHttpRequest', () => {
    const result = XHR({
        uri: '/foo',
    });

    expect(result).toBeInstanceOf(global.XMLHttpRequest);
});

test('Calls open on the XHR object', () => {
    Object.defineProperty(global, 'XMLHttpRequest', {
        value: mockXMLHttpRequest,
        configurable: true
    });
    const result = XHR({
        uri: '/foo'
    });

    expect(result.open).toHaveBeenCalled();
});