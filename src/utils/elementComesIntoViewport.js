/** ScriptuccinoJS - parallelLoadCSS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenScrollEnds from './../events/scroll/whenScrollEnds.js';

const elementComesIntoViewport = (
    function() {
        const queue = [];
        let implementation = (iElement, iFn) => {
    
            if (self.IntersectionObserver) {
                implementation = (elements, fn) => {
                    let elementCollection;
                    if (elements instanceof self.NodeList) {
                        elementCollection = elements;
                    }
                    else if (elements instanceof self.HTMLElement) {
                        elementCollection = [elements];
                    }
                    else {
                        console && console.warn('elementComesIntoViewport not supplied with a DOM element');
                        return null;
                    }

                    elementCollection.forEach(
                        (elm) => {
                            const observer = new IntersectionObserver(
                                (entries) => {
                                    if (entries[0].intersectionRatio <= 0) {
                                        return null;
                                    }

                                    if (fn && (fn instanceof Function)) {
                                        fn.call(this, elm, observer);
                                    }
                                }
                            );
                        
                            observer.observe(elm);
                        }
                    );
                }
            }
            else {
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

                implementation = (elements, fn) => {
                    let elementCollection;
                    if (elements instanceof self.NodeList) {
                        elementCollection = elements;
                    }
                    else if (elements instanceof self.HTMLElement) {
                        elementCollection = [elements];
                    }
                    else {
                        console && console.warn('elementComesIntoViewport not supplied with a DOM element');
                        return null;
                    }
                
                    elementCollection.forEach(
                        (element) => {
                            queue.push({
                                element,
                                done: false,
                                fn: function () { fn(this.element); },
                                get position() {
                                   return this.element.getBoundingClientRect().top - self.innerHeight;
                                }
                            });
                        }
                    )
                };
            }

            implementation(iElement, iFn);
        };

        return (elm, f) => implementation(elm, f);
    }()
);
export default elementComesIntoViewport;
