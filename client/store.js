import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import _ from 'lodash'

// ACTION NAMES
const GET_THOUGHTS = 'GET_THOUGHTS'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const RESET_APP = 'RESET_APP'

// ACTION CREATORS
const getThoughts = thoughts => ({ type: GET_THOUGHTS, thoughts })
const resetApp = () => ({ type: RESET_APP })
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

// THUNK
export const fetchThoughts = () => dispatch => {
  return axios.get('/api/thoughts')
    .then(res => dispatch(getThoughts(res.data)))
}

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

export const deleteThought = id => dispatch =>
  axios.delete(`/api/thoughts/${id}`)
    // .then(() => dispatch(fetchThoughts()))
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

export const setAuthHeaderToken = token => {
  // on the axios object, change the authorization header
  // then everything that passes through axios will use that token
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => {
      // set up the local storage
      const token = res.data.jotKey
      localStorage.setItem('jotKey', token)

      // start loading relevant data
      return dispatch(loadUserData(token))   
    })

export const signOut = () => dispatch => {
  localStorage.removeItem('jotKey')
  dispatch(resetApp())
}

export const loadUserData = token => dispatch => {
  setAuthHeaderToken(token)
  dispatch(setCurrentUser(jwt.decode(token)))

  // async op
  return Promise.all([
    dispatch(fetchThoughts())
  ])
}

// INITIAL STATE
const initialState = {
  thoughts: [],
  isAuthenticated: false,
  user: {}
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THOUGHTS:
      return { ...state, thoughts: action.thoughts }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.user),
        user: action.user
      }
    case RESET_APP:
      return initialState
    default:
      return state
  }
}

export default createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware, loggerMiddleware))

// if we set a state after createStore, then it will be executed before the app renders
// as this entire file will be exported before the app renders?
// if (localStorage.getItem('jotKey')) {

// }