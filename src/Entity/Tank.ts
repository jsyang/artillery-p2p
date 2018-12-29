import Geometry, {GeometryType, transformPolygon} from '../Geometry';
import LivingEntity from './LivingEntity';
import {TEAM_COLOR} from '../constants';

const GEO = {
    "body": {
        "type": GeometryType.Polygon,

        "lineStyle": {
            "width": 1,
            "color": 255,
            "alpha": 1
        },
        fill:        {
            color: 0xffffff,
            alpha: 1
        },
        "path":      transformPolygon(
            [400, 200, 400, 166.66666666666669, 266.6666666666667, 166.66666666666669, 200, 133.33333333333334, 166.66666666666669, 133.33333333333334, 100, 166.66666666666669, 100, 233.33333333333334, 166.66666666666669, 266.6666666666667, 200, 266.6666666666667, 266.6666666666667, 233.33333333333334, 400, 233.33333333333334, 400, 200],
            -15, -20, 0.1, 0.1
        )
    }
};

const ATTACK_TURRET_POSITIONS = [
    tank => {
        const {x, y}     = tank.geo.collider.calcPoints[0];
        const {rotation} = tank;
        return {x, y, rotation};
    }
];

export default class Tank extends LivingEntity {
    type = 'Tank';
    geo  = Geometry(GEO.body);

    mass     = 10;
    hp       = 10;
    maxHp    = 10;
    rotation = 0;

    canExplode = true;

    canAttack             = true;
    attackWeapon          = 'HeavyCannon';
    attackTurretPositions = ATTACK_TURRET_POSITIONS;

    canShootCannon      = true;
    canShootHeavyCannon = true;

    canSitOnGround  = true;
    canLimitSpeed   = true;
    canMoveLinearly = true;

    assignTeamColor(): number | void {
        const color                             = TEAM_COLOR[this.team];
        this.geo.graphics.currentPath.lineColor = color;
        this.geo.graphics.currentPath.fillColor = color;

        return color;
    }

    constructor(params: Tank) {
        super();

        Object.assign(this, params);

        this.assignTeamColor();
    }
}