import config from './Config';
import {
  send
} from '../actions'

export const data = {
  token: '',
  name : ''
};

/**
 * 返回结果到达 mapStateToProps -> state
 * @date   2018-04-08
 * action 指的是actions.js
 */
export default function action(state = data, action) {
  switch (action.type) {
    case 'user_list' :
      return state;
    case 'login' :
      state.token = action.model.token;
      location.replace("#/table");
      return Object.assign({}, state);
    default :
      return state
  }
}
