import Graphics from './Graphics';
import GameScreen from './GameScreen';
import Assets from './assets';
import p2p, {StorageKeysP2P} from './Network/p2p';
import ConnectToBrokerModal from './UI/ConnectToBrokerModal';
import LobbyModal from './UI/LobbyModal';

function startGame() {
    GameScreen.init();
    GameScreen.step();

    p2p.setOnDisconnectFromPeer(() => {
        const {other} = p2p.getPeerIds();
        GameScreen.stop();
        alert(`${other} has left the game. You will now return to the lobby.`);

        p2p.connectToBroker()
            .then(showLobby)
            .catch(setupP2P);
    });
}

function showLobby() {
    Graphics.destroy();
    ConnectToBrokerModal.destroy();
    LobbyModal.create(startGame);
}

function setupP2P() {
    Graphics.destroy();
    LobbyModal.destroy();
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
