/** ScriptuccinoJS - flip | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty} from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const flip = (element, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - pop not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }
    const config = {
        duration: 300,
        curve: 'ease',
        property: 'transform'
    };

    const currentState = self.getComputedStyle(element).getPropertyValue('transform');

    if (
        (currentState === 'none'
        || currentState.match(matrixRegex))
    ) {
        
        const newState = currentState === 'none' ? `matrix(1, 0, 0, 1, 0, 0)` : currentState.replace(matrixRegex, `matrix($1, $2, $3, $4, $5, $6)`);
        element.style.transform = newState;
        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform' : 'matrix3d(-1, 0, -0.00000000000000012246467991473532, 0, 0, 1, 0, 0, 0.00000000000000012246467991473532, 0, -1, 0, 0, 0, 0, 1)'
                },
                completeFn
            ),
            0
        );
    }
}
export default flip;