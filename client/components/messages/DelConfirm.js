import React from 'react'

export default function DelConfirm ({ content, confirm, cancel }) {
  return (
    <div className='floating-message'>
      <div className='floating-message-body'>
        <h3>Confirm delete?</h3>
        <div>
          <button className='btn' onClick={ cancel }>No</button>
          <button className='btn btn-red' onClick={ confirm }>Yes</button>
        </div>
      </div>
    </div>
  )
}
