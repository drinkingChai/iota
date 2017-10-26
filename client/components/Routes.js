import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Jot from './Jot'
import Train from './Train'

export default function Routes () {
  return (
    <Switch>
      <Route exact path='/jot' component={ Jot } />
      <Route exact path='/train' component={ Train } />
    </Switch>
  )
}
