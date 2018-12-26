/**
 * Is affected by gravity
 */

const DY_GRAVITY = 0.1;

function process(entity) {
    entity.dy += DY_GRAVITY;
}

export default {
    componentFlag: 'canGravitate',
    process
}
