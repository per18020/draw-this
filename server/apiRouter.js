const express = require('express');
const router = express.Router();

const createGameController = require('./api/CreateGameController');

router.get('/testing', (req, res) => {
    res.send("Hello World!");
});

router.get('/createGame', createGameController);

// get /joinGame

module.exports = router;