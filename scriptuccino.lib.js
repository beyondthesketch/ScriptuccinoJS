import {default as whenPageLoaded} from './src/events/page/whenPageLoaded';
import {default as whenPageReady} from './src/events/page/whenPageReady';
import {default as XHR} from './src/utils/XHR';
import {default as lazyLoadCSS} from './src/utils/lazyLoadCSS';
import {default as parallelLoadCSS} from './src/utils/parallelLoadCSS';


self.SCRIPTUCCINO = self.SCRIPTUCCINO || {};
Object.assign(self.SCRIPTUCCINO, {
   events: {
      whenPageLoaded,
      whenPageReady
   },
   utils: {
      lazyLoadCSS,
      parallelLoadCSS,
      XHR
   }
});
