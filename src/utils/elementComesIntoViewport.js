/** ScriptuccinoJS - elementComesIntoViewport | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import whenScrollEnds from 'whenScrollEnds.js';

// TODO: review intersection ratio

const elementComesIntoViewport = (
    function() {
        const queue = [];
        let implementation = (iElement, iFn, ...otherArgs) => {
            if (self.IntersectionObserver) {
                console && console.warn('ScriptuccinoJS: Using working draft implementation of IntersectionObserver - This may cause errors!');
                implementation = (elements, fn, ...otherArgs) => {
                    const outFn = (typeof otherArgs[0] === 'function' && otherArgs[0]) || undefined;
                    const options = (typeof otherArgs[0] === 'object' && otherArgs[0]) || (typeof otherArgs[1] === 'object' && otherArgs[1]) || undefined;

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
                                    else if (outFn) {
                                        outFn.call(this, entry.target, observer);
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
                                    if (!elm.done && ((!elm.inView && elm.position < 1) && ((elm.position + self.innerHeight) > 0))) {
                                        elm.fn();
                                        elm.inView = true;
                                    }
                                    else if (!elm.done && ((elm.inView && (elm.element.getBoundingClientRect().top < 0)) || (elm.inView && (elm.element.getBoundingClientRect().top > self.innerHeight)))) {
                                        elm.outFn();
                                        elm.inView = false;
                                    }
                                }
                            )
        
                        }
                    }
                );

                implementation = (elements, fn, ...otherArgs) => {
                    const outFn = (typeof otherArgs[0] === 'function' && otherArgs[0]) || undefined;

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
                                inView: false,
                                fn: function () { fn(this.element, this); },
                                outFn: function () { outFn(this.element, this); },
                                unobserve: function (elm) {
                                    this.done = true;
                                },
                                get position() {
                                   return this.element.getBoundingClientRect().top - self.innerHeight;
                                }
                            });
                        }
                    )
                };
            }

            implementation(iElement, iFn, ((typeof otherArgs[0] === 'function' && otherArgs[0]) || undefined), ((typeof otherArgs[0] === 'object' && otherArgs[0]) || (typeof otherArgs[1] === 'object' && otherArgs[1]) || undefined));
        };

        return (elm, f, ...arg) => implementation(elm, f, ...arg);
    }()
);
export default elementComesIntoViewport;
