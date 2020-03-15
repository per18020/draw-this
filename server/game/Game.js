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
        let players = this.players.map((obj) => {
            return obj.player;
        });
        return players;
    }

    addPlayer(socket, player) {
        this.initSocket(socket);
        this.players.push({
            socket,
            player
        });
    }

    initSocket(socket) {
        
    }
}

module.exports = Game;