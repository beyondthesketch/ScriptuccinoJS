/** ScriptuccinoJS - pop | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const pop = (element, scale = 1, completeFn) => {
    if (!!element.style[transitionProperty]) {
        return null;
    }
    const config = {
        duration: 250,
        curve: 'cubic-bezier(1, -0.38, 0, 2)',
        property: 'transform'
    };

    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - pop not supplied an element!' );
    }

    const currentState = self.getComputedStyle(element).getPropertyValue('transform');

    if (
        currentState === 'none'
        || (
            currentState.match(matrixRegex)
            && parseFloat(
                currentState.match(matrixRegex)
            )[1] !== scale
        )
    ) {
        /* must set starting scales to 0.01 to work cross browser, starting with 0 doesn't work */
        const newState = currentState === 'none' ? 'matrix(0.01, 0, 0, 0.01, 0, 0)' : currentState.replace(matrixRegex, 'matrix(0.01, $2, $3, 0.01, $5, $6)');
        element.style.transform = newState;
        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform' : self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix(${scale}, $2, $3, ${scale}, $5, $6)`)
                },
                completeFn
            ),
            0
        );
    }
};
export default pop;
