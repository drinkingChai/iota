import jwt from 'jsonwebtoken'
import axios from 'axios'
import { bulkFetch } from './index'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const RESET_APP = 'RESET_APP'

export const resetApp = () => ({ type: RESET_APP })
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const setAuthHeaderToken = token => {
  // on the axios object, change the authorization header
  // then everything that passes through axios will use that token
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => dispatch(loadUserData(res.data.jotKey)))

export const signOut = () => dispatch => {
  delete axios.defaults.headers.common['Authorization']
  localStorage.removeItem('jotKey')
  dispatch(resetApp())
}

export const loadUserData = token => dispatch => {
  localStorage.setItem('jotKey', token)

  setAuthHeaderToken(token)
  dispatch(setCurrentUser(jwt.decode(token)))

  // async op
  dispatch(bulkFetch())
}

export const updatePassword = password => dispatch =>
  axios.put('/api/auth/change-password', { password })

export const updateProfile = profileData => dispatch =>
  axios.put('/api/auth/update-profile', profileData)
    .then(res => dispatch(loadUserData(res.data.jotKey)))

export const register = userData => dispatch =>
  axios.post('/api/users', userData)
    .then(res => dispatch(loadUserData(res.data.jotKey)))
