import { SET_GAMEUUID, SET_PLAYERS, SET_PLAYER, SET_ROUND } from '../actionTypes';

const initialState = {
    gameUUID: "",
    players: [],
    player: {},
    round: {},
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
        case SET_PLAYER: {
            const player = action.payload;
            return {
                ...state,
                player
            }
        }
        case SET_ROUND: {
            const round = action.payload;
            return {
                ...state,
                round
            }
        }
        default:
            return state;
    }
}