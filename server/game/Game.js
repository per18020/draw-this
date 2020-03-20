const shortUUID = require('short-uuid');
const util = require('../common/util');

class Game {
    constructor() {
        this.uuid = shortUUID.generate();
        this.players = [];
        this.timeout = null;
        this.active = true;

        this.setTimeout();
    }

    getUUID() {
        return this.uuid;
    }

    getPlayers() {
        // Remove sockets
        return this.players.map((obj) => {
            return obj.player;
        });
    }

    addPlayer(socket, player) {
        this.onActivity();
        this.initSocket(socket);
        this.players.push({
            socket,
            player
        });
    }

    removePlayer(socket) {
        this.players = this.players.filter(obj => { return obj.socket.id !== socket.id });
        this.active = !!this.players.length;
    }

    isActive() {
        return this.active;
    }

    onActivity() {
        if (!this.timeout) return this.setTimeout();
        clearTimeout(this.timeout);
        this.setTimeout(); 
    }

    setTimeout() {
        this.timeout = setTimeout(this.onTimeout.bind(this), util.minutesToMilliseconds(20));
    }

    onTimeout() {
        // emit gameTimedOut on sockets

        this.players.map(element => {
            element.socket.emit('gameTimedOut');
        });

        this.active = false;
    }

    initSocket(socket) {

    }
}

module.exports = Game;