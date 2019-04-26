/** ScriptuccinoJS - whenPageReady | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */

const  whenScrollEnds = (
    function () {
        self.SCRIPTUCCINO = self.SCRIPTUCCINO || {};
        const ns = self.SCRIPTUCCINO;
        const scrollend_queue = ns.scrollend_queue || (
            Object.defineProperty(ns, 'scrollend_queue', {
                value: []
            }),
            ns.scrollend_queue
        );

        window.addEventListener('scroll', () => { 

                // debounce the call!
                if (!!scrollend_queue.length) {

                    // get scroll position

                    // calculate viewport start and end - not needed?

                    // check queue for anything inside that range
                    ns.scrollend_queue.forEach(
                        (elm) => {
                            if (!elm.done && elm.position < 1) {
                                // fire any functions that match
                                elm.fn();
                                elm.done = true;
                            }
                        }
                    )

                }
        }, false);

        return (element, fn) => {
            // reject non html element
            if (!element instanceof window.HTMLElement) {
                console.warn('whenScrollEnds not supplied with a DOM element');
                return null;
            }
            // figure out position in DOM

            

            // push the function and element pos as an object to the queue
            ns.scrollend_queue.push({
                element,
                done: false,
                fn,
                get position() {
                   this.element.getBoundingClientRect().top - window.innerHeight;
                }
            });
        }

    }()
);
export default whenScrollEnds;