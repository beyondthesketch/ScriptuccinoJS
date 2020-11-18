/** ScriptuccinoJS - whenScrollEnds | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import debounce from './../../utils/simpleDebounce.js';

const whenScrollEnds = (function() {
    const queue = [];
    let implementation = (fn) => {

        self.addEventListener(
            'scroll',
            debounce(
                function () {
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