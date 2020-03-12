const Game = require('./Game');

let instance = null;

class GameManager {
    constructor() {
        this.games = [];
    }
 
    createGame() {
        let game = new Game();
        this.games.push(game);
        console.log(game.getUUID());

        return game;
    }

    static getInstance() {
        if (!instance) instance = new GameManager();
        return instance;
    }
}

module.exports = GameManager;