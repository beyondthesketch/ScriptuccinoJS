/** ScriptuccinoJS - whenPageLoaded | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
const whenPageLoaded = (
  function () {
    if (self.document) {
      self.SCRIPTUCCINO = self.SCRIPTUCCINO || {};
      const ns = self.SCRIPTUCCINO;

      const load_queue = ns.load_queue || (
          Object.defineProperty(ns, 'load_queue', {
            value: [],
          }),
          ns.load_queue
        );
      const executeLoadQueue = () => {
        load_queue.forEach(
          (fn) => fn()
        );
        load_queue.splice(0);
      };
      const loadListenerFn = function loadListenerFn() {
          self.removeEventListener('load', loadListenerFn);
          executeLoadQueue();
      };
      const current_readyState = document.readyState;

      if (current_readyState !== 'complete') {
          self.addEventListener('load', loadListenerFn);
      }
      else {
        executeLoadQueue();
      }

      return (fn) => {
        self.document.readyState !== 'complete'
          ?
          load_queue.push(fn)
          :
          fn();
      };
    }
    else {
      return (fn) => console && console.warn('whenPageLoaded unavailable in this environment');
    }
  }()
);
export default whenPageLoaded;
