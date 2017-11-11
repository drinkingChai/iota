import _ from 'lodash'

import { SET_CURRENT_USER, RESET_APP } from '../actions'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !_.isEmpty(action.user),
        user: action.user
      }
    case RESET_APP:
    // will this give an error if same action is used?
      return initialState
    default:
      return state
  }
}