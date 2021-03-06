import React from 'react'
import { Link } from 'react-router-dom'
import ThoughtCard from './ThoughtCard'
import { formatDate } from '../../helpers'

export default function ClusterableCard ({ thought, clickHandler, selectedPool }) {
  if (!thought) return <div></div>

  return (
    <div
      key={ thought.id } 
      onClick={ clickHandler }
      className={ `thought ${selectedPool.find(item => item.type == 'thought' && item.id == thought.id) ? 'selected' : ''}` }>

      <ThoughtCard thought={ thought }/>
    </div>
  )
}
