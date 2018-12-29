import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import DPad from './DPad';
import ActionButtons from './ActionButtons';
import ScoreDisplay from './ScoreDisplay';

function init() {
    UnitDisplay.init();
    WeaponsDisplay.init();
    ScoreDisplay.init();
    DPad.init();
    ActionButtons.init();
}

function onResize() {
    DPad.onResize();
    ActionButtons.onResize();
}

function update() {
    ScoreDisplay.update();
    UnitDisplay.update();
    WeaponsDisplay.update();
}

export default {
    init,
    update,
    onResize
}