function minutesToMilliseconds(minutes) {
    return minutes * 60000;
}

function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}

module.exports = { minutesToMilliseconds, secondsToMilliseconds }