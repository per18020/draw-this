const Game = require('./Game');

let instance = null;

class GameManager {
    constructor() {
        this.games = [];
        this.socketGameMap = {};

        // Store socket id's related to gameUUIDs
        // Look up gameUUID based on id's
        // Disconnect player from game using map
        // Also refactor rest of the code to not need to send or recieve gameUUID
    }
 
    createGame() {
        let game = new Game();
        this.games.push(game);

        return game;
    }

    addPlayerToGame(gameUUID, socket, player) {
        let game = this.getGame(gameUUID);
        if (!game) return;
        game.addPlayer(socket, player);
    }

    removePlayerFromGame(gameUUID, socket) {
        let game = this.getGame(gameUUID);
        if (!game) return;
        game.removePlayer(socket);
    }

    getGame(gameUUID) {
        return this.games.find((game) => { return game.getUUID() === gameUUID });
    }

    static getInstance() {
        if (!instance) instance = new GameManager();
        return instance;
    }
}

module.exports = GameManager;