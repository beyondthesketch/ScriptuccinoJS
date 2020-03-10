/** ScriptuccinoJS - slam | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from 'applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const slam = (element, scale = 1, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - slam not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }
    const config = [{
        duration: 250,
        curve: 'cubic-bezier(0, 0, 1, 0)',
        property: 'transform'
    },
    {
        duration: 300,
        curve: 'ease-in',
        property: 'opacity'
    }];

    const currentState = self.getComputedStyle(element).getPropertyValue('transform');

    if (
        (currentState === 'none'
        || (
            currentState.match(matrixRegex)
            && parseFloat(
                currentState.match(matrixRegex)[1]
            ) !== scale
        ))
    ) {
        const newState = currentState === 'none' ? `matrix(${scale * 2}, 0, 0, ${scale * 2}, 0, 0)` : currentState.replace(matrixRegex, `matrix(${scale * 2}, $2, $3, ${scale * 2}, $5, $6)`);
        element.style.transform = newState;
        element.style.opacity = '0';
        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform' : self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix(${scale}, $2, $3, ${scale}, $5, $6)`),
                    'opacity': '1'
                },
                completeFn
            ),
            0
        );
    }
}
export default slam;