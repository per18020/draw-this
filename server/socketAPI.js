const gm = require('./game/GameManager').getInstance();

class SocketAPI {
    constructor(server) {
        this.io = require('socket.io')(server);

        this.io.on('connection', socket => {

            socket.on('createGame', (fn) => {
                let game = gm.createGame();
                socket.join(game.getUUID())
                fn(game.getUUID());
            });

            socket.on('joinGame', room => {
                socket.join(room);
            });
        });
    }
}

module.exports = SocketAPI;