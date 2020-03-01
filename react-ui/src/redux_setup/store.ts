import createRootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

// middleware
// ----------------------------------------------------------------------------
export const history = createBrowserHistory();

const middleware: any = [routerMiddleware(history), thunk];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: () => true,
  });
  middleware.push(logger);
}

// store
// ----------------------------------------------------------------------------
const configureStore = () => {
  const rootReducer = createRootReducer(history);
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  if (process.env.NODE_ENV !== 'production') {
    if ((module as any).hot) {
      (module as any).hot.accept('./rootReducer', () => {
        // @ts-ignore
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
