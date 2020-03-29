class SocketAPI {
    constructor(server) {
        this.io = require('socket.io')(server);
        this.gm = require('./game/GameManager').getInstance(this.io);

        require('./api/fineArtAPI').getInstance(); // Start up fineArtAPI

        this.io.on('connection', socket => {

            socket.on('createGame', response => {
                let game = this.gm.createGame();
                response(game.getUUID());
            });

            socket.on('joinGame', (request, response) => {
                let successful = this.gm.addPlayerToGame(request.gameUUID, socket, request.player);
                if (successful) {
                    socket.join(request.gameUUID);
                    socket.in(request.gameUUID).emit('playerJoined', this.getPlayers(request.gameUUID));
                    response(true);
                }
                response(false);
            });

            socket.on('startGame', () => {
                let gameUUID = this.gm.lookupGameUUID(socket);
                this.io.in(gameUUID).emit('gameStarted');
            });

            socket.on('gameExists', (request, response) => {
                let game = this.gm.getGame(request.gameUUID);
                response(game ? game.getUUID() : game); // return null if game does not exist, non null if game exists
            });

            socket.on('getPlayers', (request, response) => {
                response(this.getPlayers(request.gameUUID));
            })

            socket.on('disconnect', () => {
                let gameUUID = this.gm.lookupGameUUID(socket);
                if (!gameUUID) return;
                this.gm.removePlayerFromGame(socket);
                socket.in(gameUUID).emit('playerLeft', this.getPlayers(gameUUID));
            })
        });
    }

    getPlayers(gameUUID) {
        let game = this.gm.getGame(gameUUID);
        if (!game) return;
        return game.getPlayers();
    }
}

module.exports = SocketAPI;