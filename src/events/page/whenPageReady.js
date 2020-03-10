/** ScriptuccinoJS - whenPageReady | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
const whenPageReady = (
  function () {
    if (self.document) {
      self.__SCRIPTUCCINO__ = self.__SCRIPTUCCINO__ || {};
      const ns = self.__SCRIPTUCCINO__;
      const ready_queue = ns.ready_queue || (
          Object.defineProperty(ns, 'ready_queue', {
            value: [],
          }),
          ns.ready_queue
        );
      const executeReadyQueue = () => {
          ready_queue.forEach(
            (fn) => fn()
          );
          ready_queue.splice(0);
        };
      const readyListenerFn = function readyListenerFn() {
          if (
            document.readyState === 'interactive'
            || document.readyState === 'complete'
          ) {
            document.removeEventListener('readystatechange', readyListenerFn);
            executeReadyQueue();
          }
        };
      const current_readyState = document.readyState;

      if (
        current_readyState !== 'interactive'
        || current_readyState !== 'complete'
      ) {
          document.addEventListener('readystatechange', readyListenerFn);
      }
      else if (
        current_readyState === 'interactive'
        || current_readyState === 'complete'
      ) {
        executeReadyQueue();
      }

      return (fn) => {
        // console.log(ready_queue, ns.ready_queue, ns, self);
        document.readyState === 'interactive'
        || document.readyState === 'complete'
          ?
          fn()
          :
          ready_queue.push(fn);
      }
    }
    else {
      return (fn) => console && console.warn('whenPageReady unavailable in this environment');
    }
  }()
);
export default whenPageReady;
