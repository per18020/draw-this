import { SET_GAMEUUID, SET_PLAYERS } from '../actionTypes';

const initialState = {
    gameUUID: "",
    players: [],
    settings: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_GAMEUUID: {
            const gameUUID = action.payload;
            return {
                ...state,
                gameUUID
            }
        }
        case SET_PLAYERS: {
            const players = action.payload;
            return {
                ...state,
                players
            }
        }
        default:
            return state;
    }
}