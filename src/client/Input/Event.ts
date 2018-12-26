export interface IInputEvent {
    LEFT: boolean;
    RIGHT: boolean;
    UP: boolean;
    DOWN: boolean;

    analogAngle?: number;

    SHOOT: boolean;
}