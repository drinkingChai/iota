import React from 'react'
import { Link } from 'react-router-dom'
import ThoughtCard from './ThoughtCard'
import { formatDate } from '../../helpers'

export default function DraggableCard ({ thought, clickHandler }) {
  if (!thought) return <div></div>

  return (
    <div key={ thought.id } className='thought'>
      <button className='cluster-link unlink' onClick={ clickHandler }><i className='im im-unlink'></i></button>

      <ThoughtCard thought={ thought }/>
    </div>
  )
}

// <Draggable draggableId={ item.id } key={ item.id } type="PERSON">
//   {(provided, snapshot) => (
//     <div>
//       <div
//         ref={provided.innerRef}
//         style={provided.draggableStyle}
//         {...provided.dragHandleProps}
//       >
//         <h4>{ item.content }</h4>
//       </div>
//       {provided.placeholder}
//     </div>
//   )}
// </Draggable>