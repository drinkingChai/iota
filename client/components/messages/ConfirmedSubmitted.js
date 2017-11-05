import React from 'react'

export default function ConfirmedSubmitted ({ message, confirm }) {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>{ message }</h3>
        <button className='btn' onClick={ confirm }>Ok</button>
      </div>
    </div>
  )
}
