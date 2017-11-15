import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import TypeAheadTest from './TypeAheadTest'
import DraggableTest from './DraggableTest'

export default class TestArea extends Component {
  render = () => {
    const pathname = this.props.location.pathname
    const paths = [
      { link: '/test/typeahead', label: 'TypeAhead' },
      { link: '/test/draggable', label: 'Draggable' }
    ]

    return (
      <div>
        <h3>Test Area</h3>

        <div className='btn-group-horiz'>
          { paths.map((path, i) =>
            <Link
              key={ i }
              to={ path.link }
              className={ path.link == pathname ? 'btn btn-blue' : 'btn' }>{ path.label }</Link>) }
        </div>

        <Switch>
          <Route exact path='/test/typeahead' component={ TypeAheadTest } />
          <Route exact path='/test/draggable' component={ DraggableTest } />
        </Switch>
      </div>
    )
  }
}