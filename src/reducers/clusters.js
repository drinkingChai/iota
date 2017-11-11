import { GET_CLUSTERS, RESET_APP } from '../actions'

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLUSTERS:
      return action.clusters
    case RESET_APP:
      return initialState
    default:
      return state
  }
}