import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Jot from './Jot'
import ViewEditJot from './ViewEditJot'
import Train from './Train'
import Analysis from './Analysis'
import ThoughtStream from './ThoughtStream'
import ClusterThoughts from './ClusterThoughts'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Welcome from './messages/Welcome'

export default function Routes () {
  return (
    <Switch>
      <Route exact path='/jot' component={ Jot } />
      <Route exact path='/train' component={ Train } />
      <Route exact path='/stats' component={ Analysis } />
      <Route exact path='/thoughts' component={ ThoughtStream } />
      <Route exact path='/thoughts/:id' component={ ViewEditJot } />
      <Route exact path='/clusters/:id' component={ ClusterThoughts } />
      <Route exact path='/login' component={ Login } />
      <Route exact path='/register' component={ Register } />
      <Route exact path='/profile' component={ Profile } />
      <Route exact path='/welcome' component={ Welcome } />
      <Redirect to='/jot' />
    </Switch>
  )
}
