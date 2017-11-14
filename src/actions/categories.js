import axios from 'axios'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = categories => ({ type: GET_CATEGORIES, categories })

export const fetchCategories = () => dispatch =>
  axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
