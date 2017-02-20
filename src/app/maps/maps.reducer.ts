import { ActionReducer, Action } from '@ngrx/store';

interface Maps {
  maps: Array<Object>,
  count: number,
  loading: Boolean
}

const mapsReducer: ActionReducer<Maps> = (
  state: Maps = {
    maps   : [{id: 1, name: 'test'}],
    count  : 0,
    loading: false
  }, action: Action) => {
  return state;
};

export default mapsReducer;
