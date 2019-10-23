jest.mock('./../../src/events/page/whenPageLoaded.js', () => jest.fn());
import whenPageLoaded from './../../src/events/page/whenPageLoaded';

import lazyLoadCSS from './../../src/utils/lazyLoadCSS.js';

test('Calls whenPageLoaded', () => {
  lazyLoadCSS('/public/data/foo.css');

  expect(whenPageLoaded).toHaveBeenCalled();
});
