import {default as whenPageLoaded} from './src/events/page/whenPageLoaded';
import {default as whenPageReady} from './src/events/page/whenPageReady';
import {default as whenScrollEnds} from './src/events/scroll/whenScrollEnds';
import {default as XHR} from './src/utils/XHR';
import {default as lazyLoadCSS} from './src/utils/lazyLoadCSS';
import {default as parallelLoadCSS} from './src/utils/parallelLoadCSS';
import {default as elementComesIntoViewport} from './src/utils/elementComesIntoViewport';
import {default as elementIsAboveFold} from './src/utils/elementIsAboveFold';
import {default as elementScrolledAboveFold} from './src/utils/elementScrolledAboveFold';
import {default as applyTransition} from './src/fx/applyTransition';
import {default as fadeTo} from './src/fx/fadeTo';
import {default as fadeIn} from './src/fx/fadeIn';
import {default as fadeOut} from './src/fx/fadeOut';
import {default as pop} from './src/fx/pop';
import {default as slam} from './src/fx/slam';

self.SCRIPTUCCINO = self.SCRIPTUCCINO || {};
Object.assign(self.SCRIPTUCCINO, {
   events: {
      whenPageLoaded,
      whenPageReady,
      whenScrollEnds,
   },
   fx: {
      applyTransition,
      fadeIn,
      fadeOut,
      fadeTo,
      pop,
      slam
   },
   utils: {
      elementComesIntoViewport,
      elementIsAboveFold,
      elementScrolledAboveFold,
      lazyLoadCSS,
      parallelLoadCSS,
      XHR
   }
});
