import applyStyle from './applyStyle';
import p2p, {StorageKeysP2P} from '../Network/p2p';

let modal: any;

const elements: any = {
    connectToBrokerButton: null,
    connectionStatus:      null
};
let _onSuccess;

const buttonStyle = 'font-size:1em; float:right';

function onClickConnectToBroker() {
    elements.connectToBrokerButton.style.display = 'none';
    elements.connectionStatus.innerHTML          = 'Connecting...';

    p2p.connectToBroker()
        .then(_onSuccess)
        .catch(e => {
            elements.connectionStatus.innerHTML          = `Connection failed! Please retry.`;
            elements.connectToBrokerButton.style.display = 'initial';
        });
}

function setModalConnectionSetup(userId, whitelist) {
    modal.innerHTML = `
<b>Artillery P2P Connection Setup</b><hr/>
User id: <button id="setUserId" style="${buttonStyle}">${userId || 'Click here to set your user id'}</button><br><br>
Who can see / connect to me: <button id="setWhitelist" style="${buttonStyle}">${whitelist || 'Click here to set list of peers allowed to connect to you'}</button>
<hr>
<div style="text-align: center; margin-top:1em">
    <button id="connectToBroker" style="font-size:1.5em">Connect to lobby</button>
    <div id="connectionStatus" style="font-size:1.5em"></div>
</div>
`;

    (modal.querySelector('#setUserId') as any).onclick = () => {
        p2p.setPeerId();
        setModalConnectionSetup(
            localStorage.getItem(StorageKeysP2P.UserId),
            localStorage.getItem(StorageKeysP2P.Whitelist)
        );
    };

    (modal.querySelector('#setWhitelist') as any).onclick = () => {
        p2p.setPeerWhitelist();
        setModalConnectionSetup(
            localStorage.getItem(StorageKeysP2P.UserId),
            localStorage.getItem(StorageKeysP2P.Whitelist)
        );
    };

    elements.connectToBrokerButton = modal.querySelector('#connectToBroker');
    elements.connectionStatus      = modal.querySelector('#connectionStatus');

    elements.connectToBrokerButton.onclick = onClickConnectToBroker;
}

function create({userId, whitelist, onSuccess}) {
    _onSuccess = onSuccess;

    modal = document.createElement('div');
    applyStyle.modal(modal);
    setModalConnectionSetup(userId, whitelist);
    document.body.appendChild(modal);

    return modal;
}

function destroy() {
    if (modal && modal.parentElement) {
        modal.parentElement.removeChild(modal);
        modal = null;
    }
}

export default {
    create,
    destroy
}