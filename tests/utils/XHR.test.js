import XHR from './../../src/utils/XHR.js';

const mockXHR = jest.fn(() => (
  {
    open: jest.fn(),
    send: jest.fn()
  }
));

const mockXHRWithEventProps = jest.fn(() => (
  {
    open: jest.fn(),
    send: jest.fn(),
    onloadstart: undefined,
    onprogress: undefined,
    onload: undefined,
    onerror: undefined,
  }
));

const originalXHR = Object.assign(Object.create(null), global.XMLHttpRequest);

// beforeEach(() => {
//   global.XMLHttpRequest = mockXHR;
// });
// afterEach(() => {
//   Object.defineProperty(global, 'XMLHttpRequest', {
//     value: originalXHR
//   });
// });

test('Returns instance of XHR', () => {
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request).toBeInstanceOf(global.XMLHttpRequest);
});

test('Returns undefined if no config is provided', () => {
  const request = XHR();

  expect(request).toBeUndefined();
});

test('Returns undefined if provided config object does not have a URI', () => {
  const request = XHR({
    method: 'GET'
  });

  expect(request).toBeUndefined();
});

test('Sets the responseType if provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    responseType: 'json'
  });

  expect(request.responseType).toBe('json');

  global.XMLHttpRequest = originalXHR;
});

test('Sets the responseType if provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    responseType: 'json'
  });

  expect(request.responseType).toBe('json');

  global.XMLHttpRequest = originalXHR;
});

test('Sets the timeout to the supplied value if provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    timeoutLimit: 1500
  });

  expect(request.timeout).toBe(1500);

  global.XMLHttpRequest = originalXHR;
});

test('Sets the timeout to the 10s if no value provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
  });

  expect(request.timeout).toBe(10000);

  global.XMLHttpRequest = originalXHR;
});

test('Calls open with GET if no method supplied', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request.open).toHaveBeenCalledWith('GET', '/foo', true);

  global.XMLHttpRequest = originalXHR;
});

test('Calls open with supplied method', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    method: 'POST'
  });

  expect(request.open).toHaveBeenCalledWith('POST', '/foo', true);

  global.XMLHttpRequest = originalXHR;
});

test('Sets onreadystatechange to a function if onloadstart, onprogress, onload \
and onerror are not all supported', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
  });

  expect(request.onreadystatechange).toBeInstanceOf(Function);

  global.XMLHttpRequest = originalXHR;
});

test('Sets onloadstart if supported and openedFn supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    openedFn: fn
  });

  expect(request.onloadstart).toBe(fn);

  global.XMLHttpRequest = originalXHR;
});

test('Sets onprogress if supported and loadingFn supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    loadingFn: fn
  });

  expect(request.onprogress).toBe(fn);

  global.XMLHttpRequest = originalXHR;
});
