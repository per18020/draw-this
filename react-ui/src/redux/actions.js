import { SET_SOCKET, SET_GAMEUUID } from './actionTypes';

// App Reducer
export const setSocket = socket => ({
    type: SET_SOCKET,
    payload: socket
});

// Game Reducer
export const setGameUUID = gameUUID => ({
    type: SET_GAMEUUID,
    payload: gameUUID
});