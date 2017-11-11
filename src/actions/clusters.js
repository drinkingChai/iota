import axios from 'axios'
import { fetchThoughts } from './thoughts'

export const GET_CLUSTERS = 'GET_CLUSTERS'

export const getClusters = clusters => ({ type: GET_CLUSTERS, clusters })

export const fetchClusters = () => dispatch => {
  return axios.get('/api/clusters')
    .then(res => dispatch(getClusters(res.data)))
}

export const updateCluster = (id, info) => dispatch =>
  axios.put(`/api/clusters/${id}`, info)
    .then(() => dispatch(fetchClusters()))

export const linkThoughts = thoughts => dispatch =>
  axios.post(`/api/clusters`, thoughts)
    .then(() => dispatch(fetchThoughts()))