/** ScriptuccinoJS - shiftFadeOut | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const shiftFadeOut = (element, toDirection, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - shiftFadeOut not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }
    const config = [
        {
            duration: 750,
            curve: 'ease-out',
            property: 'transform'
        },
        {
            duration: 750,
            curve: 'ease-out',
            property: 'opacity'
        },

    ];

    const computedStyles = self.getComputedStyle(element);
    const currentState = computedStyles.getPropertyValue('transform');
    const direction = (toDirection && toDirection.toLowerCase()) || 'bottom';
    const transformValues = currentState.match(matrixRegex);
    const amount = (direction === 'bottom' || direction === 'top')
        ?
        (
            (
                (parseInt(computedStyles.getPropertyValue('width'), 10)/100) * 50
            ) + (
                (transformValues && (parseFloat(transformValues[5]) * (direction === 'bottom' ? -1 : 1))) || 0
            )
        ) * (direction === 'bottom' ? 1 : -1)
        :
        (
            (
                (parseInt(computedStyles.getPropertyValue('height'), 10)/100) * 50
            ) + (
                (transformValues && (parseFloat(transformValues[6]) * (direction === 'right' ? -1 : 1))) || 0
            )
        ) * (direction === 'right' ? 1 : -1);

    if (
        currentState === 'none'
        || parseFloat(
            transformValues[
                ((direction === 'bottom' || direction === 'top') && 6) || 5
            ]
        ) !== amount
    ) {
        const newState = currentState === 'none'
            ?
            `matrix(1, 0, 0, 1, 0, 0)`
            :
            `matrix(${transformValues[1]}, ${transformValues[2]}, ${transformValues[3]}, ${transformValues[4]}, ${
                (direction === 'left' || direction === 'right')
                    ?
                    0
                    :
                    transformValues[5]
            }, ${
                (direction === 'bottom' || direction === 'top')
                    ?
                    0
                    :
                    transformValues[6]
            })`;
        element.style.transform = newState;
        element.style.opacity = element.style.opacity || '1';

        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix($1, $2, $3, $4, ${
                        (direction === 'left' || direction === 'right')
                            ?
                            amount
                            :
                            (transformValues && transformValues[5]) || 0
                    }, ${
                        (direction === 'top' || direction === 'bottom')
                            ?
                            amount
                            :
                            (transformValues && transformValues[6]) || 0
                    })`),
                    'opacity': '0'
                },
                completeFn
            ),
            0
        );
    }
}
export default shiftFadeOut;