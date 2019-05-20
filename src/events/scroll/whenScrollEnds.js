/** ScriptuccinoJS - whenScrollEnds | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */

function debounce(fn, wait) {
    let t;
    // return a function
    return function() {
        self.clearTimeout(t);
        t = self.setTimeout(fn.bind(this, arguments), wait);
    }
}

const whenScrollEnds = (
    function() {
        const queue = [];

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

        return (fn) => {
            if (fn instanceof self.Function) {
                queue.push(fn);
            }
            else {
                console && console.warn('whenScrollEnds not supplied a function');
            }
        };

    }()
);
export default whenScrollEnds;