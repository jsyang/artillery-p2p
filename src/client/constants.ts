import {transformPolygon} from './Geometry';

export const MAX_COORDINATE = 1 << 15;

// For HUD indicators
const HUD_POINTER_SCALE = 0.02;

export const POINTER = transformPolygon([200, 0, 0, 200, 200, 400, 400, 200, 200, 0], 0, 0, HUD_POINTER_SCALE, HUD_POINTER_SCALE);

export const POINTER_TARGET = transformPolygon(
    [0, 0, 100, 100, 300, 100, 400, 0, 300, 100, 300, 300, 400, 400, 300, 300, 100, 300, 0, 400, 100, 300, 100, 100],
    0, 0, HUD_POINTER_SCALE, HUD_POINTER_SCALE
);

export const POINTER_NAV = transformPolygon(
    [0, 400, 0, 0, 66.66666666666667, 0, 333.33333333333337, 333.33333333333337, 333.33333333333337, 0, 400, 0, 400, 400, 300, 400, 66.66666666666667, 100, 66.66666666666667, 400, 0, 400],
    0, 0, HUD_POINTER_SCALE, HUD_POINTER_SCALE
);

export const TARGET_RETICLE = [
    [0, 10, 0, 0, -10, -10, 0, 0, 10, 0],
    [-10, 0, 0, 0, 10, -10, 0, 0, 0, 10],
    [0, -10, 0, 0, 10, 10, 0, 0, -10, 0],
    [10, 0, 0, 0, -10, 10, 0, 0, 0, -10]
];

export const TEAM = {
    NONE:    -1,
    BLUE:    0,
    GREEN:   1,
    RED:     2,
    YELLOW:  3,
    MAGENTA: 4
};

export const TEAM_COLOR = [
    0x0000ff,
    0x00ff00,
    0xff0000,
    0xffff00,
    0xff00ff
];

export const TEAM_NONE_COLOR = 0x999999;
