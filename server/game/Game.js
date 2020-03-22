const shortUUID = require('short-uuid');
const util = require('../common/util');

class Game {
    constructor(io) {
        this.io = io;

        this.uuid = shortUUID.generate();
        this.players = [];
        this.timeout = null;
        this.active = true;

        this.describerHistory = [];
        this.currentDescriber = {};

        this.numPlayersReadyForScoring = 0;

        this.prompt = "";

        this.setTimeout();
    }

    startGame() {
        let describerObj = this.players[util.randomInt(0, this.players.length)];
        this.describerHistory.push(describerObj);
        this.currentDescriber = describerObj.player;
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
        player.gameOwner = this.players.length == 0
        player.id = socket.id;
        this.players.push({
            socket,
            player
        });
    }

    removePlayer(socket) {
        this.players = this.players.filter(obj => { return obj.socket.id !== socket.id });
        this.players.forEach((obj, index) => { return obj.player.gameOwner = index == 0; }); // Change game owner to the next person 
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
        socket.on('game:getDescriber', response => {
            response(this.currentDescriber);
        })

        socket.on('game:getPrompt', response => {
            response(this.prompt);
        })

        socket.on('game:sendPrompt', request => {
            this.prompt = request.prompt;
            socket.in(this.uuid).emit('game:listenForPrompt', this.prompt);
        })

        socket.on('game:readyForScoring', () => {
            this.numPlayersReadyForScoring++;
            if (this.numPlayersReadyForScoring === this.players.length) 
                {
                    this.numPlayersReadyForScoring = 0;
                    this.io.in(this.uuid).emit('game:everyoneIsReadyForScoring');
                }
        })
    }
}

module.exports = Game;