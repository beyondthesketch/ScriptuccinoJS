import elementIsAboveFold from './../../src/utils/elementIsAboveFold';

const consoleWarnSpy = jest.spyOn(global.console, 'warn');

afterAll(
    () => {
        consoleWarnSpy.mockRestore();
    }
);

test('Calls console.warn if not called with an Element', () => {
    elementIsAboveFold('foo');

    expect(consoleWarnSpy).toHaveBeenCalledWith('elementIsAboveFold not supplied with a DOM element');
});

test('Returns null if not called with an Element', () => {
    expect(elementIsAboveFold('foo')).toBeNull();
});

test('Calls getBoundingClientRect on supplied element', () => {
    const mockElement = global.document.createElement('div');
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue(
        {
            top: 10
        }
    );

    elementIsAboveFold(mockElement);
    
    expect(mockElement.getBoundingClientRect).toHaveBeenCalled();
});

test('Returns true if element is above the fold', () => {
    const mockElement = global.document.createElement('div');
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue(
        {
            top: 10
        }
    );
    global.innerHeight = 100;

    expect(elementIsAboveFold(mockElement)).toBe(true);
});

test('Returns true if element is above the fold', () => {
    const mockElement = global.document.createElement('div');
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue(
        {
            top: 10
        }
    );
    global.innerHeight = 1;

    expect(elementIsAboveFold(mockElement)).toBe(false);
});

