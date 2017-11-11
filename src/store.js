import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'
export * from './actions'

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, loggerMiddleware)))
