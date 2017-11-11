import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers'

export default function ThoughtCard ({ thought, clickHandler, selectedPool }) {
  // make this better by having it take a class instead of selectedPool
  // const ThoughtCard = ({ thought, className, clickHandler })
  // apply className from parent based on selected
  if (!thought) return <div></div>

  return (
    <div
      key={ thought.id } 
      onClick={ clickHandler }
      className={ `thought ${selectedPool.find(item => item.type == 'thought' && item.id == thought.id) ? 'selected' : ''}` }>

      { thought.clusterId ?
        <Link
          to={ `/clusters/${thought.clusterId}` }
          className='cluster-link'>cluster</Link> : null }

      <div>
        <p>{ thought.text }</p>
        <div className='categories'>
          { thought.categories.map(c => c.label).slice(0, 5).map(cat =>
              <span key={ cat } className='category remove-category'>{ cat }</span> ) }
        </div>
      </div>

      <div className='subheader'>
        <span className='date'>{ formatDate(thought.updatedAt) }</span>
        <div className='horiz-buttons'>
          <Link to={ `/thoughts/${thought.id}` }><i className="im im-pencil"></i></Link>
        </div>
      </div>
    </div>
  )
}
