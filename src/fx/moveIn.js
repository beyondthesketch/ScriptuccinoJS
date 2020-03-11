/** ScriptuccinoJS - moveIn | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const moveIn = (element, fromDirection, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - moveIn not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }
    const config = {
        duration: 750,
        curve: 'ease-out',
        property: 'transform'
    };

    const computedStyles = self.getComputedStyle(element);
    const currentState = computedStyles.getPropertyValue('transform');
    const direction = (fromDirection && fromDirection.toLowerCase()) || 'bottom';
    const transformValues = currentState.match(matrixRegex);
    const boundingRects = element.getBoundingClientRect();
    const amount = (direction === 'bottom' || direction === 'top')
        ?
        (
            (
                (direction === 'bottom' ? self.innerHeight - boundingRects.top : boundingRects.bottom)
            ) + (
                (transformValues && (parseFloat(transformValues[5]) * (direction === 'bottom' ? 1 : -1))) || 0
            )
        ) * (direction === 'bottom' ? 1 : -1)
        :
        (
            (
                (direction === 'right' ? self.innerWidth - boundingRects.left : boundingRects.right)
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
                    transformValues[6]
            }, ${
                (direction === 'bottom' || direction === 'top')
                    ?
                    amount
                    :
                    transformValues[5]
            })`;
        element.style.transform = newState;

        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix($1, $2, $3, $4, ${ (transformValues && transformValues[6]) || 0}, ${ (transformValues && transformValues[5]) || 0})`),
                },
                () => {
                    // NOTE: force reflow and recalc - hack necessary for removing extra space created by the translation on certain browsers
                    element.style.opacity = '0.999';
                    self.setTimeout(
                        () => {
                            element.style.opacity = '1';
                        },
                        0
                    );
                    if (completeFn && typeof completeFn === 'function') {
                        completeFn.call(element);
                    }
                }
            ),
            0
        );
    }
}
export default moveIn;