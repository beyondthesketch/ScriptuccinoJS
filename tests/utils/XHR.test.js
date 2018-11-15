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

afterEach(() => {
  global.XMLHttpRequest = originalXHR;
});

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
});

test('Sets the responseType if provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    responseType: 'json'
  });

  expect(request.responseType).toBe('json');
});

test('Sets the timeout to the supplied value if provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    timeoutLimit: 1500
  });

  expect(request.timeout).toBe(1500);
});

test('Sets the timeout to the 10s if no value provided', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
  });

  expect(request.timeout).toBe(10000);
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
});

test('Sets onload to a function if successFn in supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false,
    successFn: () => null
  });

  expect(request.onload).toBeInstanceOf(Function);
});

test('Sets onload to a function if completeFn in supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false,
    completeFn: () => null
  });

  expect(request.onload).toBeInstanceOf(Function);
});

test('Calls open with GET if no method supplied', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request.open).toHaveBeenCalledWith('GET', '/foo', true);
});

test('Calls open with supplied method', () => {
  global.XMLHttpRequest = mockXHR;
  const request = XHR({
    uri: '/foo',
    send: false,
    method: 'POST'
  });

  expect(request.open).toHaveBeenCalledWith('POST', '/foo', true);
});