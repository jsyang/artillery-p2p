import Entity from '../Entity';
import {playSoundLocalized} from '../assets/audio';

const LAUNCH_SPEED = 7;

function shoot(getMuzzleFunc) {
    const {team}           = this;
    const muzzle           = getMuzzleFunc(this);
    const {rotation, x, y} = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    Entity.create('HeavyCannonShot', {
        team,
        x:  x + this.x - shooterDx,
        y:  y + this.y - shooterDy,
        dx: dx + shooterDx,
        dy: dy + shooterDy
    });
}

const DEFAULTS = {
    coolDownTime_HeavyCannon:    0,
    coolDownTimeMax_HeavyCannon: 60
};

const SOUND_SHOOT = 'fire-heavy';

function process(entity) {
    const {isAttacking, attackWeapon, coolDownTime_HeavyCannon, coolDownTimeMax_HeavyCannon} = entity;

    if (coolDownTime_HeavyCannon > 0) {
        entity.coolDownTime_HeavyCannon--;
    }

    if (isAttacking && attackWeapon === 'HeavyCannon' && coolDownTime_HeavyCannon === 0) {
        entity.attackTurretPositions
            .forEach(shoot.bind(entity));

        playSoundLocalized(SOUND_SHOOT, entity);

        entity.coolDownTime_HeavyCannon = coolDownTimeMax_HeavyCannon;
    }
}

export default {
    componentFlag: 'canShootHeavyCannon',
    DEFAULTS,
    process
}
