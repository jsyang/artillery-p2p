import Geometry, {GeometryType, transformPolygon} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type": GeometryType.Polygon,
    "fill": {
        "color": 16777215,
        "alpha": 1
    },
    "path": transformPolygon([
        -1, 1,
        1, 1,
        1, -1,
        -1, -1,
        -1, 1
    ], 0, 0, 2, 2)
};

export default class CannonShot extends LivingEntity {
    type                 = 'CannonShot';
    geo                  = Geometry(GEO);
    canMoveLinearly      = true;
    canDamage            = true;
    canMetabolize        = true;
    canGravitate         = true;
    canCollideWithGround = true;

    hp       = 120; // effective range
    damageHp = 1; // damage inflicted

    constructor(params: CannonShot) {
        super();

        Object.assign(this, params);
    }
}