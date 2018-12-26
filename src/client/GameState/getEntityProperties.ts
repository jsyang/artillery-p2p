// Every serialized entity must at least have these fields extracted
import LivingEntity from '../Entity/LivingEntity';

const F_base = 'type,team,x,y,hp,maxHp,rotation,_creationId';

// Relevant to components
// todo: perhaps just loop through each component's DEFAULTS object and get the keys from there?
const F_ = {
    // anchor:       'anchor,anchorOffsetX,anchorOffsetY',
    // beShielded:   'shield',
    // damage:       'damageHp',
    // attack:       'attackTarget,attackWeapon,isAttacking',
    // displayHit:   'hitTime',
    explode:          'hasExploded',
    metabolize:       'hp',
    moveLinearly:     'dx,dy',
    shootCannon:      'lastShotTime_Cannon,reloadTime_Cannon',
    shootHeavyCannon: 'coolDownTime_HeavyCannon'
};

const FIELDS_BY_ENTITY: any = {
    // Projectiles
    CannonShot:      [F_.moveLinearly],
    HeavyCannonShot: [F_.explode, F_.moveLinearly],

    // Vehicles
    Tank: [
        F_.explode,
        F_.shootCannon,
        F_.shootHeavyCannon,
        F_.moveLinearly
    ]

    // Surfaces
    // ...
};

for (let k in FIELDS_BY_ENTITY) {
    // Flatten CSV and then create 1D array
    FIELDS_BY_ENTITY[k] = FIELDS_BY_ENTITY[k].concat(F_base).join(',').split(',');
    // Get unique fields only
    FIELDS_BY_ENTITY[k] = [...new Set(FIELDS_BY_ENTITY[k])].filter(Boolean);
}

export default function getEntityProperties(entity): any {
    const fields     = FIELDS_BY_ENTITY[entity.type] || [];
    const properties = {};

    fields.forEach(f => {
        if (entity[f] instanceof LivingEntity) {
            properties[f] = entity[f]._creationId;
        } else {
            properties[f] = entity[f];
        }
    });

    return properties;
}

export const PROPERTY_IS_REFERENCE = new RegExp(`^${[
    'shield',
    'anchor'
].join('|')}$`);
