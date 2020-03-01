import initialState from './initialState';
import { HomeState } from 'types/state';
import {
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer';

class Reducer extends ImmerReducer<HomeState> {
  public increment() {
    this.draftState.count++;
  }

  public decrement() {
    this.draftState.count--;
  }
}

export const HomeActions = createActionCreators(Reducer);
export default createReducerFunction(Reducer, initialState);
