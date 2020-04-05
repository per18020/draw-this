const shortUUID = require('short-uuid');
const util = require('../common/util');

const fineArtAPI = require('../api/fineArtAPI').getInstance();

class Game {
    constructor(io) {
        this.io = io;
        this.uuid = shortUUID.generate();

        this.players = [];
        this.describerHistory = [];
        this.rounds = [];
        this.timeout = null;
        this.active = true;

        this.setTimeout();
    }

    getUUID() {
        return this.uuid;
    }

    isActive() {
        return this.active;
    }

    getPlayers() {
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
        this.players.forEach((obj, index) => { return obj.player.gameOwner = index == 0; }); // Change game owner to the next player in line
        this.active = !!this.players.length;
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
        this.players.map(element => {
            element.socket.emit('gameTimedOut');
        });
        this.active = false;
    }

    isGameFinished() {
        const currentRound = this.getCurrentRound();
        return (this.describerHistory.length >= this.players.length) && currentRound.finished;
    }

    // ROUNDS

    createRound() {
        this.rounds.push({
            prompt: "",
            describer: {},
            image: "",
            playersReadyForRound: 0,
            playersReadyForScoring: 0,
            playersReadyForNextRound: 0,
            finished: false,
            drawings: [],
            scores: []
        });
        console.log("ROUNDS")
        console.log(this.rounds);
        console.log("ROUND")
        console.log(this.getCurrentRound());
    }

    startRound(callback) {
        this.setDescriber(this.chooseNewDescriber());
        fineArtAPI.getRandomImage(imageURL => {
            this.setImage(imageURL);
            callback();
        });
    }

    chooseNewDescriber() {
        let difference = this.players.filter(obj1 => !this.describerHistory.some(obj2 => obj1.player.id === obj2.player.id));
        let describerObj = difference[util.randomInt(0, difference.length)];
        this.describerHistory.push(describerObj);
        return describerObj.player;
    }

    setCurrentRound(round) {
        this.rounds.pop();
        this.rounds.push(round);
        return this.getCurrentRound();
    }

    getCurrentRound() {
        return this.rounds[this.rounds.length - 1];
    }

    isCurrentRoundFinished() {
        const currentRound = this.getCurrentRound();
        if (currentRound) {
            return currentRound.finished;
        } else {
            return true;
        }
    }

    setRoundFinished() {
        const currentRound = this.getCurrentRound();
        currentRound.finished = true;
        this.setCurrentRound(currentRound);
    }

    setImage(image) {
        let currentRound = this.getCurrentRound();
        currentRound.image = image;
        return this.setCurrentRound(currentRound);
    }

    setDescriber(describer) {
        let currentRound = this.getCurrentRound();
        currentRound.describer = describer;
        return this.setCurrentRound(currentRound);
    }

    setPrompt(prompt) {
        let currentRound = this.getCurrentRound();
        currentRound.prompt = prompt;
        return this.setCurrentRound(currentRound);
    }

    setDrawing(playerID, data) {
        let currentRound = this.getCurrentRound();
        currentRound.drawings.push({ playerID, data });
        return this.setCurrentRound(currentRound);
    }

    setScore(playerID) {
        let currentRound = this.getCurrentRound();
        let index = currentRound.scores.findIndex(obj => obj.playerID === playerID);
        if (index >= 0) {
            currentRound.scores[index].score++;
        } else {
            currentRound.scores.push({ playerID, score: 1 });
        }
        return this.setCurrentRound(currentRound);
    }

    incrementPlayersReadyForRound() {
        let currentRound = this.getCurrentRound();
        currentRound.playersReadyForRound++;
        return this.setCurrentRound(currentRound);
    }

    incrementPlayersReadyForScoring() {
        let currentRound = this.getCurrentRound();
        currentRound.playersReadyForScoring++;
        return this.setCurrentRound(currentRound);
    }

    incrementPlayersReadyForNextRound() {
        let currentRound = this.getCurrentRound();
        currentRound.playersReadyForNextRound++;
        return this.setCurrentRound(currentRound);
    }

    isReadyForRound() {
        let currentRound = this.getCurrentRound();
        return currentRound.playersReadyForRound >= this.players.length;
    }

    isReadyForScoring() {
        let currentRound = this.getCurrentRound();
        return currentRound.playersReadyForScoring >= this.players.length;
    }

    isReadyForNextRound() {
        let currentRound = this.getCurrentRound();
        return currentRound.playersReadyForNextRound >= this.players.length - 1; // Minus one because describer (who doesn't draw a picture) votes
    }

    // GAME API

    initSocket(socket) {

        // GAME : Client -> Server

        socket.on('game:isFinished', response => {
            response(this.isGameFinished());
        });

        socket.on('game:getFinalScores', response => {
            const rounds = this.rounds;
            let tempScores = [];
            let finalScores = [];
            let roundScores = [];
            // Consolidates all the scores from different rounds into a single array
            for (let i = 0; i < rounds.length; i++) {
                const scores = rounds[i].scores;
                roundScores.push(scores);
                for (let j = 0; j < scores.length; j++) {
                    const scoreObj = scores[j];
                    const index = tempScores.findIndex(obj => obj.playerID === scoreObj.playerID);
                    if (index <= -1) {
                        tempScores.push(scoreObj);
                    } else {
                        tempScores[index].score += scoreObj.score;
                    }
                }
            }
            // Ranking
            tempScores.sort((a, b) => b.score - a.score);
            let place = 1;
            for (let i = 0; i < tempScores.length; i++) {
                let scoreObj = tempScores[i];
                let nextScoreObj = tempScores[i + 1];
                finalScores.push({
                    playerID: scoreObj.playerID,
                    score: scoreObj.score,
                    place
                });
                if (nextScoreObj) {
                    if (scoreObj.score !== nextScoreObj.score) place++;
                }
            }
            response({ finalScores, roundScores });
        });

        socket.on('game:stop', () => {

        });

        // ROUND : Server -> Client (These are scattered through the Client -> Server code)

        // this.io.in(this.uuid).emit('game:round:listenForStarted', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForFinished', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForPrompt', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForGoToScoring', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForGoToNextRound', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForGoToGame', currentRound);
        // this.io.in(this.uuid).emit('game:round:listenForScore', currentRound);

        // ROUND : Client -> Server

        socket.on('game:round:create', () => {
            this.onActivity();
            if (!this.getCurrentRound()) return this.createRound();
            if (this.getCurrentRound().finished) this.createRound();
        });

        socket.on('game:round:ready', () => {
            this.onActivity();
            this.incrementPlayersReadyForRound();
            if (this.isReadyForRound()) {
                this.startRound(() => {
                    this.io.in(this.uuid).emit('game:round:listenForStarted', this.getCurrentRound());
                });
            }
        });

        socket.on('game:round:stop', () => {
            this.onActivity();
            this.setRoundFinished();
            this.io.in(this.uuid).emit('game:round:listenForGoToGame', this.getCurrentRound());
        })

        socket.on('game:round:get', response => {
            this.onActivity();
            response(this.getCurrentRound());
        });

        socket.on('game:round:sendPrompt', (request, response) => {
            this.onActivity();
            this.setPrompt(request.prompt);
            this.incrementPlayersReadyForScoring();
            this.io.in(this.uuid).emit('game:round:listenForPrompt', this.getCurrentRound());
            response(this.getCurrentRound());
        });

        socket.on('game:round:sendDrawing', (request, response) => {
            this.onActivity();
            this.setDrawing(socket.id, request);
            this.incrementPlayersReadyForScoring();
            // If all players have sent in their drawings. Go to scoring
            if (this.isReadyForScoring()) {
                this.io.in(this.uuid).emit('game:round:listenForGoToScoring', this.getCurrentRound());
            }
            response(this.getCurrentRound());
        });

        socket.on('game:round:sendScore', (request, response) => {
            this.onActivity();
            this.setScore(request.playerID);
            this.incrementPlayersReadyForNextRound();
            socket.in(this.uuid).emit('game:round:listenForScore', this.getCurrentRound());
            if (this.isReadyForNextRound()) {
                this.setRoundFinished();
                this.io.in(this.uuid).emit('game:round:listenForGoToGame', this.getCurrentRound());
            }
            response(this.getCurrentRound());
        });
    }
}

module.exports = Game;