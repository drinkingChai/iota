import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// ACTION NAMES


// ACTION CREATORS
export const trainMachine = content => dispatch =>
  axios.post('/api/train', content)

// THUNK


// INITIAL STATE
const initialState = {
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
