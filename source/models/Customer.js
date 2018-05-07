import config from './Config';
import {
  send
} from '../actions'
export const data = {
  data: {
    "id": 0,
    "username": "",
  },
  fiter : {},
  loading:false,
  list: [],
  count: 0,
  size: 0,
  page : 1,
};
export default function action(state = data, action) {
  switch (action.type) {
    case 'fiter' :
      state.fiter = action.model;
      return Object.assign({}, state);
    case 'loading' :
      state.loading = true;
      return Object.assign({}, state);
    case 'list':
      state.list = action.model.res;
      state.count = action.model.count;
      state.size = action.model.size;
      state.page = action.model.page;
      state.loading = false;
      return Object.assign({}, state);
    case 'getModel':
      for (let i in state.data) state.data[i] = action.model[i];
      return Object.assign({}, state);
    case 'save':
      location.replace("#/customer");
      return state;
    default:
      return state
  }
}
