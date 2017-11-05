import React from 'react'

export default function Confirm ({ content, confirm, cancel }) {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>{ content }</h3>
        <div>
          <button className='btn' onClick={ cancel }>No</button>
          <button className='btn btn-red' onClick={ confirm }>Yes</button>
        </div>
      </div>
    </div>
  )
}
