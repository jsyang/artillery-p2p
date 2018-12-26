import Input from '../../Input';
import Focus from '../../Graphics/Focus';
import controlTank from './Tank';
import {IInputEvent} from '../../Input/Event';
import LivingEntity from '../../Entity/LivingEntity';

// Need to handle living entities separate from modals / other controlled things
let controlledEntity;
let lastControlledLivingEntity;
const setControlledEntity = entity => {
    controlledEntity = entity;

    if (!entity) {
        lastControlledLivingEntity = null;
    }

    if (entity instanceof LivingEntity) {
        lastControlledLivingEntity = entity;
        Focus.setFocus(entity);
    }

    return entity;
};

const getControlledEntity           = () => controlledEntity;
const getLastControlledLivingEntity = () => lastControlledLivingEntity;

let prevEvents: IInputEvent = {} as any;

function update() {
    const device = Input.getDevice();
    const events = device.getEvents();

    if (controlledEntity) {
        if (controlledEntity.hp > 0) {
            switch (controlledEntity.type) {
                case 'Tank':
                    controlTank(controlledEntity, events, prevEvents);
                    break;
            }
        } else {
            setControlledEntity(null);
        }
    }

    prevEvents = events;
}

export default {
    update,
    getLastControlledLivingEntity,
    getControlledEntity,
    setControlledEntity
}