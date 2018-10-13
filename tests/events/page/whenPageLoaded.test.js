import whenPageLoaded from './../../../src/events/page/whenPageLoaded.js';

const originalDocument = Object.assign({}, global.document);

afterEach(() => {
  Object.defineProperty(global, 'document', {
    value: originalDocument,
  });
});

test('Adds function to the load queue if the document ready state is not\
 complete', () => {
  Object.defineProperty(global.document, 'readyState', {
    value: 'interactive',
    configurable: true,
  });
  const functionToCall = () => null;

  expect(global.SCRIPTUCCINO.load_queue.length).toBe(0);

  whenPageLoaded(functionToCall);

  expect(global.SCRIPTUCCINO.load_queue.length)
    .toBe(1);
  expect(global.SCRIPTUCCINO.load_queue[0])
    .toBe(functionToCall);
});

test('Calls the supplied function immediately if the document readyState\
 is complete', () => {
   Object.defineProperty(global.document, 'readyState', {
     value: 'complete',
     configurable: true,
   });
   const functionToCall = jest.fn();

   whenPageLoaded(functionToCall);

   expect(functionToCall).toHaveBeenCalled();
});
