const shortUUID = require('short-uuid');

class Game {
    constructor() {
        this.uuid = shortUUID.generate();
    }

    getUUID() {
        return this.uuid;
    }
}

module.exports = Game;