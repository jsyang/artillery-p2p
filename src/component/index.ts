/**
 * All component flags start with the prefix `can`:
 * e.g. canStoreMaterials, canSupply, canShoot, canMove
 */

import Entity from '../Entity';

import AttackComponent from './attack';
import MetabolizeComponent from './metabolize';
import MoveLinearlyComponent from './moveLinearly';
import AnchorComponent from './anchor';
import BeShieldedComponent from './beShielded';
import ExplodeComponent from './explode';
import DamageComponent from './damage';
import ShootCannonComponent from './shootCannon';
import ShootHeavyCannonComponent from './shootHeavyCannon';
import LimitSpeedComponent from './limitSpeed';
import DisplayHitComponent from './displayHit';
import GravitateComponent from './gravitate';
import CollideWithGroundComponent from './collideWithGround';
import SitOnGroundComponent from './sitOnGround';

// In order of update() precedence
const ALL_COMPONENTS = [
    // Change position
    SitOnGroundComponent,
    AnchorComponent,
    MoveLinearlyComponent,
    LimitSpeedComponent,

    // Affect other entities
    DamageComponent,
    AttackComponent,
    ShootCannonComponent,
    ShootHeavyCannonComponent,

    // Metabolize
    CollideWithGroundComponent,
    MetabolizeComponent,
    DisplayHitComponent,
    ExplodeComponent,
    GravitateComponent,
    BeShieldedComponent
];

/**
 * Set default values for components if the entity has them
 */
function init(entity) {
    ALL_COMPONENTS
        .forEach((component: any) => {
            if (component.DEFAULTS && entity[component.componentFlag]) {
                Object.keys(component.DEFAULTS)
                    .forEach(defaultPropertyKey => {
                        // Only set defaults if there isn't a value already set
                        if (typeof entity[defaultPropertyKey] === 'undefined') {
                            entity[defaultPropertyKey] = component.DEFAULTS[defaultPropertyKey];
                        }
                    });
            }
        });
}

function update(entity) {
    if (entity.hp > 0) {
        ALL_COMPONENTS.forEach((component: any) => {
            if (entity[component.componentFlag] && component.process) {
                component.process(entity);
            }
        });
    } else {
        // Special case for exploding when dead
        if (entity[ExplodeComponent.componentFlag]) {
            ExplodeComponent.process(entity);
        }

        Entity.destroy(entity);
    }
}

export default {
    init,
    update
}
