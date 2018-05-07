import config from './Config';
import {
  send
} from '../actions'

export const data = {
  collapsed: false,
  action : '',
  data: [{
    icon: 'setting',
    name: '系统',
    link: '/',
    child: [{
      icon: 'user',
      name: '用户',
      link: '/customer'
    },{
      icon: 'user',
      name: '编辑用户',
      link: '/customer/new'
    }]
  }]
};

/**
 * 返回结果到达 mapStateToProps -> state
 * @date   2018-04-08
 * action 指的是actions.js
 */
export default function action(state = data, action) {
  switch (action.type) {
    case 'actionName' :
      state.action = action.model.name;
      return Object.assign({}, state);
    default:
      return state
  }
}
