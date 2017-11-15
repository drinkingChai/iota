import React from 'react'
import TypeAhead from '../cards/TypeAhead'

export default function TypeAheadTest () {
  let items = [
    'item 1',
    'item 2',
    'item 3'
  ]
  
  return (
    <div>
      <h3>TypeAhead test</h3>

      <TypeAhead selections={ items } onUpdate={ () => {} }/>
      Putting some stuff here to test
    </div>
  )
}