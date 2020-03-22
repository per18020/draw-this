import { 
    SET_CURRENT_CANVAS_DATA,
    SET_SOCKET, 
    SET_GAMEUUID, 
    SET_PLAYERS,
    SET_PLAYER,
    SET_DESCRIBER } from './actionTypes';

// App Reducer
export const setSocket = socket => ({
    type: SET_SOCKET,
    payload: socket
});

export const setCurrentCanvasData = data => ({
    type: SET_CURRENT_CANVAS_DATA,
    payload: data
});

// Game Reducer
export const setGameUUID = gameUUID => ({
    type: SET_GAMEUUID,
    payload: gameUUID
});

export const setPlayers = players => ({
    type: SET_PLAYERS,
    payload: players
})

export const setPlayer = player => ({
    type: SET_PLAYER,
    payload: player
});

export const setDescriber = describer => ({
    type: SET_DESCRIBER,
    payload: describer
})