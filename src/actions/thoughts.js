import axios from 'axios'
import { fetchClusters } from './clusters'

export const GET_THOUGHTS = 'GET_THOUGHTS'

export const getThoughts = thoughts => ({ type: GET_THOUGHTS, thoughts })

// THUNK
export const fetchThoughts = () => dispatch => {
  return axios.get('/api/thoughts')
    .then(res => dispatch(getThoughts(res.data)))
}

export const postThought = content => dispatch =>
  axios.post('/api/thoughts', content)
    .then(() => dispatch(fetchThoughts()))
    //.then(res => res.data)

export const updateThought = (id, content) => dispatch =>
  axios.put(`/api/thoughts/${id}`, content)
    .then(() => dispatch(fetchThoughts()))
    .then(() => dispatch(fetchClusters()))
    /***** NOTE: combine the above into one update function *****/
    //.then(res => res.data)

export const deleteThought = id => dispatch =>
  axios.delete(`/api/thoughts/${id}`)
    // .then(() => dispatch(fetchThoughts()))
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
