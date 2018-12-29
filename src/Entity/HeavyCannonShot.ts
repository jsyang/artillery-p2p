import Geometry, {GeometryType, transformPolygon} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type": GeometryType.Polygon,
    "fill": {
        "color": 0xff0000,
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

export default class HeavyCannonShot extends LivingEntity {
    type                 = 'HeavyCannonShot';
    geo                  = Geometry(GEO);
    canMoveLinearly      = true;
    canDamage            = true;
    canMetabolize        = true;
    canGravitate         = true;
    canCollideWithGround = true;
    canExplode           = true;

    hp       = 400; // effective range
    damageHp = 5;   // damage inflicted

    constructor(params: HeavyCannonShot) {
        super();
        Object.assign(this, params);
    }
}