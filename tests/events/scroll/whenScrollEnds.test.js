import whenScrollEnds from './../../../src/events/scroll/whenScrollEnds';

const originalDocument = Object.assign({}, global.document);

beforeEach(() => {
    global.SCRIPTUCCINO.scrollend_queue.splice(0);
});
afterEach(() => {
    Object.defineProperty(global, 'document', {
        value: originalDocument,
    });
});
