import React from 'react'
import { Link } from 'react-router-dom'
import ThoughtCard from './ThoughtCard'
import { formatDate } from '../../helpers'
import { Draggable } from 'react-beautiful-dnd'

export default function DraggableCard ({ thought, clickHandler }) {
  if (!thought) return <div></div>

  return (
    <Draggable draggableId={ thought.id } type="THOUGHTCARD">
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            style={provided.draggableStyle}
            {...provided.dragHandleProps}
          >
            <div key={ thought.id } className='thought'>
              <button className='cluster-link unlink' onClick={ clickHandler }><i className='im im-unlink'></i></button>
              <ThoughtCard thought={ thought }/>
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
      
    </Draggable>
  )
}

