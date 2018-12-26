import Entity from '../Entity/index';
import {TEAM} from '../constants';

function processTeam(team) {
    //const friendlyOnly = (e: any) => e.team === team;
    //const enemyOnly    = (e: any) => e.team !== team;
}

const STRATEGY_UPDATE_TIMEOUT  = 3000;
let lastTeamStrategyUpdateTime = 0;

const TEAMS = [
    TEAM.GREEN,
    TEAM.BLUE,
    TEAM.YELLOW,
    TEAM.RED,
    TEAM.MAGENTA
];

let teamsRemaining;

function update() {
    const now = Date.now();

    if (now - lastTeamStrategyUpdateTime > STRATEGY_UPDATE_TIMEOUT) {
        teamsRemaining.forEach(processTeam);

        lastTeamStrategyUpdateTime = now;
    }
}

// let onTeamLost = new Function();
// let onTeamWin  = new Function();

const setOnTeamLostCallback = new Function(); // cb => onTeamLost = cb;
const setOnTeamWinCallback  = new Function(); // cb => onTeamWin = cb;

function init() {
    // If loading a previous game ensure this
    // system is in sync with loaded game state
    const allEntities = Entity.getAll();
    if (allEntities.length > 0) {
        teamsRemaining = new Set(allEntities.map((e: any) => e.team));
        teamsRemaining = [...teamsRemaining].filter(t => t > -1);
    } else {
        teamsRemaining = [...TEAMS];
    }
}

export default {
    init,
    update,
    setOnTeamLostCallback,
    setOnTeamWinCallback
}