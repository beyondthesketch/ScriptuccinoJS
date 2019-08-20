/** ScriptuccinoJS - left | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License */
import { default as applyTransition, transitionProperty} from './applyTransition.js';

const matrix3dRegex = /matrix(3d)*\((.+), (.+), (.+), (.+), (.+), (.+)(, (.+), (.+), (.+), (.+), (.+), (.+), (.+), (.+), (.+), (.+))*\)/;

// first phase
// matrix3d(0.994092468152778, -0.03090753184722192, 0.2478908817141746, 0, -0.03090753184722192, 0.994092468152778, 0.2478908817141746, 0, -0.24184476264797522, -0.24184476264797522, 0.9396926207859084, 0, 0, 0, 0, 1)
// matrix3d(1.2123078879911928, -0.037692112008807226, 0.302305953309969, 0, -0.037692112008807226, 1.2123078879911928, 0.302305953309969, 0, -0.24184476264797522, -0.24184476264797522, 0.9396926207859084, 0, 0, 0, 0, 1)
// matrix3d(1.1196152422706631, -0.08038475772933676, 0.4242640687119284, 0, -0.08038475772933676, 1.1196152422706631, 0.4242640687119284, 0, -0.3535533905932737, -0.3535533905932737, 0.8660254037844387, 0, 0, 0, 0, 1)
// matrix3d(0.9531538935183249, -0.046846106481675025, 0.29883623873011983, 0, -0.046846106481675025, 0.9531538935183249, 0.29883623873011983, 0, -0.29883623873011983, -0.29883623873011983, 0.9063077870366499, 0, 0, 0, 0, 1)

// second phase
// matrix(1.05, 0, 0, 1.05, 0, 0)

const lift = (element, completeFn) => {
    if (!element) {
        return console && console.warn( 'ScriptuccinoJS - lift not supplied an element!' );
    }

    if (!!element.style[transitionProperty]) {
        return null;
    }

    const config = {
        duration: 500,
        curve: 'ease-out',
        property: 'transform'
    };

    const currentState = self.getComputedStyle(element).getPropertyValue('transform');

    if (
        currentState === 'none'
        || (
            currentState.match(matrix3dRegex)
        )
    ) {
        /* must set starting scales to 0.01 to work cross browser, starting with 0 doesn't work */
        const firstPhase = currentState === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : currentState.replace(matrix3dRegex, 'matrix($2, $3, $4, $5, $6, $7)');
        element.style.transform = firstPhase;
        self.setTimeout(
            () => applyTransition(
                element,
                config,
                {
                    'transform' : /* self.getComputedStyle(element).getPropertyValue('transform').replace(matrix3dRegex, */ 'matrix3d(1.0484692828701574, -0.05153071712984253, 0.32871986260313185, 0, -0.05153071712984253, 1.0484692828701574, 0.32871986260313185, 0, -0.29883623873011983, -0.29883623873011983, 0.9063077870366499, 0, 0, 0, 0, 1)'/* ) */
                },
                () => {
                    // second phase
                    applyTransition(
                        element,
                        config,
                        {
                            'transform' : 'matrix(1.1, 0, 0, 1.1, 0, 0)'
                        },
                        completeFn
                    )
                }
            ),
            0
        );
    }

}
export default lift;