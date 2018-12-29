import {MAX_COORDINATE} from '../constants';
import {Y_VALUES} from '../Entity/Ground';

const GROUND_MIN_Y = MAX_COORDINATE >> 1;
const GROUND_MIN_X = MAX_COORDINATE >> 1;

/**
 * Sits on ground
 */
function process(entity) {
    entity.y = GROUND_MIN_Y - Y_VALUES[(entity.x - GROUND_MIN_X) >> 0];
}

export default {
    componentFlag: 'canSitOnGround',
    process
}
