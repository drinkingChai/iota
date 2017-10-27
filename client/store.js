import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// ACTION NAMES
const GET_THOUGHTS = 'GET_THOUGHTS'

// ACTION CREATORS
const getThoughts = thoughts => ({ type: GET_THOUGHTS, thoughts })

// THUNK
export const fetchThoughts = () => dispatch =>
  axios.get('/api/thoughts')
    .then(res => dispatch(getThoughts(res.data)))

export const trainMachine = content => dispatch =>
  axios.post('/api/train', content)
    .then(res => res.data)

export const postThought = content => dispatch =>
  axios.post('/api/thoughts', content)
    .then(res => res.data)

// INITIAL STATE
const initialState = {
  thoughts: []
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THOUGHTS:
      return { ...state, thoughts: action.thoughts }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
