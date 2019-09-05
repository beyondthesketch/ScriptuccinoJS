jest.mock('./../../src/events/page/whenPageReady.js', () => jest.fn());
import whenPageReady from './../../src/events/page/whenPageReady';

jest.mock('./../../src/utils/XHR.js', () => jest.fn());
import XHR from './../../src/utils/XHR';

import parallelLoadCSS from './../../src/utils/parallelLoadCSS.js';

const originalDocumentCreateElement = global.document.createElement;

afterEach(() => {
  global.document.createElement = originalDocumentCreateElement;
  jest.clearAllMocks();
});

test('Calls document.createElement with \'style\'', () => {
  global.document.createElement = jest.fn().mockReturnValue({
    setAttribute: jest.fn()
  });
  parallelLoadCSS('/bar.css');

  expect(global.document.createElement).toHaveBeenCalledWith('style');
});


test('Calls setAttribute', () => {
  const mockElementInstance = {
    setAttribute: jest.fn()
  };
  global.document.createElement = jest.fn().mockReturnValue(
    mockElementInstance
  );
  parallelLoadCSS('/bar.css');

  expect(mockElementInstance.setAttribute).not.toHaveBeenCalledWith(
    'rel',
    'stylesheet'
  );
});

test('Calls whenPageReady', () => {
  parallelLoadCSS('/bar.css');

  expect(whenPageReady).toHaveBeenCalled();
});

test('Does not Calls document.createElement if a non .css file is supplied', () => {
  global.document.createElement = jest.fn().mockReturnValue({
    setAttribute: jest.fn()
  });
  parallelLoadCSS('/bar.js');

  expect(global.document.createElement).not.toHaveBeenCalledWith('style');
});

test('Does not calls whenPageReady if a non .css file is supplied', () => {
  parallelLoadCSS('/bar.js');

  expect(whenPageReady).not.toHaveBeenCalled();
});

test('Calls console.warn  if a non .css file is supplied', () => {
  global.console.warn = jest.fn();
  parallelLoadCSS('/bar.js');

  expect(console.warn).toHaveBeenCalledWith('parallelLoadCSS: supplied url was not for a css file');
});

test('Returns null if a non .css file is supplied', () => {
  expect(parallelLoadCSS('/bar.js')).toBeNull();
});