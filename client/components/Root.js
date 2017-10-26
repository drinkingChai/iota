import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Nav from './Nav'
import Routes from './Routes'

export default class Root extends Component {
  componentDidMount() {
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
