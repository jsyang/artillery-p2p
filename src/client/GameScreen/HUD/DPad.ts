import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import {getIsMobile} from '../../mobileHelpers';
import OnScreenControls from '../../Input/OnScreenControls';

const MARGIN_EDGE = 12;
const WIDTH       = 100;
const HEIGHT      = 100;

const dPad = new PIXI.Graphics();
dPad.beginFill(0xaa0000, 0.5);
dPad.drawCircle(WIDTH / 2, HEIGHT / 2, WIDTH / 2);
dPad.endFill();


let dPadX = dPad.x + WIDTH / 2;
let dPadY = dPad.y + HEIGHT / 2;

dPad.x                   = MARGIN_EDGE;
dPad.y                   = innerHeight - MARGIN_EDGE - HEIGHT;
dPad.interactive         = true;
dPad.interactiveChildren = false;
dPad.buttonMode          = true;

let isTouching = false;

function onPointerUp() {
    isTouching = false;
    OnScreenControls.setInputState('analogAngle', null);
}

function onPointerDown() {
    isTouching = true;
}

function onMove(e) {
    if (isTouching) {
        const {data: {global}} = e;
        OnScreenControls.setInputState('analogAngle', Math.atan2(global.y - dPadY, global.x - dPadX));
    }
}

dPad.on('pointerdown', onPointerDown);
dPad.on('pointerup', onPointerUp);
dPad.on('pointerupoutside', onPointerUp);
dPad.on('pointermove', onMove);

function init() {
    if (getIsMobile()) {
        Graphics.addChildToHUD(dPad);
        onResize();
    }
}

function onResize() {
    if (getIsMobile()) {
        dPad.y = innerHeight - MARGIN_EDGE - HEIGHT;
        dPadX  = dPad.x + WIDTH / 2;
        dPadY  = dPad.y + HEIGHT / 2;
    }
}

export default {
    init,
    onResize
}
