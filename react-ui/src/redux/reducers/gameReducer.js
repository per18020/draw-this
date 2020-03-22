import { SET_GAMEUUID, SET_PLAYERS, SET_PLAYER, SET_DESCRIBER } from '../actionTypes';

const initialState = {
    gameUUID: "",
    players: [],
    player: {},
    describer: {},
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
        case SET_DESCRIBER: {
            const describer = action.payload;
            return {
                ...state,
                describer
            }
        }
        default:
            return state;
    }
}