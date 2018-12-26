import GameScreen from './GameScreen';
import Assets from './assets';
import {StorageKeysP2P} from './Network/p2p';
import ConnectToBrokerModal from './UI/ConnectToBrokerModal';
import LobbyModal from './UI/LobbyModal';

function startGame() {
    GameScreen.init();
    GameScreen.start();
}

function showLobby(peers) {
    ConnectToBrokerModal.destroy();
    LobbyModal.create({peers, onSuccess: startGame});
}

function setupP2P() {
    ConnectToBrokerModal.create({
        userId:    localStorage.getItem(StorageKeysP2P.UserId),
        whitelist: localStorage.getItem(StorageKeysP2P.Whitelist),
        onSuccess: showLobby
    });
}

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    Assets
        .load()
        .then(setupP2P);
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);
