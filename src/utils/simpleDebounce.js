/** ScriptuccinoJS - simpleDebounce | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
function simpleDebounce(fn, wait) {
    let t;
    return function() {
        self.clearTimeout(t);
        t = self.setTimeout(fn.bind(this, arguments), wait);
    }
}

export default simpleDebounce;
