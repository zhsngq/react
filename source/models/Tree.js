import config from './Config';
import {
  send
} from '../actions'

export const data = {
  collapsed: false,
  action : '',
  openkey : [],
  map:{},
  data: [{
    icon: 'setting',
    name: '系统',
    link: '/',
    child: [{
      icon: 'user',
      name: '用户',
      link: '/customer'
    }]
  },{
    icon: 'setting',
    name: '编辑',
    link: '/',
    child: [{
      icon: 'user',
      name: '用户',
      link: '/customeredit'
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
    case 'openAction' :
      for(let i in state.openkey){
        if (state.openkey[i] == action.model.openkey){
          if (!action.model['mex']) {
            state.openkey.splice(i,1);
          }
          return Object.assign({}, state);
        }
      }
      state.openkey.push(action.model.openkey);
      return Object.assign({}, state);
    default:
      return state
  }
}
