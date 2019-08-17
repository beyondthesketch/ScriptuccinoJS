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