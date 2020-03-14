import { SET_SOCKET } from '../actionTypes';

const initialState = {
    socket: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SOCKET: {
            const socket = action.payload;
            return {
                ...state,
                socket
            }
        }
        default:
            return state;
    }
}