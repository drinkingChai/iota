import React from 'react'

export default function Error ({ message }) {
  return (
    <div className='floating-mesage'>
      <div className='floating-message-body'>
        <h5>Something has gone wrong!</h5>
        <h4>{ message }</h4>
      </div>
    </div>
  )
}
