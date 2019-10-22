jest.mock('./../../src/events/page/whenPageLoaded.js', () => jest.fn());
import whenPageLoaded from './../../src/events/page/whenPageLoaded';

jest.mock('./../../src/utils/XHR.js', () => jest.fn());
import XHR from './../../src/utils/XHR';

import lazyLoadCSS from './../../src/utils/lazyLoadCSS.js';

const originalDocumentCreateElement = global.document.createElement;

afterEach(() => {
  global.document.createElement = originalDocumentCreateElement;
  jest.clearAllMocks();
});

test('Calls document.createElement with \'style\'', () => {
  global.document.createElement = jest.fn().mockReturnValue({
    setAttribute: jest.fn()
  });
  lazyLoadCSS('/foo.css');

  expect(global.document.createElement).toHaveBeenCalledWith('style');
});


test('Does not set any attributes', () => {
  const mockElementInstance = {
    setAttribute: jest.fn()
  };
  global.document.createElement = jest.fn().mockReturnValue(
    mockElementInstance
  );
  lazyLoadCSS('/foo.css');


  expect(mockElementInstance.setAttribute).not.toHaveBeenCalledWith(
    'rel',
    'stylesheet'
  );
});

test('Calls whenPageLoaded', () => {
  lazyLoadCSS('/public/data/foo.css');

  expect(whenPageLoaded).toHaveBeenCalled();
});
