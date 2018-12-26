import {IInputEvent} from '../../Input/Event';
import {GROUND_MAX_X, GROUND_MIN_X} from '../../Entity/Ground';

const dx         = 1;
const D_ROTATION = Math.PI / 90;

export default function controlFighter(controlledEntity, events: IInputEvent, prevEvents: IInputEvent) {
    let newX: any;

    if (controlledEntity.coolDownTime_HeavyCannon === 0) {
        if (events.LEFT) {
            newX = controlledEntity.x - dx;
        } else if (events.RIGHT) {
            newX = controlledEntity.x + dx;
        }

        if (newX >= GROUND_MIN_X && newX <= GROUND_MAX_X) {
            controlledEntity.x = newX;
        }
    }

    if (events.UP) {
        controlledEntity.rotation -= D_ROTATION;
    } else if (events.DOWN) {
        controlledEntity.rotation += D_ROTATION;
    }

    if (events.analogAngle !== null && events.analogAngle !== prevEvents.analogAngle) {
        controlledEntity.rotation = events.analogAngle;
    }

    controlledEntity.isAttacking = events.SHOOT;
}
