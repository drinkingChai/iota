import { GET_THOUGHTS, RESET_APP } from '../actions'

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THOUGHTS:
      return action.thoughts
    default:
      return state
  }
}
