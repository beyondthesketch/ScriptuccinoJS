jest.mock('./../../src/events/page/whenPageReady.js', () => jest.fn());
import whenPageReady from './../../src/events/page/whenPageReady';

import parallelLoadCSS from './../../src/utils/parallelLoadCSS.js';

test('Calls whenPageReady', () => {
  parallelLoadCSS('/bar.css');

  expect(whenPageReady).toHaveBeenCalled();
});