import { combineReducers } from 'redux'
import currentUser from './currentUser'
import thoughts from './thoughts'
import clusters from './clusters'

export default combineReducers({
  currentUser,
  thoughts,
  clusters
})
