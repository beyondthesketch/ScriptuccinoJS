import whenScrollEnds from './../events/scroll/whenScrollEnds.js';

const elementComesIntoViewport = (
    function() {
        const queue = [];

        whenScrollEnds(
            () => {
                if (!!queue.length) {
                    queue.forEach(
                        (elm) => {
                            if (!elm.done && elm.position < 1) {
                                elm.fn();
                                elm.done = true;
                            }
                        }
                    )

                }
            }
        );

        return (element, fn) => {
            if (!(element instanceof self.HTMLElement) || !(fn instanceof self.Function)) {
                console && console.warn('elementComesIntoViewport not supplied with a DOM element');
                return null;
            }
        
            queue.push({
                element,
                done: false,
                fn,
                get position() {
                   return this.element.getBoundingClientRect().top - self.innerHeight;
                }
            });
        };
    }()
);
export default elementComesIntoViewport;
