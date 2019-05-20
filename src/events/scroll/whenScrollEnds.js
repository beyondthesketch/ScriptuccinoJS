/** ScriptuccinoJS - whenScrollEnds | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */

function debounce(fn, wait) {
    let t;
    return function() {
        self.clearTimeout(t);
        t = self.setTimeout(fn.bind(this, arguments), wait);
    }
}

const whenScrollEnds = (function() {
    const queue = [];
    let implementation = (fn) => {
        console.log('first');

        self.addEventListener(
            'scroll',
            debounce(
                function () {
                    console.log('debounced!');
                    if (!!queue.length) {
                        queue.forEach(
                            (queuedFn) => queuedFn()
                        );
                    }
                },
                250
            ),
            false
        );

        implementation = (fFn) => {
            console.log('subsequent');
            if (fFn instanceof self.Function) {
                queue.push(fFn);
            }
            else {
                console && console.warn('whenScrollEnds not supplied a function');
            }
        };

        implementation(fn);
    };

    return (f) => implementation(f);
}())
    
export default whenScrollEnds;