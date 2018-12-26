import Entity from '../Entity';
import {MAX_COORDINATE} from '../constants';
import {Y_VALUES} from '../Entity/Ground';

const GROUND_MIN_Y = MAX_COORDINATE >> 1;
const GROUND_MIN_X = MAX_COORDINATE >> 1;
const GROUND_MAX_X = (MAX_COORDINATE >> 1) + Y_VALUES.length;

/**
 * Collides with ground
 */
function process(entity) {
    const {x, y}  = entity;
    const groundY = Y_VALUES[(x - GROUND_MIN_X) >> 0];

    if (isNaN(groundY) || x < GROUND_MIN_X || x > GROUND_MAX_X || y - GROUND_MIN_Y > -groundY) {
        Entity.destroy(entity);
    }
}

export default {
    componentFlag: 'canCollideWithGround',
    process
}
