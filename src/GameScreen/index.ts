import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import OutOfBoundsDisplay from './OutOfBoundsDisplay';
import GameScreenControl from './control';

import Entity from '../Entity';

import HUD from './HUD';
import {TEAM} from '../constants';
import {GROUND_MAX_X, GROUND_MIN_X} from '../Entity/Ground';
import p2p from 'p2p.system';
import {deserializeFromNetwork, GameInfo, serializeForNetwork} from '../GameState';
import Score from '../Score';

let then = 0; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

let lastP2PUpdate         = 0;
const P2P_UPDATE_INTERVAL = 30; // ms

let playerTankFields;

let isPaused = false;
let raf;

function update(now: number) {
    Entity.updateAll();

    const allTanks        = Entity.getByType('Tank');
    const hasFriendlyTank = allTanks.some(t => t.team === playerTankFields.team);

    // Player has died
    if (!hasFriendlyTank) {
        const newTank = Entity.create('Tank', playerTankFields);
        controlEntity(newTank);
        Score.add(0, 1);
        p2p.sendToPeer(serializeForNetwork(GameInfo.Score));
    }

    if (now - lastP2PUpdate > P2P_UPDATE_INTERVAL) {
        p2p.sendToPeer(serializeForNetwork());
        lastP2PUpdate = now;
    }
}

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    !isPaused && update(now);
    GameScreenControl.update();

    if (elapsed > FPS_INTERVAL) {
        const focus = Focus.getFocus();

        if (focus) {
            Graphics.centerOn(focus);
        }

        HUD.update();
        Graphics.render();

        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function stop() {
    cancelAnimationFrame(raf);
}

function controlEntity(entity) {
    Focus.setFocus(entity);
    GameScreenControl.setControlledEntity(entity);
}

function init() {
    removeEventListener('resize', onResize);
    addEventListener('resize', onResize);

    Graphics.init();
    Entity.clearAll();
    p2p.setOnDataFromPeer(deserializeFromNetwork);
    p2p.setOnDisconnectFromPeer(deserializeFromNetwork);

    HUD.init();
    OutOfBoundsDisplay.init();

    Entity.create('Ground', {});

    const tankP1Fields = {team: TEAM.MAGENTA, x: GROUND_MIN_X};
    const tankP1       = Entity.create('Tank', tankP1Fields);

    const tankP2Fields = {team: TEAM.BLUE, x: GROUND_MAX_X - 2};
    const tankP2       = Entity.create('Tank', tankP2Fields);

    const {self, other} = p2p.getPeerIds();
    let controlledTank;

    if (self > other) {
        controlledTank   = tankP1;
        playerTankFields = tankP1Fields;
    } else {
        controlledTank   = tankP2;
        playerTankFields = tankP2Fields;
    }

    controlEntity(controlledTank);
}

function onResize() {
    Graphics.onResize();
    HUD.onResize();
}

export default {
    init,
    step,
    stop,
    getPlayerTeam: () => playerTankFields.team
};
