/** ScriptuccinoJS - shiftFadeIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const shiftFadeIn = (element, fromDirection, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - shiftFadeIn not supplied an element!' );
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
    const direction = (fromDirection && fromDirection.toLowerCase()) || 'bottom';
    const transformValues = currentState.match(matrixRegex);
    const amount = (direction === 'bottom' || direction === 'top')
        ?
        (
            (
                (parseInt(computedStyles.getPropertyValue('width'), 10)/100) * 50
            ) + (
                (transformValues && (parseFloat(transformValues[5]) * (direction === 'bottom' ? 1 : -1))) || 0
            )
        ) * (direction === 'bottom' ? 1 : -1)
        :
        (
            (
                (parseInt(computedStyles.getPropertyValue('height'), 10)/100) * 50
            ) + (
                (transformValues && (parseFloat(transformValues[6]) * (direction === 'right' ? 1 : -1))) || 0
            )
        ) * (direction === 'right' ? 1 : -1);

    if (
        currentState === 'none'
        || parseFloat(
            transformValues[
                ((direction === 'bottom' || direction === 'top') && 6) || 5
            ]
        ) !== 0
    ) {
        const newState = currentState === 'none'
            ?
            `matrix(1, 0, 0, 1, ${
                (direction === 'left' || direction === 'right')
                    ?
                    amount
                    :
                    0
            }, ${
                (direction === 'bottom' || direction === 'top')
                    ?
                    amount
                    :
                    0
            })`
            :
            `matrix(${transformValues[1]}, ${transformValues[2]}, ${transformValues[3]}, ${transformValues[4]}, ${
                (direction === 'left' || direction === 'right')
                    ?
                    amount
                    :
                    transformValues[5]
            }, ${
                (direction === 'bottom' || direction === 'top')
                    ?
                    amount
                    :
                    transformValues[6]
            })`;
        element.style.transform = newState;
        element.style.opacity = 0;

        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix($1, $2, $3, $4, ${ (transformValues && transformValues[5]) || 0}, ${ (transformValues && transformValues[6]) || 0})`),
                    'opacity': 1
                },
                completeFn
            ),
            0
        );
    }
}
export default shiftFadeIn;