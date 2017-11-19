import axios from 'axios'
import { bulkFetch } from './index'

export const GET_CLUSTERS = 'GET_CLUSTERS'

export const getClusters = clusters => ({ type: GET_CLUSTERS, clusters })

export const fetchClusters = () => dispatch => {
  return axios.get('/api/clusters')
    .then(res => dispatch(getClusters(res.data)))
}

export const updateCluster = (id, info) => dispatch =>
  axios.put(`/api/clusters/${id}`, info)
    .then(() => dispatch(bulkFetch()))

export const linkThoughts = thoughts => dispatch =>
  axios.post(`/api/clusters`, thoughts)
    .then(() => dispatch(bulkFetch()))

// re-order thoughts
export const move = (id, movingId, behindId) => dispatch => {
  const order = { movingId, behindId }
  return axios.put(`/api/clusters/${id}/moving`, order)
    .then(() => dispatch(bulkFetch()))
}