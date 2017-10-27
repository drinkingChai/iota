import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import store, { fetchThoughts } from '../store'

import Nav from './Nav'
import Routes from './Routes'

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchThoughts())
  }

  render() {
    return (
      <div>
        <Route component={ Nav }/>
        <Routes />
      </div>
    )
  }
}
