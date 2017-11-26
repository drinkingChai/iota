import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export default function AuthRoutes () {
  return (
    <Switch>
      <Route exact path='/register' component={ Register } />
      <Route exact path='/login' component={ Login } />
      <Redirect to='/login' />
    </Switch>
  )
}
