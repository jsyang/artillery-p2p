import Peer from 'peerjs';
import LobbyModal from '../UI/LobbyModal';
import {getQuerystringParams} from '../urlHelpers';

const {brokerURL} = getQuerystringParams();

const BROKER_PROTOCOL = brokerURL ? brokerURL.split('//')[0] + '//' : 'https://';
const BROKER_HOSTNAME = brokerURL ? brokerURL.split('//')[1] : 'peer-broker.herokuapp.com';

const ANYONE = '*';

const connections: any = {
    broker: null,
    peer:   null // peer.peer contains the peer you have connected to
};

export enum StorageKeysP2P {
    Whitelist = 'p2p-whitelist',
    UserId    = 'p2p-userId'
}

let onDisconnectFromPeer: Function = d => console.log(d);

function setOnDisconnectFromPeer(onDisconnect) {
    onDisconnectFromPeer = onDisconnect;
}

let onDataFromPeer: Function = d => console.log(d);

function setOnDataFromPeer(onData: Function) {
    onDataFromPeer = onData;
}

// Peer sent data to you
function onData(data) {
    onDataFromPeer(data);
}

let lastConnectedPeer;

// Peer attempts to connect to you
function onOpen() {
    const {peer} = connections.peer;

    // Ignore all non-whitelisted connections
    if (peerWhitelist.includes(ANYONE) || peerWhitelist.includes(peer)) {
        // Kill the connection to the broker as soon as our peer connection is opened
        connections.broker.disconnect();
        LobbyModal.destroy();
        lastConnectedPeer = peer;
    }
}

let peerId             = localStorage.getItem(StorageKeysP2P.UserId) || Date.now().toString(16);
let peerWhitelist: any = localStorage.getItem(StorageKeysP2P.Whitelist) || '*';
if (peerWhitelist && peerWhitelist.length) {
    peerWhitelist = peerWhitelist.split(',');
}

function setPeerId() {
    peerId = prompt(
        'Set peer id:',
        localStorage.getItem(StorageKeysP2P.UserId) || Date.now().toString(16)
    ) || Date.now().toString(16);
    localStorage.setItem(StorageKeysP2P.UserId, peerId);
}

function setPeerWhitelist() {
    peerWhitelist = (prompt('Whitelist of peers allowed to connect to you (comma-separated, use * for anyone)',
        localStorage.getItem(StorageKeysP2P.Whitelist) || '*'
    ) || '').split(',');

    localStorage.setItem(StorageKeysP2P.Whitelist, peerWhitelist.join(','));
}

const bindPeerConnectionEvents = potentialConnection => {
    potentialConnection.on('data', onData);
    potentialConnection.on('close', () => {
        connections.peer = null;
        onDisconnectFromPeer();
    });
};

const connectToPeer = toPeerId => {
    if (toPeerId === peerId) {
        return Promise.reject('Cannot connect to yourself!');
    }

    return new Promise((resolve, reject) => {
        if (toPeerId) {
            const potentialPeerConnection = connections.broker.connect(toPeerId);
            potentialPeerConnection.on('open', () => {
                lastConnectedPeer = toPeerId;
                connections.peer  = potentialPeerConnection;
                // Kill the connection to the broker as soon as our peer connection is opened
                connections.broker.disconnect();
                resolve(connections);
            });
            bindPeerConnectionEvents(potentialPeerConnection);
        } else {
            reject(new Error('No peer id given for connection attempt!'));
        }
    });

};

const sendToPeer = data => {
    if (connections.peer) {
        connections.peer.send(data);
    } else {
        console.log('Not connected to a peer!');
    }
};

function getActivePeers() {
    return fetch(`${BROKER_PROTOCOL}${BROKER_HOSTNAME}/peers`, {
        method:  'post',
        body:    JSON.stringify({id: peerId}),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json());
}

function postLobbyChat(message) {
    return fetch(`${BROKER_PROTOCOL}${BROKER_HOSTNAME}/lobby`, {
        method:  'post',
        body:    JSON.stringify({id: peerId, message}),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json());
}

// Establish connection to peer broker
function connectToBroker() {
    connections.broker = new Peer(peerId, {
        host:   BROKER_HOSTNAME,
        port:   /https/g.test(BROKER_PROTOCOL) ? 443 : 80,
        path:   '/',
        secure: /https/g.test(BROKER_PROTOCOL)
    });


    return new Promise((resolve, reject) => {
        const timeoutFetch = setTimeout(reject, 5000);

        connections.broker.on('open', id => {
            console.log(`Connection to broker successful! Your id is ${id}`);

            fetch(`${BROKER_PROTOCOL}${BROKER_HOSTNAME}/whitelist`,
                {
                    method:  'post',
                    body:    JSON.stringify({id: peerId, peerWhitelist}),
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then(() => clearTimeout(timeoutFetch))
                .then(getActivePeers)
                .then(resolve)
                .catch(reject);
        });

        connections.broker.on('connection', connectionPeer => {
            connections.peer = connectionPeer;
            connectionPeer.on('open', onOpen);
            bindPeerConnectionEvents(connectionPeer);
        });

    });
}

function getPeerIds() {
    return {
        self:  peerId,
        other: connections.peer && connections.peer.peer || lastConnectedPeer
    };
}

export default {
    getPeerIds,
    getActivePeers,
    connectToBroker,
    connectToPeer,
    sendToPeer,
    setOnDataFromPeer,
    setOnDisconnectFromPeer,
    setPeerId,
    setPeerWhitelist,
    postLobbyChat
};
