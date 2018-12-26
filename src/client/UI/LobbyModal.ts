import applyStyle from './applyStyle';
import p2p from '../Network/p2p';

let modal: HTMLDivElement | null;

const elements: any = {
    select:           null,
    connectToPeer:    null,
    chatText:         null,
    chatInput:        null,
    chatForm:         null,
    refreshIndicator: null
};

let _onSuccess;

const selectStyle   = 'font-size:0.75em; width:100%; height:13em';
const chatFormStyle = 'font-size:0.75em;';
let pollingIntervalLobby;
const POLLING_TIME  = 2000;

function setPeersList(peers) {
    const {self} = p2p.getPeerIds();

    // Add options that don't exist in list
    peers.forEach(p => {
        if (!elements.select.querySelector(`[value="${p}"]`)) {
            const option     = document.createElement('option');
            option.value     = p;
            option.innerHTML = p === self ? `${p} (YOU)` : p;
            elements.select.appendChild(option);
        }
    });

    // Remove options from list that are no longer available
    Array.from(elements.select.children).forEach((el: any) => {
        if (peers.indexOf(el.value) === -1) {
            elements.select.removeChild(el);
        }
    })
}

function refreshPeersList() {
    elements.refreshIndicator.style.opacity = 1;
    sendAndRefreshChat();

    p2p.getActivePeers()
        .then(setPeersList)
        .then(() => elements.refreshIndicator.style.opacity = 0);
}

function sendAndRefreshChat(message: string = '') {
    p2p.postLobbyChat(message)
        .then(textLines => {
            elements.chatText.value = textLines.join('\n');
            elements.chatText.scrollTo(0, Infinity);
        });
}

function create(onSuccess) {
    modal = document.createElement('div');
    applyStyle.modal(modal);

    modal.innerHTML = `
<b>Artillery Lobby</b> <span id="refreshIndicator">...</span><hr/>
<table width="100%">
    <tr>
        <td width="60%">
        Chat
            <textarea style="width:100%;${chatFormStyle}" id="chatText" rows="10"></textarea>
            <form id="chatForm" autocomplete="off">
                <input id="chatInput" type="text" id="chatInput" autocomplete="off" placeholder="Type a message to the lobby..." style="${chatFormStyle}width:80%;float:left"/>
                <input id="chatSend" type="submit" id="chatSend" value="Send" style="${chatFormStyle}width:20%;float:left"/>
            </form>
        </td>
        <td width="40%">
        Peers
        <select id="peers" style="${selectStyle}" multiple></select>
        <div style="text-align: center;">
            <button id="connectToPeer" style="font-size:0.75em">Connect to selected player</button>
        </div>
        </td>
    </tr>
</table>
`;

    elements.chatText         = modal.querySelector('#chatText') as any;
    elements.chatForm         = modal.querySelector('#chatForm') as any;
    elements.chatInput        = modal.querySelector('#chatInput') as any;
    elements.select           = modal.querySelector('#peers') as any;
    elements.connectToPeer    = modal.querySelector('#connectToPeer') as any;
    elements.refreshIndicator = modal.querySelector('#refreshIndicator') as any;

    elements.refreshIndicator.style.opacity = 0;

    elements.connectToPeer.onclick = () => p2p.connectToPeer(elements.select.value).then(destroy);
    elements.chatForm.onsubmit     = (e) => {
        e.preventDefault();
        e.stopPropagation();

        sendAndRefreshChat(elements.chatInput.value);
        elements.chatInput.value = '';
    };

    document.body.appendChild(modal);

    pollingIntervalLobby = setInterval(refreshPeersList, POLLING_TIME);

    _onSuccess = onSuccess;

    return modal;
}

function destroy() {
    if (modal && modal.parentElement) {
        modal.parentElement.removeChild(modal);
        modal = null;
    }

    if (_onSuccess) {
        _onSuccess();
    }

    clearInterval(pollingIntervalLobby);
}

export default {
    create,
    destroy
}