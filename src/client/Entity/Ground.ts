import Geometry, {GeometryType, transformPolygon} from '../Geometry';
import LivingEntity from './LivingEntity';
import Random from '../Random';
import {MAX_COORDINATE} from '../constants';

const getY = () => Random.groundYCoord() * 80 + 100;

const GROUND_POLY: any[] = [0, 0];
const GROUND_Y: any[]    = [];

let x = 0;
let y = getY();

GROUND_POLY.push(x);
GROUND_POLY.push(y);

const X_INCREMENT = 40;

let prev_y      = y;
let increment_y = 0;

for (let i = 32; i > 0; i--) {
    x += X_INCREMENT;
    y = i !== 1 ? getY() : 100;

    increment_y = (y - prev_y) / X_INCREMENT;
    GROUND_POLY.push(x);
    GROUND_POLY.push(y);

    for (let j = 0; j < X_INCREMENT; j++) {
        GROUND_Y.push(prev_y + increment_y * j);
    }

    prev_y = y;
}

// Cap off the ground polygon
GROUND_POLY.push(x);
GROUND_POLY.push(0);

GROUND_POLY.push(0);
GROUND_POLY.push(0);

const GEO = {
    type:      GeometryType.Polygon,
    lineStyle: {
        width: 1,
        color: 0x00ff00,
        alpha: 1
    },
    fill:      {
        color: 0x00ff00,
        alpha: 1
    },
    path:      transformPolygon(GROUND_POLY, 0, 0, 1, -1)
};

export const Y_VALUES     = [...GROUND_Y];
export const GROUND_MIN_Y = MAX_COORDINATE >> 1;
export const GROUND_MIN_X = MAX_COORDINATE >> 1;
export const GROUND_MAX_X = GROUND_MIN_X + Y_VALUES.length;


export default class Ground extends LivingEntity {
    type  = 'Ground';
    hp    = 1e10;
    maxHp = 1e10;
    geo   = Geometry(GEO);

    constructor(params: Ground) {
        super();
        Object.assign(this, params);
        this.x = GROUND_MIN_X;
        this.y = GROUND_MIN_Y;
    }
}