import React, { Component } from 'react'
import TypeAhead from '../cards/TypeAhead'

export default class TestArea extends Component {
  render = () => {
    let items = [
      'item 1',
      'item 2',
      'item 3'
    ]

    return (
      <div>
        <h3>Test Area</h3>

        <TypeAhead onUpdate={ () => {} }/>
        Putting some stuff here to test
      </div>
    )
  }
}