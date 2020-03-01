import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from 'modules/home/dux';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    home,
  } as any);
}
