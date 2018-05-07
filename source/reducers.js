import { combineReducers } from 'redux'

import user from './models/User';
import customer from './models/Customer';
import tree from './models/Tree';

const rootReducer = combineReducers({
  user,
  customer,
  tree,
})

export default rootReducer
