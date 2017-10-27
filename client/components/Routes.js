import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Jot from './Jot'
import Train from './Train'
import Statistics from './Statistics'

export default function Routes () {
  return (
    <Switch>
      <Route exact path='/jot' component={ Jot } />
      <Route exact path='/train' component={ Train } />
      <Route exact path='/stats' component={ Statistics } />
      <Redirect to='/jot' />
    </Switch>
  )
}
