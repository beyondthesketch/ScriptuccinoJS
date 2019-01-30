import {default as whenPageLoaded} from './src/events/page/whenPageLoaded';
import {default as whenPageReady} from './src/events/page/whenPageReady';
import {default as XHR} from './src/utils/XHR';
import {default as lazyLoadCSS} from './src/utils/lazyLoadCSS';
import {default as parallelLoadCSS} from './src/utils/parallelLoadCSS';
import {default as applyTransition} from './src/fx/applyTransition';
import {default as fadeTo} from './src/fx/fadeTo';
import {default as fadeIn} from './src/fx/fadeIn';
import {default as fadeOut} from './src/fx/fadeOut';


self.SCRIPTUCCINO = self.SCRIPTUCCINO || {};
Object.assign(self.SCRIPTUCCINO, {
   events: {
      whenPageLoaded,
      whenPageReady
   },
   fx: {
      applyTransition,
      fadeIn,
      fadeOut,
      fadeTo
   },
   utils: {
      lazyLoadCSS,
      parallelLoadCSS,
      XHR
   }
});
