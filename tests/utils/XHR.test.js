import XHR from './../../src/utils/XHR.js';

const mockXHRWithEventProps = jest.fn(() => (
  {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    onloadstart: undefined,
    onprogress: undefined,
    onload: undefined,
    onerror: jest.fn(),
    ontimeout: undefined,
    onabort: undefined,
    onloadend: jest.fn()
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
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    responseType: 'json'
  });

  expect(request.responseType).toBe('json');
});

test('Sets the responseType if provided', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false,
    responseType: 'json'
  });

  expect(request.responseType).toBe('json');
});

test('Sets the timeout to the supplied value if provided', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false,
    timeoutLimit: 1500
  });

  expect(request.timeout).toBe(1500);
});

test('Sets the timeout to the 10s if no value provided', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
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

test('Sets onerror if supported to and errorFn is supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    errorFn: fn
  });

  expect(request.onerror).toBe(fn);
});

test('Sets ontimeout if supported and timeoutFn is supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    timeoutFn: fn
  });

  expect(request.ontimeout).toBe(fn);
});

test('Sets ontimeout to a default function if supported but no timeoutFn is \
supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request.ontimeout).toBeInstanceOf(Function);
});

test('Sets onabort if supported and abortFn is supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    abortFn: fn
  });

  expect(request.onabort).toBe(fn);
});

test('Sets onloadend to be an anonymous function if supported', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    endFn: fn
  });

  expect(request.onloadend).toBeInstanceOf(Function);
});

test('Calls setRequestHeader on the XHR with the expected values if setHeaders \
is supplied in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    setHeaders: {
      bar: 'baz',
      widgets: 'doodads'
    }
  });

  expect(request.setRequestHeader).toHaveBeenCalledTimes(2);
  expect(request.setRequestHeader.mock.calls[0][0]).toBe('bar');
  expect(request.setRequestHeader.mock.calls[0][1]).toBe('baz');
  expect(request.setRequestHeader.mock.calls[1][0]).toBe('widgets');
  expect(request.setRequestHeader.mock.calls[1][1]).toBe('doodads');
});

test('Does not call setRequestHeader on the XHR if setHeaders is not supplied \
in config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request.setRequestHeader).not.toHaveBeenCalled();
});

test('Sets withCredentials to true if withCredentials is a truthy in the \
config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    withCredentials: 1
  });

  expect(request.withCredentials).toBe(true);
});

test('Does not set withCredentials to true if withCredentials is a falsy in \
the config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
    withCredentials: 0
  });

  expect(request.withCredentials).not.toBe(true);
});

test('Does not set withCredentials to true if withCredentials is not supplied \
in the config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const fn = () => null;
  const request = XHR({
    uri: '/foo',
    send: false,
  });

  expect(request.withCredentials).not.toBe(true);
});

test('Calls open with GET if no method supplied', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false
  });

  expect(request.open).toHaveBeenCalledWith('GET', '/foo', true);
});

test('Calls open with supplied method', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: false,
    method: 'POST'
  });

  expect(request.open).toHaveBeenCalledWith('POST', '/foo', true);
});

test('Calls send if send is not defined in the supplied config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
  });

  expect(request.send).toHaveBeenCalled();
});

test('Calls send if send is a truthy in the supplied config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: 1,
  });

  expect(request.send).toHaveBeenCalled();
});

test('Does not call send if send is a falsey in the supplied config', () => {
  global.XMLHttpRequest = mockXHRWithEventProps;
  const request = XHR({
    uri: '/foo',
    send: 0,
  });

  expect(request.send).not.toHaveBeenCalled();
});

[
  'POST',
  'PUT',
  'PATCH'
].forEach((method) => {
  test(`Calls send with the data supplied in config if method is ${method}`,
    () => {
      global.XMLHttpRequest = mockXHRWithEventProps;
      const mockData = {};
      const request = XHR({
        uri: '/foo',
        method,
        data: mockData,
      });

      expect(request.send).toHaveBeenCalledWith(mockData)
    });
});

test('Calls send with null if method is GET', () => {
    global.XMLHttpRequest = mockXHRWithEventProps;
    const mockData = {};
    const request = XHR({
      uri: '/foo',
      method: 'GET',
      data: mockData,
    });

    expect(request.send).toHaveBeenCalledWith(null);
  });
