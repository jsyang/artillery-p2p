import {IInputEvent} from './Event';

const CODE_TO_KEY = {
    27: 'escape',
    32: 'spacebar',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: '0',

    37:  'left_arrow',
    38:  'up_arrow',
    39:  'right_arrow',
    40:  'down_arrow',
    69:  'e',
    80:  'p',
    70:  'f',
    77:  'm',
    84:  't',
    88:  'x',
    81:  'q',
    190: '.', // >
    13:  'enter',
    8:   'backspace'
};


export interface IKeyboardState {
    left_arrow?: boolean;
    right_arrow?: boolean;
    up_arrow?: boolean;
    down_arrow?: boolean;
    p?: boolean;
    q?: boolean;
    e?: boolean;
    f?: boolean;
    m?: boolean;
    t?: boolean;
    x?: boolean;
    '.'?: boolean;
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
    '0': false,
    spacebar?: boolean;
    backspace?: boolean;
    enter?: boolean;
    escape?: boolean;
}

const inputState: IKeyboardState = {
    left_arrow:  false,
    right_arrow: false,
    up_arrow:    false,
    down_arrow:  false,
    p:           false,
    q:           false,
    e:           false,
    f:           false,
    m:           false,
    t:           false,
    x:           false,
    '.':         false,
    '1':         false,
    '2':         false,
    '3':         false,
    '4':         false,
    '5':         false,
    '6':         false,
    '7':         false,
    '8':         false,
    '9':         false,
    '0':         false,
    spacebar:    false,
    backspace:   false,
    escape:      false,
    enter:       false
};

function onKeyUp({which}) {
    inputState[CODE_TO_KEY[which]] = false;
}

function onKeyDown({which}) {
    inputState[CODE_TO_KEY[which]] = true;
}

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);

export const getEvents = (): IInputEvent => ({
    LEFT:  Boolean(inputState.left_arrow),
    RIGHT: Boolean(inputState.right_arrow),
    UP:    Boolean(inputState.up_arrow),
    DOWN:  Boolean(inputState.down_arrow),
    SHOOT: Boolean(inputState.f)
});

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};