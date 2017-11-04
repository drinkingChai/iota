import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import store, { loadUserData } from '../store'

import Nav from './Nav'
import Routes from './Routes'

export default class Root extends Component {
  componentDidMount() {
    if (localStorage.jotKey) store.dispatch(loadUserData(localStorage.jotKey))
  }

  render() {
    return (
      <div>
        <Nav />

        <main>
          <Routes />
        </main>
      </div>
    )
  }
}
