import { combineReducers } from 'redux'

import user from './models/User';
import customer from './models/Customer';
import tableList from './models/TableList';
import tree from './models/Tree';

const rootReducer = combineReducers({
  user,
  customer,
  tableList,
  tree,
})

export default rootReducer
