/** ScriptuccinoJS - elementComesIntoViewport | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenScrollEnds from './../events/scroll/whenScrollEnds.js';

// TODO: review intersection ratio

const elementComesIntoViewport = (
    function() {
        const queue = [];
        let implementation = (iElement, iFn, iOptions = undefined) => {
    
            if (self.IntersectionObserver) {
                console && console.warn('ScriptuccinoJS: Using working draft implementation of IntersectionObserver - This may cause errors!');
                implementation = (elements, fn, options) => {
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

                    if (!(fn instanceof self.Function)) {
                        console && console.warn('elementComesIntoViewport not supplied a function');
                        return null;
                    }

                    const observer = new IntersectionObserver(
                        (entries, observer) => {
                            entries.forEach(
                                (entry) => {
                                    if (entry.intersectionRatio > 0) {
                                        if (fn && (fn instanceof Function)) {
                                            fn.call(this, entry.target, observer);
                                        }
                                    }
                                }
                            )
                        },
                        options
                    );

                    elementCollection.forEach(
                        (elm) => observer.observe(elm)
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

            implementation(iElement, iFn, iOptions);
        };

        return (elm, f, o) => implementation(elm, f, o);
    }()
);
export default elementComesIntoViewport;
