import Graphics from './Graphics';
import GameScreen from './GameScreen';
import Assets from './assets';
import p2p from 'p2p.system';
import {StorageKeysP2P} from 'p2p.system/enums';
import ConnectToBrokerModal from './UI/ConnectToBrokerModal';
import LobbyModal from './UI/LobbyModal';

function startGame() {
    GameScreen.init();
    GameScreen.step();
    p2p.setOnDisconnectFromPeer(() => {
        const {other} = p2p.getPeerIds();
        GameScreen.stop();
        alert(`${other} has left the game. You will now return to the lobby.`);

        reconnectToBroker();
    });
}

function resetGraphicsAndLobby() {
    Graphics.destroy();
    ConnectToBrokerModal.destroy();
}

function showLobby() {
    resetGraphicsAndLobby();
    LobbyModal.create(startGame);
}

function reconnectToBroker() {
    p2p.connectToBroker()
        .then(showLobby)
        .catch(setupP2P);
}

function setupP2P() {
    resetGraphicsAndLobby();
    ConnectToBrokerModal.create({
        userId:    localStorage.getItem(StorageKeysP2P.UserId),
        whitelist: localStorage.getItem(StorageKeysP2P.Whitelist),
        onSuccess: showLobby
    });
}

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    p2p.setBrokerURL('https://peer-broker.herokuapp.com');
    p2p.setOnDisconnectFromBroker(reconnectToBroker);
    p2p.setOnConnectedToPeer(resetGraphicsAndLobby);

    Assets
        .load()
        .then(setupP2P);
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);
