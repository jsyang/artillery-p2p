import {IInputEvent} from './Event';

const inputState = {
    left:        false,
    right:       false,
    shoot:       false,
    analogAngle: 0
};

export const getEvents = (): IInputEvent => ({
    LEFT:        Boolean(inputState.left),
    RIGHT:       Boolean(inputState.right),
    UP:          false,
    DOWN:        false,
    analogAngle: inputState.analogAngle,
    SHOOT:       Boolean(inputState.shoot)
});

const getInputState = () => ({...inputState});

function setInputState(key, value) {
    inputState[key] = value;
}

export default {
    getEvents,
    getInputState,
    setInputState
};