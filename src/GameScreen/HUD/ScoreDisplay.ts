import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import p2p from 'p2p.system';
import Score from '../../Score';

const MARGIN_EDGE = 12;

const display = new PIXI.Graphics();
display.x     = MARGIN_EDGE;
display.y     = MARGIN_EDGE + 14 * 3 + 3 * MARGIN_EDGE;

const playerIds = new PIXI.Text(
    'playerId vs playerId',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0x00aa00,
        align:      'left'
    }
);
playerIds.x     = 0;
playerIds.y     = 0;

const score = new PIXI.Text(
    '0 - 0',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0x00ff00,
        align:      'left'
    }
);
score.x     = 0;
score.y     = 14;

display.addChild(
    playerIds,
    score
);

function update() {
    const {self, other} = Score.getScore();
    score.text          = `${self} - ${other}`;
}

function init() {
    const {other} = p2p.getPeerIds();

    playerIds.text = `YOU vs ${other}`;
    Graphics.addChildToHUD(display);
}

export default {
    init,
    update
}
