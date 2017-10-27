import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Jot from './Jot'
import Train from './Train'
import Statistics from './Statistics'
import ThoughtStream from './ThoughtStream'

export default function Routes () {
  return (
    <Switch>
      <Route exact path='/jot' component={ Jot } />
      <Route exact path='/train' component={ Train } />
      <Route exact path='/stats' component={ Statistics } />
      <Route exact path='/thoughts' component={ ThoughtStream } />
      <Redirect to='/jot' />
    </Switch>
  )
}
