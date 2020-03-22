function minutesToMilliseconds(minutes) {
    return minutes * 60000;
}

function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}

function randomInt(min, max) { 
    return Math.floor(Math.random() * (max - min)) 
}

module.exports = { minutesToMilliseconds, secondsToMilliseconds, randomInt }