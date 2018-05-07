import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger()

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware( thunkMiddleware,loggerMiddleware )
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
