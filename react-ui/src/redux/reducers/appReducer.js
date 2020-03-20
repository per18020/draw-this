import { SET_SOCKET, SET_CURRENT_CANVAS_DATA } from '../actionTypes';

const initialState = {
    socket: null,
    currentCanvasData: null
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
        case SET_CURRENT_CANVAS_DATA: {
            const currentCanvasData = action.payload;
            return {
                ...state,
                currentCanvasData
            }
        }
        default:
            return state;
    }
}