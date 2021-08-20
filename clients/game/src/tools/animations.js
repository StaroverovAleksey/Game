import animations from "./animations.css"

export const ANIMATION_FINISH = 'animation_finish';

export const ANIMATION_STEP_UP = 'animation_step_up';
export const ANIMATION_STEP_DOWN = 'animation_step_down';
export const ANIMATION_STEP_LEFT = 'animation_step_left';
export const ANIMATION_STEP_RIGHT = 'animation_step_right';

export const ANIMATION_TURN_UP = 'animation_turn_up';
export const ANIMATION_TURN_DOWN = 'animation_turn_down';
export const ANIMATION_TURN_LEFT = 'animation_turn_left';
export const ANIMATION_TURN_RIGHT = 'animation_turn_right';

export const getAnimation = (type) => {
    console.log(`ANIMATION ********* ${type}`);
    switch (type) {
        case ANIMATION_FINISH: return {
            action: '',
        };


        case ANIMATION_STEP_UP: return {
            position: getPosition(3, 'back'),
            action: 'load .5s steps(9, end) infinite',
            duration: 1000
        };
        case ANIMATION_STEP_DOWN: return {
            position: getPosition(3, 'front'),
            action: 'load .5s steps(9, end) infinite',
            duration: 1000
        };
        case ANIMATION_STEP_LEFT: return {
            position: getPosition(3, 'left'),
            action: 'load .5s steps(9, end) infinite',
            duration: 1000
        };
        case ANIMATION_STEP_RIGHT: return {
            position: getPosition(3, 'right'),
            action: 'load .5s steps(9, end) infinite',
            duration: 1000
        };

    }
};

export const getPosition = (animation, direction) => {
    let shift;
    switch (parseInt(animation)) {
        case 1: shift = 0; break; //потягивание
        case 2: shift = -256; break; //копание
        case 3: shift = -512; break; //ходьба
        case 4: shift = -768; break; //танец
        case 5: shift = -1024; break; //стрельба из лука
    }
    switch (direction) {
        case 'front': shift = shift - 128; break;
        case 'right': shift = shift - 192; break;
        case 'left': shift = shift - 64; break;
    }
    return `${shift}px`;
};
