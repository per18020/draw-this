const Game = require('./Game');

let instance = null;

class GameManager {
    constructor() {
        this.games = [];
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

    getGame(gameUUID) {
        return this.games.find((game) => { return game.getUUID() === gameUUID });
    }

    static getInstance() {
        if (!instance) instance = new GameManager();
        return instance;
    }
}

module.exports = GameManager;