import {playSoundLocalized} from '../assets/audio';
import Entity from '../Entity';
import Random from '../Random';
import {TEAM} from '../constants';
import GameScreen from '../GameScreen';

function explode(entity) {
    const {
              EXPLOSION_SOUND, EXPLOSION_FRAGMENTS,
              x, y, dx, // dy,
              explosionOriginDx,
              explosionOriginDy,
              team
          } = entity;

    playSoundLocalized(EXPLOSION_SOUND, entity);

    // Ensure that only the side responsible for the explosion creates shrapnel
    // Required for P2P otherwise both players would create shrapnel (doubling the amount of fragments and explosion ought to cause)
    if (team === GameScreen.getPlayerTeam()) {
        for (let fragmentCount = EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
            Entity.create('CannonShot', {
                x:    explosionOriginDx + x + Random.float(-10, 10),
                y:    explosionOriginDy + y + Random.float(-10, 10),
                team: TEAM.NONE,
                dx:   Random.float(-1, 1) + (dx || 0),
                dy:   Random.float(-2, -4)
            });
        }
    }

    entity.hasExploded = true;
}

const DEFAULTS = {
    // Relative to entity x,y
    explosionOriginDx:   0,
    explosionOriginDy:   0,
    EXPLOSION_SOUND:     'boom',
    EXPLOSION_FRAGMENTS: 3,
    hasExploded:         false,
    explode
};

/**
 * Explodes when dead
 */
function process(entity) {
    const {hasExploded, canExplode, hp} = entity;

    // Ensure the explosion is intentional
    // i.e. Freighters should not explode when colonizing
    if (hp <= 0 && !hasExploded && canExplode) {
        explode(entity);
    }
}

export default {
    componentFlag: 'canExplode',
    DEFAULTS,
    process
}
