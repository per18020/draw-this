const GameManager = require('../game/GameManager');

function controller(request, response) {
    let gm = GameManager.getInstance();
    let game = gm.createGame();
    response.json({
        UUID: game.getUUID()
    });
}

module.exports = controller;