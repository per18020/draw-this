const Game = require('./Game');

let instance = null;

class GameManager {
    constructor() {
        this.games = [];
        this.socketGameMap = new Map();

        setInterval(this.cleanupStagnantGames.bind(this), 1000);
    }

    cleanupStagnantGames() {
        this.games = this.games.filter(game => {
            return game.isActive();
        })
    }
 
    createGame() {
        let game = new Game();
        this.games.push(game);

        return game;
    }

    addPlayerToGame(gameUUID, socket, player) {
        this.socketGameMap.set(socket.id, gameUUID);
        let game = this.getGame(gameUUID);
        if (game) {
            game.addPlayer(socket, player);
            return true;
        }
        return false;        
    }

    removePlayerFromGame(socket) {
        let gameUUID = this.lookupGameUUID(socket);
        let game = this.getGame(gameUUID);
        if (!game) return;
        game.removePlayer(socket);
        this.socketGameMap.delete(socket.id);
    }

    getGame(gameUUID) {
        return this.games.find((game) => { return game.getUUID() === gameUUID });
    }

    lookupGameUUID(socket) {
        return this.socketGameMap.get(socket.id);
    }

    static getInstance() {
        if (!instance) instance = new GameManager();
        return instance;
    }
}

module.exports = GameManager;