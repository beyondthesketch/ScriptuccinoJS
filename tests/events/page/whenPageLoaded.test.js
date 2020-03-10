import whenPageLoaded from './../../../src/events/page/whenPageLoaded.js';

const originalDocument = Object.assign({}, global.document);

beforeEach(() => {
  global.__SCRIPTUCCINO__.load_queue.splice(0);
});
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

  expect(global.__SCRIPTUCCINO__.load_queue.length).toBe(0);

  whenPageLoaded(functionToCall);

  expect(global.__SCRIPTUCCINO__.load_queue.length)
    .toBe(1);
  expect(global.__SCRIPTUCCINO__.load_queue[0])
    .toBe(functionToCall);
});

test('Does not call function if the document ready state is not\
 complete', () => {
   Object.defineProperty(global.document, 'readyState', {
     value: 'interactive',
     configurable: true,
   });
   const functionToCall = jest.fn();

   whenPageLoaded(functionToCall);

   expect(functionToCall).not.toHaveBeenCalled();
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
   expect(global.__SCRIPTUCCINO__.load_queue.length).toBe(0);
});
