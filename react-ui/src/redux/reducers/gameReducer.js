import { SET_GAMEUUID } from '../actionTypes';

const initialState = {
    gameUUID: ""
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
        default:
            return state;
    }
}