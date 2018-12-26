/**
 * Has weapons with which to attack
 */

/*
Cannon
 */

const DEFAULTS = {
    attackTurretPositions: [],
    attackTarget:          null,
    attackWeapon:          'Cannon',
    isAttacking:           false
};

export default {
    componentFlag: 'canAttack',
    DEFAULTS
}
