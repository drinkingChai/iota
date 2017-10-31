import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// ACTION NAMES
const GET_THOUGHTS = 'GET_THOUGHTS'
const GET_USER = 'GET_USER'
const DELETE_USER = 'DELETE_USER'

// ACTION CREATORS
const getThoughts = thoughts => ({ type: GET_THOUGHTS, thoughts })
const getUser = user => ({ type: GET_USER, user })
const deleteUser = () => ({ type: DELETE_USER })

// THUNK
export const fetchThoughts = () => dispatch =>
  axios.get('/api/thoughts')
    .then(res => dispatch(getThoughts(res.data)))

export const trainMachine = content => dispatch =>
  axios.post('/api/train', content)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const postThought = content => dispatch =>
  axios.post('/api/thoughts', content)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const updateThought = (id, content) => dispatch =>
  axios.put(`/api/thoughts/${id}`, content)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const linkThoughts = thoughts => dispatch =>
  axios.post(`/api/clusters`, thoughts)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const unlinkThought = thought => dispatch =>
  axios.delete(`/api/thoughts/${thought.id}/remove-cluster/${thought.clusterId}`)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const removeCategory = (thought, category) => dispatch =>
  axios.delete(`/api/thoughts/${thought.id}/remove-category/${category.id}`)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const addCategory = (thought, category) => dispatch =>
  axios.put(`/api/thoughts/${thought.id}/add-category`, category)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const fetchUser = () => dispatch =>
  axios.get('/api/auth')
    .then(user => dispatch(getUser(user)))

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(() => dispatch(fetchUser()))

export const signOut = () => dispatch =>
  axios.delete('/api/auth')
    .then(() => dispatch(deleteUser()))

// INITIAL STATE
const initialState = {
  thoughts: [],
  user: {}
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THOUGHTS:
      return { ...state, thoughts: action.thoughts }
    case GET_USER:
      return { ...state, user: action.user }
    case DELETE_USER:
      return { ...state,  user: {} }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
