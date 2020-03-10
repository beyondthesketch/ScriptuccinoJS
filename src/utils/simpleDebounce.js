/** ScriptuccinoJS - simpleDebounce | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */

export default function simpleDebounce(fn, wait) {
    let t;
    return function() {
        self.clearTimeout(t);
        t = self.setTimeout(fn.bind(this, ...arguments), wait);
    }
}
