const gm = require('./game/GameManager').getInstance();

class SocketAPI {
    constructor(server) {
        this.io = require('socket.io')(server);

        this.io.on('connection', socket => {

            socket.on('createGame', response => {
                let game = gm.createGame();
                console.log("Made game " + game.getUUID());
                response(game.getUUID());
            });

            socket.on('joinGame', (request, response) => {
                gm.addPlayerToGame(request.gameUUID, socket, request.player);
                socket.join(request.gameUUID);
                socket.in(request.gameUUID).emit('playerJoined', this.getPlayers(request.gameUUID));
                console.log("Player joined game " + request.gameUUID);
                response();
            });

            socket.on('gameExists', (request, response) => {
                let game = gm.getGame(request.gameUUID);
                // There's probably a better way to do this
                if (game) { 
                    console.log("Game exists");
                    response(true);
                } else {
                    console.log("Game doesn't exists");
                    response(false);
                }
            });

            socket.on('getPlayers', (request, response) => {
                response(this.getPlayers(request.gameUUID));
            })
        });
    }

    getPlayers(gameUUID) {
        let game = gm.getGame(gameUUID);
        return game.getPlayers();
    }
}

module.exports = SocketAPI;