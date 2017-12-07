import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import store, { loadUserData, fetchCategories } from '../store'
import { connect } from 'react-redux'

import Nav from './Nav'
import Routes from './Routes'
import AuthRoutes from './AuthRoutes'

class Root extends Component {
  componentDidMount = () => {
    store.dispatch(fetchCategories())
    if (localStorage.jotKey) store.dispatch(loadUserData(localStorage.jotKey))
  }

  render = () => {
    return (
      <div>
        <Nav />

        <main className={ this.props.location.pathname == '/jot' ? 'jot' : '' }>
         { this.props.isAuthenticated ?
           <Routes /> :
           <AuthRoutes /> }
        </main>
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ isAuthenticated: currentUser.isAuthenticated })
export default withRouter(connect(mapState)(Root))