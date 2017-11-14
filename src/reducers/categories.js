import { GET_CATEGORIES } from '../actions'

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}