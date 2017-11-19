import { fetchThoughts, fetchClusters } from './index'

export const bulkFetch = () => dispatch =>
  Promise.all([
    dispatch(fetchThoughts()),
    dispatch(fetchClusters())
  ])