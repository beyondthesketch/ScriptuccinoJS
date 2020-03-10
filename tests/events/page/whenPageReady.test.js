import whenPageReady from './../../../src/events/page/whenPageReady.js';

const originalDocument = Object.assign({}, global.document);

beforeEach(() => {
  global.__SCRIPTUCCINO__.ready_queue.splice(0);
});
afterEach(() => {
  Object.defineProperty(global, 'document', {
    value: originalDocument,
  });
});

test('Adds function to the ready queue if the document ready state is \
 loading', () => {
  Object.defineProperty(global.document, 'readyState', {
    value: 'loading',
    configurable: true,
  });
  const functionToCall = () => null;

  expect(global.__SCRIPTUCCINO__.ready_queue.length).toBe(0);

  whenPageReady(functionToCall);

  expect(global.__SCRIPTUCCINO__.ready_queue.length)
    .toBe(1);
  expect(global.__SCRIPTUCCINO__.ready_queue[0])
    .toBe(functionToCall);
});

test('Does not call function if the document ready state is \
 loading', () => {
   Object.defineProperty(global.document, 'readyState', {
     value: 'loading',
     configurable: true,
   });
   const functionToCall = jest.fn();

   whenPageReady(functionToCall);

   expect(functionToCall).not.toHaveBeenCalled();
});

test('Calls the supplied function immediately if the document readyState\
 is interactive', () => {
   Object.defineProperty(global.document, 'readyState', {
     value: 'interactive',
     configurable: true,
   });
   const functionToCall = jest.fn();

   whenPageReady(functionToCall);

   expect(functionToCall).toHaveBeenCalled();
   expect(global.__SCRIPTUCCINO__.ready_queue.length).toBe(0);
});

test('Calls the supplied function immediately if the document readyState\
 is complete', () => {
   Object.defineProperty(global.document, 'readyState', {
     value: 'complete',
     configurable: true,
   });
   const functionToCall = jest.fn();

   whenPageReady(functionToCall);

   expect(functionToCall).toHaveBeenCalled();
   expect(global.__SCRIPTUCCINO__.ready_queue.length).toBe(0);
});
