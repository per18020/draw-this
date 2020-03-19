const shortUUID = require('short-uuid');

class Game {
    constructor() {
        this.uuid = shortUUID.generate();
        this.players = [];
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
        this.initSocket(socket);
        this.players.push({
            socket,
            player
        });
    }

    removePlayer(socket) {
        this.players = this.players.filter(obj => { return obj.socket.id !== socket.id });
    }

    initSocket(socket) {

    }
}

module.exports = Game;