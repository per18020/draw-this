import { SET_GAMEUUID, SET_PLAYERS, SET_PLAYER } from '../actionTypes';

const initialState = {
    gameUUID: "",
    players: [],
    player: {},
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
        default:
            return state;
    }
}