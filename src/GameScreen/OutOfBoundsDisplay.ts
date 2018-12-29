import * as PIXI from 'pixi.js';

import Graphics from '../Graphics';
import {transformPolygon} from '../Geometry';
import {MAX_COORDINATE} from '../constants';

const XY = MAX_COORDINATE >> 1;

function init() {
    const outOfBounds = new PIXI.Graphics();
    outOfBounds.beginFill(0x440000, 1);
    outOfBounds.x = XY;
    outOfBounds.y = XY;
    outOfBounds.drawPolygon(transformPolygon([
        0, 0,
        0, -1,
        1, -1,
        1, 0,
        0, 0
    ], -5000 / 2, 1000 - 100, 5000, 1000));
    outOfBounds.endFill();

    Graphics.addChild(outOfBounds);
}

export default {
    init
}