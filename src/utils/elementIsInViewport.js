/** ScriptuccinoJS - elementIsInViewport | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenScrollEnds from './../events/scroll/whenScrollEnds.js';

const elementIsInViewport = (
    function() {
        const queue = [];
        let implementation = (iElement, iFn) => {
            const executeQueue = () => {
                if (!!queue.length) {
                    queue.forEach(
                        (elm) => {
                            if (!elm.done && elm.position < 1) {
                                elm.fn.call(this, elm);
                                elm.done = true;
                            }
                        }
                    );
                }
            };
            whenScrollEnds(executeQueue);
    
            implementation = (elements, fn) => {
                let elementCollection;
                if (elements instanceof self.NodeList) {
                    elementCollection = elements;
                }
                else if (elements instanceof self.HTMLElement) {
                    elementCollection = [elements];
                }
                else {
                    console && console.warn('elementIsInViewport not supplied with a DOM element');
                    return null;
                }

                if (!(fn instanceof self.Function)) {
                    console && console.warn('elementIsInViewport not supplied a function');
                    return null;
                }
            
                elementCollection.forEach(
                    (element) => {
                        queue.push({
                            element,
                            done: false,
                            fn,
                            get position() {
                               return this.element.getBoundingClientRect().top - self.innerHeight;
                            }
                        });
                    }
                );
            };

            implementation(iElement, iFn);

            executeQueue();
        };

        return (elm, f) => implementation(elm, f);
    }()
);
export default elementIsInViewport;
