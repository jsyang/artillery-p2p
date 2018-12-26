import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import {getIsMobile} from '../../mobileHelpers';
import OnScreenControls from '../../Input/OnScreenControls';
//import OnScreenControls from '../../Input/OnScreenControls';

const MARGIN_EDGE = 12;

const buttons = new PIXI.Graphics();

const buttonLeft       = new PIXI.Graphics();
buttonLeft.interactive = true;
buttonLeft.beginFill(0xaa0000, 0.5);
buttonLeft.drawRect(0, 0, 60, 60);
buttonLeft.endFill();
buttonLeft.addChild(new PIXI.Text(
    ' <',
    {
        fontFamily: 'arial',
        fontSize:   60,
        fill:       0
    }
));
buttonLeft.on('pointerdown', () => OnScreenControls.setInputState('left', true));
buttonLeft.on('pointerup', () => OnScreenControls.setInputState('left', false));
buttonLeft.on('pointerupoutside', () => OnScreenControls.setInputState('left', false));

const buttonRight       = new PIXI.Graphics();
buttonRight.interactive = true;
buttonRight.x           = 60 + 5;
buttonRight.beginFill(0xaa0000, 0.5);
buttonRight.drawRect(0, 0, 60, 60);
buttonRight.endFill();
buttonRight.addChild(new PIXI.Text(
    ' >',
    {
        fontFamily: 'arial',
        fontSize:   60,
        fill:       0
    }
));
buttonRight.on('pointerdown', () => OnScreenControls.setInputState('right', true));
buttonRight.on('pointerup', () => OnScreenControls.setInputState('right', false));
buttonRight.on('pointerupoutside', () => OnScreenControls.setInputState('right', false));

const buttonShoot       = new PIXI.Graphics();
buttonShoot.interactive = true;
buttonShoot.x           = (60 + 5) * 2;
buttonShoot.beginFill(0xaa0000, 0.5);
buttonShoot.drawRect(0, 0, 60, 60);
buttonShoot.endFill();
buttonShoot.addChild(new PIXI.Text(
    ' x',
    {
        fontFamily: 'arial',
        fontSize:   50,
        fill:       0
    }
));
buttonShoot.on('pointerdown', () => OnScreenControls.setInputState('shoot', true));
buttonShoot.on('pointerup', () => OnScreenControls.setInputState('shoot', false));
buttonShoot.on('pointerupoutside', () => OnScreenControls.setInputState('shoot', false));

buttons.addChild(
    buttonLeft,
    buttonRight,
    buttonShoot
);


function init() {
    if (getIsMobile()) {
        Graphics.addChildToHUD(buttons);
        onResize();
    }
}

function onResize() {
    if (getIsMobile()) {
        buttons.y = innerHeight - MARGIN_EDGE - buttons.height;
        buttons.x = innerWidth - MARGIN_EDGE - buttons.width;
    }
}

export default {
    init,
    onResize
}
