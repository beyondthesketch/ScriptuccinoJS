/** ScriptuccinoJS - moveOut | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import {default as applyTransition, transitionProperty } from './applyTransition.js';

const matrixRegex = /matrix\((.+), (.+), (.+), (.+), (.+), (.+)\)/;

const moveOut = (element, toDirection = 'right', ...otherArgs) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - moveOut not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }
    const completeFn = (typeof otherArgs[0] === 'function' && otherArgs[0]) || undefined;
    const settings = (typeof otherArgs[0] === 'object' && otherArgs[0]) || (typeof otherArgs[1] === 'object' && otherArgs[1]) || undefined;
    const config = {
        duration: 750,
        curve: 'ease',
    };
    settings && typeof settings === 'object' && Object.assign(config, settings);
    config.property = 'transform';

    const currentState = (self.getComputedStyle(element)).getPropertyValue('transform');
    const direction = (toDirection && toDirection.toLowerCase()) || 'bottom';
    const transformValues = currentState.match(matrixRegex);
    const boundingRects = element.getBoundingClientRect();
    const amount = (direction === 'bottom' || direction === 'top')
        ?
        (
            (
                (direction === 'bottom' ? self.innerHeight - boundingRects.top : boundingRects.bottom)
            ) + (
                (transformValues && (parseFloat(transformValues[6]) * (direction === 'bottom' ? 1 : -1))) || 0
            )
        ) * (direction === 'bottom' ? 1 : -1)
        :
        (
            (
                (direction === 'right' ? self.innerWidth - boundingRects.left : boundingRects.right)
            ) + (
                (transformValues && (parseFloat(transformValues[5]) * (direction === 'right' ? 1 : -1))) || 0
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
            `matrix(1, 0, 0, 1, 0, 0)`
            :
            `matrix(${transformValues[1]}, ${transformValues[2]}, ${transformValues[3]}, ${transformValues[4]}, ${ transformValues[5] }, ${ transformValues[6] })`;
        element.style.transform = newState;

        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform': self.getComputedStyle(element).getPropertyValue('transform').replace(matrixRegex, `matrix($1, $2, $3, $4, ${ (direction === 'left' || direction === 'right') ? amount : (transformValues && transformValues[5]) || 0}, ${ (direction === 'top' || direction === 'bottom') ? amount: (transformValues && transformValues[6]) || 0})`),
                },
                () => {
                    // NOTE: force reflow and recalc - hack necessary for removing extra space created by the translation on certain browsers
                    // TODO: Investigate this hack - may not be effective
                    element.style.opacity = '0.999';
                    self.setTimeout(
                        () => {
                            element.style.opacity = '';
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
export default moveOut;